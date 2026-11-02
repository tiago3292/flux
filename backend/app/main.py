from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.db.base import Base
from app.db.session import engine
from app.api.routes import auth, users, items, uploads
from app.core.config import settings
import app.models

app = FastAPI(
    title="Finances API",
    description="API REST de finanças pessoais com autenticação por token",
    version="1.0.0"
)

frontend_url = (
    settings.cors_deploy.strip().rstrip("/")
    if settings.cors_deploy
    else None
)

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:8081",
    "http://finance-frontend:3000",
    "http://127.0.0.1:3000",
]

if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(items.router, prefix="/items", tags=["Items"])
app.include_router(uploads.router, prefix="/uploads", tags=["Uploads"])

app.mount("/static", StaticFiles(directory="app/static"), name="static")
