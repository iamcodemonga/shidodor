import React from 'react';
import Form from '../components/DonateSection';
import '../resources/css/donate.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function Donate() {
    return (
        <>
            <Topbar />
            <Form />
            <Footer />
        </>
    )
}
