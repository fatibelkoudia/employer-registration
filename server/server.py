import mysql.connector
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS pour permettre à React de se connecter
origins = [
    "http://localhost:3000",
    "https://fatibelkoudia.github.io",
    "https://employer-registration-fz.vercel.app",
    "https://*.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration connexion MySQL
def get_connection():
    try:
        # Debug pour voir les variables d'environnement
        host = os.getenv("MYSQL_HOST", "localhost")
        user = os.getenv("MYSQL_USER", "root")
        # Use MYSQL_PASSWORD for non-root user, MYSQL_ROOT_PASSWORD for root
        if user == "root":
            password = os.getenv("MYSQL_ROOT_PASSWORD", "")
        else:
            password = os.getenv("MYSQL_PASSWORD", "")
        database = os.getenv("MYSQL_DATABASE", "ynov_ci_test")
        
        print(f"Tentative connexion à: host={host}, user={user}, db={database}")
        
        return mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=3306,
        )
    except Exception as e:
        print(f"Erreur connexion DB: {e}")
        raise

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.get("/users")
async def get_users():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        records = cursor.fetchall()
        return {"utilisateurs": records}
    except Exception as e:
        print(f"Erreur dans get_users: {e}")
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.post("/users")
async def create_user(request: Request):
    conn = None
    cursor = None
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
        print(f"Erreur dans create_user: {e}")
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.post("/users")
async def create_user_local(request: Request):
    conn = None
    cursor = None
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
        print(f"Erreur dans create_user: {e}")
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# For Vercel deployment
handler = app
