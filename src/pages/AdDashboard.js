import React from 'react'
import { Link} from 'react-router-dom';
import Template2 from '../components/Template2'
import profile from "../assests/profile.jpg"
import menu from "../assests/menu.jpg"
import notification from "../assests/notification.jpg"
import complaint from "../assests/complaint.jpg"
import bill from "../assests/bill.jpg"
import user from "../assests/user.jpg"

const Dashboard = () => {
  return (
    <div className='bg-richblack-900'>
      
    <div className='flex flex-col items-center mt-[4rem] text-white w-11/12 max-w-[1160px] py-4 mx-auto gap-y-16'>
        
    <div className='flex justify-center  gap-x-16 text-4xl w-full min-h-[10rem]'>
    <Template2
    img = {profile}
    title="PROFILE SECTION"
    desc="Click to Check And Edit Your Profile"
    link = "/profile"
    name = "CLICK"   
    />      

    <Template2
    img = {user}
    title="USER SECTION"
    desc="You can view  all users and download CSV file"
    link = "/adusers"
    name = "CLICK"   
    /> 


    <Template2
    img = {menu}
    title="MENU SECTION"
    desc="Click Here To Check , Add and Update  Menu"
    link = "/admenu"
    name = "CLICK"   
    />   
    
    </div>
    
    </div>
    <div className='flex flex-col items-center text-white   w-11/12 max-w-[1160px] py-4 mx-auto gap-y-16 mt-[4rem]'>
        
        <div className='flex justify-center  gap-x-16 text-4xl w-full min-h-[10rem] t-[10rem]'>
        <Template2
        img = {notification}
        title="NOTIFICATION MENU"
        desc=" Notifications Are Added Here"
        link = "/adnotification"
        name = "CLICK"   
        /> 

        <Template2
        img = {complaint}
        title="COMPALINT SECTION"
        desc="Click Here To View Complaint"
        link = "/adcomplaint"
        name = "CLICK"   
        />      
    
        <Template2
        img = {bill}
        title="BILL SECTION"
        desc="Click Here To Add & Check Bill"
        link = "/adbill"
        name = "CLICK"   
        />   
        
      </div>    
    </div>
   
  </div>
    
  )
}

export default Dashboard