"""
Configuration settings for the RAG engine
"""

# Embedding Model Configuration
EMBEDDING_MODEL = "all-MiniLM-L6-v2"  # Can be changed to other sentence-transformer models

# Text Chunking Configuration
CHUNK_SIZE = 500  # Size of each text chunk in characters
CHUNK_OVERLAP = 50  # Overlap between chunks in characters

# Vector Database Configuration
COLLECTION_NAME = "indian_philosophy"

# API Configuration
DEFAULT_CONTEXT_LIMIT = 3  # Default number of context chunks to retrieve
