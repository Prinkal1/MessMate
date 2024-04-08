import React from 'react'
import { useState,useEffect } from "react"
import axios from 'axios';

const Bill = () =>{
    const[userBill , setUserBill] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:4000/bill/additionalBillfetch/3345`)
        .then(res =>{
            setUserBill(res.data)
            console.log(res);
        })
    .catch(err =>console.log(err))
    },[])
    return(
        <div>
          <h1 className='mt-[6rem] text-notifi text-5xl hover:scale-105 transition-all duration-200 text-center'><b>BILL-SECTION...!!!</b></h1>
            <div className='flex  w-11/12 max-w-[1160px] py-12 mx-auto justify-center '>
            <h1 className='mt-[4rem] text-5xl hover:scale-105 transition-all duration-200 text-complaint text-center'>
                 {userBill.monthlyBill}
            </h1>
                
            <table className='table text-black text-bold text-3xl bg-slate-600  w-11/12 max-w-[1160px] py-12 mx-auto'>
                <thead className=' text-black text-bold text-3xl '>
                    <tr>
                        <th>Regular Bill</th>
                        <th>Maggi</th>
                        <th>Tea</th>
                        <th>Milk</th>
                        <th>Bread</th>
                        
                    </tr>
                </thead>
                <tbody>
                {userBill.length > 0 ? (
              userBill.map((item, index) => (
                <tr key={index}>
                   <td className=' text-black text-bold text-4xl text-center '>{item.monthlyBill}</td>
                  <td className=' text-black text-bold text-4xl text-center '>{item.maggi}</td>
                  <td className=' text-black text-bold text-4xl text-center '>{item.tea}</td>
                  <td className=' text-black text-bold text-4xl text-center '>{item.milk}</td>
                  <td className=' text-black text-bold text-4xl text-center '>{item.bread}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className=' text-black text-bold text-4xl text-center '>NO BILL IS THERE... </td>
              </tr>
            )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Bill