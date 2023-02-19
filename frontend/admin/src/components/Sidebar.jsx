import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../assets/css/bootstrap.min.css';
// import '../assets/js/theme';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../App.css';

export default function Sidebar() {

    const [ sidebar, setSidebar ] = useState(true);
    
    // const media = window.matchMedia("(max-width: 767px)")

    // useEffect(() => {
    //     if (media.matches) {
    //         console.log(sidebar)
    //         document.querySelector('.sidebar').classList.add('toggled');
    //     } else {
    //         console.log(sidebar)
    //         setSidebar(true);
    //         document.querySelector('.sidebar').classList.remove('toggled');
    //     }
    // }, [media, sidebar])

    const handleSidebar = () => {

        if (sidebar) {
            document.querySelector('.sidebar').classList.add('toggled');
            setSidebar(false);
        } else {
            document.querySelector('.sidebar').classList.remove('toggled');
            setSidebar(true);
        }

    }

  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div className="container-fluid d-flex flex-column p-0">
            <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" to="/">
                <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-database" /></div>
                <div className="sidebar-brand-text mx-3"><span>ADMIN</span></div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <ul className="navbar-nav text-light" id="accordionSidebar">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em" height="1em" fill="currentColor" className="mb-1 me-1">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M511.8 287.6L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6L511.8 287.6z" />
                    </svg><span>Dashboard</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/songs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="mb-1 me-1">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM224 256V160H64V256H224zM64 320V416H224V320H64zM288 416H448V320H288V416zM448 256V160H288V256H448z" />
                    </svg><span>Songs</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/videos">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="mb-1 me-1">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM224 256V160H64V256H224zM64 320V416H224V320H64zM288 416H448V320H288V416zM448 256V160H288V256H448z" />
                    </svg><span>Videos</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/albums">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="mb-1 me-1">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM224 256V160H64V256H224zM64 320V416H224V320H64zM288 416H448V320H288V416zM448 256V160H288V256H448z" />
                    </svg><span>Albums</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/upload">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" className="mb-1 me-1">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M105.4 182.6c12.5 12.49 32.76 12.5 45.25 .001L224 109.3V352c0 17.67 14.33 32 32 32c17.67 0 32-14.33 32-32V109.3l73.38 73.38c12.49 12.49 32.75 12.49 45.25-.001c12.49-12.49 12.49-32.75 0-45.25l-128-128C272.4 3.125 264.2 0 256 0S239.6 3.125 233.4 9.375L105.4 137.4C92.88 149.9 92.88 170.1 105.4 182.6zM480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z" />
                    </svg><span>Upload</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 512 512" width="1em" height="1em" fill="currentColor" className="mb-1 me-1">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                    </svg><span>Profile</span>
                </NavLink>
            </li>
            </ul>
            <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button" onClick={handleSidebar} /></div>
        </div>
    </nav>

  )
}
