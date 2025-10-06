import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="w-16 h-16 bg-[#a63f3f] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.4
            }}
          >
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Login Successful
          </h2>
          <p className="text-gray-500 text-sm">
            Taking you home...
          </p>
        </motion.div>

        {/* Simple loading bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="h-0.5 bg-[#a63f3f] rounded-full max-w-xs mx-auto mt-4"
        />
      </div>
    </div>
  );
};

export default LoginSuccess;