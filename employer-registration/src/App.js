import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from './components/UserForm';
import UserList from "./components/UserList";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users")
      .then(response => {
        setUsers(response.data.utilisateurs);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <UserForm users={users} setUsers={setUsers} />
      <UserList users={users} />
    </>
  );
}
