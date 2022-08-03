import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../resources/css/navbar.css';

export default function Topbar() {
    return (
      <nav className="navbar navbar-light navbar-expand-lg sticky-top py-3">
        <div className="container">
          {/* <a className="navbar-brand" href="/" >CHIDODO</a> */}
          <Link className="navbar-brand" to="/" >SHIDODOR</Link>
          <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="toggler-icon">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/songs" >Songs</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/albums" >Albums</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/videos" >Videos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" >Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" >About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
