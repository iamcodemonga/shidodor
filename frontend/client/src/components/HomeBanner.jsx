import React from 'react'
import { Link } from 'react-router-dom'
import "../resources/css/barner.css";
import HeroImg from "../resources/img/homebanner.jpg";

export default function HomeBanner() {
    return (
        <header id="hero">
            {/* <img src="https://images.pexels.com/photos/761543/pexels-photo-761543.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="legend" /> */}
            <img src={HeroImg} alt="legend" />
            <div className="hero-overlay">
                <div className="hero-content px-4">
                    <h2 className="coloured-h2">YOU ARE WELCOME TO SHIDODOR  NWANKANU MUSIC WORLDWIDE</h2>
                    <p className="my-4">The best platform for cultural entertainment services, download all our recent and old album here. Contact and book us for advertisements and events entertainment show.</p>
                    <Link className="btn btn-success" role="button" to="/songs">Get Songs!</Link>
                </div>
            </div>
        </header>

    )
}
