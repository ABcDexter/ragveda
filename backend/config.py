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

# Optional Vertex AI Gemini Configuration
GEMINI_PROJECT_ID = os.getenv("GEMINI_PROJECT_ID")
GEMINI_LOCATION = os.getenv("GEMINI_LOCATION", "us-central1")
GEMINI_MODEL_ID = os.getenv("GEMINI_MODEL_ID", "gemini-2.5-flash")
GEMINI_MAX_OUTPUT_TOKENS = int(os.getenv("GEMINI_MAX_OUTPUT_TOKENS", "1024"))
GEMINI_TEMPERATURE = float(os.getenv("GEMINI_TEMPERATURE", "0.5"))

print("Configuration loaded:"
      f"\n  EMBEDDING_MODEL: {EMBEDDING_MODEL}"
      f"\n  CHUNK_SIZE: {CHUNK_SIZE}"
      f"\n  CHUNK_OVERLAP: {CHUNK_OVERLAP}"
      f"\n  COLLECTION_NAME: {COLLECTION_NAME}"
      f"\n  DEFAULT_CONTEXT_LIMIT: {DEFAULT_CONTEXT_LIMIT}"
      f"\n  GEMINI_PROJECT_ID: {'set' if GEMINI_PROJECT_ID else 'not set'}"
      f"\n  GEMINI_LOCATION: {GEMINI_LOCATION}"
      f"\n  GEMINI_MODEL_ID: {GEMINI_MODEL_ID}"
      f"\n  GEMINI_MAX_OUTPUT_TOKENS: {GEMINI_MAX_OUTPUT_TOKENS}"
      f"\n  GEMINI_TEMPERATURE: {GEMINI_TEMPERATURE}")