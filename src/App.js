import React from 'react'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const App = () => {
  return (
    <div>
    <ToastContainer />
    <Navbar/>
    <Dashboard/>
    </div>
  )
}
export default App
