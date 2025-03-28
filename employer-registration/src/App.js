import React, { useState } from "react";
import UserForm from './components/UserForm';
import UserList from "./components/UserList";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("registeredUsers");
    return saved ? JSON.parse(saved) : [];
  });
  return(
<>
  <ToastContainer position="top-center" autoClose={3000} />
  <UserForm users={users} setUsers={setUsers} />
  <UserList users={users} />
</>
  )


}


