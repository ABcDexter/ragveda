# Use Python 3.11
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install backend dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Build frontend
WORKDIR /app/frontend

# Install frontend dependencies
RUN npm install && npm run build

# Go back to root
WORKDIR /app

# Expose port
ENV PORT=8080

# Start server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]

