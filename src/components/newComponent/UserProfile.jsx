"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  // Mock user data - in a real app, this would come from your Redux store or API
  const userInfo = useSelector((state) => state.users.userInfo) || {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinedDate: "January 2023"
  };

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Wine Street",
      city: "Napa Valley",
      state: "CA",
      zipCode: "94558",
      isDefault: true
    },
    {
      id: 2,
      name: "Work",
      address: "456 Vineyard Avenue",
      city: "Sonoma",
      state: "CA",
      zipCode: "95476",
      isDefault: false
    }
  ]);

  // Mock order history
  const orders = [
    {
      id: "VS-12345",
      date: "2023-10-15",
      items: ["Premium Reserve Cabernet Sauvignon", "Chardonnay Reserve"],
      total: 189.99,
      status: "Delivered"
    },
    {
      id: "VS-12346",
      date: "2023-09-22",
      items: ["Pinot Noir Estate", "Sauvignon Blanc"],
      total: 145.50,
      status: "Delivered"
    },
    {
      id: "VS-12347",
      date: "2023-11-05",
      items: ["Sparkling Brut", "Zinfandel Old Vine"],
      total: 210.75,
      status: "Processing"
    }
  ];

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: userInfo.email,
    phone: userInfo.phone,
    birthDate: "1985-06-15"
  });

  const handleSavePersonalInfo = () => {
    // In a real app, you would save this to your backend
    console.log("Saving personal info:", personalInfo);
    setIsEditing(false);
  };

  const handleAddNewAddress = () => {
    // In a real app, this would open a form to add a new address
    console.log("Adding new address");
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

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

    

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-light text-[#2c2c2c] mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">
            Manage your personal information, addresses, and order history
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4"
          >
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection("personal")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  activeSection === "personal" 
                    ? "bg-[#f1eeea] text-[#8b5a2b]" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Personal Information</span>
                {activeSection === "personal" && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>

              <button
                onClick={() => setActiveSection("addresses")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  activeSection === "addresses" 
                    ? "bg-[#f1eeea] text-[#8b5a2b]" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MapPin className="h-5 w-5 mr-3" />
                <span>Delivery Addresses</span>
                {activeSection === "addresses" && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>

              <button
                onClick={() => setActiveSection("orders")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  activeSection === "orders" 
                    ? "bg-[#f1eeea] text-[#8b5a2b]" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>Order History</span>
                {activeSection === "orders" && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>

              <button
                onClick={() => setActiveSection("security")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  activeSection === "security" 
                    ? "bg-[#f1eeea] text-[#8b5a2b]" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Shield className="h-5 w-5 mr-3" />
                <span>Security</span>
                {activeSection === "security" && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>
            </nav>

            <div className="mt-8 p-4 bg-[#f1eeea] rounded-lg">
              <h3 className="font-medium text-[#2c2c2c] mb-2">Member Since</h3>
              <p className="text-sm text-gray-600">{userInfo.joinedDate}</p>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/4"
          >
            {/* Personal Information Section */}
            {activeSection === "personal" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-light text-[#2c2c2c]">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors"
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSavePersonalInfo}
                        className="px-3 py-1 text-sm bg-[#2c2c2c] text-white rounded-full transition-all hover:opacity-90"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                          className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                        />
                      ) : (
                        <p className="text-[#2c2c2c]">{personalInfo.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                          className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                        />
                      ) : (
                        <p className="text-[#2c2c2c]">{personalInfo.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                      />
                    ) : (
                      <p className="text-[#2c2c2c]">{personalInfo.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                      />
                    ) : (
                      <p className="text-[#2c2c2c]">{personalInfo.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={personalInfo.birthDate}
                        onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-[#8b5a2b] bg-transparent"
                      />
                    ) : (
                      <p className="text-[#2c2c2c]">{formatDate(personalInfo.birthDate)}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Addresses Section */}
            {activeSection === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-light text-[#2c2c2c]">
                    Delivery Addresses
                  </h2>
                  <button
                    onClick={handleAddNewAddress}
                    className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Address
                  </button>
                </div>

                <div className="space-y-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-medium text-[#2c2c2c] mr-3">{address.name}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-[#f1eeea] text-[#8b5a2b] text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">
                            {address.address}, {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="text-sm text-[#8b5a2b] hover:text-[#a63f3f] transition-colors"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-gray-400 hover:text-[#a63f3f] transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order History Section */}
            {activeSection === "orders" && (
              <div>
                <h2 className="text-xl font-serif font-light text-[#2c2c2c] mb-6">
                  Order History
                </h2>

                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-[#2c2c2c]">Order #{order.id}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#2c2c2c]">${order.total.toFixed(2)}</p>
                          <p className={`text-sm ${
                            order.status === "Delivered" ? "text-green-600" : "text-[#8b5a2b]"
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {order.items.slice(0, 2).join(", ")}
                          {order.items.length > 2 && ` and ${order.items.length - 2} more`}
                        </p>
                        <button className="text-sm text-[#8b5a2b] hover:text-[#a63f3f] transition-colors">
                          View Order Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div>
                <h2 className="text-xl font-serif font-light text-[#2c2c2c] mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-medium text-[#2c2c2c] mb-2">Change Password</h3>
                    <p className="text-gray-600 mb-4">Update your password regularly to keep your account secure</p>
                    <button className="px-4 py-2 bg-[#2c2c2c] text-white rounded-full text-sm transition-all hover:opacity-90">
                      Change Password
                    </button>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-medium text-[#2c2c2c] mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-[#2c2c2c] mb-2">Connected Devices</h3>
                    <p className="text-gray-600 mb-4">Manage devices that have access to your account</p>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="text-sm font-medium">MacBook Pro</p>
                        <p className="text-xs text-gray-500">Last active: Today, 10:30 AM</p>
                      </div>
                      <button className="text-sm text-[#a63f3f] hover:text-[#8b5a2b] transition-colors">
                        Sign Out
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium">iPhone 13</p>
                        <p className="text-xs text-gray-500">Last active: Yesterday, 4:15 PM</p>
                      </div>
                      <button className="text-sm text-[#a63f3f] hover:text-[#8b5a2b] transition-colors">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;