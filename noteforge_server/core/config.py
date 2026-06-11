"""
Application configuration
"""

import os
from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # App info
    APP_NAME: str = "NoteForge-AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    HOST: str = "127.0.0.1"
    PORT: int = 8787
    
    # Data paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    DATA_DIR: Path = BASE_DIR / "data"
    NOTES_DIR: Path = DATA_DIR / "notes"
    DB_PATH: Path = DATA_DIR / "noteforge.db"
    VECTOR_INDEX_PATH: Path = DATA_DIR / "vector.index"
    
    # AI Configuration
    GLM_API_KEY: str = os.getenv("GLM_API_KEY", "")
    GLM_API_BASE: str = os.getenv("GLM_API_BASE", "https://open.bigmodel.cn/api/paas/v4")
    GLM_MODEL: str = os.getenv("GLM_MODEL", "glm-5.1")
    
    # Search
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    TOP_K_SEARCH: int = 5
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()

# Ensure data directories exist
settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
settings.NOTES_DIR.mkdir(parents=True, exist_ok=True)
