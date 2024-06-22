import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ResumeModal from './ResumeModal';
import { MdDelete } from 'react-icons/md';
import { FaFile } from "react-icons/fa";

const MyApplications = () => {
  const [application, setApplication] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageURL, setResumeImageURL] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios.get("http://localhost:5000/api/v1/app/employerGetAllApps", { withCredentials: true }).then((res) => {
          setApplication(res.data.apps);
        });
      } else {
        axios.get("http://localhost:5000/api/v1/app/jobSeekerGetAllApps", { withCredentials: true }).then((res) => {
          setApplication(res.data.apps);
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteApp = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/app/jobSeekerDeleteApp/${id}`, { withCredentials: true }).then(res => {
        toast.success(res.data.message);
        setApplication(prevApp => prevApp.filter(app => app._id !== id));
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageURL) => {
    setResumeImageURL(imageURL);
    setModalOpen(true);
  };

  const closeModal = () => {
    setResumeImageURL("");
    setModalOpen(false);
  };

  return (
    <div className="application-page">
      <div className="container">
        <h3 className="text-center text-white my-4">{user && user.role === "Employer" ? "Received Applications" : "My Applications"}</h3>
        {application.length <= 0 ?
          (
            <NoApplicationFound/>
          ) : (<></>)}
        <div className="row">
          {application.map(elem => (
            <div className="col-md-12 mb-4" key={elem._id}>
              {user && user.role === "Employer" ? (
                <EmployerCard element={elem} openModal={openModal} />
              ) : (
                <JobSeekerCard element={elem} deleteApp={deleteApp} openModal={openModal} />
              )}
            </div>
          ))}
        </div>
      </div>
      {modalOpen && <ResumeModal imageURL={resumeImageURL} onClose={closeModal} />}
    </div>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApp, openModal }) => {
  return (
    <div className="card">
      <div className="card-body row">
        <div className="col-md-4">
          <p><span>Name: </span>{element.name}</p>
          <p><span>Email: </span>{element.email}</p>
          <p><span>Phone: </span>{element.phone}</p>
          <p><span>Address: </span>{element.address}</p>
          <p><span>Cover Letter: </span></p>
          <p>{element.coverLetter}</p>
        </div>
        <div className="col-md-4 text-center">
          <img src={element.resume.url} alt="resume" className="img-fluid resume-img" onClick={() => openModal(element.resume.url)} />
        </div>
        <div className="col-md-4 mt-2 text-center d-flex align-items-center justify-content-center">
          <button className="btn btn-danger" onClick={() => deleteApp(element._id)}><MdDelete size={24} /> Delete Application</button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="card">
      <div className="card-body row">
        <div className="col-md-4">
          <p><span>Name: </span>{element.name}</p>
          <p><span>Email: </span>{element.email}</p>
          <p><span>Phone: </span>{element.phone}</p>
          <p><span>Address: </span>{element.address}</p>
          <p><span>Cover Letter: </span></p>
          <p>{element.coverLetter}</p>
        </div>
        <div className="col-md-4 text-center">
          <img src={element.resume.url} alt="resume" className="img-fluid resume-img" onClick={() => openModal(element.resume.url)} />
        </div>
      </div>
    </div>
  );
};

const NoApplicationFound = () => {
  return (
    <div className="no-application-container d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="row">
        <div className="col-12 text-center">
          <FaFile style={{ fontSize: '30vw' }} className="text-secondary" />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="text-center text-secondary mt-3">No Application Found</h4>
        </div>
      </div>
    </div>
  );
};
