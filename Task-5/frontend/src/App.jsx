import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { Context } from "./main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import MyJobs from "./components/Job/MyJobs";
import JobDetails from "./components/Job/JobDetails";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isAuthorized, setAuthorized, setUser } = useContext(Context);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/getUser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/job/getAllJobs"
            element={<Jobs />}
          />
          <Route
            path="/job/:id"
            element={<JobDetails />}
          />
          <Route
            path="/job/post"
            element={<PostJob />}
          />
          <Route
            path="/job/me"
            element={<MyJobs />}
          />
          <Route
            path="/application/:id"
            element={<Application />}
          />
          <Route
            path="/application/me"
            element={<MyApplications />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showFooter && <Footer />}
        <Toaster />
      </Router>
    </>
  );
};

export default App;
