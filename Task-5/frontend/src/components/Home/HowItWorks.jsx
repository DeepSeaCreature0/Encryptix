import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

const HowItWorks = () => {
  return (
    <div className="HowItWorks bg-dark text-white py-5">
      <div className="container">
        <h3 className="text-center mb-4">How JOB SEEK Works</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center">
              <FaUserPlus style={{ fontSize: '3rem' }} />
              <p className="fw-bold mt-2">Create Account</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima veniam soluta officiis nemo velit.</p>
            </div>
          </div>
          <div className="col">
            <div className="card text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center">
              <MdFindInPage style={{ fontSize: '3rem' }} />
              <p className="fw-bold mt-2">Find Job/Post Job</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima veniam soluta officiis nemo velit.</p>
            </div>
          </div>
          <div className="col">
            <div className="card text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center">
              <IoMdSend style={{ fontSize: '3rem' }} />
              <p className="fw-bold mt-2">Apply for Jobs/Recruit Candidates</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima veniam soluta officiis nemo velit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
