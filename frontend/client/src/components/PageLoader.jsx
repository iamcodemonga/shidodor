import React from 'react';
// import loader from '../resources/img/loader.gif';
import loader from '../resources/img/loader.svg';

export default function PageLoader() {
  return (
    <div className="load-container d-flex justify-content-center align-items-center">
        <div>
            <img src={loader} alt="loader" height="80px" />
            {/* <img src="loader.gif" alt="loader" height="80px" /> */}
        </div>
    </div>

  )
};
