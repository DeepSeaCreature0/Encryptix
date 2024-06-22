import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <section className='page_not_found'>
        <div className='container text-center'>
          <img src="/notfound.jpg" alt="notfound" className="img-fluid mb-4" />
          <div className='container text-center'>
            <Link to="/" className="btn btn-primary">RETURN TO HOME</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
