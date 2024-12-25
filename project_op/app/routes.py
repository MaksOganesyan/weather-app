from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
from passlib.context import CryptContext
from .weather import get_weather_async
import json

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register/", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email уже зарегистрирован")
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(name=user.name, email=user.email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return schemas.UserResponse.from_orm(db_user)
@router.post("/login/")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Неправильные учетные данные")
    return {"message": "Вход успешен"}

@router.get("/weather")
async def get_weather(lat: float = Query(...), lon: float = Query(...)):
    weather_data = await get_weather_async(lat, lon)
    if weather_data:
        return weather_data
    else:
        raise HTTPException(status_code=404, detail="Не удалось получить данные о погоде.")