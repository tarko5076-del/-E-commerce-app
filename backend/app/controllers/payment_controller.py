from fastapi import APIRouter

from app.models.schemas import PaymentInitialize
from app.services import payment_service

router = APIRouter(prefix="/api/payments", tags=["payments"])


@router.post("/chapa/initialize", status_code=201)
async def initialize_chapa(payment: PaymentInitialize):
    return await payment_service.initialize_payment("chapa", payment)


@router.get("/chapa/verify/{ref}")
async def verify_chapa(ref: str):
    return await payment_service.verify_chapa(ref)


@router.post("/telebirr/initialize", status_code=201)
async def initialize_telebirr(payment: PaymentInitialize):
    return await payment_service.initialize_payment("telebirr", payment)


@router.post("/cbe/initialize", status_code=201)
async def initialize_cbe(payment: PaymentInitialize):
    return await payment_service.initialize_payment("cbe", payment)


@router.post("/amhara-bank/initialize", status_code=201)
async def initialize_amhara_bank(payment: PaymentInitialize):
    return await payment_service.initialize_payment("amhara_bank", payment)


@router.post("/cod/confirm", status_code=201)
async def confirm_cod(payment: PaymentInitialize):
    return await payment_service.initialize_payment("cod", payment)


@router.get("/history")
async def payment_history():
    return await payment_service.payment_history()
