from fastapi import APIRouter

from app.services.database import database_status

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "database": database_status()}
