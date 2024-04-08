import React from 'react'
import {Link} from "react-router-dom"

const Template2 = ({img ,title,desc,link,name}) => {
  return (
    <div>
        <div className='w-[90%] flex flex-col bg-complaint'>
            <img src={img} alt="" width={500} height={500} loading="lazy"/>
            <h1 className='text-black font-bold text-3xl text-center leading-[2.375rem] mt-3'>{title}</h1>
            <h3 className='text-black font-semibold text-[1.875rem] leading-[2.375rem] text-center ml-8 mt-3'>{desc}</h3>
            <Link to={link}>
                    <button  className='bg-richblack-800 text-richblack-100 py-[12px] font-small
                    px-[12px] rounded-[18px] border ml-[40%]  border-white hover:scale-105 transition-all duration-200 mx-auto mt-3'>
                        {name}
                    </button>
                </Link>

        </div>
        
    </div>
  )
}

export default Template2