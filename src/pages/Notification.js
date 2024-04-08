import React from 'react'
import { useState,useEffect } from "react"
import axios from 'axios';

export default function Notification(){
    const[notifi , setNotifi] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:4000/pages/fetchNotification`)
        .then(res =>{
            setNotifi(res.data.notifi)
            console.log(res);
        })
    .catch(err =>console.log(err))
    },[])
    return(
        <div className='flex flex-col  items-center text-lightBlue bg-richblack-900 h-full '>
            <h1 className='mt-[6rem] text-5xl hover:scale-105 transition-all duration-200'><b>NOTIFICATIONS...!!!</b></h1>
            <h1 className=' text-4xl hover:scale-105 transition-all duration-200 mt-[2rem]'><b>MESS TIMINGS ARE...!!!</b></h1>
            <div class="grid grid-cols-3 grid-rows-2 gap-4 w-11/12 max-w-[1080px] mt-[5rem] ">
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
            <div className='bg-richblack-900 h-full w-full'>
            <div className='flex w-11/12 max-w-[1160px] mx-auto justify-center mb-[2rem] '>
                
                <table className='table text-black text-bold text-3xl bg-slate-600'>
                    <thead className=' text-black text-bold text-3xl '>
                        <tr>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Notification</th>
                        </tr>
                    </thead>
                    <tbody className=' text-black text-bold text-6xl '>
                    {notifi.length > 0 ? (
                        notifi.map((item, index) => (
                    <tr key={index}>
                      <td className=' text-black text-bold text-3xl text-center '>{item.day}</td>
                      <td className=' text-black text-bold text-3xl text-center '>{item.date}</td>
                      <td className=' text-black text-bold text-3xl text-center'>{item.notification}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">NO NEW NOTIFICATION</td>
                  </tr>
                )}
                    </tbody>
                </table>
                
            </div>
            </div>
            
        </div>
    )
}
