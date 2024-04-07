import React from 'react'
import quote from "../assests/quote.jpg"
import { Link } from "react-router-dom"
import {useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Complaint()  {
  const [formData, setFormData] = useState( {
    complaint:""
  })

  function changeHandler(event) {
    setFormData( (prevData) =>(
        {
            ...prevData,
            [event.target.name]:event.target.value
        }))

}

const handleOnSubmit = (e) => {
  // e.preventDefault(); 
  addComplaint();
  
}
// const [submit, setsubmit] = useState('');
const addComplaint = async () => {
  try {
    const response = await axios.post(`http://localhost:4000/pages/addComplaint`,formData);
    console.log(response);
    // setsubmit(response);
    toast.success("Submit");
    //  return response;
  } catch (error) {
    console.error('Error in adding complaint :', error);
  }
};
  return (
    <div className='mt-[1rem] flex flex-col justify-center  w-11/12 max-w-[1160px] py-4 mx-auto  '>
      <h1 className='mt-[4rem] text-5xl hover:scale-105 transition-all duration-200 text-complaint text-center'><b>COMPLAINTS AND SUGGESTIONS...!!!</b></h1>
      <h1 className=' text-4xl hover:scale-105 transition-all duration-200 mt-[3rem] text-complaint text-center text-bold'><b>A GOOD SUGGESTION IS WORTH MORE THAN A HUNDRED GREAT IDEAS....!!!</b></h1>
      <form onSubmit={handleOnSubmit}>
       <textarea
          required
          onChange={changeHandler}
          value = {formData.comments}
          placeholder="ENTER COMPLAINTS && SUGGESTIONS... "
          name="complaint"
          className='bg-complaint rounded-[4.5rem] border bottom-6-black text-black w-[58%] h-[180%] p-[3rem] text-4xl items-center mt-[4rem]  ml-[19rem]'
          ></textarea>
          
      <button 
        type='submit'
        className='bg-complaint text-black py-[18px] px-[28px] rounded-[18px] border border-black mt-[3rem] text-3xl'>
        Submit
      </button>     
      

      </form>
      
    </div>
    
  )
}
