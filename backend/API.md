# Backend API

The Ragveda backend is built with FastAPI and provides a RESTful API for the RAG engine.

## Base URL

```
http://localhost:8000
```

## Endpoints

### GET /

Returns basic API information.

**Response:**
```json
{
  "message": "Welcome to Ragveda API",
  "description": "RAG application for Indian philosophies",
  "endpoints": {
    "POST /ask": "Ask a question about Indian philosophy",
    "GET /health": "Check API health",
    "GET /stats": "Get database statistics"
  }
}
```

### GET /health

Health check endpoint to verify if the RAG engine is ready.

**Response:**
```json
{
  "status": "healthy",
  "ready": true,
  "message": "RAG engine is ready"
}
```

**Status Values:**
- `healthy` - System is ready and operational
- `not_ready` - System is initializing or data not loaded
- `initializing` - RAG engine is starting up

### GET /stats

Get statistics about the vector database.

**Response:**
```json
{
  "ready": true,
  "count": 150,
  "collection_name": "indian_philosophy",
  "data_file": "/path/to/data/gita.txt"
}
```

### POST /ask

Ask a question and receive an answer based on the Bhagavad Gita.

**Request Body:**
```json
{
  "question": "What is dharma?",
  "context_limit": 3
}
```

**Parameters:**
- `question` (string, required) - The question to ask
- `context_limit` (integer, optional) - Number of relevant text chunks to retrieve (default: 3)

**Response:**
```json
{
  "answer": "Based on the Bhagavad Gita, here's what I found relevant to your question:\n\n...",
  "sources": [
    "Perform your prescribed duty, for doing so is better than not working...",
    "It is far better to discharge one's prescribed duties..."
  ],
  "question": "What is dharma?"
}
```

## Error Responses

### 503 Service Unavailable

Returned when the RAG engine is not ready (data not loaded).

```json
{
  "detail": "RAG engine not ready. Please ensure gita.txt is in the data directory."
}
```

### 500 Internal Server Error

Returned when there's an error processing the question.

```json
{
  "detail": "Error processing question: [error message]"
}
```

## CORS Configuration

The API allows requests from:
- `http://localhost:3000` (Create React App default)
- `http://localhost:5173` (Vite default)

## Interactive Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Example Usage

### Using curl

```bash
# Health check
curl http://localhost:8000/health

# Get stats
curl http://localhost:8000/stats

# Ask a question
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is karma?", "context_limit": 3}'
```

### Using Python

```python
import requests

# Ask a question
response = requests.post(
    "http://localhost:8000/ask",
    json={"question": "What is karma?", "context_limit": 3}
)
data = response.json()
print(f"Answer: {data['answer']}")
print(f"Sources: {data['sources']}")
```

### Using JavaScript

```javascript
// Ask a question
const response = await fetch('http://localhost:8000/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'What is karma?',
    context_limit: 3
  })
});
const data = await response.json();
console.log('Answer:', data.answer);
console.log('Sources:', data.sources);
```

## RAG Engine Details

The RAG engine uses:
- **Embeddings**: sentence-transformers/all-MiniLM-L6-v2
- **Vector DB**: ChromaDB (in-memory)
- **Chunking**: 500 characters with 50 character overlap
- **Search**: Semantic similarity using cosine distance

## Development

To run with auto-reload during development:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
