from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import FRONTEND_ORIGIN
from app.controllers import (
    health_controller,
    order_controller,
    payment_controller,
    product_controller,
)
from app.services.database import lifespan


def create_app() -> FastAPI:
    app = FastAPI(title="NovaCart API", version="1.0.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            FRONTEND_ORIGIN,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health_controller.router)
    app.include_router(product_controller.router)
    app.include_router(payment_controller.router)
    app.include_router(order_controller.router)

    return app
