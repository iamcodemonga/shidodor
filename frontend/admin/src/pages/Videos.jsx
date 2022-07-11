import React from 'react';
import  Sidebar from '../components/Sidebar';
import  Navbar from '../components/Navbar';
import  Table from '../components/tables/VideosTable';
import  Footer from '../components/Footer';

export default function Videos() {
  return (
    <>
      <div id='wrapper'>
          <Sidebar />
          <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <Navbar />
                <Table />
              </div>
              <Footer />
          </div>
      </div>
    </>
  )
}
