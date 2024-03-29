import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import { useState } from 'react'

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState (false);
  return (
    <div>
      <Navbar isLoggesIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="Login" element = {<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="Signup" element = {<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="Dashboard" element = {<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
