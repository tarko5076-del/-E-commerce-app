from datetime import datetime, timezone
from typing import Any


def clean_document(document: dict[str, Any]) -> dict[str, Any]:
    document = dict(document)
    document.pop("_id", None)
    return document


def timestamp_id(prefix: str) -> str:
    return f"{prefix}_{int(datetime.now(timezone.utc).timestamp() * 1000)}"


def product_id() -> str:
    return f"p{int(datetime.now(timezone.utc).timestamp() * 1000)}"
