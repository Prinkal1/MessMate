import React from 'react'
import logo from "../assests/logo.png"
import {Link,NavLink} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    
        // let isLoggedIn = props.isLoggedIn;
        // let setIsLoggedIn = props.setIsLoggedIn;
    
      return (
        <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
    
            <Link to="/"> 
                <img src={logo} alt="Logo" width={100} height={14} loading="lazy"/>
            </Link>
    
            {token !== null && user.accountType === "Student" && (
                <nav>
                    <ul className='text-richblack-100 flex gap-x-9'>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                    
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/attendance">Attendance</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/messoff">MessOff</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <Link to="/suggestion">Suggestion</Link>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/menu">Menu</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/complaint">Complaint</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <Link to="/Bill">Bill Section</Link>
                        </li>
                    </ul>
                </nav>
            )}

            {token !== null && user.accountType === "Admin" && (
                <nav>
                    <ul className='text-richblack-100 flex gap-x-9'>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/addashboard">Dashboard</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/adattendance">Attendance</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/admessoff">Mess Off</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/adsuggestion">Suggestion</NavLink>
                        </li>
                        
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/admenu">Menu</NavLink>
                        </li>
                       
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <NavLink to="/adcomplaint">Complaint</NavLink>
                        </li>
                        <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                            px-[12px] rounded-[8px] border border-richblack-700'>
                            <Link to="/adbill">Bill Section</Link>
                        </li>
                    </ul>
                </nav>
            )}
    
            {/* Login - SignUp - LogOut - Dashboard */}
            <div className='flex items-center gap-x-4'>
                { token === null &&
                    <Link to="/login">
                        <button className="border-none text-white bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500  rounded-full bg-[length:100%_auto] font-inherit text-[17px] py-2.5 px-6">
                            Log in
                        </button>
                    </Link>
                }
                { token === null &&
                    <Link to="/signup">
                        <button className="border-none text-white bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500  rounded-full bg-[length:100%_auto] font-inherit text-[17px] py-2.5 px-6">
                            Sign up
                        </button>
                    </Link>
                }
                { token !== null &&
                    <Link to="/">
                        <button 
                        onClick={() => {
                            dispatch(logout(navigate))
                        }}
                        className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                            Log Out
                        </button>
                    </Link>
                }
                
            </div>
          
        </div>
      )
    
}


export default Navbar
