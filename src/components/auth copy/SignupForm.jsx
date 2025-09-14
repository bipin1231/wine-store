import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";

const SignupForm = ({ onSubmit, onToggleMode, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
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
          placeholder="Create a password"
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

        <FormInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          register={register}
          rules={{
            required: "Please confirm your password",
            validate: value => value === password || "Passwords do not match"
          }}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </>
  );
};

export default SignupForm;