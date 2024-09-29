import React from 'react'
import { useState,useEffect } from "react"
import axios from 'axios';

export default function Notification(){
    const [regNotification, setRegNotification] = useState([]);
    useEffect(()=> {
        const student = JSON.parse(localStorage.getItem("user"));
        const notification = { student: student?._id };
        const fetchNotification = async () => {
          const res = await fetch("http://localhost:4000/pages/fetchNotification");
          const data = await res.json();
          let notifi = data.notifi;
          notifi = notifi.map((notification) => {
            var date = new Date(notification.date);
            notification.date = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            return {
              title: notification.title,
              date: notification.date,
              description: notification.description,
            };
          });
          setRegNotification(data.notifi);
        }
        fetchNotification();
      }, [regNotification.length])
    return(
        <div className='flex flex-col  items-center text-lightBlue bg-richblack-900 h-full '>
            
            <h1 className=' text-4xl hover:scale-105 transition-all duration-200 mt-[1rem]'><b>MESS TIMINGS ARE...!!!</b></h1>
            <div class="grid grid-cols-3 grid-rows-2 gap-4 w-[50rem] max-w-[1080px] mt-[3rem] ">
            {/* <!-- Row 1 --> */}
                <div class="bg-notifi text-deepBlue text-center border p-4 text-3xl hover:scale-105 transition-all duration-200 rounded-full">BREAKFAST</div>
                <div class="bg-notifi text-deepBlue text-center border p-4 text-3xl hover:scale-105 transition-all duration-200 rounded-full">LUNCH</div>
                <div class="bg-notifi text-deepBlue text-center border p-4 text-3xl hover:scale-105 transition-all duration-200 rounded-full">DINNER</div>

            {/* <!-- Row 1 --> */}
                <div class="bg-notifi text-deepBlue text-center border p-4 text-3xl hover:scale-105 transition-all duration-200 rounded-full">8AM-9AM</div>
                <div class="bg-notifi text-deepBlue text-center border p-4 text-3xl hover:scale-105 transition-all duration-200 rounded-full">12PM-1.30PM</div>
                <div class="bg-notifi text-deepBlue text-center border p-4 text-3xl hover:scale-105 transition-all duration-200 rounded-full">8PM-9PM</div>
        
            </div>
            <br/><br/><br/>
            <div className="w-full md:w-[70rem] max-w-[1080px] max-h-96 p-4 border rounded-lg shadow sm:p-8 bg-neutral-950 border-neutral-900 drop-shadow-xl overflow-y-auto mb-[6rem]">
          <div className="flex items-center justify-between mb-4 ">
            <h5 className="text-3xl font-bold leading-none text-white">
              Notifications....
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-700 text-white ">
              {regNotification.length === 0
                ? "No Notifications added"
                : regNotification.map((notification) => (
                    <li className="py-3 sm:py-4" key={notification.title}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-xl font-medium truncate text-white">
                            {notification.title}
                          </p>
                          <p className="text-xl truncate text-gray-400">
                            {notification.description}
                            
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-xl  text-white">
                          {notification.date}
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
            
        </div>
    )
}
