import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import { useState } from 'react'
import Dashboard from "./pages/Dashboard"
import Complaint from "./pages/Complaint"
import Notification from "./pages/Notification"
import Menu from "./pages/Menu"
import Profile from "./pages/Profile"
import Bill from "./pages/Bill"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState (false);
  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/" element = {<Home isLoggedIn={isLoggedIn}/>}/>
        <Route path="/login" element = {<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="Signup" element = {<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard/>
          </PrivateRoute>
        } />

        <Route path="/complaint" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Complaint/>
          </PrivateRoute>
        } />

        <Route path="/notification" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Notification/>
          </PrivateRoute>
        } />

        <Route path="/menu" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Menu/>
          </PrivateRoute>
        } />

        <Route path="/profile" element = {<Profile/> } />
        <Route path="Bill" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Bill/>
          </PrivateRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;
