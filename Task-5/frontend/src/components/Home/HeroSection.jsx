import React from 'react';
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from 'react-icons/fa';

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection bg-dark text-white text-center py-5">
      <div className="container">
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6">
            <h1>Unlock Your Potential - Discover the Perfect Job for You!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut optio rem ad debitis possimus suscipit, porro soluta corporis perferendis excepturi!</p>
          </div>
          <div className="col-lg-6">
            <img src="hero.jpg" alt="Hero" className="img-fluid rounded" />
          </div>
        </div>
        <div className="row">
          {details.map((elem) => (
            <div className="col-md-6 mb-4" key={elem.id}>
              <div className="card bg-secondary text-white h-100">
                <div className="card-body text-center">
                  <div className="icon mb-3" style={{ fontSize: '2rem' }}>
                    {elem.icon}
                  </div>
                  <div className="content">
                    <p className="h5">{elem.title}</p>
                    <p>{elem.subTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
