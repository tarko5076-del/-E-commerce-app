from contextlib import asynccontextmanager

from motor.motor_asyncio import AsyncIOMotorClient

from app.config import MONGO_DB, MONGO_URI
from app.data.seed import SEED_PRODUCTS

mongo_client: AsyncIOMotorClient | None = None
db = None


async def seed_products() -> None:
    if db is None:
        return

    products = db.products
    for product in SEED_PRODUCTS:
        await products.update_one(
            {"id": product["id"]},
            {"$setOnInsert": product},
            upsert=True,
        )


@asynccontextmanager
async def lifespan(app):
    global mongo_client, db

    mongo_client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=2500)
    db = mongo_client[MONGO_DB]

    try:
        await mongo_client.admin.command("ping")
        await seed_products()
    except Exception as exc:
        print(f"MongoDB unavailable: {exc}")
        db = None

    yield

    if mongo_client is not None:
        mongo_client.close()


def get_db():
    return db


def database_status() -> str:
    return "connected" if db is not None else "offline"
