import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactSection';
import '../resources/css/contact.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

export default function Contact() {
    return (
      <>
        <Topbar />
        <Header title="CONTACT ME" inActiveLink="Contact"/>
        <ContactForm  />
        <Footer />
      </>
    )
}
