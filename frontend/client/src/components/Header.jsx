import React from 'react';
import { Link } from 'react-router-dom'
import '../resources/css/barner.css'

export default function Header({ title, inActiveLink }) {
    return (
        <header id="barner">
            <img src="https://images.pexels.com/photos/761543/pexels-photo-761543.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="blank" />
            <div className="barner-overlay">
                <div className="barner-content px-4">
                    <h1>{ title }</h1>
                    <ol className="breadcrumb mx-2">
                        <li className="breadcrumb-item">
                            <Link to="/"><span>Home</span></Link>
                        </li>
                        <li className="breadcrumb-item active">
                            <span>{ inActiveLink }</span>
                        </li>
                    </ol>
                </div>
            </div>
        </header>


    )
}
