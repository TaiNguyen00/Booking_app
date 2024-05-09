import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { user, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="h2Login">Login Form</h2>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={handleChange} id="username" placeholder="Enter your username" />
    
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} id="password" placeholder="Enter your password" />
    
          <button type="submit" onClick={handleClick}>Login</button>
        </form>
        <div className="switch">Don't have an account? <Link to="/register">Register now.</Link></div>
      </div>
    </div>
  );
};

export default Login;
