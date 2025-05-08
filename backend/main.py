from fastapi import FastAPI, Query, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from schemas import DoctorCreate
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv


load_dotenv()
app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Doctor model for response
class Doctor(BaseModel):
    id: int
    name: str
    gender: str
    specialization: str
    experience: int
    location: str
    image_url: str
    fees: int
    language: str

def get_db():
    return mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)


@app.get("/list-doctor-with-filter")
def list_doctors(
    page: int = 1,
    page_size: int = 10,
    gender: str = '',
    specialization: str = '',
    fees_min: int = 0,
    fees_max: int = 10000,
    language: str = '',
    experience_min: int = 0,
    experience_max: int = 100
):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Get distinct languages and specializations
    cursor.execute("SELECT DISTINCT language FROM doctors")
    language_rows = cursor.fetchall()
    
    # Process languages
    all_languages = set()
    for row in language_rows:
        if row['language']:
            # Split by comma and process each language
            languages = [lang.strip().lower() for lang in row['language'].split(',')]
            all_languages.update(languages)
    
    # Convert to sorted list and capitalize
    distinct_languages = sorted([lang.strip().upper() for lang in all_languages])
    
    cursor.execute("SELECT DISTINCT specialization FROM doctors")
    specialization_rows = cursor.fetchall()
    
    # Process specializations
    all_specializations = set()
    for row in specialization_rows:
        if row['specialization']:
            # Split by comma and process each specialization
            specializations = [spec.strip().lower() for spec in row['specialization'].split(',')]
            all_specializations.update(specializations)
    
    # Convert to sorted list and capitalize
    distinct_specializations = sorted([spec.strip().upper() for spec in all_specializations])

    # Get filtered doctors
    query = "SELECT * FROM doctors WHERE 1=1"
    params = []

    if gender:
        query += " AND gender = %s"
        params.append(gender)
    if specialization:
        query += " AND specialization = %s"
        params.append(specialization)
    if fees_min:
        query += " AND fees >= %s"
        params.append(fees_min)
    if fees_max:
        query += " AND fees <= %s"
        params.append(fees_max)
    if language:
        query += " AND language LIKE %s"
        params.append(f"%{language}%")
    if experience_min:
        query += " AND experience >= %s"
        params.append(experience_min)
    if experience_max:
        query += " AND experience <= %s"
        params.append(experience_max)

    query += " LIMIT %s OFFSET %s"
    params.extend([page_size, (page - 1) * page_size])

    cursor.execute(query, tuple(params))
    results = cursor.fetchall()
    cursor.close()
    db.close()
    
    return {
        "doctors": results,
        "filters": {
            "languages": distinct_languages,
            "specializations": distinct_specializations
        }
    }

@app.post("/add-doctor")
def add_doctor(doctor: DoctorCreate):
    db = get_db()
    cursor = db.cursor()

    insert_query = """
        INSERT INTO doctors (name, gender, specialization, experience, location, image_url, fees, language)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, (
        doctor.name,
        doctor.gender,
        doctor.specialization,
        doctor.experience,
        doctor.location,
        doctor.image_url,
        doctor.fees,
        doctor.language
    ))

    db.commit()
    cursor.close()
    db.close()

    return {"message": "Doctor added successfully"}
