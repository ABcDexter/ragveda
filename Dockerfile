# ---------- Stage 1: Build Frontend ----------
FROM node:20 AS frontend-builder

WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend/ .
RUN npm run build


# ---------- Stage 2: Backend ----------
FROM python:3.11-slim

WORKDIR /app

# Copy backend
COPY ./backend/ ./backend/

# Install backend dependencies
RUN pip install --no-cache-dir -r ./backend/requirements.txt

ENV PYTHONPATH=/app/backend

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
COPY ./data/ ./data/

# Default to port 8080; override with PORT or -p host:container.
ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=180s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:' + __import__('os').getenv('PORT', '8080') + '/health', timeout=5)"

CMD ["sh", "-c", "uvicorn main:app --app-dir /app/backend --host 0.0.0.0 --port ${PORT:-8080}"]
