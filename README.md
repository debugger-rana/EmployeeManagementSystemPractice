# Employee Management System Practice

A full-stack Employee Management System (HRMS Lite) built with React and Node.js, featuring employee management, authentication, and API documentation.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [License](#license)

## 🌟 Overview

This is a practice project for building a complete Employee Management System with modern web technologies. The application follows a client-server architecture with a React frontend and Express. js backend, using SQLite as the database.

## ✨ Features

- **Employee Management**
  - Add, view, update, and delete employee records
  - Employee profile management
  
- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Google OAuth integration
  
- **Security**
  - Protected routes with middleware
  - Secure password storage
  - JWT token validation
  
- **API Documentation**
  - Interactive Swagger UI documentation
  - Complete API endpoint reference
  
- **Automated Tasks**
  - Scheduled jobs using node-cron

## 🛠 Tech Stack

### Frontend
- **React** (v18.2.0) - UI library
- **React Router DOM** (v6.15.0) - Client-side routing
- **Axios** (v1.5.0) - HTTP client
- **React Icons** (v5.5.0) - Icon library

### Backend
- **Node.js** with **Express** (v4.18.2) - Server framework
- **Sequelize** (v6.37.7) - ORM for database operations
- **SQLite3** (v5.1.7) - Lightweight database
- **JWT** (jsonwebtoken v9.0.0) - Authentication tokens
- **bcryptjs** (v2.4.3) - Password hashing
- **Google Auth Library** (v10.5.0) - OAuth integration
- **Swagger** - API documentation
  - swagger-jsdoc (v6.2.8)
  - swagger-ui-express (v4.6.2)
- **node-cron** (v3.0.2) - Task scheduling
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.0.3) - Environment variable management

### Development Tools
- **Nodemon** (v2.0.22) - Auto-restart server during development

## 📁 Project Structure

```
EmployeeManagementSystemPractice/
├── Client/                    # React frontend
│   ├── public/               # Static files
│   ├── src/                  # React components and source code
│   ├── build/                # Production build
│   └── package.json          # Frontend dependencies
│
├── Server/                    # Express backend
│   ├── config/               # Configuration files
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Sequelize models
│   ├── routes/               # API routes
│   ├── server.js             # Server entry point
│   ├── database.sqlite       # SQLite database
│   └── package.json          # Backend dependencies
│
├── . env                       # Environment variables
└── package.json               # Root package configuration
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed: 

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Git** (for cloning the repository)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/debugger-rana/EmployeeManagementSystemPractice.git
   cd EmployeeManagementSystemPractice
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd Server
   npm install
   cd ..
   ```

4. **Install client dependencies**
   ```bash
   cd Client
   npm install
   cd ..
   ```

## ⚙️ Configuration

1. **Create environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   
   # Google OAuth (if using)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Database
   DB_PATH=./Server/database.sqlite
   ```

2. **Database Setup**
   
   The SQLite database will be automatically created when you first run the server.  Sequelize will handle the database migrations and schema creation.

## 🏃 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd Server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd Client
   npm start
   ```
   The React app will start on `http://localhost:3000`

### Production Mode

1. **Build the React app**
   ```bash
   cd Client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd Server
   npm start
   ```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation: 

- **Swagger UI**:  `http://localhost:5000/api-docs`

The Swagger documentation provides:
- Complete list of all API endpoints
- Request/response schemas
- Interactive testing interface
- Authentication requirements for each endpoint

## 🔐 Authentication Flow

1. User registers with credentials
2. Password is hashed using bcrypt
3. User logs in with credentials
4. Server generates JWT token
5. Client stores token (localStorage/sessionStorage)
6. Protected routes require valid JWT token in request headers

## 🤝 Contributing

This is a practice project.  Feel free to fork and modify it for your own learning purposes. 

## 📄 License

ISC License

---

**Note**: This is a practice/learning project. For production use, consider adding:
- Input validation and sanitization
- Rate limiting
- Enhanced error handling
- Logging mechanisms
- Unit and integration tests
- Database migrations
