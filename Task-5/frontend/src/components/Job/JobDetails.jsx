import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
    try {
      axios.get(`http://localhost:5000/api/v1/job/${id}`, { withCredentials: true }).then(
        res => {
          setJob(res.data.job);
        }
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [isAuthorized]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Default is 'en-US', can be customized
  };

  return (
    <div className="job-details bg-dark text-white vh-100 d-flex align-items-start justify-content-center">
      <div className="container mt-4" style={{ marginTop: '5rem' }}>
        <h3 className="text-center mb-4">Job Details</h3>
        <div className="card bg-secondary text-white shadow" style={{ width: '100%', maxWidth: '800px' }}>
          <div className="card-body">
            <p className="card-text">
              <strong >Title:</strong> <span>{job.title}</span>
            </p>
            <p className="card-text">
              <strong >Category:</strong> <span>{job.category}</span>
            </p>
            <p className="card-text">
              <strong >Country:</strong> <span>{job.country ? job.country.toUpperCase() : ''}</span>
            </p>
            <p className="card-text">
              <strong >City:</strong> <span>{job.city}</span>
            </p>
            <p className="card-text">
              <strong >Location:</strong> <span>{job.location}</span>
            </p>
            <p className="card-text">
              <strong >Description:</strong> <span>{job.description}</span>
            </p>
            <p className="card-text">
              <strong >Posted On:</strong> <span>{formatDate(job.jobPostedOn)}</span>
            </p>
            <p className="card-text">
              <strong >Salary:</strong> {job.fixedSalary ? (<span>{job.fixedSalary}</span>) : (<span>{job.salaryFrom} - {job.salaryTo}</span>)}
            </p>
            <div className="card-text">
              {user && user.role === "Employer" ? null : <Link to={`/application/${job._id}`} className="btn btn-primary">Apply Now</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
