"use client";
import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wine,
  ArrowLeft,
  CreditCard,
  DollarSign,
  Smartphone,
  Shield,
  Truck,
  Check,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlaceOrderDirectlyMutation } from "../../redux/orderApi";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { checkoutProduct } = useSelector((state) => state.products);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.userInfo);
  const userId = userInfo?.id;

  const [placeOrderDirectlyMutation]=usePlaceOrderDirectlyMutation()
  // calculate subtotal
  const subtotal = checkoutProduct.reduce(
    (total, p) => total + p.quantity * p.sellingPrice,
    0
  );

  // example fixed delivery charge (optional)
  const deliveryCharge = 100;

  const total = subtotal + deliveryCharge;

  const handlePayment =async () => {
    console.log(checkoutProduct);
    
    if(checkoutProduct.length==1){
    const payload={
      userId:userId,
      productId:checkoutProduct[0].productId,
      productVariantId:checkoutProduct[0].productSizeId,
      quantity:checkoutProduct[0].quantity,
      deliveryCharges:100,
      paymentType:selectedPayment,

    }
    console.log("data to send",payload);
    
try {
  const result = await placeOrderDirectlyMutation(payload).unwrap();
    toast.success("Order Placed Successfully");
    setOrderComplete(true);
} catch (err) {
  console.error("Order failed:", err);
  toast.error("Order failed: " + err?.data?.message || "Something went wrong");
}

    } 
    


  
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#f8f7f4]">
        <header className="sticky top-0 z-50 py-4 px-6 bg-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold flex items-center">
              <Wine className="text-[#a63f3f] mr-2" />
              <span className="text-[#2c2c2c]">Vino</span>
              <span className="text-[#a63f3f]">Selecto</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-light text-[#2c2c2c] mb-4">
              Payment Successful
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your payment has been processed successfully.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Order #: VS-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
    

      <main className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-serif font-light text-[#2c2c2c]">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600 mt-2">Review your order and select payment method</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/5"
          >
            <h2 className="text-xl font-serif font-light text-[#2c2c2c] mb-6 pb-2 border-b border-gray-200">
              Order Summary
            </h2>

            <div className="space-y-6 mb-6">
              {checkoutProduct.map((p) => (
                <div
                  key={p.productSizeId}
                  className="flex items-center justify-between pb-6 border-b border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg">
                      <img
                        src={p.imageUrl[0]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2c2c2c]">
                        {p.name}
                      </h3>
                      <p className="text-sm text-[#8b5a2b] mt-1">{p.size}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {p.quantity} × Rs. {p.sellingPrice}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-[#2c2c2c]">
                    Rs. {p.quantity * p.sellingPrice}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>Rs. {deliveryCharge}</span>
              </div>

              <div className="flex justify-between text-lg font-medium text-[#2c2c2c] pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Truck className="h-4 w-4 mr-2 text-[#8b5a2b]" />
              <span>Estimated delivery: 2-3 business days</span>
            </div>
          </motion.div>

          {/* Payment Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-3/5"
          >
            <h2 className="text-xl font-serif font-light text-[#2c2c2c] mb-6 pb-2 border-b border-gray-200">
              Payment Method
            </h2>

            <div className="space-y-4 mb-6">
              {/* Card Payment Option */}
              {/* <div
                className={`p-5 cursor-pointer transition-all ${
                  selectedPayment === "card" 
                    ? "bg-[#f8f7f4] rounded-lg" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPayment("card")}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${
                    selectedPayment === "card" 
                      ? "border-[#8b5a2b] bg-[#8b5a2b]" 
                      : "border-gray-300"
                  }`}>
                    {selectedPayment === "card" && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <CreditCard className="h-5 w-5 mr-2 text-[#8b5a2b]" />
                  <span className="font-medium text-[#2c2c2c]">Credit / Debit Card</span>
                </div>
                
                <AnimatePresence>
                  {selectedPayment === "card" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3 pl-8"
                    >
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
               */}
              <div
                className={`p-5 cursor-pointer transition-all ${selectedPayment === "cod"
                    ? "bg-[#f8f7f4] rounded-lg"
                    : "hover:bg-gray-50"
                  }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${selectedPayment === "cod"
                      ? "border-[#8b5a2b] bg-[#8b5a2b]"
                      : "border-gray-300"
                    }`}>
                    {selectedPayment === "cod" && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <DollarSign className="h-5 w-5 mr-2 text-[#8b5a2b]" />
                  <span className="font-medium text-[#2c2c2c]">Cash on Delivery</span>
                </div>
              </div>

              {/*   Payment GateWay section and it is okay.  */}

              {/* <div
                className={`p-5 cursor-pointer transition-all ${selectedPayment === "ewallet"
                    ? "bg-[#f8f7f4] rounded-lg"
                    : "hover:bg-gray-50"
                  }`}
                onClick={() => setSelectedPayment("ewallet")}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 rounded-full border mr-3 flex items-center justify-center ${selectedPayment === "ewallet"
                      ? "border-[#8b5a2b] bg-[#8b5a2b]"
                      : "border-gray-300"
                    }`}>
                    {selectedPayment === "ewallet" && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <Smartphone className="h-5 w-5 mr-2 text-[#8b5a2b]" />
                  <span className="font-medium text-[#2c2c2c]">Khalti / eSewa</span>
                </div>

                <AnimatePresence>
                  {selectedPayment === "ewallet" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pl-8"
                    >
                      <p className="text-sm text-gray-500">
                        You will be redirected to your preferred payment gateway to complete the transaction.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Shield className="h-4 w-4 mr-2 text-[#8b5a2b]" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              className="w-full py-4 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90"
            >
              Pay Rs. {total}
            </motion.button>

            <p className="text-xs text-center text-gray-500 mt-4">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;