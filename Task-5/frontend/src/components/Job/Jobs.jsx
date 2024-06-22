import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
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
        const res = await axios.get("http://localhost:5000/api/v1/job/getAllJobs", { withCredentials: true });
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);


  return (
    <section className="jobs-page text-white text-center py-5">
  <div className="container">
    <h1 className="text-center mb-4">All Available Jobs</h1>
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {jobs && jobs.map((job) => (
        <div className="col" key={job._id}>
          <div className="card card-custom text-center p-2 h-100 d-flex flex-column justify-content-between">
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <h6 className="card-subtitle mb-2">{job.category}</h6>
              <p className="card-text">{job.country.toUpperCase()}</p>
            </div>
            <Link to={`/job/${job._id}`} className="btn btn-primary mt-auto">Details</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}

export default Jobs;