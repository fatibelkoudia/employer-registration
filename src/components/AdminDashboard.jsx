import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminDashboardStyle.css";

/**
 * Tableau de bord administrateur avec gestion des utilisateurs
 * @component
 * @param {Object} props
 * @param {Array} props.users - liste des utilisateurs
 * @param {Function} props.setUsers - met à jour la liste des utilisateurs
 * @param {Function} props.onLogout - callback pour la déconnexion
 * @returns {JSX.Element} interface d'administration
 */
function AdminDashboard({ users, setUsers, onLogout }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const adminToken = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setUsers(response.data.utilisateurs || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
        toast.error("Erreur lors du chargement des utilisateurs");
      }
    };

    fetchUsers();
  }, [API_URL, adminToken, setUsers]);

  const deleteUser = async (userId) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setUsers(users.filter((user) => user.id !== userId));
      setSelectedUser(null);
      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setIsLoading(false);
    }
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    onLogout();
    toast.info("Déconnexion administrateur");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Tableau de bord Administrateur</h2>
        <div className="admin-info">
          <span>
            Connecté en tant que: <strong>{adminUser}</strong>
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="users-list">
          <h3>Liste des utilisateurs ({users.length})</h3>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName || user.first_name}</td>
                    <td>{user.lastName || user.last_name}</td>
                    <td>{user.email}</td>
                    <td className="actions">
                      <button
                        onClick={() => viewUserDetails(user)}
                        className="view-btn"
                      >
                        Voir détails
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="delete-btn"
                        disabled={isLoading}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <div className="user-details">
            <h3>Détails de l'utilisateur</h3>
            <div className="details-content">
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Prénom:</strong>{" "}
                {selectedUser.firstName || selectedUser.first_name}
              </p>
              <p>
                <strong>Nom:</strong>{" "}
                {selectedUser.lastName || selectedUser.last_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Date de naissance:</strong>{" "}
                {selectedUser.birthDate || selectedUser.birth_date}
              </p>
              <p>
                <strong>Ville:</strong> {selectedUser.city}
              </p>
              <p>
                <strong>Code postal:</strong>{" "}
                {selectedUser.postalCode || selectedUser.postal_code}
              </p>
              <p>
                <strong>Date d'inscription:</strong>{" "}
                {selectedUser.created_at || "Non disponible"}
              </p>
            </div>
            <button onClick={() => setSelectedUser(null)} className="close-btn">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
