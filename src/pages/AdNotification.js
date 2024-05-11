import React from 'react'
import Template2 from '../components/Template2'
import add_noti from "../assests/add_noti.jpg"
import view_noti from "../assests/view_noti.jpg"

export default function AdNotification(){
   
    return(
        <div className='flex flex-col items-center text-white  h-full gap-y-16 '>
      <div className='pt-[3rem] text-6xl'>MENU-SECTION</div>
      <div className='flex justify-center  gap-x-16 text-4xl'>
      <Template2
        img = {view_noti}
        desc="Click here to view Notifications"
        link = "/notification"
        name = "CLICK"   
    />      

    <Template2
        img = {add_noti}
        desc="Click here to add Notification"
        link = "/menuw"
        name = "CLICK"   
    />    
    </div>
    </div>

    )
}
