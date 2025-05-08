import mysql.connector
from faker import Faker
import random
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

fake = Faker()

# Connect to MySQL
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)
cursor = db.cursor()

# Create table if it doesn't exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        gender VARCHAR(10),
        specialization VARCHAR(50),
        experience INT,
        location VARCHAR(100),
        image_url TEXT,
        fees INT,
        language VARCHAR(100)
    )
""")

# Check if table already has data
cursor.execute("SELECT COUNT(*) FROM doctors")
count = cursor.fetchone()[0]

if count > 0:
    print(f"⚠️ Database already seeded with {count} records. Skipping seeding.")
else:
    print("🔁 Seeding doctors table...")
    # Sample data
    genders = ["male", "female"]
    specializations = [
        "General Physician", "Internal Medicine", "Cardiologist", "Dermatologist",
        "Pediatrician", "Orthopedist", "Neurologist", "Psychiatrist", "Gynecologist", "Ophthalmologist"
    ]
    locations = [
        "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka", "Chennai, Tamil Nadu",
        "Hyderabad, Telangana", "Kolkata, West Bengal", "Pune, Maharashtra",
        "Ahmedabad, Gujarat", "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh"
    ]
    languages = [
        "English", "Hindi", "Kannada", "Tamil", "Telugu", "Malayalam",
        "Bengali", "Marathi", "Gujarati", "Punjabi"
    ]
    image_urls = [
        "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg",
        "https://img.freepik.com/free-photo/portrait-doctor_144627-39367.jpg",
        "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-1532.jpg",
        "https://img.freepik.com/free-photo/portrait-smiling-female-doctor_171337-1532.jpg"
    ]

    # Insert sample doctors
    for _ in range(30):
        name = fake.name()
        gender = random.choice(genders)
        specialization = random.choice(specializations)
        experience = random.randint(1, 40)
        location = random.choice(locations)
        image_url = random.choice(image_urls)
        fees = random.randint(200, 1500)
        lang_list = random.sample(languages, k=random.randint(1, 3))
        language = ",".join(lang_list)

        cursor.execute("""
            INSERT INTO doctors (name, gender, specialization, experience, location, image_url, fees, language)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (name, gender, specialization, experience, location, image_url, fees, language))

    db.commit()
    print("✅ Database seeded successfully.")

cursor.close()
db.close()
