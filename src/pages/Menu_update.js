import React from 'react'
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast';

const Menu_update = ({isLoggedIn}) =>{

    const navigate = useNavigate()
    const [selectedDay, setSelectedDay] = useState('');
    const [menu, setMenu] = useState({ Breakfast: [], Lunch: [], Dinner: [] ,Sweet_dish:[]});

    const fetchMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/pages/menufetch/${selectedDay}`);

      console.log(response);
      setMenu(response);
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error("No menu is present for that day");
    }
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleFetchMenu = () => {
        fetchMenu();
    };


    const menudelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/pages/menudelete`, {
                data: { Day: selectedDay } 
            });
            toast.success("Menu deleted successfully");
            console.log(res.data);
          
        } catch (error) {
          console.error('Error in deleting menu:', error);
        }
    };

    const handleDeleteMenu = () => {
        menudelete();
    };


    return(
        <div className='bg-richblack-900 w-[80%] max-w-[1160px] min-w-[50%] mx-auto'>
            <h1 className='pt-[2rem] text-5xl text-white ml-[10%] mt-[5rem]'>SELECT DAY WHOSE MENU YOU WANT TO DELETE FROM DROPDOWN :</h1>
      
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
            </select>
            <br/><br/>
            <button onClick={handleFetchMenu}
            className="rounded-[8px] bg-yellow-50 py-[10px] px-[12px] mt-[1rem] font-medium text-richblack-900 text-2xl ml-[47%]">CLICK HERE</button>
            
            <div className='flex w-[70%] max-w-[1160px] min-w-[50%] mx-auto justify-center  '>
            <table className='table text-white  bg-slate-600 '>
                <thead >
                    <tr >
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                        <th>Sweet_dish</th>
                    </tr>
                </thead>
                <tbody >
                
                <tr >
                  <td className='text-bold text-3xl text-center '>{menu?.data?.Day}</td>
                  <td className='text-bold text-3xl text-center '>{menu?.data?.Breakfast}</td>
                  <td className='text-bold text-3xl text-center '>{menu?.data?.Lunch}</td>
                  <td className=' text-bold text-3xl text-center '>{menu?.data?.Dinner}</td>
                  <td className=' text-bold text-3xl text-center '>{menu?.data?.Sweet_dish}</td>
                </tr>
              
                </tbody>
            </table>   
            </div>

            {/* delete button */}
            <button
            onClick={handleDeleteMenu}
            className="rounded-[8px] bg-red py-[10px] px-[12px]  font-medium text-white text-2xl ml-[47%]">
            Delete
          </button>
         <div className='flex'>
         <h1 className='pt-[2rem] text-5xl text-white ml-[10%] mt-[5rem] font-bold'>CLICK HERE TO ADD MENU :</h1>
          <button
            onClick={() => {
              navigate("/addmenu")
            }}
            className="rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900 text-2xl max-h-[5rem] mt-[5rem] ml-[2%]">
            ADD MENU 
          </button>
         </div>
         
        
        </div>

        
    )
}
export default Menu_update