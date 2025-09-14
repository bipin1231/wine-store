import React from "react";
import { useForm } from "react-hook-form";
import { Wine, Eye, EyeOff, Mail, Lock, User, Calendar, ArrowLeft } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SignupForm = ({ onSubmit,showPassword,setShowPassword}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,

  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
  
      // agreeToTerms: false,
      // ageVerification: false,
      // birthDate: "",
    },
  });

  const password = watch("password");

    const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";
  const buttonStyle =
    "bg-[#2c2c2c] text-white rounded-full px-6 py-3 transition-all hover:opacity-90 font-medium hover:shadow-lg";

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
             
                   <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="h-4 w-4 text-gray-400 absolute inset-y-0 left-0 pl-3 my-auto" />
                        <input
                          {...register("firstName", { required: true })}
                          className="pl-10 block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                          placeholder="First Name"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">First name required</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="h-4 w-4 text-gray-400 absolute inset-y-0 left-0 pl-3 my-auto" />
                        <input
                          {...register("lastName", { required: true })}
                          className="pl-10 block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                          placeholder="Last Name"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">Last name required</p>}
                      </div>
                    </div>
                  </motion.div>

                {/* Email */}
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

           
                  <>
                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="h-4 w-4 text-gray-400 absolute inset-y-0 left-0 pl-3 my-auto" />
                        <input
                          {...register("confirmPassword", {
                            required: true,
                            validate: (val) =>
                              val === watch("password") || "Passwords do not match",
                          })}
                        type={showPassword ? "text" : "password"}
                          className="pl-10 block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                          placeholder="Confirm Password"
                        />
                                            <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Birth Date */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="h-4 w-4 text-gray-400 absolute inset-y-0 left-0 pl-3 my-auto" />
                        <input
                          {...register("birthDate", { required: true })}
                          type="date"
                          className="pl-10 block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#8b5a2b] focus:border-[#8b5a2b]"
                        />
                        {errors.birthDate && <p className="text-red-500 text-xs mt-1">Birth date required</p>}
                      </div>
                    </div> */}

                    {/* Age Verification */}
                    {/* <div className="flex items-start">
                      <input
                        {...register("ageVerification", { required: true })}
                        type="checkbox"
                        className="h-4 w-4 mt-1 text-[#8b5a2b] border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        I verify that I am of legal drinking age in my location
                      </label>
                    </div>

                    {/* Terms */}
                    {/* <div className="flex items-start">
                      <input
                        {...register("agreeToTerms", { required: true })}
                        type="checkbox"
                        className="h-4 w-4 mt-1 text-[#8b5a2b] border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        I agree to the{" "}
                        <a href="#" className="text-[#8b5a2b] hover:text-[#a63f3f] font-medium">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#8b5a2b] hover:text-[#a63f3f] font-medium">
                          Privacy Policy
                        </a>
                      </label>
                    </div> */} 
                  </>
      



                {/* Submit */}
                <div>
                  <motion.button
                    type="submit"
                    className={`w-full ${buttonStyle}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
              Create Account
                  </motion.button>
                </div>
              </form>
    </>
  );
};

export default SignupForm;