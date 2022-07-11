import React from 'react';
import  Sidebar from '../components/Sidebar';
import  Navbar from '../components/Navbar';
import  Footer from '../components/Footer';
import Table from '../components/tables/SongsTable';

export default function Songs() {
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
