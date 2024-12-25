from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    notifications = relationship("WeatherNotification", back_populates="owner")

class WeatherNotification(Base):
    __tablename__ = 'weather_notifications'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    text = Column(String)
    sent_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="notifications")
engine = create_engine('sqlite:///umbrelladb.db')
Base.metadata.create_all(engine)