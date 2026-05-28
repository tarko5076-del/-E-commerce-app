from datetime import datetime, timezone

from app.models.schemas import OrderCreate
from app.services.database import get_db
from app.utils import clean_document, timestamp_id

demo_orders = []


async def create_order(order: OrderCreate):
    order_document = order.model_dump()
    order_document["orderStatus"] = "received"
    order_document["status"] = "paid" if order.paymentStatus in {"confirmed", "verified", "paid"} else "created"
    order_document["orderNumber"] = timestamp_id("KG")
    order_document["created_at"] = datetime.now(timezone.utc)

    db = get_db()
    if db is None:
        order_document["id"] = timestamp_id("order")
        demo_orders.insert(0, clean_document(order_document))
        return {
            "id": order_document["id"],
            "orderNumber": order_document["orderNumber"],
            "status": order_document["status"],
            "message": "MongoDB is offline, so this order was saved in memory.",
        }

    result = await db.orders.insert_one(order_document)
    return {
        "id": str(result.inserted_id),
        "orderNumber": order_document["orderNumber"],
        "status": order_document["status"],
    }


async def list_orders():
    db = get_db()
    if db is None:
        orders = []
        for order in demo_orders:
            order_copy = dict(order)
            if isinstance(order_copy.get("created_at"), datetime):
                order_copy["created_at"] = order_copy["created_at"].isoformat()
            orders.append(order_copy)
        return orders

    cursor = db.orders.find().sort("created_at", -1)
    orders = []
    async for order in cursor:
        order["id"] = str(order.pop("_id"))
        if isinstance(order.get("created_at"), datetime):
            order["created_at"] = order["created_at"].isoformat()
        orders.append(order)
    return orders
