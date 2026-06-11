"""
Search router - full-text and semantic search
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    search_type: str = "fulltext"  # fulltext or semantic
    limit: int = 10


class SearchResult(BaseModel):
    note_id: str
    title: str
    content_snippet: str
    score: float
    tags: List[str]


class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int
    query: str


# Simple full-text search (will be enhanced with vector search)
from app.routers.notes import _notes_db


@router.post("/", response_model=SearchResponse)
async def search_notes(request: SearchRequest):
    """Search notes by query"""
    query = request.query.lower()
    results = []
    
    for note in _notes_db.values():
        score = 0.0
        
        # Title match (highest weight)
        if query in note.get("title", "").lower():
            score += 10.0
        
        # Content match
        content = note.get("content", "").lower()
        if query in content:
            score += 5.0
            # Frequency bonus
            score += content.count(query) * 0.5
        
        # Tag match
        for tag in note.get("tags", []):
            if query in tag.lower():
                score += 3.0
        
        if score > 0:
            content_snippet = note.get("content", "")[:200] + "..."
            results.append(SearchResult(
                note_id=note["id"],
                title=note["title"],
                content_snippet=content_snippet,
                score=score,
                tags=note.get("tags", []),
            ))
    
    # Sort by score descending
    results.sort(key=lambda x: x.score, reverse=True)
    
    # Apply limit
    limited_results = results[:request.limit]
    
    return SearchResponse(
        results=limited_results,
        total=len(results),
        query=request.query,
    )


@router.get("/recent")
async def get_recent_notes(limit: int = 10):
    """Get recently updated notes"""
    notes = sorted(
        _notes_db.values(),
        key=lambda x: x.get("updated_at", ""),
        reverse=True,
    )
    
    return {
        "notes": notes[:limit],
        "total": len(notes),
    }
