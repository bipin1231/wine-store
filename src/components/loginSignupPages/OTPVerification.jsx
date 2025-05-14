import React, { useState, useRef, useEffect } from 'react';

const OTPVerification = ({ length = 6, onSubmit, onResend }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

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
    }
  };

  const handleResend = () => {
    setOtp(Array(length).fill(''));
    setTimer(30);
    inputsRef.current[0]?.focus();
    if (onResend) onResend();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {timer > 0 ? (
        <p className="text-gray-500">Resend OTP in {timer} second{timer !== 1 && 's'}</p>
      ) : (
        <button
          onClick={handleResend}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OTPVerification;
