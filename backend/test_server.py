#!/usr/bin/env python3
"""
Simple test script to verify basic FastAPI functionality
"""
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Backend is working!"}

@app.get("/health")
def health():
    return {"status": "healthy", "ready": True}

if __name__ == "__main__":
    print("Starting test server on http://localhost:8000")
    print("Press Ctrl+C to stop")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
