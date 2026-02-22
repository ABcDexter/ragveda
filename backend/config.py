"""
Configuration settings for the RAG engine
"""

import os

# Embedding Model Configuration
EMBEDDING_MODEL = "all-MiniLM-L6-v2"  # Can be changed to other sentence-transformer models

# Text Chunking Configuration
CHUNK_SIZE = 500  # Size of each text chunk in characters
CHUNK_OVERLAP = 50  # Overlap between chunks in characters

# Vector Database Configuration
COLLECTION_NAME = "indian_philosophy"

# API Configuration
DEFAULT_CONTEXT_LIMIT = 3  # Default number of context chunks to retrieve

# Optional IBM watsonx.ai LLM Configuration
WATSONX_URL = os.getenv("WATSONX_URL", "https://us-south.ml.cloud.ibm.com")
WATSONX_PROJECT_ID = os.getenv("WATSONX_PROJECT_ID")
WATSONX_API_KEY = os.getenv("WATSONX_API_KEY")
WATSONX_MODEL_ID = os.getenv("WATSONX_MODEL_ID", "mistralai/mistral-medium-2505")
WATSONX_MAX_NEW_TOKENS = int(os.getenv("WATSONX_MAX_NEW_TOKENS", "256"))
WATSONX_TEMPERATURE = float(os.getenv("WATSONX_TEMPERATURE", "0.5"))
