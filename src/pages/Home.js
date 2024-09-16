import React from 'react'
import { HeroSVG } from "./HeroSVG";
import {Link} from "react-router-dom"

const Home = ({isLoggedIn}) => {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center align-center  text-white text-center">
      <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
        <HeroSVG />
      </div>
      <div className="md:pt-[8%]">
        <h1 className="font-bold text-6xl">
          GNDEC <span className="text-blue-500">MESS</span> MATE
        </h1>
        <p className="py-10 text-2xl">
          One Solution For All Of The Mess&apos;s Needs
        </p>
        <div className="py-20">
          <Link
            to="/login"
            className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
          >
            LogIn
          </Link>
          <br></br>
          <p className="mt-6 mb-3">OR</p>
          <br></br>
          <Link
            to="/signup"
            className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
          >
            SignUp
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home