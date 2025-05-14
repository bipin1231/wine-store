import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, RouterProvider, BrowserRouter, createRoutesFromElements } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import UserRoutes from './components/routes/UserRoutes'
import AdminRoutes from './components/routes/AdminRoutes'


function App() {

  const userType = "admin"

  return (
    <BrowserRouter>
      <Routes>
{
  userType==="admin"?(

      <Route path='/*' element={<AdminRoutes />} />
  ):(
      <Route path='/*' element={<UserRoutes />} />
  )
}      

      </Routes>
    </BrowserRouter>




  )
}

export default App
