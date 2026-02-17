# ---------- Stage 1: Build Frontend ----------
FROM node:20 AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build


# ---------- Stage 2: Backend ----------
FROM python:3.11-slim

WORKDIR /app

# Copy backend
COPY backend/ ./backend/

# Install backend dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Cloud Run requires port 8080
ENV PORT=8080

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
