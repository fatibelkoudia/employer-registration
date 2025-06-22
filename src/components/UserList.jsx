import React from "react";
import PropTypes from "prop-types";
import "./UserListStyle.css";

/**
 * Affiche la liste des utilisateurs inscrits
 * @component
 * @param {Object[]} users - tableau des utilisateurs
 * @returns {JSX.Element} tableau des utilisateurs
 */
function UserList({ users }) {
  if (!users.length) return null;

  return (
    <div className="user-list">
      <h3>Liste des inscrits</h3>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date de naissance</th>
            <th>Ville</th>
            <th>Code postal</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map(
              (user, index) =>
                user && (
                  <tr key={index}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.birthDate}</td>
                    <td>{user.city}</td>
                    <td>{user.postalCode}</td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserList;
