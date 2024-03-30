import React from 'react'
import {Link} from "react-router-dom"

const Home = ({isLoggedIn}) => {
  return (
    <div className='flex flex-col items-center text-white text-6xl h-full gap-y-16 '>
      <div className='pt-[13rem]'>Welcome To GNDEC Mess Mate</div>
      <div className='flex justify-center  gap-x-16 '>
            { !isLoggedIn &&
                <Link to="/login">
                    <button className='bg-richblack-800 text-richblack-100 py-[18px] 
                    px-[28px] rounded-[18px] border border-white hover:scale-105 transition-all duration-200'>
                        Log in
                    </button>
                </Link>
            }
            { !isLoggedIn &&
                <Link to="/signup">
                    <button  className='bg-richblack-800 text-richblack-100 py-[18px] 
                    px-[18px] rounded-[18px] border  border-white hover:scale-105 transition-all duration-200'>
                        Sign up
                    </button>
                </Link>
            }
          </div>
    </div>
  )
}

export default Home