import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or admin
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber:"",
    password: "",
    messacc :"",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, messacc ,email,contactNumber, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))
    console.log("email :",email);

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      messacc :"",
      contactNumber :"",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }
 
  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="text-[1rem] text-richblack-5 mb-1 leading-[1.375rem] mt-11">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mt-[1rem]"
            />
          </label>
          <label>
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5 mt-11">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full mt-[1rem] p-[12px]"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="bg-richblack-800 rounded-[0.5rem] mt-[1rem] text-richblack-5 w-full p-[12px]"
          />
        </label>
        
          <label className='w-full'>
            <p className='text-[1rem] text-richblack-5 mb-1 leading-[1.375rem]'>Mess Account Number<sup className='text-pink-200'>*</sup></p>
              <input
                required
                type="number"
                name="messacc"
                onChange={handleOnChange}
                placeholder="Enter mess account"
                value={messacc}
                className='bg-richblack-800 mt-[1rem] rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
          </label>   
          <label className="w-full">
          <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
            Contact Number <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="contactNumber"
            value={contactNumber}
            onChange={handleOnChange}
            placeholder="Enter contactNumber"
            className="bg-richblack-800 mt-[1rem] rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
        </label> 
        
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="bg-richblack-800 mt-[1rem] rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5 ">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="bg-richblack-800 rounded-[0.5rem] mt-[1rem] text-richblack-5 w-full p-[12px]"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[3.7rem] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-gradient-to-r from-blue-900 via-blue-500 to-blue-400 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
    
  )
  
}

export default SignupForm
