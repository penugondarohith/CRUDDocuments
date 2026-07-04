📌 Project Overview

The **Student Management System** is a full-stack web application designed to manage student records efficiently. It enables users to **Create, Read, Update, Delete (CRUD), and Search** student information through a responsive React interface backed by an Express.js server and MongoDB database.

The frontend communicates with the backend using REST APIs, while MongoDB stores and manages student records. The application demonstrates full-stack development concepts including API integration, database connectivity, and state management.

---

# ✨ Features

* ➕ Add new student records
* 📋 View all students
* ✏️ Edit existing student details
* 🗑️ Delete student records
* 🔍 Search students by name, email, or grade
* 📱 Responsive user interface
* 🔄 Real-time data updates
* 🌐 RESTful API integration
* 🗄️ MongoDB database connectivity
* ⚡ Fast development with React + Vite

---

# 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS

### Development Tools

* npm
* ESLint
* Nodemon

---

# 📂 Project Structure

```text
CRUDDocuments/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── StudentCard.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── Student.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/penugondarohith/CRUDDocuments.git
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Start the backend server:

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

### 4. MongoDB

Ensure MongoDB is running locally.

Default connection:

```text
mongodb://127.0.0.1:27017/studentDB
```

You can also configure the `MONGODB_URI` environment variable to use a different MongoDB instance.

---

# ▶️ Usage

* Launch the frontend application.
* Add new student records.
* Search students by name, email, or grade.
* Update student information.
* Delete records when necessary.
* The application automatically refreshes the student list after each operation.

---

# 📷 Application Preview

Add screenshots of the application here.

### 🏠 Home Page

Displays the complete list of student records with search functionality.

### ➕ Add Student

Form for creating a new student record.

### ✏️ Update Student

Edit existing student information.

### 🔍 Search Students

Filter students dynamically using the search bar.

---

# 📈 Key Functionalities

The application provides:

* Complete CRUD operations for student management.
* Efficient student search functionality.
* Dynamic UI updates without page reloads.
* Backend API for executing MongoDB operations.
* Simple and responsive user experience.

---

# 🚀 Future Enhancements

* 🔐 User authentication and authorization
* 👤 Role-based access control (Admin/User)
* 📄 Student profile pages
* 📤 Import/Export student data (Excel/CSV)
* 📊 Student analytics dashboard
* ☁️ Deploy backend using Render or Railway
* 🌐 Deploy frontend using Vercel or Netlify
* 🔍 Advanced filtering and sorting
* 📱 Mobile-responsive improvements
* 📝 Activity logs and audit history
