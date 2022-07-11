import './App.css';
import './assets/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap'
import React from 'react'
import { useAuthContext } from './hooks/useAuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import  Home from './pages/Home';
import  Albums from './pages/Albums';
import  Songs from './pages/Songs';
import  Videos from './pages/Videos';
import  Profile from './pages/Profile';
import  Login from './pages/Login';
import  Upload from './pages/Upload';
import  NotFound from './pages/NotFound';
// import  Test from './pages/Test';

function App() {

  const { isReady, user } = useAuthContext();

  return (
    <div className="App">
      {isReady && (
        <Routes>
          {user ? <Route path="/" element={<Home />} />  :  <Route path="/" element={<Navigate to='/login' />} /> }
          {user ? <Route path="/songs" element={<Songs />} />  :  <Route path="/songs" element={<Navigate to='/login' />} /> }
          {user ? <Route path="/videos" element={<Videos />} />  :  <Route path="/videos" element={<Navigate to='/login' />} /> }
          {user ? <Route path="/albums" element={<Albums />} />  :  <Route path="/albums" element={<Navigate to='/login' />} /> }
          {user ? <Route path="/upload" element={<Upload />} />  :  <Route path="/upload" element={<Navigate to='/login' />} /> }
          {user ? <Route path="/profile" element={<Profile />} />  :  <Route path="/profile" element={<Navigate to='/login' />} /> }
          {!user ? <Route path="/login" element={<Login />} />  :  <Route path="/login" element={<Navigate to='/' />} /> }
          {user && <Route path="*" element={<NotFound />} /> }
        </Routes>
      )}
      
    </div>
  );
}

export default App;
