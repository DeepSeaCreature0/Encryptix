import React, { useContext, useState,useEffect } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    }
    else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    }
    else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    await axios.post("http://localhost:5000/api/v1/job/postJob",
      fixedSalary.length >= 4 ?
        { title, description, city, country, location, fixedSalary, category }
        :
        { title, description, city, country, location, category, salaryFrom, salaryTo },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then((res) => {
      toast.success(res.data.message);
      setTimeout(() => navigateTo("/job/me"), 1000);
    }).catch((error) => {
      toast.error(error.response.data.message);
    }
    );
  };

  return (
    <div className="job-post mt-3 ">
      <div className="container w-75">
        <h3 className="text-center text-white mt-4 mb-3">POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="mb-4">
            <input type="text" className="form-control" value={title} placeholder='Job Title' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div>
            <input type="text" className="form-control mb-4" value={country} placeholder='Country' onChange={(e) => setCountry(e.target.value)} />
            <input type="text" className="form-control mb-4" value={city} placeholder='City' onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="mb-4">
            <input type="text" className="form-control" value={location} placeholder='Location' onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="mb-4">
            <select className="form-select" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {salaryType === "Fixed Salary" ? (
              <input type="number" className="form-control mt-2" value={fixedSalary} placeholder='Enter Fixed Salary' onChange={(e) => setFixedSalary(e.target.value)} />
            ) : salaryType === "Ranged Salary" ? (
              <div className="row mt-2">
                <div className="col">
                  <input type="number" className="form-control" value={salaryFrom} placeholder='Salary From' onChange={(e) => setSalaryFrom(e.target.value)} />
                </div>
                <div className="col">
                  <input type="number" className="form-control" value={salaryTo} placeholder='Salary To' onChange={(e) => setSalaryTo(e.target.value)} />
                </div>
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <textarea rows="5" className="form-control" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
