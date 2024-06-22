import React from 'react';
import { FaReact } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdAccountBalance, MdOutlineAnimation, MdOutlineDesignServices, MdOutlineWebhook } from 'react-icons/md';
import { TbAppsFilled } from 'react-icons/tb';
import { IoGameController } from 'react-icons/io5';

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  return (
    <div className="PopularCategories py-5 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Popular Categories</h3>
        <div className="row">
          {categories.map((elem) => (
            <div className="col-md-3 mb-4" key={elem.id}>
              <div className="card h-100 bg-dark text-white">
                <div className="card-body text-center">
                  <div className="icon" style={{ fontSize: '3rem' }}>
                    {elem.icon}
                  </div>
                  <div className="text mt-3">
                    <p className="fw-bold">{elem.title}</p>
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

export default PopularCategories;
