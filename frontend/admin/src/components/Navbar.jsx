import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import '../assets/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle'

export default function Navbar() {

    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const { REACT_APP_API_ROOT } = process.env;

    const [ sidebar, setSidebar ] = useState(true);

    const handleSidebar = () => {
            if (sidebar){
                document.querySelector('.sidebar').classList.add('toggled');
                setSidebar(false);
            } else {
                document.querySelector('.sidebar').classList.remove('toggled');
                setSidebar(true);
            }
        }

    const handleLogout = () => {

        // console.log('out')
        axios.delete(`${REACT_APP_API_ROOT}/auth/logout`, { withCredentials: true })
            .then((response) => {
                if (response.data[0].status === 'ok') {
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                    // <Navigate to="/login" />
                    // console.log(response.data[0].message)
                }
                // console.log(response)
            })
            .catch((error) => console.log(error.message))
    }

  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div className="container-fluid">
            <button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button" onClick={handleSidebar}><i className="fas fa-bars" /></button>
            <ul className="navbar-nav flex-nowrap ms-auto">
                <div className="d-none d-sm-block topbar-divider" />
                <div className="nav-link"><span style={{cursor: 'pointer'}} className="d-lg-inline me-2 text-gray-600 small" onClick={handleLogout}>Logout</span>
                </div>
                {/* <li className="nav-item dropdown no-arrow">
                    <div className="nav-item dropdown no-arrow">
                        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="/"><span className="d-none d-lg-inline me-2 text-gray-600 small">Logout</span>
                        </a>
                    </div>
                    <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                        <a className="dropdown-item" href="profile"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />&nbsp;Profile</a>
                        <a className="dropdown-item" href="profile"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />&nbsp;Settings</a>
                    <div className="dropdown-divider" />
                        <a className="dropdown-item" href="/"><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />&nbsp;Logout</a>
                    </div>
                </li> */}
            </ul>
        </div>
    </nav>

  )
}
