import React from 'react';
import { Link } from 'react-router-dom';

export default function AlbumDetails({ details, paid }) {

    const { REACT_APP_API_ROOT } = process.env;
    console.log(details)

    return (
        <header className="single-header">
            <div className="container">
                <div className="row gx-5 gy-3">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <img className="w-100 h-100" src={`${REACT_APP_API_ROOT}/${details.art}`} alt='Album_title'/>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <div className="h-100 d-flex align-items-center">
                            <div>
                                <h1>{details.title}</h1>
                                <p>Total Songs : {details.songs}</p>
                                {details.original_date && <p>Date created : {details.original_date}</p>}
                                <p className="mt-3">
                                    {!paid && <Link className="btn btn-success" role="button" to={`/donate?type=album&&uid=${details.uid}`}>Download Full Album</Link>}
                                    {/* <Link className="btn btn-success" role="button" to='/donate'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="me-2">
                                            <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                                        </svg>Download Full Album
                                    </Link> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
