import mysql.connector
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import hashlib
import jwt
import datetime
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

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

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-super-secret-key-change-this-in-production")
ALGORITHM = "HS256"

# Security
security = HTTPBearer()

# Admin credentials (in production, this should be in database with hashed passwords)
ADMIN_CREDENTIALS = {
    "admin": hashlib.sha256("admin123".encode()).hexdigest(),
    "supervisor": hashlib.sha256("super123".encode()).hexdigest()
}

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify admin JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def create_admin_token(username: str):
    """Create JWT token for admin"""
    expire = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    payload = {
        "sub": username,
        "exp": expire,
        "iat": datetime.datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/admin/login")
async def admin_login(request: Request):
    """Admin login endpoint"""
    try:
        data = await request.json()
        username = data.get("username")
        password = data.get("password")
        
        if not username or not password:
            return {"success": False, "message": "Username and password required"}
        
        # Hash the provided password
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Check credentials
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
        print(f"Erreur dans admin_login: {e}")
        return {"success": False, "message": "Login error"}

@app.get("/admin/users")
async def get_admin_users(current_admin: str = Depends(verify_admin_token)):
    """Get all users for admin (with full details)"""
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at FROM users ORDER BY id DESC")
        records = cursor.fetchall()
        return {"utilisateurs": records}
    except Exception as e:
        print(f"Erreur dans get_admin_users: {e}")
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.delete("/admin/users/{user_id}")
async def delete_user(user_id: int, current_admin: str = Depends(verify_admin_token)):
    """Delete a user (admin only)"""
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Delete the user
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        
        return {"success": True, "message": f"User {user_id} deleted successfully"}
        
    except Exception as e:
        print(f"Erreur dans delete_user: {e}")
        if "User not found" in str(e):
            raise HTTPException(status_code=404, detail="User not found")
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# For Vercel deployment
handler = app
