#!/bin/bash
# Balo Baba ki jai
# step 1: run the RAG engine
source ~/.zshrc
source ~/code/ragveda/backend
source .venv/bin/activate
pyenv shell 3.11
python main.py &

# step 2: run the frontend
cd ~/code/ragveda/frontend
npm run dev &

# step 3: run the Cloudflare tunnel
cloudflared tunnel run ragveda &

# step 4: Drink coffee and enojoy... ;)
caffeinate -d
