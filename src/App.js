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
import Menut from "./pages/Menut"
import Menuw from "./pages/Menuw"
import Profile from "./pages/Profile"
import Bill from "./pages/Bill"
import Suggestion from "./pages/Suggestion"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"
import Settings from "./pages/Settings"
import UpdatePassword from "./pages/UpdatePassword"
import PrivateRoute from "./components/PrivateRoute"
import AdDashboard from "./pages/AdDashboard"
import AdMenu from "./pages/AdMenu"
import AdUsers from "./pages/AdUsers"
import AdComplaint from "./pages/AdComplaint"
import AdNotification from "./pages/AdNotification"
import AdSuggestion from "./pages/AdSuggestion"
import AdBill from "./pages/AdBill"
import Attendance from "./pages/Attendance"
import Menu_update from "./pages/Menu_update";
import AddMenu from "./pages/AddMenu"
import AdAttendance from "./pages/AdAttendance";
import MessOff from "./pages/MessOff"
import AdMessOff from "./pages/AdMessOff"


function App() {
  const [isLoggedIn , setIsLoggedIn] = useState (false);
  return (
    <div className="w-screen min-h-screen max-h-full bg-richblack-900 flex flex-col">
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
         <Route path="/menut" element = {<Menut/> } />
         <Route path="/menuw" element = {<Menuw/> } />
         <Route path="/suggestion" element = {<Suggestion/> } />
        <Route path="/profile" element = {<Profile/> } />
        <Route path="/attendance" element = {<Attendance/> } />
        <Route path="/settings" element = {<Settings/> } />
        <Route path="/messoff" element = {<MessOff/> } />
        <Route path="/Bill" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Bill/>
          </PrivateRoute>
        } />
        <Route path="/forgot-password" element = {<ForgotPassword/>} />
        <Route path="/verify-email" element = {<VerifyEmail/>} />
        <Route path="/update-password/:id" element = {<UpdatePassword/>} />



        {/* for admin */}


        <Route path="/addashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdDashboard/>
          </PrivateRoute>
        } />

        <Route path="/adusers" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdUsers/>
          </PrivateRoute>
        } />

        <Route path="/adattendance" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdAttendance/>
          </PrivateRoute>
        } />

        <Route path="/admenu" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdMenu/>
          </PrivateRoute>
        } />
        <Route path="/admessoff" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdMessOff/>
          </PrivateRoute>
        } />

        <Route path="/adsuggestion" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdSuggestion/>
          </PrivateRoute>
        } />

        <Route path="/adbill" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdBill/>
          </PrivateRoute>
        } />

        <Route path="/adcomplaint" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdComplaint/>
          </PrivateRoute>
        } />

        <Route path="/adnotification" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdNotification/>
          </PrivateRoute>
        } />

        <Route path="/menu_update" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Menu_update/>
          </PrivateRoute>
        } />

        <Route path="/addmenu" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddMenu/>
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
