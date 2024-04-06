import React from 'react'
import { Link} from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4rem] mt-10 w-11/12 max-w-[1080px] mx-auto'>
        <div className ="w-full min-h-[10rem] relative cursor-pointer border-2 mt-[5rem] p-12 bg-richblack-800 rounded-full hover:scale-105 transition-all duration-200">
          {/* <!--text part--> */}
          <div>
            <h3 className ="font-mullish font-bold text-lightBlue500 leading-[1.2] text-[1.375rem]">  Profile</h3>
            <p className ="font-mullish text-white mt-6">Here You can see your Profile</p>  
          </div>
          <div className ="font-mullish font-bold text-lightBlue500 group-hover:text-grayBlue transition-all duration-200 mt-6">
          <Link to = "/Profile">Know More</Link>
          </div>
        </div>

        {/* menu */}
        <div className ="w-full min-h-[10rem] relative cursor-pointer border-2 mt-[5rem] p-12 bg-richblack-800 rounded-full hover:scale-105 transition-all duration-200">
          {/* <!--text part--> */}
          <div>
            <h3 className ="font-mullish font-bold text-lightBlue500 leading-[1.2] text-[1.375rem]"> Menu</h3>
            <p className ="font-mullish text-white mt-6">Here You can see your daily and Weekly Menu</p>  
          </div>
          <div className ="font-mullish font-bold text-lightBlue500 group-hover:text-grayBlue transition-all duration-200 mt-6">
          <Link to = "/Menu">Know More</Link>
          </div>
        </div>

        {/* notification */}
        <div className ="w-full min-h-[10rem] relative cursor-pointer border-2 mt-[5rem] p-12 bg-richblack-800 rounded-full hover:scale-105 transition-all duration-200">
          {/* <!--text part--> */}
          <div>
            <h3 className ="font-mullish font-bold text-lightBlue500 leading-[1.2] text-[1.375rem]">Notifications</h3>
            <p className ="font-mullish text-white mt-6">All the notifications regarding time and menu is updated here</p>  
          </div>
          <div className ="font-mullish font-bold text-lightBlue500 group-hover:text-grayBlue transition-all duration-200 mt-6">
          <Link to = "/Notification">Know More</Link>
          </div>
        </div>

        {/* complaint */}
        <div className ="w-full min-h-[10rem] relative cursor-pointer border-2 mt-[0.5rem] p-12 bg-richblack-800 rounded-full hover:scale-105 transition-all duration-200">
          {/* <!--text part--> */}
          <div>
            <h3 className ="font-mullish font-bold text-lightBlue500 leading-[1.2] text-[1.375rem]">Complaint & Suggestions</h3>
            <p className ="font-mullish text-white mt-6">You can complaint about food and workers here.</p>  
          </div>
          <div className ="font-mullish font-bold text-lightBlue500 group-hover:text-grayBlue transition-all duration-200 mt-6">
          <Link to = "/Complaint">Know More</Link>
          </div>
        </div>

        {/* bill */}
        <div className ="w-full min-h-[10rem] relative cursor-pointer border-2 mt-[0.5rem] p-12 bg-richblack-800 rounded-full hover:scale-105 transition-all duration-200">
          {/* <!--text part--> */}
          <div>
            <h3 className ="font-mullish font-bold text-lightBlue500 leading-[1.2] text-[1.375rem]">Bill Section</h3>
            <p className ="font-mullish text-white mt-6">Your monthly bill is updated here containg regular and extra bill.</p>  
          </div>
          <div className ="font-mullish font-bold text-lightBlue500 group-hover:text-grayBlue transition-all duration-200 mt-6">
          <Link to = "/Bill">Know More</Link>
          </div>
        </div>


        <div className ="w-full min-h-[10rem] relative cursor-pointer border-2 mt-[1rem] p-12 bg-richblack-800 rounded-full hover:scale-105 transition-all duration-200">
          {/* <!--text part--> */}
          <div>
            <h3 className ="font-mullish font-bold text-lightBlue500 leading-[1.2] text-[1.375rem]">Home Page</h3>
            <p className ="font-mullish text-white mt-6">GO TO</p>  
          </div>
          <div className ="font-mullish font-bold text-lightBlue500 group-hover:text-grayBlue transition-all duration-200 mt-6">
          <Link to = "/">HOME PAGE</Link>
          </div>
        </div>
        
    </div>
  )
}

export default Dashboard