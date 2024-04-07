import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({title, formtype, setIsLoggedIn}) => {
  return (
    <div className='flex  w-11/12 max-w-[1160px] py-12 mx-auto justify-center'>

        <div className='w-11/12 max-w-[450px]' >
            <h1
            className='text-richblack-5 font-semibold text-[3rem] leading-[2.375rem]' 
            >
                {title}
            </h1>
            <br/>

            {formtype === "signup" ? 
            (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
            (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

        

            

        </div>


    </div>
  )
}

export default Template
