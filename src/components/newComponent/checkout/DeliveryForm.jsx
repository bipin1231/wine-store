import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  MapPin
} from "lucide-react";
import { FaEdit } from "react-icons/fa";
function DeliveryForm({ onSubmit, isEditing, setIsEditing, defaultValues,deliveryInfo }) {

  const { register, handleSubmit, watch, setValue ,reset} = useForm({
    defaultValues,
  });

    // ✅ Whenever defaultValues change, reset form with them
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  
  

  // const customerInfo = watch(); // Get current form values
  return (

    <>
      {/* Delivery Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-light text-[#2c2c2c] border-b border-gray-100 pb-3">
            Delivery Information
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#8b5a2b] hover:opacity-70 transition flex items-center gap-2 text-sm"
            >
              <FaEdit /> Edit
            </button>
          ) :(

            deliveryInfo &&
            <button
              onClick={() => setIsEditing(false)}
              className="text-[#8b5a2b] hover:opacity-70 transition flex items-center gap-2 text-sm"
            >
              cancel
            </button>
  )
          }
        </div>

        {isEditing ? (
          <>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("firstName", { required: true })} placeholder="First Name" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]" />
                <input {...register("lastName", { required: true })} placeholder="Last Name" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <input {...register("email", { required: true })} placeholder="Email" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]" /> */}
                <input
                 {...register("mobileNo", { required: true })} placeholder="Phone" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]" 
                 />
              </div>
              <input
               {...register("address", { required: true })} placeholder="Address" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]"
               defaultValue={defaultValues.address}
               />
              <div className="grid grid-cols-2 gap-4">
                {/* <input {...register("city", { required: true })} placeholder="City" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]" /> */}
                {/* <input {...register("zipCode", { required: true })} placeholder="ZIP Code" className="w-full px-3 py-2 border rounded-lg focus:ring-[#8b5a2b]" /> */}
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2 bg-[#2c2c2c] text-white rounded-full hover:opacity-90 transition">Save</button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-start gap-3">
            <MapPin className="text-[#8b5a2b] mt-1" />
            <div>
              <p className="font-medium">{defaultValues.firstName} {defaultValues.lastName}</p>
              <p className="text-gray-600">{defaultValues.address}</p>
              {/* <p className="text-gray-600">{customerInfo.city}</p>
              <p className="text-gray-600">Nepal - {customerInfo.zipCode}</p> */}
              <p className="text-gray-600 mt-2">Phone: {defaultValues.mobileNo}</p>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default DeliveryForm
