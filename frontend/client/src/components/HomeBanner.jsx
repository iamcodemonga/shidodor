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
                    <h1>WELCOME TO OFFICIAL SHIDODOR MUSIC WEBSITE</h1>
                    <p className="my-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
                    <Link className="btn btn-success" role="button" to="/songs">Get Songs!</Link>
                </div>
            </div>
        </header>

    )
}
