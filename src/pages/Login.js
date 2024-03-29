import React from 'react'
import Template from '../components/Template'


const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login