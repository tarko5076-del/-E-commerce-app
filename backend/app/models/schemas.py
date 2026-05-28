from typing import Any

from pydantic import BaseModel, EmailStr, Field


class Customer(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr | None = None
    phone: str | None = None
    address: str | None = None


class Variant(BaseModel):
    color: str = ""
    storage: str = ""
    RAM: str = ""
    price: float = Field(ge=0)
    stock: int = Field(ge=0)
    sku: str


class Warranty(BaseModel):
    period: str = "1 year"
    type: str = "Official"
    provider: str = "Kdame Gebya"


class ProductCreate(BaseModel):
    name: str = Field(min_length=2, max_length=140)
    nameAmharic: str | None = None
    slug: str | None = None
    description: str = ""
    descriptionAmharic: str | None = None
    price: float = Field(ge=0)
    comparePrice: float | None = None
    category: str
    brand: str
    model: str | None = None
    images: list[str] = Field(default_factory=list)
    cloudinaryIds: list[str] = Field(default_factory=list)
    variants: list[Variant] = Field(default_factory=list)
    specs: dict[str, Any] = Field(default_factory=dict)
    warranty: Warranty = Field(default_factory=Warranty)
    rating: float = Field(default=0, ge=0, le=5)
    reviewCount: int = Field(default=0, ge=0)
    totalStock: int = Field(default=0, ge=0)
    isOriginal: bool = True
    isFeatured: bool = False
    isActive: bool = True
    tags: list[str] = Field(default_factory=list)
    customsInfo: str = "Import tax/customs information is included where applicable."


class ProductUpdate(BaseModel):
    name: str | None = None
    nameAmharic: str | None = None
    slug: str | None = None
    description: str | None = None
    descriptionAmharic: str | None = None
    price: float | None = Field(default=None, ge=0)
    comparePrice: float | None = Field(default=None, ge=0)
    category: str | None = None
    brand: str | None = None
    model: str | None = None
    images: list[str] | None = None
    cloudinaryIds: list[str] | None = None
    variants: list[Variant] | None = None
    specs: dict[str, Any] | None = None
    warranty: Warranty | None = None
    rating: float | None = Field(default=None, ge=0, le=5)
    reviewCount: int | None = Field(default=None, ge=0)
    totalStock: int | None = Field(default=None, ge=0)
    isOriginal: bool | None = None
    isFeatured: bool | None = None
    isActive: bool | None = None
    tags: list[str] | None = None
    customsInfo: str | None = None


class OrderItem(BaseModel):
    product_id: str
    title: str
    price: float = Field(ge=0)
    quantity: int = Field(ge=1)


class OrderTotals(BaseModel):
    subtotal: float = Field(ge=0)
    shipping: float = Field(default=0, ge=0)
    tax: float = Field(default=0, ge=0)
    total: float = Field(ge=0)


class OrderCreate(BaseModel):
    customer: Customer
    items: list[OrderItem] = Field(min_length=1)
    totals: OrderTotals
    deliveryAddress: dict[str, Any] | None = None
    deliveryMethod: str | None = None
    deliveryZone: str | None = None
    deliveryCost: float = 0
    paymentMethod: str = "cod"
    paymentStatus: str = "pending"
    payment: dict[str, Any] | None = None
    notes: str = ""


class PaymentInitialize(BaseModel):
    amount: float = Field(gt=0)
    currency: str = "ETB"
    customer: dict[str, Any] = Field(default_factory=dict)


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str = Field(min_length=6)


class UserLogin(BaseModel):
    identifier: str
    password: str
