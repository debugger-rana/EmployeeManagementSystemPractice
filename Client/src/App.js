import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Attendance from './pages/Attendance';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Reports from './pages/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.loading}>
        <div>Loading EMS Lite...</div>
      </div>
    );
  }

  return (
    <div className="App" style={styles.app}>
      {user && <Navbar />}
      <main style={user ? styles.mainWithNavbar : styles.mainWithoutNavbar}>
        <Routes>
          <Route path="/reports" 
          element={<Reports />} />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Employees />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departments" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Departments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    fontFamily: 'var(--font-family)',
  },
  loading: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-medium)',
  },
  mainWithNavbar: {
    paddingTop: 'var(--space-16)',
  },
  mainWithoutNavbar: {
    paddingTop: 'var(--space-8)',
  },
};

export default App;