import logo from './logo.svg';
import React, {useState} from 'react'; 
import UserForm from './components/UserForm';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return(
  <>  
 <ToastContainer position="top-center" autoClose={3000} />
      <UserForm />
  </>
  )
  



}

export default App;
