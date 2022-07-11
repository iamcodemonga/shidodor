import React from 'react'
import { Link } from 'react-router-dom';

export default function Prebanner() {
    return (
        <section id="parallax-section">
            <img src="https://images.pexels.com/photos/1046466/pexels-photo-1046466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="morevideos"/>
            <div className="parallax-overlay">
                <div className="parallax-content px-4">
                    <h1>DOWNLOAD MY MUSIC VIDEOS HERE</h1>
                    <Link className="btn btn-success" role="button" to="/videos">Get Videos!</Link>
                </div>
            </div>
        </section>

    )
}
