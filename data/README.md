# Data Directory

This directory contains the text data for the RAG application.

## Required File

Please add `gita.txt` to this directory. The file should contain the Bhagavad Gita text (approximately 3000 lines).

### Format

The text file should be in plain text format (.txt) with UTF-8 encoding. The RAG engine will automatically:
- Chunk the text into smaller segments
- Generate embeddings for semantic search
- Store in a vector database for fast retrieval

### Example Structure

```
Chapter 1: Arjuna Visada Yoga
Verse 1: ...
Verse 2: ...
...
```

Once you add `gita.txt`, restart the backend server to load and index the data.
