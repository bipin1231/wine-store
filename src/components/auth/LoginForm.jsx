import React from "react";
import { useForm } from "react-hook-form";
import { Wine, Eye, EyeOff, Mail, Lock, User, Calendar, ArrowLeft } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ onSubmit, showPassword,setShowPassword }) => {

  //React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
    const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";
  const buttonStyle =
    "bg-[#2c2c2c] text-white rounded-full px-6 py-3 transition-all hover:opacity-90 font-medium hover:shadow-lg";

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="h-4 w-4 text-gray-400 absolute inset-y-0 left-0 pl-3 my-auto" />
            <input
              {...register("email", { required: true })}
              type="email"
              className="pl-10 block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
              placeholder="Email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email required</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="h-4 w-4 text-gray-400 absolute inset-y-0 left-0 pl-3 my-auto" />
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10 block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="h-4 w-4 text-[#8b5a2b] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Remember me</label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-[#8b5a2b] hover:text-[#a63f3f]">
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <motion.button
            type="submit"
            className={`w-full ${buttonStyle}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
           Sign in
          </motion.button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;