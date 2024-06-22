import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchType, setSearchType] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/job/getAllJobs", {
          params: { searchType, searchValue },
          withCredentials: true
        });
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [searchType, searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  return (
    <section className="jobs-page text-white text-center py-5">
      <div className="container">
        <h1 className="text-center mb-4">All Available Jobs</h1>
        <div className="mb-4">
          <div className="input-group mb-3 w-75 mx-auto">
            <button className="btn btn-outline-secondary dropdown-toggle btn-outline-secondary-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {searchType.charAt(0).toUpperCase() + searchType.slice(1)}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item " href="#" onClick={() => handleSearchTypeChange('title')}>Title</a></li>
              <li><a className="dropdown-item " href="#" onClick={() => handleSearchTypeChange('category')}>Category</a></li>
              <li><a className="dropdown-item " href="#" onClick={() => handleSearchTypeChange('country')}>Country</a></li>
            </ul>
            <input 
              type="text" 
              className="form-control" 
              placeholder={`Search by ${searchType}`} 
              value={searchValue} 
              onChange={handleSearchChange} 
            />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {jobs && jobs.map((job) => (
            <div className="col" key={job._id}>
              <div className="card card-custom text-center p-2 h-100 d-flex flex-column justify-content-between">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2">{job.category}</h6>
                  <p className="card-text">{job.country.toUpperCase()}</p>
                </div>
                <Link to={`/job/${job._id}`} className="btn btn-primary mt-auto mb-2">Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
