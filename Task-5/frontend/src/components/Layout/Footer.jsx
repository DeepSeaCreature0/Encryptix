import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={`bg-dark text-white text-center py-4 ${isAuthorized ? "footerShow" : "footerHide"}`}>
      <div className="container">
        <div>&copy; All Rights Reserved By DeepSeaCreature0.</div>
        <div className="mt-3">
          <Link to="/" target='_blank' className="text-white me-3"><FaFacebook /></Link>
          <Link to="https://github.com/DeepSeaCreature0" target='_blank' className="text-white me-3"><FaGithub /></Link>
          <Link to="/" target='_blank' className="text-white me-3"><FaLinkedin /></Link>
          <Link to="/" target='_blank' className="text-white"><RiInstagramFill /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
