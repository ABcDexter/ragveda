#!/bin/bash

# Start script for Ragveda application

echo "🕉️  Starting Ragveda Application"
echo "================================"

# Check if gita.txt exists
if [ ! -f "data/gita.txt" ]; then
    echo "⚠️  Warning: data/gita.txt not found!"
    echo "Please add gita.txt to the data directory before starting."
    echo ""
fi

# Start backend
echo "Starting backend server..."
cd backend

# Create venv only if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt
python main.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 3

# Start frontend
echo "Starting frontend server..."
cd frontend

# Install npm dependencies only if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application started!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for both processes
wait
