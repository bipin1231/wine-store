"use client";
import React, { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import {
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Clock,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Receipt,
  CreditCard,
  MapPin
} from "lucide-react";

const OrderDetailSection = ({ orders ,handleOrderStatus}) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">No orders yet</h3>
        <p className="text-gray-400">Your order history will appear here</p>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    if (activeFilter === "all") return true;
    // You would need to add status to your order data structure
    // For now, we'll assume all are delivered
    return activeFilter === "delivered";
  });

  const getOrderStatus = (order) => {
    // In a real app, you would check order.status
    // For this example, we'll use a simple logic
    return order.orderDate ? "Delivered" : "Processing";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateOrderTotal = (order) => {
    return order.orderItem.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 text-sm font-medium ${activeFilter === "all" ? "text-[#8b5a2b] border-b-2 border-[#8b5a2b]" : "text-gray-500 hover:text-gray-700"}`}
        >
          All Orders
        </button>
        <button
          onClick={() => setActiveFilter("delivered")}
          className={`px-4 py-2 text-sm font-medium ${activeFilter === "delivered" ? "text-[#8b5a2b] border-b-2 border-[#8b5a2b]" : "text-gray-500 hover:text-gray-700"}`}
        >
          Delivered
        </button>
        <button
          onClick={() => setActiveFilter("processing")}
          className={`px-4 py-2 text-sm font-medium ${activeFilter === "processing" ? "text-[#8b5a2b] border-b-2 border-[#8b5a2b]" : "text-gray-500 hover:text-gray-700"}`}
        >
          Processing
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const status = getOrderStatus(order);
          const isExpanded = expandedOrder === order.id;
          const orderTotal = calculateOrderTotal(order);
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Order Summary */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Receipt className="h-5 w-5 text-[#8b5a2b]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2c2c2c]">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-medium text-[#2c2c2c]">Rs.{order.totalPrice.toFixed(2)}</p>
                    <div className="flex items-center text-sm">
                      {getStatusIcon(status)}
                      <span className="ml-1">{status}</span>
                    </div>
                  </div>
                  
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Order Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-gray-100">
                      {/* Order Items */}
                      <div className="my-4">
                        <h4 className="font-medium text-[#2c2c2c] mb-3">Items</h4>
                        <div className="space-y-3">
                          {order.orderItem.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                              <div>
                                <p className="font-medium text-[#2c2c2c]">{item.productName}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-[#2c2c2c]">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 my-4">
                        <h4 className="font-medium text-[#2c2c2c] mb-3">Order Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>Rs.{orderTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>Rs.100.00</span>
                          </div>

                          <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                            <span>Total</span>
                            <span>{order.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Information */}
                      {/* it is good and can be worked in future */}
                      {/* <div className="my-4">
                        <h4 className="font-medium text-[#2c2c2c] mb-3 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-[#8b5a2b]" />
                          Shipping Address
                        </h4>
                        <p className="text-sm text-gray-600">
                          123 Wine Street<br />
                          Napa Valley, CA 94558<br />
                          United States
                        </p>
                      </div> */}

                      {/* Payment Information */}
                      <div className="my-4">
                        <h4 className="font-medium text-[#2c2c2c] mb-3 flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-[#8b5a2b]" />
                          Payment Method
                        </h4>
                        <p className="text-sm text-gray-600">Cash On Delivery</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6">
                        {/* <button className="px-4 py-2 text-sm border border-[#8b5a2b] text-[#8b5a2b] rounded-full hover:bg-[#f8f7f4] transition-colors">
                          View Invoice
                        </button> */}
                        <button className="px-4 py-2 text-sm bg-[#2c2c2c] text-white rounded-full hover:opacity-90 transition-opacity"
                        onClick={()=>handleOrderStatus()}
                        >
                          Cancel
                        </button>
                        {/* <button className="px-4 py-2 text-sm bg-[#2c2c2c] text-white rounded-full hover:opacity-90 transition-opacity">
                          Order Again
                        </button> */}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetailSection;