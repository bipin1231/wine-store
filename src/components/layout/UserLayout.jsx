import React from 'react'
import { Outlet } from 'react-router-dom';  
import UserNavbar from '../navbar/UserNavbar';

function UserLayout() {
  return (
    <>
   <UserNavbar/>
   <Outlet/>
   </>
  )
}

export default UserLayout
