import React from 'react';
import { FaApple, FaMicrosoft } from 'react-icons/fa';
import { SiTesla } from 'react-icons/si';

const PopularCompanies = () => {

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="popularCompanies py-5 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Top Companies</h3>
        <div className="row">
          {companies.map((elem) => (
            <div className="col-md-4 mb-4" key={elem.id}>
              <div className="card h-100 bg-dark text-white">
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <div className="icon mb-3" style={{ fontSize: '3rem' }}>
                    {elem.icon}
                  </div>
                  <div className="text mb-3">
                    <p className="fw-bold mb-1">{elem.title}</p>
                    <p className="text-muted">{elem.location}</p>
                  </div>
                  <button className="btn custom-btn mt-auto">Open Positions: {elem.openPositions}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCompanies;
