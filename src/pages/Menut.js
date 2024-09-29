import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';           
import {Link,NavLink} from "react-router-dom"

export default function AdMenu() {
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [menu, setMenu] = useState({ Breakfast: '', Lunch: '', Dinner: '', Sweet_dish: '' });
  
  // Fetch the menu based on the selected day
  const fetchMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/pages/menufetch/${selectedDay}`);
      console.log(response);
      setMenu(response.data);  // Use response.data to extract the menu data
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Failed to fetch menu.');
    }
  };

  // Trigger menu fetch when day is changed
  useEffect(() => {
    fetchMenu();
  }, [selectedDay]);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };
  
  return (
    <div className='bg-richblack-900'>
      <ToastContainer />  {/* Toaster container for notifications */}
      
      <h1 className='pt-[2rem] text-4xl text-white font-bold ml-[40%]'>Check Menu:</h1>
     
      <label htmlFor="day" className='pt-[1rem] text-2xl text-white ml-[30%] mt-[2rem]'>
         SELECT DAY FROM DROPDOWN :
      </label>

      <select
        id="day"
        value={selectedDay}
        onChange={handleDayChange}
        className='pt-2 text-2xl text-black ml-[2%] mt-[3rem] text-center border-3 border-black'
      >
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <br />
      

      <div className="grid grid-cols-2 gap-9 w-full max-w-[65rem] h-[25rem] justify-center overflow-y-auto ml-[25%] mt-[5rem] mb-[5rem]">
        {['Breakfast', 'Lunch', 'Dinner', 'Sweet_dish'].map((meal) => (
          <div key={meal} className="p-[2.7rem] bg-white rounded shadow-md text-center ">
            <h2 className="text-3xl font-semibold mb-4 capitalize">{meal}</h2>
            <p className="text-black font-semibold mb-2 text-2xl">{menu?.[meal]}</p>  {/* Access data correctly */}
          </div>
        ))}
      </div>
    </div>
  );
}
