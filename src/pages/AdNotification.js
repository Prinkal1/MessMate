import React from 'react'
import Template2 from '../components/Template2'
import today from "../assests/today.jpg"
import week from "../assests/week.jpg"

export default function AdNotification(){
   
    return(
        <div className='flex flex-col items-center text-white  h-full gap-y-16 '>
      <div className='pt-[3rem] text-6xl'>MENU-SECTION</div>
      <div className='flex justify-center  gap-x-16 text-4xl'>
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
    </div>

    )
}
