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

---

## 🚀 Installation & Setup

### Prerequisites
Make sure the following tools are installed:
* [Python](https://www.python.org/) (version 3.10 or newer recommended)
* [Node.js](https://nodejs.org/) (version 16 or newer)
* [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd cv-manager
```

### 2. Set up the backend (Django)

#### Create a virtual environment
```bash
python -m venv venv
```

#### Activate the virtual environment
```bash
source venv/bin/activate
```

#### Install dependencies
```bash
pip install django djangorestframework django-cors-headers django-jazzmin pillow
```

#### Initialize the database
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

#### Create an admin user
```bash
python manage.py createsuperuser
```

### Start the server
```bash
python manage.py runserver
```

Backend: http://127.0.0.1:8000

### 3. Set up the frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## 📖 Usage

### Step 1: Manage data (CMS)
Open http://127.0.0.1:8000/admin  
Create and manage CVs via the admin panel.

### Step 2: View & export résumé
Open http://localhost:5173  
Select a CV and download it as a PDF.

## 📂 Project Structure

```text
cv-manager/
├── backend/                # Django backend
│   ├── cv_app/             # Main app (business logic)
│   │   ├── admin.py        # CMS configuration (list views, filters)
│   │   ├── apps.py         # App configuration
│   │   ├── models.py       # Database structure (CV, WorkExperience, etc.)
│   │   ├── serializers.py  # Converts database objects to JSON
│   │   ├── urls.py         # API routes (e.g. /api/cvs/)
│   │   └── views.py        # API logic (ViewSets)
│   ├── media/              # User uploads (profile images)
│   ├── static/             # Admin assets (fonts, logos, CSS)
│   ├── templates/          # Overridden admin templates
│   ├── manage.py           # Django CLI
│   └── backend/            # Global settings & URLs
│
├── frontend/               # React frontend
│   ├── public/             # Static frontend files
│   ├── src/
│   │   ├── components/     # React components (Login, Resume, Sidebar)
│   │   ├── assets/         # Fonts (Nexa, Recia)
│   │   ├── hooks/          # Custom hooks (useCVLoader)
│   │   └── types.ts        # TypeScript interfaces
│   └── package.json
│
├── .gitignore              # Git ignore rules
└── README.md               # Documentation

```

### Import example CVs
```bash
python manage.py import_cvs
```

## Design Customization

Frontend styles: `src/App.css` and styled components  
Admin styles: `backend/static/css/admin_overrides.css`
