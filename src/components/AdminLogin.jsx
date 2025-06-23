import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminLoginStyle.css';

/**
 * Composant de connexion administrateur
 * @component
 * @param {Object} props
 * @param {Function} props.onLogin - Callback appelé lors de la connexion réussie
 * @returns {JSX.Element} formulaire de connexion admin
 */
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password
      });

      if (response.data.success) {
        // Store admin token
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', username);
        toast.success('Connexion administrateur réussie !');
        onLogin(response.data.token);
      } else {
        toast.error('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion admin:', error);
      toast.error('Erreur de connexion administrateur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Entrez votre mot de passe"
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
