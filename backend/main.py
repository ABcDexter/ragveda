from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from pathlib import Path

from backend.rag_engine import RAGEngine

app = FastAPI(
    title="Ragveda - Indian Philosophy RAG API",
    description="API for answering questions based on Indian philosophies using RAG",
    version="1.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG engine
rag_engine = None

class Question(BaseModel):
    question: str
    context_limit: Optional[int] = 3

class Answer(BaseModel):
    answer: str
    sources: List[str]
    question: str

@app.on_event("startup")
async def startup_event():
    """Initialize RAG engine on startup"""
    global rag_engine
    data_path = Path(__file__).parent.parent / "data" / "gita.txt"
    rag_engine = RAGEngine(str(data_path))
    
    # Check if data file exists
    if data_path.exists():
        print(f"✓ Found data file: {data_path}")
        await rag_engine.initialize()
    else:
        print(f"⚠ Data file not found at {data_path}")
        print("  Please add gita.txt to the data directory")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Ragveda API",
        "description": "RAG application for Indian philosophies",
        "endpoints": {
            "POST /ask": "Ask a question about Indian philosophy",
            "GET /health": "Check API health",
            "GET /stats": "Get database statistics"
        }
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    if rag_engine is None:
        return {"status": "initializing", "ready": False}
    
    is_ready = rag_engine.is_ready()
    return {
        "status": "healthy" if is_ready else "not_ready",
        "ready": is_ready,
        "message": "RAG engine is ready" if is_ready else "Waiting for data to be loaded"
    }

@app.get("/stats")
async def stats():
    """Get statistics about the vector database"""
    if rag_engine is None or not rag_engine.is_ready():
        raise HTTPException(status_code=503, detail="RAG engine not ready")
    
    return rag_engine.get_stats()

@app.post("/ask", response_model=Answer)
async def ask_question(question: Question):
    """
    Ask a question about Indian philosophy
    
    Args:
        question: The question to ask
        context_limit: Number of context chunks to retrieve (default: 3)
    
    Returns:
        Answer with sources from the text
    """
    if rag_engine is None or not rag_engine.is_ready():
        raise HTTPException(
            status_code=503, 
            detail="RAG engine not ready. Please ensure gita.txt is in the data directory."
        )
    
    try:
        result = await rag_engine.ask(question.question, question.context_limit)
        return Answer(
            answer=result["answer"],
            sources=result["sources"],
            question=question.question
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
