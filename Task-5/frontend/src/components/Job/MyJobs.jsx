import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/job/myJobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:5000/api/v1/job/updateJob/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:5000/api/v1/job/deleteJob/${jobId}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="my-job container my-4">
      <h3 className="text-white">Your Posted Jobs</h3>
      {myJobs.length > 0 ? (
        <div className="row">
          {myJobs.map((elem) => (
            <div className="col-md-6 mb-4" key={elem._id}>
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editingMode !== elem._id}
                      value={elem.title}
                      onChange={(e) =>
                        handleInputChange(elem._id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Country:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editingMode !== elem._id}
                      value={elem.country}
                      onChange={(e) =>
                        handleInputChange(elem._id, "country", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editingMode !== elem._id}
                      value={elem.city}
                      onChange={(e) =>
                        handleInputChange(elem._id, "city", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editingMode !== elem._id}
                      value={elem.location}
                      onChange={(e) =>
                        handleInputChange(elem._id, "location", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      className="form-control"
                      value={elem.category}
                      disabled={editingMode !== elem._id}
                      onChange={(e) =>
                        handleInputChange(elem._id, "category", e.target.value)
                      }
                    >
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
                  <div className="form-group">
                    <label>Salary:</label>
                    {elem.fixedSalary ? (
                      <input
                        type="number"
                        className="form-control"
                        value={elem.fixedSalary}
                        onChange={(e) =>
                          handleInputChange(
                            elem._id,
                            "fixedSalary",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== elem._id}
                      />
                    ) : (
                      <div className="d-flex">
                        <input
                          type="number"
                          className="form-control mr-2"
                          value={elem.salaryFrom}
                          onChange={(e) =>
                            handleInputChange(
                              elem._id,
                              "salaryFrom",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== elem._id}
                        />
                        <input
                          type="number"
                          className="form-control"
                          value={elem.salaryTo}
                          onChange={(e) =>
                            handleInputChange(elem._id, "salaryTo", e.target.value)
                          }
                          disabled={editingMode !== elem._id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Expired:</label>
                    <select
                      className="form-control"
                      value={elem.expired}
                      disabled={editingMode !== elem._id}
                      onChange={(e) =>
                        handleInputChange(elem._id, "expired", e.target.value)
                      }
                    >
                      <option value="true">TRUE</option>
                      <option value="false">FALSE</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      disabled={editingMode !== elem._id}
                      value={elem.description}
                      onChange={(e) =>
                        handleInputChange(
                          elem._id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      {editingMode === elem._id ? (
                        <>
                          <button
                            className="btn btn-success mr-3"
                            onClick={() => {
                              handleUpdateJob(elem._id);
                            }}
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              handleDisableEdit();
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleEnableEdit(elem._id);
                          }}
                        >
                          <MdEdit />
                        </button>
                      )}
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteJob(elem._id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">
          You haven't posted any jobs or you may have deleted all your jobs.{" "}
          <Link to={"/job/post"}>
            <u>Click Here</u>
          </Link>{" "}
          to post a job.
        </p>
      )}
    </div>
  );
};

export default MyJobs;
