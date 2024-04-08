import React from 'react'
import { useState,useEffect } from "react"
import axios from 'axios';

export default function Menuw(){
    
    const[menu , setMenu] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:4000/pages/menuAll`)
        .then(res =>{
            setMenu(res.data.menu)
            console.log(res);
        })
        
        .catch(err =>console.log(err))
    },[])
    return(
        
        <div className='flex  w-11/12 max-w-[1160px] py-4 mx-auto justify-center '>
            
                
            <table className='table text-white text-6xl bg-slate-600 '>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                        <th>Sweet_dish</th>
                    </tr>
                </thead>
                <tbody>
                {menu.length > 0 ? (
              menu.map((item, index) => (
                <tr key={index}>
                  <td>{item.Day}</td>
                  <td>{item.Breakfast}</td>
                  <td>{item.Lunch}</td>
                  <td>{item.Dinner}</td>
                  <td>{item.Sweet_dish}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">NO DATA IS PRESENT...</td>
              </tr>
            )}
                </tbody>
            </table>
            
        </div>
    )
};
    
