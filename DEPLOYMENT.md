# Deployment Guide

## Local Development

Already covered in README.md and QUICKSTART.md

## Production Deployment

### Option 1: Traditional Server Deployment

#### Prerequisites
- Linux server with Python 3.8+ and Node.js 16+
- Domain name (optional)
- SSL certificate (recommended)

#### Steps

1. **Clone the repository**
```bash
git clone https://github.com/ABcDexter/ragveda.git
cd ragveda
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with production values
```

3. **Build frontend for production**
```bash
cd frontend
npm install
npm run build
# Serve dist/ folder with nginx or serve
```

4. **Run backend with production settings**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Use gunicorn for production
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

5. **Configure nginx (recommended)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/ragveda/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Option 2: Docker Deployment (Future Enhancement)

Docker support can be added. Example structure:

```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
COPY data/ ../data/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Option 3: Cloud Platform Deployment

#### Heroku
- Add `Procfile` for backend
- Configure buildpacks for Python and Node.js
- Set environment variables in dashboard

#### Vercel (Frontend only)
- Connect GitHub repository
- Vercel auto-detects Vite
- Set build command: `cd frontend && npm run build`
- Set output directory: `frontend/dist`

#### Railway / Render
- Deploy as separate services (backend + frontend)
- Configure environment variables
- Set up custom domains

## Environment Variables for Production

```bash
# Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
CORS_ORIGINS=https://yourdomain.com

# Frontend
VITE_API_URL=https://api.yourdomain.com
```

## Performance Optimization

### Backend
- Use persistent vector database (ChromaDB with persistence)
- Cache embeddings on disk
- Use Redis for session management
- Implement rate limiting

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Add service worker for offline support

## Monitoring

### Backend Monitoring
- Health check endpoint: `/health`
- Stats endpoint: `/stats`
- Add logging (structured logging)
- Use tools like Prometheus/Grafana

### Frontend Monitoring
- Browser console for errors
- Google Analytics or similar
- Error boundary for React
- Performance monitoring

## Security Considerations

✅ Already implemented:
- CORS configuration
- Input validation
- Error handling

🔒 Additional recommendations for production:
- Add API authentication (JWT, OAuth)
- Rate limiting to prevent abuse
- Input sanitization
- HTTPS only
- Security headers (helmet.js for Node)
- Regular dependency updates

## Scaling

### Horizontal Scaling
- Run multiple backend instances
- Load balancer (nginx, HAProxy)
- Shared vector database

### Vertical Scaling
- Increase server resources
- Optimize embedding model
- Cache frequently asked questions

## Backup

Important data to backup:
- `data/gita.txt` - Source text
- Environment configuration
- Vector database (if persistent)

## CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          # SSH to server
          # Pull latest code
          # Restart services
```

## Cost Estimation

### Free Tier Options
- Render: Free for 750 hours/month
- Railway: Free tier available
- Fly.io: Free tier available

### Paid Options
- DigitalOcean Droplet: $5-10/month
- AWS EC2 t2.micro: ~$8/month
- Heroku Hobby: $7/month per dyno

### Recommendations
- Start with free tier for testing
- Use DigitalOcean for production ($10/month droplet is sufficient)
- Add CDN when traffic grows
