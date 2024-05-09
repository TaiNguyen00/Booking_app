import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="container">
    <div className="card">
      <h2 className="h2Login">Register Form</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" />
  
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />
        
        <label htmlFor="email">Your email</label>
        <input type="email" id="email" placeholder="acb@gmail.com" />

        <button type="submit" >Register</button>
      </form>
      <div className="switch">You have an account? <Link to="/login">Login now.</Link></div>
    </div>
  </div>
  )
}

export default Register