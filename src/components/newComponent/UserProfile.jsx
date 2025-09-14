"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  Package,
  Settings,
  Edit3,
  Plus,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Wine,
  Shield,
  CreditCard,
  Calendar,
  Check,
  Star,
  Clock,
  Phone,
  Mail,
  Gift,
  Award,
  Bell,
  Eye,
  Lock,
  Smartphone,
  Monitor,
  LogOut
} from "lucide-react";
import {
  useGetDeliveryInfoQuery,
  useAddDeliveryInfoMutation,
  useUpdateDeliveryInfoMutation,
} from "../../redux/deliveryApi";
import { useGetOrderInfoQuery,useUpdateOrderStatusMutation } from "../../redux/orderApi";
import {  useDispatch,useSelector } from "react-redux";
import DeliveryForm from "./checkout/DeliveryForm";
import UserInformation from "./profile/UserInformation";
import OrderDetailSection from "./profile/OrderDetailSection";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage () {
  const [activeSection, setActiveSection] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
    const userInfo = useSelector((state) => state.users.userInfo);
    const userId = userInfo?.id;
    const { data: deliveryInfo, isLoading } = useGetDeliveryInfoQuery(userId,{
      skip:!userId
    });
    const { data: orderInfo,error } = useGetOrderInfoQuery(userId,{
      skip:(activeSection!=="orders")
    });
const [updateOrderStatusMutation]=useUpdateOrderStatusMutation();
    
    const [addDeliveryInfo] = useAddDeliveryInfoMutation();
    const [updateDeliveryInfo] = useUpdateDeliveryInfoMutation();
      const navigate=useNavigate();

      const handleFormSubmit = async (formData) => {
    
        
        try {
    
          if (deliveryInfo?.data.id) {
           await updateDeliveryInfo({ userId:userId,deliveryData:formData }).unwrap();
            toast.success("Delivery info updated successfully!");
          } else {
            await addDeliveryInfo({ userId:userId,deliveryData:formData }).unwrap();
            toast.success("Delivery info added successfully!");
          }
          setIsEditing(false);
        } catch (err) {
          console.error("Failed:", err);
          toast.error("Failed to save delivery info");
        }
      };
  



  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Alexandra",
    lastName: "Chen",
    email: userInfo?.email,
    phone: userInfo?.phone,
    birthDate: "1985-06-15",
    preferences: {
      newsletter: true,
      promotions: false,
      recommendations: true
    }
  });

  const handleSavePersonalInfo = () => {
    console.log("Saving personal info:", personalInfo);
    setIsEditing(false);
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleOrderStatus=async()=>{
    try {
      const res=updateOrderStatusMutation({userId,orderStatus:"canceled"}).unwrap()
    } catch (error) {
      console.log(error);
      
      toast.error("failed to cancel order")
    }
  }
  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f8f7f4] to-[#f5f3f0]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#e8e5df] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-[#f1eeea] rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-[#2c2c2c]" />
              </button>
              <div>
                <h1 className="text-2xl font-serif font-light text-[#2c2c2c]">
                  Account Settings
                </h1>
                <p className="text-sm text-gray-500">Manage your profile and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-[#8b5a2b] to-[#a63f3f] rounded-full flex items-center justify-center text-white font-medium">
                  {/* Avatar */}
                {userInfo?.firstName}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            {/* Profile Summary Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/50 shadow-sm">
              <div className="text-center mb-4">
                <div className="h-20 w-20 bg-gradient-to-br from-[#8b5a2b] to-[#a63f3f] rounded-full flex items-center justify-center text-white text-xl font-medium mx-auto mb-3">
                  {/* Avatar */}
                   {userInfo?.firstName}
                </div>
                <h3 className="font-serif font-medium text-[#2c2c2c] text-lg">{userInfo?.firstName} {userInfo?.lastName}</h3>
                <p className="text-sm text-gray-500">{userInfo?.email}</p>
              </div>
              
              {/* <div className="flex items-center justify-center mb-4">
                <div className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4 text-amber-600 mr-1" />
                  <span className="text-sm font-medium text-amber-700">{userInfo.membershipTier} Member</span>
                </div>
              </div> */}

              {/* <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#8b5a2b]">{userInfo.totalOrders}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#8b5a2b]">{userInfo.loyaltyPoints}</p>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
              </div> */}
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { id: "personal", label: "Personal Info", icon: User },
                { id: "addresses", label: "Addresses", icon: MapPin },
                { id: "orders", label: "Order History", icon: Package },
                // { id: "security", label: "Security", icon: Shield }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-white/90 text-[#8b5a2b] shadow-sm border border-white/60" 
                      : "text-gray-600 hover:bg-white/50 hover:text-[#2c2c2c]"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>

            {/* <div className="mt-6 p-4 bg-gradient-to-br from-[#f1eeea] to-[#ede9e3] rounded-xl">
              <div className="flex items-center mb-2">
                <Gift className="h-5 w-5 text-[#8b5a2b] mr-2" />
                <h3 className="font-medium text-[#2c2c2c]">Member Since</h3>
              </div>
              <p className="text-sm text-gray-600">{userInfo.joinedDate}</p>
            </div> */}
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeSection}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
              
              {/* Personal Information Section */}
              {activeSection === "personal" && (
    <UserInformation
    isEditing={isEditing}
    setIsEditing={setIsEditing}
    handleSavePersonalInfo={handleSavePersonalInfo}
     personalInfo={userInfo}

    />
              )}

              {activeSection==="addresses" && (
                <>
  <DeliveryForm
      onSubmit={handleFormSubmit}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      defaultValues={
        deliveryInfo?.data || {
          firstName: "",
          lastName: "",

          phone: "",
          address: "",

        }
      }
      deliveryInfo={deliveryInfo?.data}
    />
                </>

              )}

              {/* Delivery Addresses Section */}
              {/* Multiple Delivery Address Design */}
              {/* {activeSection === "addresses" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-2">
                        Delivery Addresses
                      </h2>
                      <p className="text-gray-500">Manage your shipping destinations</p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#8b5a2b] to-[#a63f3f] text-white rounded-full hover:shadow-lg transition-all duration-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {addresses.map((address) => (
                      <motion.div
                        key={address.id}
                        whileHover={{ y: -4 }}
                        className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        {address.isDefault && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Default
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-5 w-5 text-[#8b5a2b] mr-2" />
                            <h3 className="font-medium text-[#2c2c2c]">{address.name}</h3>
                          </div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex space-x-2">
                            {!address.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(address.id)}
                                className="text-xs text-[#8b5a2b] hover:text-[#a63f3f] transition-colors font-medium"
                              >
                                Set Default
                              </button>
                            )}
                            <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                              Edit
                            </button>
                          </div>
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Order History Section */}
 {/* Order History Section */}
{activeSection === "orders" && (
  <div className="p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-2">
        Order History
      </h2>
      <p className="text-gray-500">Your recent purchases and orders</p>
    </div>
    
    <OrderDetailSection 
    orders={orderInfo?.data || []} 
    handleOrderStatus={handleOrderStatus}
    />
  </div>
)}


              {/* Security Section */}
              {/* {activeSection === "security" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-2">
                      Security Settings
                    </h2>
                    <p className="text-gray-500">Keep your account safe and secure</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-[#2c2c2c] mb-4 flex items-center">
                        <Lock className="h-5 w-5 mr-2" />
                        Account Security
                      </h3>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">Password</h4>
                            <p className="text-sm text-gray-500">Last updated 3 months ago</p>
                          </div>
                          <button className="px-4 py-2 bg-gradient-to-r from-[#8b5a2b] to-[#a63f3f] text-white rounded-full text-sm hover:shadow-lg transition-all duration-200">
                            Change Password
                          </button>
                        </div>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Extra layer of account protection</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-green-600 font-medium">Active</span>
                          </div>
                        </div>
                        <button className="text-sm text-[#8b5a2b] hover:text-[#a63f3f] transition-colors font-medium">
                          Manage Settings
                        </button>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">Login Alerts</h4>
                            <p className="text-sm text-gray-500">Get notified of new sign-ins</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8b5a2b]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8b5a2b]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-[#2c2c2c] mb-4 flex items-center">
                        <Monitor className="h-5 w-5 mr-2" />
                        Connected Devices
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                <Monitor className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[#2c2c2c]">MacBook Pro</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                                  <span>Active now • Chrome • San Francisco, CA</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Current
                            </span>
                          </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                <Smartphone className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[#2c2c2c]">iPhone 15</p>
                                <p className="text-xs text-gray-500">Last active: Yesterday, 4:15 PM</p>
                              </div>
                            </div>
                            <button className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center">
                              <LogOut className="h-4 w-4 mr-1" />
                              Sign Out
                            </button>
                          </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                <Monitor className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[#2c2c2c]">Windows PC</p>
                                <p className="text-xs text-gray-500">Last active: 3 days ago</p>
                              </div>
                            </div>
                            <button className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center">
                              <LogOut className="h-4 w-4 mr-1" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </div>

                      <button className="w-full p-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-[#8b5a2b] hover:text-[#8b5a2b] transition-colors text-sm">
                        Sign out of all other devices
                      </button>
                    </div>
                  </div>

        
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-[#2c2c2c] mb-6 flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Privacy Settings
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">Data Collection</h4>
                            <p className="text-sm text-gray-500 mt-1">Allow collection of usage data for improvements</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8b5a2b]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8b5a2b]"></div>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">Profile Visibility</h4>
                            <p className="text-sm text-gray-500 mt-1">Make profile visible to other members</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8b5a2b]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8b5a2b]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

        
                  <div className="mt-12 pt-8 border-t border-red-200">
                    <h3 className="text-lg font-medium text-red-600 mb-6">Danger Zone</h3>
                    <div className="bg-red-50/80 backdrop-blur-sm rounded-xl p-6 border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-red-700">Delete Account</h4>
                          <p className="text-sm text-red-600 mt-1">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};