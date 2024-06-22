import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Navigate, Link } from 'react-router-dom';
import { Context } from '../../main';

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setAuthorized } = useContext(Context);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="authPage">
      <div className="auth-container">
        <div className="header">
          <img src="https://img.freepik.com/premium-vector/job-search-logo-template-design-vector-illustration_7688-4269.jpg?w=740" alt="logo" />
          <h3>Login to your Account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As</label>
            <div className="input-group">
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <span className="input-group-text"><FaRegUser /></span>
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div className="input-group">
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='abc@def.com' required />
              <span className="input-group-text"><MdOutlineMailOutline /></span>
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div className="input-group">
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='********'/>
              <span className="input-group-text"><RiLock2Fill /></span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/register">Register Now</Link>
        </div>
      </div>
      <div className="banner">
        <img src="/register.jpg" alt="register" className="img-fluid" />
      </div>
    </div>
  );
}

export default login;
