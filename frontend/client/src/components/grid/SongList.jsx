import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SongList({songs, total}) {

    const { REACT_APP_API_ROOT } = process.env;
    const [ limit, setLimit ] = useState(4);
    const [ query, setQuery ] = useState('');

    const handleMore = () => {
        setLimit(prevLimit => prevLimit+4)
    }

    const handleSearch = (data) => {
        return data.filter((d) => d.title.toLowerCase().includes(query))
    }

    return (
        <section className="content-wrapper">
            <div className="container">
                {/* <form className="my-5"> */}
                    <input className="form-control my-5" type="text" name="find-song" placeholder="Search song here" onChange={ (e) => setQuery(e.target.value) } />
                {/* </form> */}
                <div className="row gx-5 gy-5">
                    {handleSearch(songs) && handleSearch(songs).slice(0, limit).map((song, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3" key={song.id}>
                        <Link className="song-card-link" to={`/song/${song.uid}`}>
                            <div className="song-card-B">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="song-card-icon">
                                    {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                                    <path d="M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z" />
                                </svg>
                                <img className="w-100 h-100" src={`${REACT_APP_API_ROOT}/${song.art}`} alt='song'/>
                                <div className="song-overlay p-3 d-flex align-items-end">
                                    <div>
                                        <p className="mb-1">{ song.title }</p>
                                        <p className="text_small text-white-50">{ song.length}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>)}
                </div>
                <p className="mt-5 text-center">
                    {handleSearch(songs).length > 0 ? <button className="btn btn-dark btn-lg border-0 see-all-btn px-4" type="button" onClick={handleMore}>load songs</button> : ''}
                </p>
            </div>
        </section>
    )
}
