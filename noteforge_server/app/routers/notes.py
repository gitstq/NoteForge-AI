"""
Notes management router
"""

import uuid
from datetime import datetime
from pathlib import Path
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.config import settings

router = APIRouter()


class NoteCreate(BaseModel):
    title: str
    content: str
    folder_id: Optional[str] = None
    tags: List[str] = []


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    folder_id: Optional[str] = None
    tags: Optional[List[str]] = None


class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    folder_id: Optional[str]
    tags: List[str]
    created_at: str
    updated_at: str
    summary: Optional[str] = None


class FolderCreate(BaseModel):
    name: str
    parent_id: Optional[str] = None


class FolderResponse(BaseModel):
    id: str
    name: str
    parent_id: Optional[str]
    created_at: str


# In-memory storage (will be replaced with SQLite in production)
_notes_db = {}
_folders_db = {}


def _get_timestamp() -> str:
    return datetime.now().isoformat()


@router.post("/", response_model=NoteResponse)
async def create_note(note: NoteCreate):
    """Create a new note"""
    note_id = str(uuid.uuid4())
    now = _get_timestamp()
    
    note_data = {
        "id": note_id,
        "title": note.title,
        "content": note.content,
        "folder_id": note.folder_id,
        "tags": note.tags,
        "created_at": now,
        "updated_at": now,
        "summary": None,
    }
    
    _notes_db[note_id] = note_data
    
    # Save to file
    note_file = settings.NOTES_DIR / f"{note_id}.md"
    note_file.write_text(note.content, encoding="utf-8")
    
    return NoteResponse(**note_data)


@router.get("/", response_model=List[NoteResponse])
async def list_notes(folder_id: Optional[str] = None, tag: Optional[str] = None):
    """List all notes with optional filtering"""
    notes = list(_notes_db.values())
    
    if folder_id:
        notes = [n for n in notes if n.get("folder_id") == folder_id]
    
    if tag:
        notes = [n for n in notes if tag in n.get("tags", [])]
    
    return [NoteResponse(**n) for n in notes]


@router.get("/{note_id}", response_model=NoteResponse)
async def get_note(note_id: str):
    """Get a specific note"""
    if note_id not in _notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return NoteResponse(**_notes_db[note_id])


@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(note_id: str, note_update: NoteUpdate):
    """Update a note"""
    if note_id not in _notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    note = _notes_db[note_id]
    now = _get_timestamp()
    
    if note_update.title is not None:
        note["title"] = note_update.title
    if note_update.content is not None:
        note["content"] = note_update.content
        # Update file
        note_file = settings.NOTES_DIR / f"{note_id}.md"
        note_file.write_text(note_update.content, encoding="utf-8")
    if note_update.folder_id is not None:
        note["folder_id"] = note_update.folder_id
    if note_update.tags is not None:
        note["tags"] = note_update.tags
    
    note["updated_at"] = now
    
    return NoteResponse(**note)


@router.delete("/{note_id}")
async def delete_note(note_id: str):
    """Delete a note"""
    if note_id not in _notes_db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    del _notes_db[note_id]
    
    # Remove file
    note_file = settings.NOTES_DIR / f"{note_id}.md"
    if note_file.exists():
        note_file.unlink()
    
    return {"message": "Note deleted successfully"}


# Folder routes
@router.post("/folders", response_model=FolderResponse)
async def create_folder(folder: FolderCreate):
    """Create a new folder"""
    folder_id = str(uuid.uuid4())
    now = _get_timestamp()
    
    folder_data = {
        "id": folder_id,
        "name": folder.name,
        "parent_id": folder.parent_id,
        "created_at": now,
    }
    
    _folders_db[folder_id] = folder_data
    
    return FolderResponse(**folder_data)


@router.get("/folders", response_model=List[FolderResponse])
async def list_folders():
    """List all folders"""
    return [FolderResponse(**f) for f in _folders_db.values()]
