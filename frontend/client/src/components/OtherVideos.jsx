import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherVideos({ videos }) {

    const { REACT_APP_API_ROOT } = process.env;

    return (
        <section className="recommended-section">
            <div className="container">
                <h5 className="mt-0 mb-5">You may also like</h5>
                <div className="row gx-5 gy-3">
                    {videos && videos.map((video, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={video.id}>
                        <Link className="video-card-link h-100" to={`/video/${video.uid}`}>
                            <div className="video-card">
                                <img className="w-100 h-100" src={`${REACT_APP_API_ROOT}/${video.thumbnail}`} alt='related_video'/>
                                <div className="video-overlay">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="video-card-icon">
                                        <path d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-2">
                                <p className="mb-1">{video.title}</p>
                                <p className="text_small text-white-50">{video.length}</p>
                            </div>
                        </Link>
                    </div>)}
                </div>
            </div>
        </section>
    )
}
