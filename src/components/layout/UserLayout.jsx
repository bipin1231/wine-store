import React,{Suspense} from 'react'
import { Outlet } from 'react-router-dom';  
import UserNavbar from '../navbar/UserNavbar';
import Header from '../newComponent/Header';
import Footer from '../newComponent/Footer.jsx'
import Navbar from '../newComponent/Navbar.jsx';

function UserLayout() {
  return (
    <>
   <Header/>
<Navbar/>
 <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 text-lg font-medium">
              Loading page...
            </div>
          }
        >
          <Outlet />
        </Suspense>
   <Footer/>
   </>
  )
}

export default UserLayout
