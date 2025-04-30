from sqlalchemy.orm import Session
from models import Doctor
from schemas import DoctorCreate

def create_doctor(db: Session, doctor: DoctorCreate):
    db_doctor = Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

def get_doctors(db: Session, page: int, page_size: int, gender: str, specialization: str):
    query = db.query(Doctor)
    if gender:
        query = query.filter(Doctor.gender == gender)
    if specialization:
        query = query.filter(Doctor.specialization == specialization)
    return query.offset((page - 1) * page_size).limit(page_size).all()