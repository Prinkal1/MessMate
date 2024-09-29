import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';           // Import the toast CSS
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
  
  const [editing, setEditing] = useState({
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Sweet_dish: false,
  });
  const [inputValues, setInputValues] = useState({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
    Sweet_dish: '',
  });

  // Function to handle the update menu API
  const updateMenu = async (field) => {
    const newValue = inputValues[field];

    if (!newValue) return;  // Prevent updating with empty value

    try {
      const response = await axios.put("http://localhost:4000/pages/menuUpdate", {
        Day: selectedDay,
        [field]: newValue,
      });

      // Assuming API response has a 'success' field to indicate the result
      if (response.status === 200) {
        setMenu(prevMenu => ({ ...prevMenu, [field]: newValue }));
        setEditing(prev => ({ ...prev, [field]: false }));  // Close editing
        setInputValues(prev => ({ ...prev, [field]: '' }));  // Clear input

        toast.success(`${field} updated successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to update menu.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error updating menu:', error);
      toast.error('Failed to update menu.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <div className='bg-richblack-900'>
      <ToastContainer />  {/* Toaster container for notifications */}
      
      <h1 className='pt-[2rem] text-4xl text-white font-bold ml-[35%]'>Check And Update Menu:</h1>
      <Link to="/menuw"> 
      <button
        className="rounded-[8px] bg-blue-500 py-[10px] px-[12px] mt-[1rem] font-medium text-richblack-900 text-2xl ml-[40%]"
      >
        Check Full Menu
      </button>
      </Link>
    <br></br>
      <label htmlFor="day" className='pt-[1rem] text-2xl text-white ml-[30%] mt-[2rem]'>
        TO UPDATE SELECT DAY FROM DROPDOWN :
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
      

      <div className="grid grid-cols-2 gap-9 w-full max-w-[55rem] justify-center overflow-y-auto ml-[25%] mt-[5rem] mb-[5rem]">
        {['Breakfast', 'Lunch', 'Dinner', 'Sweet_dish'].map((meal) => (
          <div key={meal} className="p-4 bg-white rounded shadow-md text-center ">
            <h2 className="text-3xl font-semibold mb-4 capitalize">{meal}</h2>
            <p className="text-black font-semibold mb-2 text-2xl">{menu?.[meal]}</p>  {/* Access data correctly */}

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setEditing(prev => ({ ...prev, [meal]: !editing[meal] }))}
            >
              Update
            </button>

            {/* Show input field and button if Update is clicked */}
            {editing[meal] && (
              <div className="mt-4">
                <label className="block text-xl mb-2">Update {meal}:</label>
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  value={inputValues[meal]}
                  onChange={(e) => setInputValues(prev => ({ ...prev, [meal]: e.target.value }))}
                  placeholder={`Enter new ${meal}`}
                />
                <button
                  className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => updateMenu(meal)}
                >
                  Enter
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
