from pydantic import BaseModel

class DoctorCreate(BaseModel):
    name: str
    gender: str
    specialization: str
    experience: int
    location: str
    image_url: str
    fees: int
    language: str

class DoctorResponse(DoctorCreate):
    id: int

    class Config:
        orm_mode = True