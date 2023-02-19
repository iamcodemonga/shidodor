import React from 'react';
import  Sidebar from '../components/Sidebar';
import Content from '../components/ProfileContent'
import  Navbar from '../components/Navbar';
import  Footer from '../components/Footer';
import '../assets/css/bootstrap.min.css';

export default function Profile() {

  return (
    <>
      <div id='wrapper'>
          <Sidebar />
          <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <Navbar />
                <Content />
              </div>
              <Footer />
          </div>
      </div>
    </>
  )
}
