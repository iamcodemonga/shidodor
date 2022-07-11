import React from 'react';
import  Sidebar from '../components/Sidebar';
import Content from '../components/UploadContent'
import  Navbar from '../components/Navbar';
import  Footer from '../components/Footer';

export default function Upload() {
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
