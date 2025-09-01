import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Wine,
  ShoppingBag,
  ArrowLeft,
  User,
  LogIn
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../../../redux/cartApi";
import { useNavigate } from "react-router-dom";

export default function EnhancedCartPage() {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.users.userInfo);
  
  const userId = userInfo?.id;

  

  const {
    data: cartItems = [],
    error,
    isLoading,
    isSuccess,
    refetch
  } = useGetCartQuery(userId, {
    skip: !userId,
  });

  console.log("cartitems",cartItems);
  
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const newSubtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTax = newSubtotal * 0.1;
      const newTotal = newSubtotal + newTax;

      setSubtotal(newSubtotal);
      setTax(newTax);
      setTotal(newTotal);
    }
  }, [cartItems]);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity >= 0) {
      try {
        await updateCartItem({ cartItemId: id, quantity: newQuantity }).unwrap();
        console.log("Cart updated");
        refetch();
      } catch (e) {
        console.error("Failed to update cart", e);
      }
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartItem(id).unwrap();
      console.log("Cart item deleted successfully");
      refetch();
    } catch (e) {
      console.error("Failed to delete product from cart", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-[#8b5a2b] hover:text-[#a63f3f] transition-colors group"
          >
            <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>
          
          <div className="text-2xl font-bold flex items-center">
            <Wine className="text-[#a63f3f] mr-2" />
            <span className="text-[#2c2c2c]">Vino</span>
            <span className="text-[#a63f3f]">Selecto</span>
          </div>
          
          <div className="w-20"></div> 
        </div>
      </header> 
*/}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-full p-4 shadow-sm mr-4">
            <ShoppingBag className="h-8 w-8 text-[#8b5a2b]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-light text-[#2c2c2c]">
            Your Exquisite Selection
          </h1>
        </motion.div>

        {!userId ? (
          // User not logged in state
          <motion.div
            className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-[#f8f7f4] rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-[#8b5a2b]" />
            </div>
            <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-4">
              Please Sign In
            </h2>
            <p className="text-gray-600 mb-6">
              Sign in to view your cart and access your saved selections
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/auth')}
              className="w-full py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90 flex items-center justify-center"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <button
                onClick={() => navigate('/auth')}
                className="text-[#8b5a2b] hover:text-[#a63f3f] font-medium transition-colors"
              >
                Create one
              </button>
            </p>
          </motion.div>
        ) : Array.isArray(cartItems) && cartItems.length > 0 ? (
          // User logged in with items in cart
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    className="flex items-center bg-white rounded-2xl p-4 shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl">
                      <img
                        src={`http://localhost:8080/images/${item.url}`}
                        alt={item.productName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 ml-4 md:ml-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-[#2c2c2c]">{item.productName}</h3>
                          <p className="text-sm text-[#8b5a2b] mt-1">{item.size}</p>
                          <p className="text-lg font-medium text-[#2c2c2c] mt-2">
                            ${(item.totalPrice).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-gray-400 hover:text-[#a63f3f] transition-colors h-8 w-8 flex items-center justify-center"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            className="h-8 w-8 flex items-center justify-center text-[#8b5a2b] hover:bg-[#f8f7f4] transition-colors"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 font-medium text-sm">{item.quantity}</span>
                          <button
                            className="h-8 w-8 flex items-center justify-center text-[#8b5a2b] hover:bg-[#f8f7f4] transition-colors"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-lg font-medium text-[#2c2c2c]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-6 space-y-4 sticky top-24 shadow-sm">
                <h2 className="text-xl font-serif font-light text-[#2c2c2c] border-b border-gray-100 pb-4">
                  Order Summary
                </h2>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between py-4 border-t border-gray-100">
                  <span className="text-lg font-medium text-[#2c2c2c]">Total</span>
                  <span className="text-lg font-medium text-[#2c2c2c]">${total.toFixed(2)}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90 flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <p className="text-sm text-center text-gray-500 mt-4">
                  Free shipping on orders over $500
                </p>
                
                <div className="mt-6 p-4 bg-[#f8f7f4] rounded-xl">
                  <h3 className="font-medium text-[#2c2c2c] mb-2">Benefits</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#8b5a2b] rounded-full mr-2"></div>
                      Free returns within 30 days
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#8b5a2b] rounded-full mr-2"></div>
                      Secure payment options
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#8b5a2b] rounded-full mr-2"></div>
                      Expert customer support
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          // User logged in but cart is empty
          <motion.div
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto w-24 h-24 bg-[#f8f7f4] rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-[#8b5a2b]" />
            </div>
            <h2 className="text-2xl font-serif font-light text-[#2c2c2c] mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any exquisite wines to your cart yet.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/product-catalog')}
              className="px-8 py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90"
            >
              Explore Products
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
}