from datetime import datetime, timezone
from typing import Any

from fastapi import HTTPException
from pymongo import ReturnDocument

from app.data.seed import SEED_PRODUCTS
from app.models.schemas import ProductCreate, ProductUpdate
from app.services.database import get_db
from app.utils import clean_document, product_id
from app.utils import timestamp_id

demo_products = [dict(product) for product in SEED_PRODUCTS]


def get_demo_products() -> list[dict[str, Any]]:
    return [dict(product) for product in demo_products]


async def list_products(category: str | None = None, q: str | None = None):
    db = get_db()
    if db is None:
        products = get_demo_products()
        if category and category != "All":
            products = [item for item in products if item["category"] == category]
        if q:
            query = q.lower()
            products = [
                item
                for item in products
                if query in item.get("name", "").lower()
                or query in item["brand"].lower()
                or query in item["category"].lower()
            ]
        return products

    filters: dict[str, Any] = {}
    if category and category != "All":
        filters["category"] = category
    if q:
        filters["$or"] = [
            {"title": {"$regex": q, "$options": "i"}},
            {"brand": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}},
        ]

    cursor = db.products.find(filters).sort("title", 1)
    return [clean_document(product) async for product in cursor]


async def create_product(product: ProductCreate):
    db = get_db()
    product_document = product.model_dump()
    product_document["id"] = product_id()
    product_document["slug"] = product_document.get("slug") or timestamp_id("product")
    product_document["created_at"] = datetime.now(timezone.utc)
    product_document["updated_at"] = datetime.now(timezone.utc)

    if db is None:
        demo_products.append(clean_document(product_document))
        return clean_document(product_document)

    await db.products.insert_one(product_document)
    return clean_document(product_document)


async def get_product(product_id_value: str):
    db = get_db()
    if db is None:
        product = next(
            (item for item in demo_products if item["id"] == product_id_value),
            None,
        )
    else:
        product = await db.products.find_one({"id": product_id_value})

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return clean_document(product)


async def update_product(product_id_value: str, product: ProductUpdate):
    db = get_db()
    updates = {
        key: value
        for key, value in product.model_dump().items()
        if value is not None
    }
    if not updates:
        raise HTTPException(status_code=400, detail="No product fields provided")

    updates["updated_at"] = datetime.now(timezone.utc)

    if db is None:
        existing = next(
            (item for item in demo_products if item["id"] == product_id_value),
            None,
        )
        if existing is None:
            raise HTTPException(status_code=404, detail="Product not found")
        existing.update(updates)
        return existing

    result = await db.products.find_one_and_update(
        {"id": product_id_value},
        {"$set": updates},
        return_document=ReturnDocument.AFTER,
    )
    if result is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return clean_document(result)


async def delete_product(product_id_value: str):
    global demo_products

    db = get_db()
    if db is None:
        original_count = len(demo_products)
        demo_products = [
            item for item in demo_products if item["id"] != product_id_value
        ]
        if len(demo_products) == original_count:
            raise HTTPException(status_code=404, detail="Product not found")
        return None

    result = await db.products.delete_one({"id": product_id_value})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return None


async def featured_products():
    products = await list_products()
    return [product for product in products if product.get("isFeatured")]


async def search_products(q: str):
    return await list_products(q=q)


async def products_by_category(category: str):
    return await list_products(category=category)
