# Quick Start Guide

## For Users with gita.txt

### Option 1: Using the start script (Recommended)

1. Place your `gita.txt` file in the `data/` directory
2. Run the startup script:
   ```bash
   ./start.sh
   ```

### Option 2: Manual startup

#### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Step-by-step for beginners

1. **Prerequisites**: Install Python 3.8+ and Node.js 16+

2. **Add your data**: 
   - Place `gita.txt` in the `data/` directory
   - The file should contain the Bhagavad Gita text (3000 lines)

3. **Start the backend**:
   ```bash
   cd backend
   pip3 install --user -r requirements.txt
   python3 main.py
   ```
   Wait for the message: "Uvicorn running on http://0.0.0.0:8000"

4. **Start the frontend** (new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
5. **Open the app**: Visit http://localhost:5173

## Testing Without Full Setup

If you want to test the basic structure without installing all dependencies:

```bash
cd backend
python3 test_server.py
```

This will start a minimal server to verify FastAPI works.

## First-Time Setup Notes

- **Backend first run**: The first startup will download the embedding model (~100MB) and process the text. This may take 2-3 minutes.
- **Subsequent runs**: Much faster as embeddings are cached in memory
- **Node modules**: Frontend npm install may take a few minutes

## Troubleshooting

### Port already in use
```bash
# Backend port 8000
lsof -ti:8000 | xargs kill -9

# Frontend port 5173
lsof -ti:5173 | xargs kill -9
```

### Python dependencies fail
Try upgrading pip first:
```bash
pip3 install --upgrade pip
```

### Cannot find gita.txt
Ensure the file is at: `data/gita.txt` (relative to project root)

## Example Questions to Try

Once the app is running:
- "What is dharma?"
- "What does Krishna say about karma?"
- "Explain the concept of yoga"
- "What is the path to liberation?"
- "Tell me about Arjuna's dilemma"
