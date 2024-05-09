import React from 'react'
import Template2 from '../components/Template2'
import today from "../assests/today.jpg"
import week from "../assests/week.jpg"
import update_menu from "../assests/update_menu.jpg"
import addmenu from "../assests/addmenu.jpg"


const AdMenu = ({isLoggedIn}) => {
  return (
    <div classname = "bg-richblack-900 w-full max-h-full min-h-screen">
      <div className='flex flex-col items-center text-white w-11/12 max-w-[1160px] py-4 mx-auto  h-full gap-y-16 '>
        <div className='pt-[3rem] text-6xl'>MENU-SECTION</div>
        <div className='flex flex-col gap-y-16 mt-[2rem]'>
        <div className='flex justify-center  gap-x-16 text-4xl '>
        <Template2
        img = {today}
        title="TODAY'S MENU"
        desc="Click to Check today's menu"
        link = "/menut"
        name = "CLICK"   
        />      

        <Template2
        img = {week}
        title="WEEK'S MENU"
        desc="Check Whole Week's Menu"
        link = "/menuw"
        name = "CLICK"   
        />    

      </div>

      <div className='flex justify-center  gap-x-16 text-4xl mt-[3rem]'>
      <Template2
        img = {addmenu}
        title="ADD MENU"
        desc="Click to Add menu"
        link = "/addmenu"
        name = "CLICK"   
      />      
 

      <Template2
        img = {update_menu}
        title="UPDATE MENU"
        desc="Click here to"
        link = "/menu_update"
        name = "CLICK"   
       />

      </div>
      </div>
      

    </div>
    </div>
  )
}

export default AdMenu