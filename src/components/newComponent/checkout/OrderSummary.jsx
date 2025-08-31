import React from 'react'
import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Wine,
  ArrowLeft,
  Truck,
  Shield,
  Check,
  MapPin
} from "lucide-react";
function OrderSummary({subtotal,deliveryCharge,total,handleCheckout}) {
  return (
       <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 space-y-4 sticky top-24 shadow-sm">
              <h2 className="text-xl font-serif font-light text-[#2c2c2c] border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">Rs.{deliveryCharge.toFixed(2)}</span>
              </div>



              <div className="flex justify-between py-4 border-t border-gray-100">
                <span className="text-lg font-medium text-[#2c2c2c]">Total</span>
                <span className="text-lg font-medium text-[#2c2c2c]">Rs.{total.toFixed(2)}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCheckout()}
                className="w-full py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90"
              >
                Proceed To Payment
              </motion.button>

              <div className="mt-6 space-y-3 text-sm text-gray-500">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-[#8b5a2b]" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-[#8b5a2b]" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center">
                  <Wine className="h-4 w-4 mr-2 text-[#8b5a2b]" />
                  <span>Age verification required upon delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
  )
}

export default OrderSummary
   