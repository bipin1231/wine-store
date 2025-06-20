import React from 'react'
import { Outlet } from 'react-router-dom';  
import UserNavbar from '../navbar/UserNavbar';
import Header from '../newComponent/Header';

function UserLayout() {
  return (
    <>
   <Header/>
   <Outlet/>
   </>
  )
}

export default UserLayout
