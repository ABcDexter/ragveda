from pathlib import Path
from typing import List, Dict, Optional
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
import asyncio

from config import (
    EMBEDDING_MODEL,
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    COLLECTION_NAME,
    GEMINI_PROJECT_ID,
    GEMINI_LOCATION,
    GEMINI_MODEL_ID,
    GEMINI_MAX_OUTPUT_TOKENS,
    GEMINI_TEMPERATURE,
)

class RAGEngine:
    """
    Retrieval Augmented Generation engine for Indian philosophy texts
    """
    
    def __init__(self, data_file_path: str):
        self.data_file_path = Path(data_file_path)
        self.collection_name = COLLECTION_NAME
        self.embedding_model = None
        self.chroma_client = None
        self.collection = None
        self._ready = False
        self.llm = None
        

    async def initialize(self):
        """Initialize the RAG engine with embeddings"""
        print("Initializing RAG engine...")
        
        # Initialize embedding model
        print("Loading embedding model...")
        self.embedding_model = SentenceTransformer(EMBEDDING_MODEL)
        
        # Initialize ChromaDB
        print("Initializing ChromaDB...")
        self.chroma_client = chromadb.Client(Settings(
            anonymized_telemetry=False,
            is_persistent=False
        ))
        
        # Get or create collection
        try:
            self.collection = self.chroma_client.get_collection(name=self.collection_name)
            print(f"✓ Loaded existing collection with {self.collection.count()} documents")
        except:
            self.collection = self.chroma_client.create_collection(
                name=self.collection_name,
                metadata={"description": "Indian philosophy texts"}
            )
            print("✓ Created new collection")
        
        self._initialize_llm()

        # Load and process data if file exists and collection is empty
        if self.data_file_path.exists():
            if self.collection.count() == 0:
                await self._load_data()
            self._ready = True
        else:
            print(f"⚠ Data file not found: {self.data_file_path}")


    def _initialize_llm(self):
        if not GEMINI_PROJECT_ID:
            print("ℹ️ Gemini LLM disabled. Set GEMINI_PROJECT_ID to enable.")
            return

        try:
            import vertexai
            from vertexai.generative_models import GenerationConfig, GenerativeModel

            vertexai.init(project=GEMINI_PROJECT_ID, location=GEMINI_LOCATION)
            self.llm = GenerativeModel(GEMINI_MODEL_ID)
            self._gemini_config = GenerationConfig(
                max_output_tokens=GEMINI_MAX_OUTPUT_TOKENS,
                temperature=GEMINI_TEMPERATURE,
            )
            print("✅ Gemini LLM initialized")
        except Exception as exc:
            self.llm = None
            self._gemini_config = None
            print(f"⚠ Failed to initialize Gemini LLM: {exc}")
            

    async def _load_data(self):
        """Load and chunk the text data, then create embeddings"""
        print(f"Loading data from {self.data_file_path}...")
        
        with open(self.data_file_path, 'r', encoding='utf-8') as f:
            text = f.read()
        
        # Split into chunks
        chunks = self._chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP)
        print(f"Created {len(chunks)} chunks from the text")
        
        # Create embeddings and add to collection
        print("Generating embeddings...")
        batch_size = 50
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i:i + batch_size]
            embeddings = self.embedding_model.encode(batch).tolist()
            
            ids = [f"chunk_{j}" for j in range(i, i + len(batch))]
            
            self.collection.add(
                embeddings=embeddings,
                documents=batch,
                ids=ids
            )
            
            if (i + batch_size) % 100 == 0:
                print(f"  Processed {min(i + batch_size, len(chunks))}/{len(chunks)} chunks")
        
        print(f"✓ Loaded {len(chunks)} chunks into vector database")
    

    def _chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """
        Split text into overlapping chunks
        
        Args:
            text: The text to chunk
            chunk_size: Target size of each chunk in characters
            overlap: Number of characters to overlap between chunks
        
        Returns:
            List of text chunks
        """
        # Split by lines first to maintain context
        lines = text.split('\n')
        
        chunks = []
        current_chunk = []
        current_size = 0
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            line_size = len(line)
            
            if current_size + line_size > chunk_size and current_chunk:
                # Save current chunk
                chunks.append('\n'.join(current_chunk))
                
                # Start new chunk with overlap
                overlap_lines = []
                overlap_size = 0
                for prev_line in reversed(current_chunk):
                    if overlap_size + len(prev_line) <= overlap:
                        overlap_lines.insert(0, prev_line)
                        overlap_size += len(prev_line)
                    else:
                        break
                
                current_chunk = overlap_lines + [line]
                current_size = sum(len(l) for l in current_chunk)
            else:
                current_chunk.append(line)
                current_size += line_size
        
        # Add the last chunk
        if current_chunk:
            chunks.append('\n'.join(current_chunk))
        
        return chunks
    

    async def ask(self, question: str, context_limit: int = 3) -> Dict:
        """
        Ask a question and get an answer based on the text
        
        Args:
            question: The question to ask
            context_limit: Number of context chunks to retrieve
        
        Returns:
            Dictionary with answer and sources
        """
        if not self._ready:
            raise RuntimeError("RAG engine not initialized")
        
        # Generate embedding for the question
        question_embedding = self.embedding_model.encode([question])[0].tolist()
        
        # Query the collection
        results = self.collection.query(
            query_embeddings=[question_embedding],
            n_results=context_limit
        )
        
        # Extract relevant contexts
        contexts = results['documents'][0] if results['documents'] else []
        
        if not contexts:
            return {
                "answer": "I couldn't find relevant information to answer your question. Please try rephrasing or ask about topics covered in the Bhagavad Gita.",
                "sources": []
            }
        
        # Generate answer based on contexts
        answer = self._generate_answer(question, contexts)
        
        # Return sources (first 100 chars of each context)
        sources = [ctx[:100] + "..." if len(ctx) > 100 else ctx for ctx in contexts]
        
        return {
            "answer": answer,
            "sources": sources
        }
    

    def _generate_answer(self, question: str, contexts: List[str]) -> str:
        """
        Generate an answer based on retrieved contexts
        
        This is a simple implementation that concatenates contexts.
        In a production system, this would use an LLM to generate a proper answer.
        """
        combined_context = "\n\n".join([f"Context {i+1}:\n{ctx}" for i, ctx in enumerate(contexts)])

        if self.llm:
            prompt = (
                "You are an expert assistant on the Bhagavad Gita and Indian philosophy. "
                "Answer the question using ONLY the provided contexts. "
                "If the answer is not present, say you don't have enough information.\n\n"
                f"Question: {question}\n\n"
                f"Contexts:\n{combined_context}\n\n"
                "Answer in a concise, clear paragraph."
            )
            try:
                response = self.llm.generate_content(prompt, generation_config=self._gemini_config)
                if response and getattr(response, "text", None):
                    return response.text.strip()
            except Exception as exc:
                print(f"❌ LLM generation failed, using extractive response: \n{exc}")

        answer = (
            f"Based on the Bhagavad Gita, here's what I found relevant to your question:\n\n"
            f"{combined_context}\n\n"
            f"Note: This is a direct retrieval from the text. "
            f"For a more synthesized answer, configure the LLM integration."
        )

        return answer
    

    def is_ready(self) -> bool:
        """Check if the RAG engine is ready"""
        return self._ready
    
    
    def get_stats(self) -> Dict:
        """Get statistics about the vector database"""
        if not self._ready:
            return {"ready": False, "count": 0}
        
        return {
            "ready": True,
            "count": self.collection.count(),
            "collection_name": self.collection_name,
            "data_file": str(self.data_file_path)
        }
