# CV Manager & Generator

A full-stack project for managing and presenting résumés. It consists of a **Django backend** (CMS, API & authentication) and a **React frontend** (modern presentation & PDF export).

The system allows résumés to be maintained via a convenient admin panel and made available in the frontend as a designed web view or as a downloadable PDF.

## 🛠 Tech Stack

### Backend
* **Python & Django:** Core framework.
* **Django REST Framework (DRF):** API for communication with the frontend.
* **Django Jazzmin:** Modern, responsive theme for the admin panel.
* **Pillow:** Image processing for profile photos.
* **SQLite:** Default database (lightweight, no configuration required).

### Frontend
* **React & TypeScript:** UI logic and type safety.
* **Vite:** Fast build tool and dev server.
* **Styled Components:** CSS-in-JS for modular styling.
* **html2pdf.js:** Client-side PDF generation.
* **Nginx:** Production web server for the frontend.

### Infrastructure
* **Docker & Docker Compose:** Containerization and orchestration.

---

## 🚀 Quick Start with Docker

The easiest way to get the project running is using Docker.

---

### 1. Prerequisites

- Docker Desktop installed and running

---

### 2. Start the Application

Clone the repository and run:

```bash
docker-compose up --build
```

---

### 3. Initialize the Backend

Open a new terminal and run the following commands to set up the database and create an admin user:

```bash
# Run migrations
docker exec -it cv-manager python manage.py migrate

# Create admin user
docker exec -it cv-manager python manage.py createsuperuser
```

---

### 4. Access the Project

- **Frontend:** http://localhost:5173  
- **Backend Admin:** http://localhost:8000/admin

---

## 🛠 Manual Installation (Development)

If you prefer to run the services locally without Docker:

---

### Backend (Django)

```bash
cd backend

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
# or: uv pip sync

python manage.py migrate
python manage.py runserver
```

---

### Frontend (React)

```bash
cd frontend

npm install
npm run dev
```

---

## 📂 Project Structure

```text
cv-manager/
├── backend/                # Django backend
│   ├── cv_app/             # Business logic & Models
│   ├── manage.py           # Django CLI
│   └── Dockerfile          # Multi-stage build (uv + python-alpine)
├── frontend/               # React frontend
│   ├── src/                # UI Components & Hooks
│   ├── Dockerfile          # Multi-stage build (Node + Nginx)
│   └── nginx.conf          # Nginx proxy configuration
├── docker-compose.yaml     # Orchestration for both services
└── README.md
```

---

## 📖 Key Configuration Note (CSRF & CORS)

When running in Docker, the frontend (Nginx) acts as a reverse proxy.  
To ensure the login works correctly, the following settings are pre-configured:

- Nginx forwards requests from  
  `http://localhost:5173/api-token-auth/` → backend
- Django allows `http://localhost:5173` in `CSRF_TRUSTED_ORIGINS`

---

## 🖨 Usage

- **Admin:** Log in at `/admin` and add your work experience and skills  
- **View:** Open the frontend to see the generated CV  
- **Export:** Use the **Download PDF** button to trigger the `html2pdf.js` generation
