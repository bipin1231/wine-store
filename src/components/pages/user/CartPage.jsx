
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wine,
  Search,
  ShoppingCart,
  User,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import {Button, ButtonGroup} from "@nextui-org/button"
import { useSelector,useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/cartSlice";
import { useGetCartQuery } from "../../../redux/cartApi";


export default function EnhancedCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const sliceCartItems=useSelector(state=>state.cart.items)
  const sliceProductDetails=useSelector(state=>state.products.items)

  const userInfo=useSelector(state=>state.users.userInfo)
 
  const {data,error,isLoading}=useGetCartQuery();
  console.log("daraa",data);
  
  const dispatch=useDispatch()

  useEffect(()=>{
    if(userInfo){

    }
  })

  useEffect(()=>{
    if(sliceCartItems && sliceProductDetails){
    const mergedProductDetails=sliceCartItems.map(c=>{
      const productDetails=sliceProductDetails.find(p=>p.id===c.id)
      if (productDetails){
        return{
          ...productDetails,
          quantity:c.quantity,
        }
      }
      return null
    }).filter(item=>item!==null)
    setCartItems(mergedProductDetails)
  }
  },[sliceCartItems,sliceProductDetails])
  

  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newTax = newSubtotal * 0.1; // Assuming 10% tax
    const newTotal = newSubtotal + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
    dispatch(removeFromCart(id))
  };

  return (
    <div className="flex flex-col ml-7 min-h-screen bg-white from-gray-50 to-gray-100  dark:to-gray-800">
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Exquisite Selection
        </motion.h1>
        {cartItems.length === 0 ? (
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
        ) : (
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
                    key={item.id}
                    className="flex items-center space-x-4 py-4 bg-white  rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-24 h-32 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover rounded-l-md w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
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
                <Button
                radius="md"
               color="primary"
                className=" w-full text-lg h-12 mt-4">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  Free shipping on orders over $500
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
