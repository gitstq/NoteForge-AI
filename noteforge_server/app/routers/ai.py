"""
AI services router - GLM-5.1 integration
"""

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from core.config import settings

router = APIRouter()


class SummarizeRequest(BaseModel):
    content: str
    max_length: int = 200


class SummarizeResponse(BaseModel):
    summary: str
    keywords: List[str]


class TagGenerateRequest(BaseModel):
    content: str
    existing_tags: List[str] = []
    max_tags: int = 5


class TagGenerateResponse(BaseModel):
    tags: List[str]


class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None


class ChatResponse(BaseModel):
    response: str


async def _call_glm_api(messages: list, temperature: float = 0.7) -> str:
    """Call GLM-5.1 API"""
    if not settings.GLM_API_KEY:
        raise HTTPException(status_code=500, detail="GLM API key not configured")
    
    headers = {
        "Authorization": f"Bearer {settings.GLM_API_KEY}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "model": settings.GLM_MODEL,
        "messages": messages,
        "temperature": temperature,
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.GLM_API_BASE}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60.0,
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"GLM API error: {str(e)}")


@router.post("/summarize", response_model=SummarizeResponse)
async def summarize_content(request: SummarizeRequest):
    """Generate AI summary for note content"""
    messages = [
        {
            "role": "system",
            "content": f"You are a helpful assistant. Summarize the following content in {request.max_length} characters or less. Also extract 3-5 keywords. Return in JSON format: {{\"summary\": \"...\", \"keywords\": [\"...\"]}}"
        },
        {"role": "user", "content": request.content},
    ]
    
    try:
        result = await _call_glm_api(messages, temperature=0.3)
        import json
        parsed = json.loads(result)
        return SummarizeResponse(
            summary=parsed.get("summary", result[:request.max_length]),
            keywords=parsed.get("keywords", []),
        )
    except Exception:
        # Fallback: truncate content as summary
        return SummarizeResponse(
            summary=request.content[:request.max_length] + "..." if len(request.content) > request.max_length else request.content,
            keywords=[],
        )


@router.post("/generate-tags", response_model=TagGenerateResponse)
async def generate_tags(request: TagGenerateRequest):
    """Generate AI tags for note content"""
    messages = [
        {
            "role": "system",
            "content": f"Generate up to {request.max_tags} relevant tags for the following content. Return only a JSON array of tag strings. Avoid these existing tags: {', '.join(request.existing_tags)}"
        },
        {"role": "user", "content": request.content},
    ]
    
    try:
        result = await _call_glm_api(messages, temperature=0.5)
        import json
        tags = json.loads(result)
        if isinstance(tags, list):
            return TagGenerateResponse(tags=tags[:request.max_tags])
        return TagGenerateResponse(tags=[])
    except Exception:
        return TagGenerateResponse(tags=[])


@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """Chat with AI assistant about notes"""
    context_msg = f"\n\nContext from notes:\n{request.context}" if request.context else ""
    
    messages = [
        {
            "role": "system",
            "content": "You are NoteForge AI, a helpful assistant for managing and understanding markdown notes." + context_msg
        },
        {"role": "user", "content": request.message},
    ]
    
    try:
        result = await _call_glm_api(messages)
        return ChatResponse(response=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
