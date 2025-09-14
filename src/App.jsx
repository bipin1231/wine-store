import React, { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, RouterProvider, BrowserRouter, createRoutesFromElements } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import UserRoutes from './components/routes/UserRoutes'
import AdminRoutes from './components/routes/AdminRoutes'
import { setUserInfo,clearUserInfo } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from './redux/authApi'
import { ToastContainer } from "react-toastify";


function App() {

   const dispatch = useDispatch();
  const { data, isSuccess,error } = useGetCurrentUserQuery();
  console.log("fsfsdfsdfsdfsf",data);


  useEffect(() => {
if (isSuccess) {

  
    dispatch(setUserInfo(data.data));
}else{
  dispatch(clearUserInfo())
}


  }, [ isSuccess,error,data, dispatch]);

  const userType = "user"

  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={2000} />
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
