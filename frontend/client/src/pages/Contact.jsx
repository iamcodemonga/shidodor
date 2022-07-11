import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactSection';
import '../resources/css/contact.css';
import Topbar from '../components/Topbar';

export default function Contact() {
    return (
      <>
        <Topbar />
        <Header title="CONTACT ME" inActiveLink="Contact"/>
        <ContactForm  />
      </>
    )
}
