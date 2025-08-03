import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AddLink from './pages/AddLink';
import EditLink from './pages/EditLink';

function App() {
  // For now, simple auth check - you'll connect this to your backend later
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/signin" 
            element={!isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/add-link" 
            element={isAuthenticated ? <AddLink /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/edit-link/:id" 
            element={isAuthenticated ? <EditLink /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;