import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserRoutes from './components/routes/UserRoutes';
import AdminRoutes from './components/routes/AdminRoutes';
import { setUserInfo, clearUserInfo } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { useGetCurrentUserQuery } from './redux/authApi';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetCurrentUserQuery();
  const [userType, setUserType] = useState("user");

  useEffect(() => {
    if (isSuccess && data?.data) {
      setUserType(data.data.role);
      dispatch(setUserInfo(data.data));
    } else {
      dispatch(clearUserInfo());
    }
  }, [isSuccess, data, dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {userType?.toLowerCase() === "admin" ? (
          <Route path="/*" element={<AdminRoutes />} />
        ) : (
          <Route path="/*" element={<UserRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
