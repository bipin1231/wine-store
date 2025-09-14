"use client";
import React, { useState, useRef } from "react";
import { Wine, ArrowLeft } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpVerification from "./OtpVerification";
import { useSignupMutation, useOtpVerificationMutation, useLoginMutation } from "../../redux/authApi";
import { setUserInfo } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const [signupData, setSignupData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [verifyOtp, { isLoading: isOtpLoading }] = useOtpVerificationMutation();

  const handleLoginSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res));
      console.log(res);
      
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed!");
    }
  };

  const handleSignupSubmit = async (data) => {
    setSignupData(data);
    try {
      await signup(data).unwrap();
      setIsOtp(true);
      toast.success("Signup successful! Please verify OTP.");
    } catch (error) {
      toast.error(error?.data?.message || "Signup failed!");
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      await verifyOtp({ email: signupData.email, otp }).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/auth");
    } catch (error) {
      toast.error(error?.data?.message || "OTP verification failed!");
    }
  };

  const handleResendOtp = async () => {
    if (signupData.email) {
      try {
        await signup(signupData).unwrap();
        toast.success("OTP resent successfully!");
      } catch (error) {
        toast.error("Failed to resend OTP!");
      }
    }
  };

  const handleGoogleLogin=async()=>{
    window.location.href = "http://localhost:8080/oauth2/authorization/google";

  }

  const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";

  // Spinner Component
  const Spinner = () => (
    <div className="flex items-center justify-center mt-4">
      <div className="w-6 h-6 border-2 border-t-transparent border-[#8b5a2b] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col ${baseBg} ${baseText} font-sans overflow-hidden relative`}
      ref={containerRef}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* Header */}
      {!isOtp && (
        <header className="sticky top-0 z-50 py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate("/")}
              className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors group"
            >
              <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Back To Home
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xl font-bold flex items-center"
            >
              <Wine className="text-[#a63f3f] mr-1 h-5 w-5" />
              <span className="text-[#2c2c2c]">Vino</span>
              <span className="text-[#a63f3f]">Selecto</span>
            </motion.div>

            <div className="w-10"></div>
          </div>
        </header>
      )}

      {/* Centered Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {!isOtp && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex border-b border-gray-200 mb-8 relative"
            >
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                  isLogin ? "text-[#8b5a2b]" : "text-gray-500 hover:text-[#8b5a2b]"
                }`}
              >
                Sign In
                {isLogin && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5a2b]"
                    layoutId="authIndicator"
                  />
                )}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                  !isLogin ? "text-[#8b5a2b]" : "text-gray-500 hover:text-[#8b5a2b]"
                }`}
              >
                Create Account
                {!isLogin && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5a2b]"
                    layoutId="authIndicator"
                  />
                )}
              </button>
            </motion.div>
          )}

          {/* Forms */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? (
                <>
                  <LoginForm
                    onSubmit={handleLoginSubmit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                  {isLoginLoading && <Spinner />}
                </>
              ) : !isOtp ? (
                <>
                  <SignupForm
                    onSubmit={handleSignupSubmit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                  {isSignupLoading && <Spinner />}
                </>
              ) : (
                <>
                  <OtpVerification
                    onSubmit={handleOtpSubmit}
                    onResend={handleResendOtp}
                    setIsOtp={setIsOtp}
                  />
                  {isOtpLoading && <Spinner />}
                </>
              )}
              {!isOtp && (
      <>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#f8f7f4] text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-full border border-gray-200 hover:border-[#a63f3f] hover:text-[#a63f3f] transition"
              onClick={()=>handleGoogleLogin()}
            >
              <FaGoogle />
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-full border border-gray-200 hover:border-[#8b5a2b] hover:text-[#8b5a2b] transition"
            >
              <FaFacebook />
            </motion.button> */}
          </div>
        </div>

        {/* Switch between Sign In / Sign Up */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="font-medium text-[#8b5a2b] hover:text-[#a63f3f]"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </motion.p>
      </>
    )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
