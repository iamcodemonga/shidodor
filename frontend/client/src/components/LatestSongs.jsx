import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function LatestSongs({ songs }) {

    const { REACT_APP_API_ROOT } = process.env;

    useEffect(() =>{

        const productContainers = [...document.querySelectorAll('.content-container')];
        const nextbtn = [...document.querySelectorAll('.nextbtn')];
        const prevbtn = [...document.querySelectorAll('.prevbtn')];

        productContainers.forEach((item, i) => {
            // let containerDimentions = item.getBoundingClientRect();
            // let containerWidth = containerDimentions.width;
            let containerWidth = 390;
            
            nextbtn[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth;
            });
            
            prevbtn[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth;
            });
        });

    },[])

    return (
    <section id="songs">
        <div className="container mb-5 pb-5">
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="mb-5">Latest Songs</h4>
                <div>
                    <Link className="btn btn-dark btn-sm border rounded-pill see-all-btn border-0" role="button" to="/songs">see more</Link>
                </div>
            </div>
            <div className="position-relative">
                <div className="content-container pb-5">
                    {songs && songs.map((song, index) =><Link className="song-card-link" to={`/song/${song.uid}`} key={song.id}>
                        <div className="song-card">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="song-card-icon">
                                {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                                <path d="M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z" />
                            </svg>
                            <img className="w-100 h-100" src={`${REACT_APP_API_ROOT}/${song.art}`} alt="Latest_song" />
                            <div className="song-overlay p-3 d-flex align-items-end">
                                <div>
                                    <p className="mb-1">{song.title}</p>
                                    <p className="text_small text-white-50">{song.length}</p>
                                </div>
                            </div>
                        </div>
                    </Link>)}
                </div>
                <div className="slider-prev d-flex justify-content-center align-items-center prevbtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor" className="slider-icon">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                    </svg>
                </div>
                <div className="slider-next d-flex justify-content-center align-items-center nextbtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor" className="slider-icon">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                    </svg>
                </div>
            </div>
        </div>
    </section>
        
    );
};
