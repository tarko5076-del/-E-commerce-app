from fastapi import APIRouter

from app.models.schemas import OrderCreate
from app.services import order_service

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("", status_code=201)
async def create_order(order: OrderCreate):
    return await order_service.create_order(order)


@router.get("")
async def list_orders():
    return await order_service.list_orders()
