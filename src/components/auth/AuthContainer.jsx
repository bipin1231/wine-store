import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpVerification from "./OtpVerification";
import { useSignupMutation, useOtpVerificationMutation,useLoginMutation } from "../../redux/authApi";
import { useNavigate } from "react-router-dom";

const AuthContainer = () => {
  const [authMode, setAuthMode] = useState("login"); // "login", "signup", "otp"
  const [signupData, setSignupData] = useState({});
  
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [verifyOtp, { isLoading: isOtpLoading }] = useOtpVerificationMutation();
  const navigate=useNavigate();
  // Fast, snappy animations
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { opacity: 1 }
  };

  // Different animations for each form type
  const formVariants = {
    login: {
      hidden: { opacity: 0, y: 20, rotateX: 10, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1,
        transition: { duration: 0.2, ease: [0.19, 1.0, 0.22, 1.0] }
      },
      exit: { 
        opacity: 0, 
        y: -20, 
        rotateX: -10, 
        scale: 0.95,
        transition: { duration: 0.15 } 
      }
    },
    signup: {
      hidden: { opacity: 0, y: 20, rotateX: -5, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1,
        transition: { duration: 0.2, ease: [0.19, 1.0, 0.22, 1.0] }
      },
      exit: { 
        opacity: 0, 
        y: -20, 
        rotateX: 5, 
        scale: 0.95,
        transition: { duration: 0.15 } 
      }
    },
    otp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.25,
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      },
      exit: { 
        opacity: 0, 
        scale: 1.1,
        transition: { duration: 0.15 } 
      }
    }
  };

  const handleSignup = async (data) => {
    setSignupData(data);
    
    try {
      await signup(data).unwrap();
      setAuthMode("otp");
    } catch (error) {
      console.error("Signup failed:", error);
      // You could add toast notifications here
    }
  };

  const handleLogin = async (data) => {
    console.log("Login data:", data);
    try {
     const res= await login(data).unwrap();
     localStorage.setItem("token", res.token);
     console.log(res);
     
    console.log("login successfullllyyyy");
    navigate("/");
    } catch (error) {
      console.error("login failed:", error);
      // You could add toast notifications here
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
     const res= await verifyOtp({ email: signupData.email, otp }).unwrap();
      // Handle successful verification (redirect to dashboard, etc.)
      console.log(res);
      
      console.log("OTP verification successful");
    } catch (error) {
      console.error("OTP verification failed:", error);
      // You could add toast notifications here
    }
  };

  const handleResendOtp = async () => {
    if (signupData.email) {
      try {
        await signup(signupData).unwrap();
        console.log("OTP resent successfully");
      } catch (error) {
        console.error("Failed to resend OTP:", error);
      }
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  // Modern backdrop gradient that shifts based on auth mode
  const getBackdropStyle = () => {
    switch(authMode) {
      case "login":
        return "bg-gradient-to-br from-blue-50 to-indigo-100";
      case "signup":
        return "bg-gradient-to-br from-purple-50 to-pink-100";
      case "otp":
        return "bg-gradient-to-br from-green-50 to-emerald-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <motion.div 
      className={`flex items-center justify-center min-h-screen p-4 transition-colors duration-700 ${getBackdropStyle()}`}
      initial={false}
      animate={{ backgroundColor: authMode === "login" ? "#f3f4f6" : authMode === "signup" ? "#faf5ff" : "#ecfdf5" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md overflow-hidden relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layoutId="authContainer"
      >
        {authMode === "login" && (
          <motion.div
            key="login"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants.login}
          >
            <LoginForm 
              onSubmit={handleLogin} 
              onToggleMode={toggleAuthMode}
              isLoading={false}
            />
          </motion.div>
        )}
        
        {authMode === "signup" && (
          <motion.div
            key="signup"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants.signup}
          >
            <SignupForm 
              onSubmit={handleSignup} 
              onToggleMode={toggleAuthMode}
              isLoading={isSignupLoading}
            />
          </motion.div>
        )}
        
        {authMode === "otp" && (
          <motion.div
            key="otp"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants.otp}
          >
            <OtpVerification 
              length={4} 
              onSubmit={handleOtpSubmit} 
              onResend={handleResendOtp}
              isLoading={isOtpLoading}
            />
          </motion.div>
        )}
        
        {/* Interactive background elements */}
        <motion.div 
          className="absolute -z-10 w-64 h-64 rounded-full bg-opacity-30"
          style={{ 
            background: authMode === "login" ? "radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(0,0,0,0) 70%)" : 
                      authMode === "signup" ? "radial-gradient(circle, rgba(219,39,119,0.1) 0%, rgba(0,0,0,0) 70%)" :
                      "radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)"
          }}
          initial={{ bottom: -100, right: -100 }}
          animate={{ 
            bottom: authMode === "login" ? -80 : authMode === "signup" ? -100 : -120,
            right: authMode === "login" ? -50 : authMode === "signup" ? -100 : -80,
          }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="absolute -z-10 w-40 h-40 rounded-full bg-opacity-30"
          style={{ 
            background: authMode === "login" ? "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 70%)" : 
                      authMode === "signup" ? "radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(0,0,0,0) 70%)" :
                      "radial-gradient(circle, rgba(5,150,105,0.1) 0%, rgba(0,0,0,0) 70%)"
          }}
          initial={{ top: -60, left: -60 }}
          animate={{ 
            top: authMode === "login" ? -40 : authMode === "signup" ? -60 : -80,
            left: authMode === "login" ? -30 : authMode === "signup" ? -60 : -40,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AuthContainer;