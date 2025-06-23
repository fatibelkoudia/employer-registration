import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from './components/UserForm';
import UserList from "./components/UserList";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function App() {
  const [users, setUsers] = useState([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }

    // Load users for regular view
    if (!isAdminMode) {
      axios.get(`${API_URL}/users`)
        .then(response => {
          // Check if response has utilisateurs array, otherwise use empty array
          if (response.data && Array.isArray(response.data.utilisateurs)) {
            setUsers(response.data.utilisateurs);
          } else {
            console.warn("API returned unexpected format:", response.data);
            setUsers([]);
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des utilisateurs :", error);
          setUsers([]); // Ensure users is always an array even on error
        });
    }
  }, [API_URL, isAdminMode]);

  const handleAdminLogin = (token) => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminMode(false);
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="app-header">
        <h1>Système d'Inscription</h1>
        <div className="mode-switcher">
          <button 
            onClick={toggleAdminMode}
            className={`mode-btn ${isAdminMode ? 'active' : ''}`}
          >
            {isAdminMode ? 'Mode Utilisateur' : 'Mode Admin'}
          </button>
        </div>
      </div>

      {isAdminMode ? (
        isAdminLoggedIn ? (
          <AdminDashboard 
            users={users} 
            setUsers={setUsers} 
            onLogout={handleAdminLogout}
          />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )
      ) : (
        <>
          <UserForm users={users} setUsers={setUsers} apiUrl={API_URL} />
          <UserList users={users} />
        </>
      )}
    </>
  );
}
