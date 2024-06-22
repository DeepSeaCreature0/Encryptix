import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/user/logout", { withCredentials: true });
      toast.success(response.data.message);
      setShow(false);
      setAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setAuthorized(true);
    }
  };
  
  return (
    <nav className={`navbar navbar-expand-lg ${isAuthorized ? "navbarshow" : "navbarHide"}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="https://img.freepik.com/premium-vector/job-search-logo-template-design-vector-illustration_7688-4269.jpg?w=740" alt="logo" className="logo img-fluid" />
        </Link>
        <button className="navbar-toggler" type="button" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </button>
        <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setShow(false)}>HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/job/getAllJobs" onClick={() => setShow(false)}>ALL JOBS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/application/me" onClick={() => setShow(false)}>
                {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/job/post" onClick={() => setShow(false)}>POST NEW JOB</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/job/me" onClick={() => setShow(false)}>MY JOBS</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link logout" to="/login" onClick={handleLogout}>LOGOUT</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
