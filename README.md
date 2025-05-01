# 🩺 Doctor Listing Web App

This is a full-stack doctor listing application that includes:
- A **FastAPI backend** with MySQL database
- A **Next.js frontend** for UI
- Sample doctor data to seed the database

---

## ⚙️ Backend Setup

### 1. Create `.env` File

Inside the `backend` folder, create a file named `.env` and add the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=apollo
DB_PORT=3306
```
### 2. Set Up MySQL Database

Open a terminal and run:
```
mysql -u root -p
```
Then inside the MySQL shell:
```
SOURCE path/to/your/project/backend/db/init.sql;
```
Replace path/to/your/project with the actual path to the init.sql file.

### 3. Install Dependencies & Activate Virtual Environment
💻 For Windows:
```
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```
🍎 For macOS/Linux:
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
### 4. Seed the Database
Inside the backend directory:
```
python seed.py
```

### 5. Run Backend Server
```
uvicorn main:app --reload
```
Access the API docs at: http://127.0.0.1:8000/docs

## 🌐 Frontend Setup
In a new terminal:
```
cd frontend
npm install
npm run dev
```
Visit: http://localhost:3000

## 📱 Responsive Design
The application is fully responsive and works seamlessly across desktop and mobile devices.

## 🖼️ Screenshots
🔹 Home Page
![Homepage](/home_page.png)

🔹 Add Doctor Page
![Add Doctor](/add_doctor.png)

