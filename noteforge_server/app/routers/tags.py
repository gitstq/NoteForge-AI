"""
Tags management router
"""

from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

from app.routers.notes import _notes_db

router = APIRouter()


class TagStats(BaseModel):
    name: str
    count: int


@router.get("/", response_model=List[str])
async def get_all_tags():
    """Get all unique tags"""
    tags = set()
    for note in _notes_db.values():
        tags.update(note.get("tags", []))
    return sorted(list(tags))


@router.get("/stats", response_model=List[TagStats])
async def get_tag_stats():
    """Get tag usage statistics"""
    tag_counts = {}
    for note in _notes_db.values():
        for tag in note.get("tags", []):
            tag_counts[tag] = tag_counts.get(tag, 0) + 1
    
    return [TagStats(name=name, count=count) for name, count in sorted(tag_counts.items())]


@router.get("/notes/{tag}")
async def get_notes_by_tag(tag: str):
    """Get all notes with a specific tag"""
    notes = [n for n in _notes_db.values() if tag in n.get("tags", [])]
    return {"notes": notes, "total": len(notes)}
