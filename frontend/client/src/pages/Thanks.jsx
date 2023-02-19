import React from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function Thanks() {
    return (
        <>
            <Topbar />
            <section className="vh-100 w-100 d-flex justify-content-center align-items-center">
                <div className="px-3" style={{maxWidth: 700}}>
                    <h1 style={{color: 'var(--Accent)'}}>THANK YOU!</h1>
                    <p className="mb-4">We have sent you an email message containing a link to the file, follow the link and download the music! If you are using Gmail? You might as well check your spam folder if you can't find the message in your inbox. We appreciate your donation, God bless you.</p>
                    <Link className="btn btn-success" role="button" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor" className="me-1">
                            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                            <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
                        </svg>Back to home
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    )
}
