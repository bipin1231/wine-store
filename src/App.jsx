import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserRoutes from './components/routes/UserRoutes';
import AdminRoutes from './components/routes/AdminRoutes';
import { setUserInfo, clearUserInfo } from './redux/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from './redux/authApi';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const userTypeAfterLogin=useSelector(state=>state.users.userInfo?.data?.role)
 const { data, isSuccess } = useGetCurrentUserQuery({
  skip:userTypeAfterLogin
 });
  const [userType, setUserType] = useState("user");
  console.log("app.jsx from backend",data);
  console.log("userTypeAfterLogin",userTypeAfterLogin);
  
  


  useEffect(() => {
    if(userTypeAfterLogin){
      setUserType(userTypeAfterLogin)
      return;
    }
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
