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
  const userTypeAfterLogin=useSelector(state=>state.users.userInfo?.data?.role);
  
  const { data, isSuccess } = useGetCurrentUserQuery({
    skip: userTypeAfterLogin
  });

  const [userType, setUserType] = useState("user");
  const [showRenderMsg, setShowRenderMsg] = useState(true); // 👈 NEW STATE

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

      {/* 🔥 Render free-tier warning message */}
      {showRenderMsg && (
        <div
          style={{
            background: "#fffae6",
            border: "1px solid #e0c769",
            padding: "12px 16px",
            margin: "10px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6a5500",
            fontSize: "14px"
          }}
        >
          <span>
            ⚠️ Backend is hosted on Render free tier. It may take 3–10 minutes to wake up.
          </span>

          <button
            onClick={() => setShowRenderMsg(false)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#6a5500",
              fontWeight: "bold"
            }}
          >
            ×
          </button>
        </div>
      )}

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
