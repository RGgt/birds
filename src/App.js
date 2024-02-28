import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import BirdsList from './pages/BirdsList';
import LoginPage from './pages/LoginPage';
import { isLoggedIn, logout } from './api/AuthService';
import BirdDetail from './pages/BirdDetail';
import BirdView from './pages/BirdView';

/**
 * Display header
 * @returns 
 */
const Header = () => {
  const handleLogout = () => {
    logout(); // Call the logout function
    window.location.reload(); // Reload the page after logout
  };

  return (
    <header className="bg-dark text-white py-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/birds" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Birds App</h1>
        </Link>
        {isLoggedIn() && (
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </header>
  );
};


/**
 * Footer of the site
 * @returns 
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <p>&copy; 2024 Birds App</p>
      </div>
    </footer>
  );
};

/**
 * Routing
 * @returns 
 */
const App = () => {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/birds" element={isLoggedIn() ? <BirdsList /> : <Navigate replace to="/login" />} />
            <Route path="/bird/new" element={isLoggedIn() ? <BirdDetail /> : <Navigate replace to="/login" />} />
            <Route path="/bird/:id" element={isLoggedIn() ? <BirdView /> : <Navigate replace to="/login" />} />
            <Route path="/bird/:id/edit" element={isLoggedIn() ? <BirdDetail /> : <Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate replace to="/birds" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
