# Employee Registration System

Full-stack employee registration with React frontend, Python backend, and MySQL database.

## Live Links

- **Frontend**: https://fatibelkoudia.github.io/employer-registration/
- **Backend API**: https://employer-registration-nr19kmot4.vercel.app/

## Features

- User registration with real-time validation
- Admin dashboard with user management
- JWT authentication
- Responsive design

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Python FastAPI, JWT
- **Database**: MySQL (AlwaysData)
- **Deployment**: Vercel, GitHub Pages

## Local Development

### Prerequisites

- Node.js
- Python 3.9+
- MySQL

### Frontend Setup

```bash
npm install

# Create frontend environment file
cp .env.example .env.local
# Edit .env.local if needed (default points to localhost:8000)

npm start
```

### Backend Setup

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create backend environment file
cp .env.example .env
# Edit .env with your MySQL credentials

# Start server
uvicorn server:app --reload
```

### Database Setup

```bash
# Create local database
mysql -u root -p
CREATE DATABASE ynov_ci_local;
exit;

# Run migration
mysql -u root -p < sqlfiles/local_migration.sql
```

## Production Deployment

### Vercel (Backend)

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard:
   - `MYSQL_HOST` - Database host
   - `MYSQL_USER` - Database username
   - `MYSQL_PASSWORD` - Database password
   - `MYSQL_DATABASE` - Database name
   - `JWT_SECRET_KEY` - Random secret key for JWT tokens
3. Deploy automatically on push

**Note**: See `server/.env.example` for reference values

### GitHub Pages (Frontend)

Deploys automatically on push to main branch.

## API Endpoints

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | `/api/health`           | Health check        |
| GET    | `/api/users`            | Get all users       |
| POST   | `/api/users`            | Create user         |
| POST   | `/api/admin/login`      | Admin login         |
| DELETE | `/api/admin/users/{id}` | Delete user (admin) |

## Validation Rules

| Field           | Rule                       |
| --------------- | -------------------------- |
| **Name**        | Required, letters only     |
| **Email**       | Valid email format         |
| **Birth Date**  | Must be 18+ years old      |
| **Postal Code** | 5-digit French postal code |

## Testing

```bash
# Frontend tests
npm test

# Backend tests
cd server
python -m pytest

# E2E tests
npm run test:e2e
```

## Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `npm start`        | Start development server |
| `npm test`         | Run unit tests           |
| `npm run build`    | Build for production     |
| `npm run test:e2e` | Run Cypress E2E tests    |

## Admin Credentials

- Username: `admin`
- Password: `admin123`
