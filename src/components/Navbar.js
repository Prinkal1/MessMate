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
    
        // let isLoggedIn = props.isLoggedIn;
        // let setIsLoggedIn = props.setIsLoggedIn;
    
      return (
        <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
    
            <Link to="/"> 
                <img src={logo} alt="Logo" width={100} height={14} loading="lazy"/>
            </Link>
    
            <nav>
                {
                    token !== null &&
                    <ul className='text-richblack-100 flex gap-x-9'>
                    <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                        <NavLink to="/notification">Notification</NavLink>
                    </li>
                    <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                        <Link to="/Bill">Bill Section</Link>
                    </li>
                    <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                        <NavLink to="/menu">Menu</NavLink>
                    </li>
                    <li className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                        <NavLink to="/complaint">Complaint</NavLink>
                    </li>
                </ul>
                }
                
            </nav>
    
            {/* Login - SignUp - LogOut - Dashboard */}
            <div className='flex items-center gap-x-4'>
                { token === null &&
                    <Link to="/login">
                        <button className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
                            Log in
                        </button>
                    </Link>
                }
                { token === null &&
                    <Link to="/signup">
                        <button  className='bg-richblack-800 text-richblack-100 py-[8px] 
                        px-[12px] rounded-[8px] border border-richblack-700'>
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
