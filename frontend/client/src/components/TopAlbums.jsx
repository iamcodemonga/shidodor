import React from 'react';
import { Link } from 'react-router-dom'

export default function TopAlbums( { albums }) {

    const { REACT_APP_API_ROOT } = process.env;

    return (
        <section id="albums">
            <div className="container">
                <h4 className="mb-5">Top Albums</h4>
                <div className="row gx-5 gy-5">
                    {albums && albums.map((album, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3" key={album.id}>
                        <Link className="album-card-link" to={`/album/${album.uid}`}>
                            <div className="album-card">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="album-card-icon">
                                    {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                                    <path d="M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z" />
                                </svg>
                                <img className="w-100 h-100" src={`${REACT_APP_API_ROOT}/${album.art}`} alt='Top_album'/>
                                <div className="album-overlay p-3 d-flex align-items-end">
                                    <div>
                                        <p className="mb-1">{album.title}</p>
                                        <p className="text_small text-white-50">{album.songs} songs</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>)}
                </div>
                <p className="mt-4">
                    <Link className="btn btn-dark border rounded-pill border-0 see-all-btn px-3" role="button" to="/albums">View Albums</Link>
                </p>
            </div>
        </section>
    )
}
