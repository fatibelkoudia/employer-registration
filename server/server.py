import mysql.connector
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings for allowing the React app to connect to FastAPI
origins = [
    "http://localhost:3000",
    "employer-registration-fz.vercel.app",
    "https://*.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL connection setup
def get_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        port=3306,
    )

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.get("/users")
async def get_users():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        records = cursor.fetchall()
        return {"utilisateurs": records}
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()

@app.post("/users")
async def create_user(request: Request):
    try:
        data = await request.json()
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")
        birth_date = data.get("birthDate")
        city = data.get("city")
        postal_code = data.get("postalCode")

        conn = get_connection()
        cursor = conn.cursor()
        sql = """
            INSERT INTO users (first_name, last_name, email, birth_date, city, postal_code)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (first_name, last_name, email, birth_date, city, postal_code))
        conn.commit()
        return {"utilisateur": data}
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()
