from datetime import datetime, timezone

from app.models.schemas import PaymentInitialize
from app.services.database import get_db
from app.utils import clean_document, timestamp_id

demo_payments = []


async def initialize_payment(method: str, payment: PaymentInitialize):
    # Provider secrets stay on the backend. This creates a safe transaction
    # reference for Chapa, Telebirr, CBE Birr, Amhara Bank, or COD.
    payment_document = {
        "id": timestamp_id("pay"),
        "provider": method,
        "amount": round(payment.amount, 2),
        "currency": payment.currency.upper(),
        "status": "pending" if method != "cod" else "confirmed",
        "customer": payment.customer,
        "reference": timestamp_id(method),
        "checkout_url": None,
        "created_at": datetime.now(timezone.utc),
    }

    if method == "chapa":
        payment_document["checkout_url"] = f"https://checkout.chapa.co/checkout/payment/{payment_document['reference']}"
    elif method in {"telebirr", "cbe", "amhara_bank"}:
        payment_document["status"] = "initialized"

    db = get_db()
    if db is not None:
        await db.payments.insert_one(payment_document)
    else:
        demo_payments.append(clean_document(payment_document))

    response = clean_document(payment_document)
    if isinstance(response.get("created_at"), datetime):
        response["created_at"] = response["created_at"].isoformat()
    return response


async def verify_chapa(reference: str):
    return {"reference": reference, "status": "verified"}


async def payment_history():
    db = get_db()
    if db is None:
        return demo_payments

    cursor = db.payments.find().sort("created_at", -1)
    return [clean_document(payment) async for payment in cursor]
