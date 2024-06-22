import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../main';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleFileInputChange = (e) => {
    const resumeFile = e.target.files[0];
    setResume(resumeFile);
  };

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverLetter", coverLetter);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("resume", resume);
    formData.append("jobID", id);

    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/app/postApp", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setName("");
      setEmail("");
      setAddress("");
      setCoverLetter("");
      setPhone("");
      setResume(null);

      toast.success(data.message);
      navigateTo("/job/getAllJobs");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  return (
    <section className="application py-5">
      <div className="container w-50">
        <h3 className="mb-4 text-center text-white">Application Form</h3>
        <form onSubmit={handleApplication}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              rows="10"
              className="form-control"
              placeholder="Write Your Cover Letter Here"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mb-4 w-50">
            <label className='text-white mb-2'>Select Resume</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileInputChange}
              accept=".jpg,.jpeg,.png,.webp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
