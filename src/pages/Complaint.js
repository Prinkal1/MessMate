import React from 'react'
import quote from "../assests/quote.jpg"
import { Link } from "react-router-dom"
import {useState } from 'react'
import { toast } from 'react-hot-toast';

const Complaint = () => {
  const [formData, setFormData] = useState( {
    comments:""
  })

  function changeHandler(event) {

    setFormData( (prevData) =>(
        {
            ...prevData,
            [event.target.name]:event.target.value
        }
    ) )

}
  return (
    <div className='mt-[1rem] flex flex-col justify-center items-center p-8'>
      <h2 className='text-lightBlue text-4xl h-full hover:scale-105 transition-all duration-200'>
        <b>A GOOD SUGGESTION IS WORTH MORE THAN A HUNDRED GREAT IDEAS.....</b> 
      </h2>
      <div className='flex relative m-[3rem] w-11/12 max-w-[1080px] mx-auto  p-4 bg-richblack-700 '>
        <div className='w-[60%] min-h-[30rem] bg-gray2 '>
          <h3 className='font-mullish text-3xl p-4 text-white hover:scale-105 transition-all duration-200 border-b-2'>
            <i>COMPLAINTS && SUGGESTIONS...</i>
          </h3>
          
          <textarea
          required
          onChange={changeHandler}
          value = {formData.comments}
          placeholder="ENTER COMPLAINTS && SUGGESTIONS... "
          name="comments"
          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[98%] h-[80%] p-[3rem] m-[10px] text-2xl'
          ></textarea>
          

        </div>
        <div className='w-[40%] min-h-[30rem] bg-gray2 flex justify-center hover:scale-105 transition-all duration-200'>
          <section >
            <img src={quote} alt= {quote} width={400} height={220} loading="lazy" />
          </section>
        </div>
      </div>
      <Link to="/Dashboard">
      <button onClick={() => {
          toast.success("Submit");
        }}
      className='bg-richblack-800 text-richblack-100 py-[18px] px-[28px] rounded-[18px] border border-white mt-[-25px]'>
        Submit
      </button>     
      </Link>
      
      
    </div>
    
  )
}

export default Complaint