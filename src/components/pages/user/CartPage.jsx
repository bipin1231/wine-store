import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../../../redux/cartApi";

export default function EnhancedCartPage() {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const userInfo = useSelector((state) => state.users.userInfo);
  const userId = userInfo?.user?.id;

  const {
    data: cartItems = [],
    error,
    isLoading,
    isSuccess,
    refetch
  } = useGetCartQuery(userId, {
    skip: !userId,
  });

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
    <div className="flex flex-col ml-7 min-h-screen bg-white">
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Exquisite Selection
        </motion.h1>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="md:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    className="flex items-center space-x-4 py-4 bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-24 h-32 overflow-hidden">
                      <img
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.productName}
                        className="object-cover rounded-l-md w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right pr-4">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 mt-2"
                        aria-label="Remove item"
                        onClick={() => removeItem(item.cartItemId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 sticky top-20">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button radius="md" color="primary" className="w-full text-lg h-12 mt-4">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  Free shipping on orders over $500
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any wines to your cart yet.
            </p>
            <Button asChild>
              <a href="/collections">Continue Shopping</a>
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
