import React from 'react'
import HomePage from './components/HomePage'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout
