import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";

const LoginForm = ({ onSubmit, onToggleMode, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />

        <FormInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
};

export default LoginForm;