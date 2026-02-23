# Ragveda - RAG Application for Indian Philosophies

A modern Retrieval Augmented Generation (RAG) application that answers questions about Indian philosophies, specifically focusing on the Bhagavad Gita.

## 🌟 Features

- **FastAPI Backend**: High-performance Python backend with RAG capabilities
- **React Frontend**: Modern, responsive chat interface
- **Vector Search**: Semantic search using sentence transformers and ChromaDB
- **Real-time Chat**: Interactive question-answering interface
- **Source Citations**: Shows relevant text passages that support answers
- **Optional LLM Synthesis**: Gemini (Vertex AI) for richer answers

## 🏗️ Architecture

```
ragveda/
├── backend/           # FastAPI server
│   ├── main.py       # API endpoints
│   ├── rag_engine.py # RAG logic & vector search
│   └── requirements.txt
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── data/             # Text data directory
    └── gita.txt      # Place your Bhagavad Gita text here
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Add your data file:
   - A sample `gita.txt` is already in the `data/` directory (~185 lines with key verses)
   - For a complete experience, replace with the full Bhagavad Gita text (~3000 lines)
   - The text will be automatically chunked and embedded on startup

5. (Optional) Enable Gemini answer synthesis:
```bash
export GEMINI_PROJECT_ID="73..."
export GEMINI_LOCATION="us-central1"
export GEMINI_MODEL_ID="gemini-1.5-flash"
```

6. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 API Documentation

Once the backend is running, visit:
- Interactive API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### Main Endpoints

- `GET /` - API information
- `GET /health` - Health check & readiness status
- `GET /stats` - Vector database statistics
- `POST /ask` - Ask a question
  ```json
  {
    "question": "What is dharma?",
    "context_limit": 3
  }
  ```

## 🎯 Usage

1. Ensure both backend and frontend are running
2. Open `http://localhost:5173` in your browser
3. Wait for the status indicator to turn green (data loaded)
4. Type your question about the Bhagavad Gita
5. View the answer along with source citations

### Example Questions

- "What is dharma?"
- "What does Krishna say about karma?"
- "Explain the concept of yoga in the Gita"
- "What is the path to liberation?"

## 🔧 Configuration

### Backend Configuration

Edit `backend/config.py` to adjust:
- `EMBEDDING_MODEL`: Sentence transformer model (default: 'all-MiniLM-L6-v2')
- `CHUNK_SIZE`: Size of text chunks (default: 500 characters)
- `CHUNK_OVERLAP`: Overlap between chunks (default: 50 characters)

#### Optional Vertex AI Gemini

Set these environment variables to enable Gemini-based answer synthesis:

- `GEMINI_PROJECT_ID`
- `GEMINI_LOCATION` (default: `us-central1`)
- `GEMINI_MODEL_ID` (default: `gemini-1.5-flash`)
- `GEMINI_MAX_OUTPUT_TOKENS` (default: `256`)
- `GEMINI_TEMPERATURE` (default: `0.5`)

### Frontend Configuration

Edit `frontend/vite.config.js` to change:
- Port number
- API proxy settings

## 🧪 Development

### Backend Development

```bash
cd backend
# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development

```bash
cd frontend
# Run with hot module replacement
npm run dev
```

### Build for Production

Frontend:
```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

If `frontend/dist` exists, the backend serves it at `/` and `/assets/*`.

## 📦 Dependencies

### Backend
- FastAPI - Modern web framework
- ChromaDB - Vector database
- sentence-transformers - Text embeddings
- Vertex AI SDK (optional) - Gemini answer synthesis
- uvicorn - ASGI server

### Frontend
- React 18 - UI framework
- Vite - Build tool
- Axios - HTTP client

## 🛠️ Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed
- Check if port 8000 is available
- Verify `gita.txt` exists in the `data/` directory

### Frontend won't connect to backend
- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify the API proxy in `frontend/vite.config.js`

### Embeddings take too long
- First startup will generate embeddings (may take 1-2 minutes)
- Subsequent startups will be faster (embeddings are cached in memory)
- Consider using a smaller embedding model for faster processing

### Gemini answers are truncated
- Increase `GEMINI_MAX_OUTPUT_TOKENS`
- Use a larger model like `gemini-1.5-pro` for richer output

## 🔮 Future Enhancements

- [ ] Add model selection in UI (Gemini Flash/Pro)
- [ ] Support for multiple texts (Upanishads, Vedas, etc.)
- [ ] Persistent vector database (save embeddings to disk)
- [ ] User authentication and conversation history
- [ ] Multi-language support
- [ ] Advanced filtering and search options

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using FastAPI, React, and modern RAG techniques.
