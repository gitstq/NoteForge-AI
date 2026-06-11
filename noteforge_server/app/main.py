"""
NoteForge-AI Backend Server
AI-powered Markdown knowledge base service
"""

import os
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.config import settings
from core.logger import setup_logging
from app.routers import notes, ai, search, tags


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler"""
    setup_logging()
    yield


app = FastAPI(
    title="NoteForge-AI API",
    description="AI-powered Markdown knowledge base backend service",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:1420", "http://localhost:5173", "tauri://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(notes.router, prefix="/api/notes", tags=["notes"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])
app.include_router(search.router, prefix="/api/search", tags=["search"])
app.include_router(tags.router, prefix="/api/tags", tags=["tags"])


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "1.0.0"}


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "NoteForge-AI API",
        "version": "1.0.0",
        "description": "AI-powered Markdown knowledge base backend",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8787)
