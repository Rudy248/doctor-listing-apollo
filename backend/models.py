from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    gender = Column(String(10))
    specialization = Column(String(100))
    experience = Column(Integer)
    location = Column(String(100))
    image_url = Column(String(255))
    fees = Column(Integer)
    language = Column(String(50))