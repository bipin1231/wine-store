"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import { useGetOrderInfoQuery, useUpdateOrderStatusMutation, useGetAllOrderInfoQuery, useGetFilteredOrderInfoQuery } from "../../../../../redux/orderApi"
import { useDispatch, useSelector } from "react-redux";

import OrderDetailSection from "../../../../newComponent/profile/OrderDetailSection";
import AdminOrderDetailSection from "./AdminOrderDetailSection";

export default function AllOrderDetails() {
    const [activeSection, setActiveSection] = useState("personal");
    const [activeFilter, setActiveFilter] = useState("all");
    const [apiCallOrderQuery, setApiCallOrderQuery] = useState("");
    const [filteredOrder, SetFilteredOrder] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const userInfo = useSelector((state) => state.users.userInfo);
    const userId = userInfo?.id;

    const { data: orderInfo, error } = useGetAllOrderInfoQuery();
    const { data: filteredOrderInfo, filteredOrderInfoError } = useGetFilteredOrderInfoQuery(apiCallOrderQuery, {
        skip: !apiCallOrderQuery
    });

    const [updateOrderStatusMutation] = useUpdateOrderStatusMutation();

console.log(error);




    useEffect(() => {
        if (activeFilter !== "all") setApiCallOrderQuery(activeFilter);
        else setApiCallOrderQuery("");
    }, [activeFilter]);

    useEffect(() => {
        if (activeFilter === "all") {
            SetFilteredOrder(orderInfo?.data || []);
        } else if (filteredOrderInfo?.data) {
            SetFilteredOrder(filteredOrderInfo.data);
        }
    }, [activeFilter, orderInfo, filteredOrderInfo]);






    const handleOrderStatus = async ({ orderId, orderStatus }) => {
        try {
            const res = await updateOrderStatusMutation({ orderId, orderStatus }).unwrap()
        } catch (error) {
            console.log(error);

            toast.error("failed to cancel order")
        }
    }



    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f8f7f4] to-[#f5f3f0]">


            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Enhanced Sidebar */}


                    {/* Main Content */}
                    <motion.div
                        key={activeSection}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3"
                    >
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">






                            {/* Order History Section */}

                            <div className="p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-2">
                                        Order History
                                    </h2>
                                    <p className="text-gray-500">Your recent purchases and orders</p>
                                </div>

                                <AdminOrderDetailSection
                                    orders={filteredOrder || []}
                                    handleOrderStatus={handleOrderStatus}

                                    activeFilter={activeFilter}
                                    setActiveFilter={setActiveFilter}
                                />
                            </div>






                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};