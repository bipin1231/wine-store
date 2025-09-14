"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Wine, ArrowLeft, Clock, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ length = 4, onSubmit, onResend,setIsOtp }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (updatedOtp.every(digit => digit !== '') && onSubmit) {
      onSubmit(updatedOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      setOtp(updatedOtp);
      if (otp[index] === '' && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      // Fill the OTP array with pasted values
      const updatedOtp = [...otp];
      for (let i = 0; i < Math.min(length, newOtp.length); i++) {
        updatedOtp[i] = newOtp[i];
      }
      setOtp(updatedOtp);
      
      // Focus on the next empty field or last field
      const nextEmptyIndex = updatedOtp.findIndex(digit => digit === '');
      if (nextEmptyIndex !== -1) {
        inputsRef.current[nextEmptyIndex]?.focus();
      } else {
        inputsRef.current[length - 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setOtp(Array(length).fill(''));
    setTimer(30);
    inputsRef.current[0]?.focus();
    
    if (onResend) {
      await onResend();
    }
    
    setTimeout(() => setIsResending(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button 
            onClick={() => setIsOtp(false)}
            className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors group"
          >
            <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="text-xl font-bold flex items-center">
            <Wine className="text-[#a63f3f] mr-1 h-5 w-5" />
            <span className="text-[#2c2c2c]">Vino</span>
            <span className="text-[#a63f3f]">Selecto</span>
          </div>
          
          <div className="w-10"></div> {/* Spacer for balance */}
        </motion.header>

        {/* OTP Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-2">Verify Your Account</h2>
            <p className="text-sm text-gray-600">Enter the verification code sent to your email</p>
          </div>

          <div className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="w-14 h-14 text-center text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b5a2b] focus:border-transparent transition-all"
                />
              ))}
            </div>

            {/* Timer/Resend */}
            <div className="text-center">
              {timer > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center text-sm text-gray-600"
                >
                  <Clock size={16} className="mr-1" />
                  <span>Resend code in {timer} second{timer !== 1 && 's'}</span>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleResend}
                  disabled={isResending}
                  className="flex items-center justify-center mx-auto text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors disabled:opacity-50"
                >
                  <RotateCw size={16} className={`mr-1 ${isResending ? 'animate-spin' : ''}`} />
                  {isResending ? 'Sending...' : 'Resend Verification Code'}
                </motion.button>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSubmit && onSubmit(otp.join(''))}
              disabled={!otp.every(digit => digit !== '')}
              className="w-full py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify & Continue
            </motion.button>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-sm text-gray-600"
        >
          <p>Having trouble receiving the code?</p>
          <p className="mt-1">
            Check your spam folder or{' '}
            <button 
              onClick={handleResend}
              className="text-[#8b5a2b] hover:text-[#a63f3f] font-medium transition-colors"
            >
              try another method
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OtpVerification;