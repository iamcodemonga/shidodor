import React from 'react';
import Header from '../components/Header';
import Biography from '../components/Biography';
import '../resources/css/about.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function About() {
    return (
        <>
            <Topbar />
            <Header title="ABOUT ME" inActiveLink="About" />
            <Biography />
            <Footer />
        </>
    )
}
