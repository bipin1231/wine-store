// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { usePaymentSuccessQuery } from "../../../redux/paymentApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCheckoutProduct } from "../../../redux/productsSlice";
import { Link } from "react-router-dom"


const PaymentSuccess = () => {

    const dispatch = useDispatch();

    dispatch(clearCheckoutProduct())
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");

    

    const {data,isLoading,error}=usePaymentSuccessQuery(encodedData)

    

  if (isLoading) return <div className="p-6">Processing payment...</div>;
  if(error) return <div>Cant veryify the payment</div>

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Payment Result</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <p>
          <strong>Status:</strong>{" "}
          <span
          >
          {data?.message}
          </span>
                    <span
          >
          {data?.data}
          </span>
        </p>

      </div>
      <Link to={"/"}>
           
          Continue Shopping

        </Link>
      
    </div>
  );
};

export default PaymentSuccess;
