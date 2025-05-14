import React, { useState,useRef } from "react";
import { useForm } from "react-hook-form";
import {useOtpVerificationMutation, useSignupMutation} from "../../redux/authApi";
import OTPVerification from "./OtpVerification";
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const [signupData,setSignupData]=useState({});

  const[signup]=useSignupMutation();
  const[otpVerification]=useOtpVerificationMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setSignupData(data);

    console.log(isLogin ? "Login data:" : "Signup data:", data);
    if(!isLogin){
      console.log("sending data..........");
      
    await signup(data)
        .unwrap()
        .then(() => setIsOtp(true))
        .catch((e) => console.log
        ("something went wrong",e));
    }
    //reset();
  };
  const handleOtpSubmit= async (data)=>{
    console.log(data);
    
    
    console.log("verifying otp");
    await otpVerification({email:signupData.email,otp:data})
    .unwrap()
    .then(() => setIsOtp(true))
    .catch((e) => console.log
    ("something went wrong",e));
    
    
  }

  const handleResendOtp =async () => {
    if(signupData){
      await signup(signupData)
      .unwrap()
      .then(() => setIsOtp(true))
      .catch((e) => console.log
      ("something went wrong",e));
    }
 

  };


  return (
  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isOtp?
       <OTPVerification length={4} onSubmit={handleOtpSubmit} onResend={handleResendOtp}  />:
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format"
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

       

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
}
    </div>
  );
}
