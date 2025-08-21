import React from 'react'
import { Outlet } from 'react-router-dom';  
import UserNavbar from '../navbar/UserNavbar';
import Header from '../newComponent/Header';
import Footer from '../newComponent/Footer.jsx'

function UserLayout() {
  return (
    <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default UserLayout
