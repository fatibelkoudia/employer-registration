import React from "react";
import PropTypes from "prop-types";
import "./UserListStyle.css";

/**
 * UserList displays a list of registered users.
 *
 * @component
 * @param {Object[]} users - Array of user objects.
 * @returns {JSX.Element} The rendered user list.
 */
function UserList({ users }) {
  if (!users.length) return null;

  return (
    <div className="user-list">
      <h3>Liste des inscrits :</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName} – {user.email} – {user.birthDate} –{" "}
            {user.city} – {user.postalCode}
          </li>
        ))}
      </ul>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserList;
