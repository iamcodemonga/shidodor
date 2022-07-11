import React from 'react';
import  Sidebar from '../components/Sidebar';
import  Navbar from '../components/Navbar';
import  TopCards from '../components/Topcards';
import  Table from '../components/tables/DonationTable';
import  Footer from '../components/Footer';
import '../assets/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <div id='wrapper'>
          <Sidebar />
          <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <Navbar />
                <TopCards />
                <Table />
              </div>
              <Footer />
          </div>
      </div>
    </>
  )
}
