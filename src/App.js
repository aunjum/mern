
import './App.css';
import WelcomePanel from './Components/WelcomeComponents/WelcomePanel';
import React,{useState} from 'react'
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from './Components/WelcomeComponents/HomePanel';
import AdminDashboard from './Components/DashboardComponents/AdminDashboard';
import SuperAdminDashboard from './Components/DashboardComponents/SuperAdminDashboard';
import Registration from './Components/WelcomeComponents/RegistrationPanel';
import Login from './Components/WelcomeComponents/LoginPanel';
import UserDashboard from './Components/DashboardComponents/UserDashboard';
import TrackBoard from './Components/TrackBoardComponents';
import AdminProfile from './Components/ProfileComponents/AdminProfile'
// import QrCode from './Components/QrCode';
import RecordTableView from './Components/TrackBoardComponents/TrackBoradTable/DeviceRecordComponents/RecordTableView';


function App() {
 
  return (
    <>
    
      <Router>
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/registration/:token"  element={<Registration/>}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/superAdminDashboard" element={<SuperAdminDashboard/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/trackBoard" element={<TrackBoard/>}/>
        <Route path="/adminProfile" element={<AdminProfile/>}/>
        {/* <Route path="/qr" element={<QrCode/>}/> */}
        <Route path="/viewTrackRecord" element={<RecordTableView/>}/>
        
       
      </Routes>
   
    </Router>
   
    </>
  );
}

export default App;
