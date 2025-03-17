import React from 'react'
import Home from '../Pages/Home'
import Navbar from '../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Login from '../components/LoginReg/Login'
import Register from '../components/LoginReg/Register'
import UserProfile from '../components/Profile/UserProfile'
import AboutUs from '../components/AboutUs/AboutUs'
import Contact from '../components/Contact/Contact'
import Ride from '../components/Rides/Ride'

function UserRoutes() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/ride" element={<Ride/>} />
        {/* <Route path="/admin-login" element={<AdminLoginForm/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/contact" element={<ContactUs/>} />
                <Route path="/about" element={<About/>} />
                
                <Route path="/showdataset" element={<ShowDataset/>} />
                <Route path="/2dchart/:id" element={<Graph2D/>} />
                <Route path="/3dgraph/:id" element={<Graph3D/>} /> */}
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default UserRoutes
