from fastapi import APIRouter

from app.models.schemas import ProductCreate, ProductUpdate
from app.services import product_service

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("")
async def list_products(category: str | None = None, q: str | None = None):
    return await product_service.list_products(category=category, q=q)


@router.get("/search")
async def search_products(q: str = ""):
    return await product_service.search_products(q=q)


@router.get("/featured")
async def featured_products():
    return await product_service.featured_products()


@router.get("/category/{category}")
async def products_by_category(category: str):
    return await product_service.products_by_category(category=category)


@router.post("", status_code=201)
async def create_product(product: ProductCreate):
    return await product_service.create_product(product)


@router.get("/{product_id}")
async def get_product(product_id: str):
    return await product_service.get_product(product_id)


@router.put("/{product_id}")
async def update_product(product_id: str, product: ProductUpdate):
    return await product_service.update_product(product_id, product)


@router.delete("/{product_id}", status_code=204)
async def delete_product(product_id: str):
    return await product_service.delete_product(product_id)
