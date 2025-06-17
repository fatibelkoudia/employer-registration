import os
import mysql.connector
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from pydantic import BaseModel

app = FastAPI()

# Autoriser toutes les origines (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèle de données pour la requête POST
class UserCreate(BaseModel):
    firstName: str
    lastName: str
    email: str
    birthDate: str
    city: str
    postalCode: str

# Fonction pour créer une connexion MySQL à chaque requête
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST", "localhost"),
            user=os.getenv("MYSQL_USER", "root"),
            password=os.getenv("MYSQL_ROOT_PASSWORD", ""),
            database=os.getenv("MYSQL_DATABASE", "test"),
            port=3306
        )
        return conn
    except mysql.connector.Error as err:
        print("Erreur de connexion MySQL:", err)
        raise HTTPException(status_code=500, detail="Erreur de base de données")

@app.get("/")
async def hello_world():
    return {"message": "Hello world"}

@app.get("/users")
async def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users")
        records = cursor.fetchall()
        return {"utilisateurs": records}
    finally:
        cursor.close()
        conn.close()

@app.post("/users")
async def create_user(user: UserCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO users (first_name, last_name, email, birth_date, city, postal_code)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user.firstName, user.lastName, user.email, user.birthDate, user.city, user.postalCode))
        conn.commit()
        return {"utilisateur": user}
    except mysql.connector.Error as err:
        print("Erreur d’insertion:", err)
        raise HTTPException(status_code=500, detail="Erreur lors de l’insertion")
    finally:
        cursor.close()
        conn.close()
