# NoteApp - Full Stack Application

This README provides information about the NoteApp application, a full-stack project built with Django (backend) and React (frontend). The frontend communicates with the backend via a RESTful API.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Backend (Django)](#backend-django)
  - [Models](#models)
  - [API Endpoints](#api-endpoints)
  - [Setup and Installation](#setup-and-installation-backend)
  - [Running the Backend Server](#running-the-backend-server)
- [Frontend (React with Vite & TypeScript)](#frontend-react-with-vite--typescript)
  - [Features](#features-frontend)
  - [Setup and Installation](#setup-and-installation-frontend)
  - [Running the Frontend Application](#running-the-frontend-application)
- [API Communication](#api-communication)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Overview

NoteApp is a simple application that allows users to create, read, update, and delete notes. The backend, built with Django, provides the data persistence and API endpoints. The frontend, built with React, Vite, and TypeScript, handles user interaction, displaying the notes, and making requests to the backend API.

## Technologies Used

- **Backend:**
  - Python 3.x
  - Django (Web Framework)
  - Django REST framework (for API)
  - SQLite (default database - can be configured for PostgreSQL, MySQL, etc.)
- **Frontend:**
  - React (JavaScript Library for building UIs)
  - TypeScript (Superset of JavaScript for static typing)
  - Vite (Next Generation Frontend Tooling)
  - Axios (for making HTTP requests to the API)
  - HTML
  - CSS (or a CSS preprocessor like Sass/Less)
- **Other:**
  - Git (Version Control)
  - Node.js & npm/yarn (Package Managers)

## Project Structure

NoteApp/
├── backend/ # Django Backend
│ ├── note_app/ # Django Project
│ │ ├── init.py
│ │ ├── asgi.py
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── notes/ # Django App for notes
│ │ ├── init.py
│ │ ├── admin.py # (Optional) Admin interface customization
│ │ ├── models.py # Defines the Note model
│ │ ├── serializers.py # Defines serializers for API
│ │ ├── urls.py # API endpoint URL configurations
│ │ ├── views.py # API view logic
│ │ └── tests.py # (Optional) Tests
│ ├── requirements.txt # Python dependencies
│ └── manage.py # Django management script
└── frontend/ # React Frontend
├── public/ # Static assets
├── src/ # Source code
│ ├── components/ # Reusable React components
│ ├── api/ # API interaction logic (e.g., Axios calls)
│ ├── models/ # Typescript interfaces for models.
│ ├── App.tsx # Main application component
│ ├── main.tsx # Entry point
│ ├── App.css # Styles
│ └── ... # Other components, hooks, utils
├── index.html # HTML entry point
├── package.json # Frontend dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration

## Backend (Django)

### Models used in this project

The core data model is defined in `backend/notes/models.py`:

````python
from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

  ##API Endpoints
The backend provides the following API endpoints (assuming the API is routed under /api/):

GET /api/notes/ - List all notes.
POST /api/notes/ - Create a new note. Requires title and content in the request body.
GET /api/notes/<pk>/ - Retrieve a single note by its primary key (pk).
PUT /api/notes/<pk>/ or PATCH /api/notes/<pk>/ - Update a note. Requires title and/or content in the request body. Use PUT for full update, and PATCH for partial updates.
DELETE /api/notes/<pk>/ - Delete a note.
These endpoints would be implemented in backend/notes/views.py using Django REST Framework's APIView or ModelViewSet classes, and in backend/notes/serializers.py using DRF's serializers.  The urls.py files in both the project and the notes app define the routing.

Setup and Installation (Backend)


1. Clone the repository:
   ```bash
  git clone https://github.com/cwalton133/NoteAPP_FullStack_Application.git

   cd noteapp_backend/


Create a virtual environment:

python -m venv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`

Install dependencies:
pip install -r requirements.txt

Set up the database:

Configure your database settings in settings.py.
Apply database migrations:


Run migrations:
python backend/manage.py migrate

Create a superuser for admin access:
python backend/manage.py createsuperuser

Follow the prompts to set a username, email, and password.


Running the Backend Server
Start the development server:

python noteapp_backend/manage.py runserver

Access the application at http://127.0.0.1:8000/.

The backend will typically be running at http://127.0.0.1:8000/ by default.  The API endpoints will usually be accessible under the /api/ path (e.g., http://127.0.0.1:8000/api/notes/).


Frontend (React with Vite & TypeScript)
Features (Frontend)
Display a list of notes.
Create new notes.
View the details of a specific note.
Update existing notes.
Delete notes.
Error handling for API requests.
(Optional) Basic styling
(Optional) Search/Filtering notes
(Optional) Sorting notes

Setup and Installation (Frontend)
Navigate to the frontend directory:

cd noteapp_frontend/

Install frontend dependencies:

npm install  # or yarn install

Running the Frontend Application
Start the development server:

npm run dev  # or yarn dev

Vite will start a development server, typically accessible at http://localhost:5173/ or a similar address.  The application will automatically reload when you make changes to the code.

API Communication
The frontend uses Axios (or a similar library) to communicate with the backend API.  Examples of API calls would look like this (written in TypeScript):

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // or your backend's address

// Example: Fetch all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error; // Re-throw to be handled by the calling component
  }
};

// Example: Create a new note
export const createNote = async (title: string, content: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notes/`, { title, content });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Example: Update a note
export const updateNote = async (id: number, title: string, content: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notes/${id}/`, { title, content });
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Example: Delete a note
export const deleteNote = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/notes/${id}/`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

The frontend components (e.g., in src/components/) would call these functions to interact with the API.
Error handling (e.g., displaying error messages to the user) should be implemented in the frontend.  Consider adding loading states while API requests are in progress.

##Project Deployment

Backend Deployment:
Consider using a platform like Heroku, AWS Elastic Beanstalk, Google Cloud Platform (GCP), or DigitalOcean to deploy your Django backend.
Configure a production database (e.g., PostgreSQL, MySQL) instead of SQLite.
Set DEBUG = False in your settings.py file for production.
Collect static files: python backend/manage.py collectstatic and configure your deployment platform to serve them.

Frontend Deployment:
Build the frontend for production: npm run build (or yarn build). This will create a dist folder containing optimized static assets.
Deploy the dist folder (or the appropriate folder generated by your build process) to a static hosting service like Netlify, Vercel, GitHub Pages, or AWS S3.
Ensure your frontend application knows the correct URL of your deployed backend. Consider using environment variables.


## Future Improvements
1. User Authentication and Authorization: Implement user accounts, login/logout functionality, and permissions. Consider using Django's built-in authentication or a third-party package like django-rest-auth or dj-rest-auth.


2. Advanced Filtering and Search: Add features to filter and search notes based on various criteria (e.g., keywords, date range, author).

3. Rich Text Editor: Use a rich text editor (e.g., Quill, Draft.js, CKEditor) to allow users to format their note content.

4. Tags/Categories: Implement tags or categories to organize notes.

5. Testing: Write comprehensive unit and integration tests for both the backend (using Django's testing framework) and the frontend (using Jest, React Testing Library, or Cypress).

6. Continuous Integration/Continuous Deployment (CI/CD): Set up a CI/CD pipeline to automate the build, test, and deployment processes.

7. Improved Styling and UI/UX: Enhance the visual design and user experience.

8. More Robust Error Handling: Improve the error handling in both the frontend and backend to provide better feedback to the user.

9. Performance Optimization: Optimize the application for performance, especially if the number of notes grows. This might involve database indexing, caching, and code optimizations.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

##Fork the repository.
Create a new branch for your feature or bug fix.
 (git checkout -b feature/YourFeature).
Make your changes and commit them with clear and concise commit messages. (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Submit or Open a pull request.

License
This project is licensed under the MIT License.

Contact
For any questions or feedback, please contact:

Charles Walton - cwalton1335@gmail.com
GitHub: cwalton133
Thank you for checking out the Products Application!

````
