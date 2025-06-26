import mysql.connector
import os
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import hashlib
import jwt
import datetime

# Configuration de l'application
app = FastAPI(
    title="Employer Registration API",
    description="API for user registration and admin management",
    version="1.0.0"
)

# Configuration CORS
origins = [
    "http://localhost:3000",
    "https://employer-registration-fz.vercel.app",
    "https://*.vercel.app",
    "*"  # Pour Vercel
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration de la base de données
def get_connection():
    """Connexion à la base de données MySQL"""
    try:
        host = os.getenv("MYSQL_HOST", "localhost")
        user = os.getenv("MYSQL_USER", "root")
        password = os.getenv("MYSQL_ROOT_PASSWORD") if user == "root" else os.getenv("MYSQL_PASSWORD")
        database = os.getenv("MYSQL_DATABASE", "ynov_ci_test")
        
        print(f"Connexion à: host={host}, user={user}, db={database}")
        
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

# Configuration JWT
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-super-secret-key-change-this-in-production")
ALGORITHM = "HS256"
security = HTTPBearer()

# Identifiants admin (à déplacer en base de données en production)
ADMIN_CREDENTIALS = {
    "admin": hashlib.sha256("admin123".encode()).hexdigest(),
    "supervisor": hashlib.sha256("super123".encode()).hexdigest()
}

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Vérification du token JWT admin"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def create_admin_token(username: str):
    """Création d'un token JWT pour admin"""
    expire = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    payload = {
        "sub": username,
        "exp": expire,
        "iat": datetime.datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Routes principales
@app.get("/")
async def root():
    """Page d'accueil de l'API"""
    return {"message": "Employer Registration API", "status": "running", "version": "1.0.0"}

@app.get("/api")
@app.get("/api/")
async def api_root():
    """Page d'accueil de l'API avec préfixe /api/"""
    return {"message": "Employer Registration API", "status": "ok", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    """Endpoint de santé pour le debugging"""
    try:
        env_vars = {
            "MYSQL_HOST": os.getenv("MYSQL_HOST", "NOT_SET"),
            "MYSQL_USER": os.getenv("MYSQL_USER", "NOT_SET"),
            "MYSQL_DATABASE": os.getenv("MYSQL_DATABASE", "NOT_SET"),
            "JWT_SECRET_KEY": "SET" if os.getenv("JWT_SECRET_KEY") else "NOT_SET"
        }
        
        return {
            "status": "healthy",
            "environment": env_vars,
            "message": "All systems operational"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Routes utilisateurs
@app.get("/api/users")
async def get_users():
    """Récupérer tous les utilisateurs"""
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        records = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"utilisateurs": records}
    except Exception as e:
        print(f"Erreur get_users: {e}")
        return {
            "error": "Database unavailable", 
            "message": str(e),
            "utilisateurs": []
        }

@app.post("/api/users")
async def create_user(request: Request):
    """Créer un nouvel utilisateur"""
    try:
        data = await request.json()
        required_fields = ["firstName", "lastName", "email", "birthDate", "city", "postalCode"]
        
        # Validation des champs requis
        for field in required_fields:
            if not data.get(field):
                return {"error": f"Field {field} is required", "success": False}
        
        conn = get_connection()
        cursor = conn.cursor()
        sql = """
            INSERT INTO users (first_name, last_name, email, birth_date, city, postal_code)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            data["firstName"], 
            data["lastName"], 
            data["email"], 
            data["birthDate"], 
            data["city"], 
            data["postalCode"]
        ))
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"utilisateur": data, "success": True}
    except Exception as e:
        print(f"Erreur create_user: {e}")
        return {"error": str(e), "success": False}

# Routes admin
@app.post("/api/admin/login")
async def admin_login(request: Request):
    """Connexion administrateur"""
    try:
        data = await request.json()
        username = data.get("username")
        password = data.get("password")
        
        if not username or not password:
            return {"success": False, "message": "Username and password required"}
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        if username in ADMIN_CREDENTIALS and ADMIN_CREDENTIALS[username] == hashed_password:
            token = create_admin_token(username)
            return {
                "success": True, 
                "token": token,
                "username": username
            }
        else:
            return {"success": False, "message": "Invalid credentials"}
            
    except Exception as e:
        print(f"Erreur admin_login: {e}")
        return {"success": False, "message": "Login error"}

@app.get("/api/admin/users")
async def get_admin_users(current_admin: str = Depends(verify_admin_token)):
    """Récupérer tous les utilisateurs (admin seulement)"""
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at FROM users ORDER BY id DESC")
        records = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"utilisateurs": records}
    except Exception as e:
        print(f"Erreur get_admin_users: {e}")
        return {"error": str(e), "utilisateurs": []}

@app.delete("/api/admin/users/{user_id}")
async def delete_user(user_id: int, current_admin: str = Depends(verify_admin_token)):
    """Supprimer un utilisateur (admin seulement)"""
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Vérifier si l'utilisateur existe
        cursor.execute("SELECT id FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            cursor.close()
            conn.close()
            raise HTTPException(status_code=404, detail="User not found")
        
        # Supprimer l'utilisateur
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"success": True, "message": f"User {user_id} deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Erreur delete_user: {e}")
        return {"error": str(e)}

# Pour le déploiement Vercel
handler = app

# Pour le développement local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
