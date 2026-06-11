"""
Logging configuration
"""

import logging
import sys
from pathlib import Path

from core.config import settings


def setup_logging():
    """Configure application logging"""
    log_dir = settings.DATA_DIR / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    
    log_file = log_dir / "noteforge.log"
    
    logging.basicConfig(
        level=logging.INFO if not settings.DEBUG else logging.DEBUG,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )
    
    logger = logging.getLogger("noteforge")
    logger.info(f"Logging initialized. Log file: {log_file}")
    return logger
