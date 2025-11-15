# Employee Management System (HRMS Lite)

A full-stack Employee Management System built with React and Node.js/Express, featuring authentication, attendance tracking, and department management.

## 🚀 Features

- **User Authentication** - Secure login and registration with JWT tokens
- **Dashboard** - Overview of employee statistics and information
- **Attendance Management** - Track employee attendance with automated daily rollover
- **Department Management** - Organize employees by departments
- **Employee Management** - Add, view, and manage employee records
- **Automated Attendance History** - Daily cron job to archive attendance records

## 🛠️ Tech Stack

### Frontend (Client)
- **React** 18.2.0
- **React Router DOM** 6.15.0 - For routing
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library

### Backend (Server)
- **Node.js** with **Express** 4.18.2
- **SQLite** with **Sequelize** ORM
- **JWT** (jsonwebtoken) - Authentication
- **bcryptjs** - Password hashing
- **node-cron** - Scheduled tasks for attendance rollover
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
EmployeeManagementSystemPractice/
├── Client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React context for state management
│   │   ├── pages/         # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Attendance.js
│   │   │   ├── Departments.js
│   │   │   └── Employees.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── Server/                 # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Sequelize models
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── AttendanceHistory.js
│   │   └── Department.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── departmentRoutes.js
│   ├── server.js          # Entry point
│   └── package.json
│
└── .env                   # Environment variables
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/debugger-rana/EmployeeManagementSystemPractice.git
cd EmployeeManagementSystemPractice
```

### 2. Setup Environment Variables
Create or update the `.env` file in the root directory:
```env
JWT_SECRET=your_super_secret_key_here_make_it_long_and_random
PORT=5000
```

### 3. Install Backend Dependencies
```bash
cd Server
npm install
```

### 4. Install Frontend Dependencies
```bash
cd ../Client
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd Server
npm start
# Or for development with auto-reload:
npm run dev
```
The server will run on `http://localhost:5000`

### Start the Frontend Client
```bash
cd Client
npm start
```
The client will run on `http://localhost:3000`

The React app is configured to proxy API requests to `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance` - Update attendance

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create a new department
- `PUT /api/departments/:id` - Update a department
- `DELETE /api/departments/:id` - Delete a department

## ⚙️ Features Details

### Automated Attendance Rollover
The system includes a cron job that runs daily at midnight (00:00) to:
1. Move present attendance records to the attendance history
2. Reset current day's attendance status to 'absent'

This ensures proper tracking of historical attendance data.

## 🔐 Security Features
- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes with middleware
- CORS configuration for secure cross-origin requests

## 📝 Development

### Backend Scripts
```bash
npm start     # Start the server
npm run dev   # Start with nodemon for development
```

### Frontend Scripts
```bash
npm start     # Start development server
npm build     # Build for production
npm test      # Run tests
```

## 🗄️ Database
The application uses SQLite with Sequelize ORM. The database file `database.sqlite` is automatically created in the Server directory when you first run the application.

## 🤝 Contributing
Feel free to fork this repository and submit pull requests for any improvements.

## 📄 License
ISC

## 👨‍💻 Author
debugger-rana

---

For any questions or issues, please open an issue on GitHub.
