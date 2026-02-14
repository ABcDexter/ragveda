# Project Structure

```
ragveda/
├── README.md                 # Main documentation
├── QUICKSTART.md            # Quick setup guide
├── CONTRIBUTING.md          # Contribution guidelines
├── .gitignore              # Git ignore rules
├── .env.example            # Environment configuration template
├── start.sh                # Convenient startup script
│
├── backend/                # FastAPI Backend
│   ├── main.py            # API endpoints
│   ├── rag_engine.py      # RAG logic & vector search
│   ├── config.py          # Configuration settings
│   ├── requirements.txt   # Python dependencies
│   ├── test_server.py     # Basic test server
│   └── API.md             # API documentation
│
├── frontend/              # React Frontend
│   ├── index.html        # HTML entry point
│   ├── package.json      # Node dependencies
│   ├── vite.config.js    # Vite configuration
│   ├── src/
│   │   ├── main.jsx      # React entry point
│   │   ├── App.jsx       # Main App component
│   │   ├── App.css       # Main styles
│   │   ├── index.css     # Global styles
│   │   ├── config.js     # Frontend configuration
│   │   └── components/
│   │       ├── Header.jsx          # Header component
│   │       ├── StatusBar.jsx       # Status indicator
│   │       └── ChatInterface.jsx   # Chat UI
│   └── public/           # Static assets
│
└── data/                 # Data directory
    ├── README.md        # Data documentation
    ├── .gitkeep         # Keep directory in git
    └── gita.txt         # Sample Bhagavad Gita text
```

## Component Details

### Backend Components

#### main.py
- FastAPI application with CORS middleware
- Endpoints: /, /health, /stats, /ask
- Initializes RAG engine on startup
- Handles API requests and responses

#### rag_engine.py
- RAGEngine class for text processing
- Text chunking with overlap
- Embedding generation using sentence-transformers
- Vector storage and retrieval using ChromaDB
- Question answering logic

#### config.py
- Centralized configuration
- Embedding model settings
- Chunk size and overlap settings
- Collection name

### Frontend Components

#### App.jsx
- Main application component
- API health checking
- State management for API status
- Component orchestration

#### Header.jsx
- Application header
- Title and description

#### StatusBar.jsx
- Real-time status indicator
- Shows API readiness
- Visual feedback with colored dot

#### ChatInterface.jsx
- Main chat UI
- Message history management
- Input handling and validation
- API communication
- Source citation display

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **ChromaDB**: Vector database for embeddings
- **sentence-transformers**: Text embedding generation
- **uvicorn**: ASGI server

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Axios**: HTTP client
- **Modern CSS**: Gradients, animations, responsive design

## Data Flow

1. **Startup**: Backend loads gita.txt and creates embeddings
2. **User Input**: User types question in frontend
3. **API Request**: Frontend sends POST to /ask endpoint
4. **Embedding**: Backend creates embedding for question
5. **Vector Search**: ChromaDB finds similar text chunks
6. **Answer Generation**: Backend formats answer with sources
7. **Display**: Frontend shows answer and sources

## Configuration Points

### Backend Config (backend/config.py)
- EMBEDDING_MODEL: Change the embedding model
- CHUNK_SIZE: Adjust chunk size
- CHUNK_OVERLAP: Control overlap between chunks

### Frontend Config (frontend/src/config.js)
- API_BASE_URL: Configure backend URL

### Environment (.env)
- VITE_API_URL: Production API URL
- BACKEND_PORT: Change backend port
- FRONTEND_PORT: Change frontend port

## Key Features

✅ Semantic search using embeddings
✅ Source citations for transparency
✅ Real-time status monitoring
✅ Responsive chat interface
✅ Configurable parameters
✅ Environment-based configuration
✅ Comprehensive documentation
