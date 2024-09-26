import React from 'react'
import { useState } from "react"
import axios from 'axios';



export default function Menut(){
    
    // src/components/Menu.js
    

  const [selectedDay, setSelectedDay] = useState('');
  const [menu, setMenu] = useState({ Breakfast: [], Lunch: [], Dinner: [] ,Sweet_dish:[]});

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/pages/menufetch/${selectedDay}`);
      console.log(response);
      setMenu(response);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleFetchMenu = () => {
    fetchMenu();
  };

  return (
    <div className='bg-richblack-900'>
        <h1 className='pt-[2rem] text-5xl text-white ml-[30%]'>SELECT DAY FROM DROPDOWN :</h1>
      
      <label htmlFor="day" className='pt-[1rem] text-4xl text-white ml-[30%] mt-[1rem]'>Select a day :</label>
      <select id="day" value={selectedDay} onChange={handleDayChange} className='pt-5 text-4xl text-black ml-[2%] mt-[3rem] text-center border-3 border-black'>
        <option value="" >Select</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
        {/* Add more options for other days */}
      </select>
      <br></br>
      <button onClick={handleFetchMenu}
      className="rounded-[8px] bg-yellow-50 py-[10px] px-[12px] mt-[1rem] font-medium text-richblack-900 text-2xl ml-[40%]">CLICK HERE</button>

      <div className='grid grid-cols-2  max-w-[50%] ml-[30%]'>
        <h3 className="bg-gray-300 p-4 w-[40%] ml-[30%] rounded-[8px] mt-[2rem] text-center text-4xl">Breakfast</h3>
        <ul>
        <li className='bg-complaint p-4 w-[40%] ml-[30%] rounded-[8px] mt-[1rem] text-center text-4xl'>{menu?.data?.Breakfast}</li>
        </ul>
      </div>

      <div>
        <h3 className='bg-gray-300 p-4 w-[40%] ml-[30%] rounded-[8px] mt-[3rem] text-center text-4xl'>Lunch</h3>
        <ul>
        <li className='bg-complaint p-4 w-[40%] ml-[30%] rounded-[8px] mt-[1rem] text-center text-4xl'>{menu?.data?.Lunch}</li>
        </ul>
      </div>

      <div>
        <h3 className='bg-gray-300 p-4 w-[40%] ml-[30%] rounded-[8px] mt-[3rem] text-center text-4xl'>Dinner</h3>
        <ul>
        <li className='bg-complaint p-4 w-[40%] ml-[30%] rounded-[8px] mt-[1rem] text-center text-4xl'>{menu?.data?.Dinner}</li>
        </ul>
      </div>
      <div>
        <h3 className='bg-gray-300 p-4 w-[40%] ml-[30%] rounded-[8px] mt-[3rem] text-center text-4xl'>Sweet_dish</h3>
        <ul>
        <li className='bg-complaint p-4 w-[40%] ml-[30%] rounded-[8px] mt-[1rem] text-center text-4xl'>{menu?.data?.Sweet_dish}</li>
        </ul>
      </div>
    </div>
  );
};



