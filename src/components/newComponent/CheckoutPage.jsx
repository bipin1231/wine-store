import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { FaEdit } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetDeliveryInfoQuery,
  useAddDeliveryInfoMutation,
  useUpdateDeliveryInfoMutation,
} from "../../redux/deliveryApi";
import DeliveryForm from "./checkout/DeliveryForm";
import { toast } from "react-toastify";
import {  useDispatch,useSelector } from "react-redux";
import ProductCard from "./checkout/ProductCard";
import OrderSummary from "./checkout/OrderSummary";
import { setOrderId, updateQuantity } from "../../redux/productsSlice";
import { usePlaceOrderDirectlyMutation } from "../../redux/orderApi";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
    const [placeOrderDirectlyMutation]=usePlaceOrderDirectlyMutation()
   const { checkoutProduct } = useSelector((state) => state.products);
  // const product = location.state?.product || {
  //   id: 1,
  //   name: "Premium Reserve Cabernet Sauvignon",
  //   size: "750ml",
  //   price: 89.99,
  //   quantity: 1,
  //   image: "/api/placeholder/300/300",
  //   description: "A rich, full-bodied red wine with notes of black cherry and oak."
  // };
 const products=useSelector(state=>state.products.checkoutProduct)

  const [orderComplete, setOrderComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Edit/Save toggle
const dispatch=useDispatch();
    const userInfo = useSelector((state) => state.users.userInfo);
    const userId = userInfo?.id;
 


  const { data: deliveryInfo, isLoading } = useGetDeliveryInfoQuery(userId,{
    skip:!userId
  });
  const [addDeliveryInfo] = useAddDeliveryInfoMutation();
  const [updateDeliveryInfo] = useUpdateDeliveryInfoMutation();

  

  useEffect(() => {
      setIsEditing(false);
    if (!deliveryInfo?.data) {
 
      
      setIsEditing(true);
    }
  }, [deliveryInfo]);

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



const subtotal = products.reduce(
  (total, p) => total + p.quantity * p.sellingPrice,
  0
);
  const deliveryCharge = 100;

  const total = subtotal + deliveryCharge ;

  const handleQuantityChange = (productSizeId,newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) dispatch(updateQuantity({id:productSizeId,quantity:newQuantity}));
  };

  const handleCheckout = async() => {

    const payload={
      userId:userId,
      productId:checkoutProduct[0].productId,
      productVariantId:checkoutProduct[0].productSizeId,
      quantity:checkoutProduct[0].quantity,
      deliveryCharges:100,


    }

    

    if (!deliveryInfo?.data.id) {
    toast.error("Please Add Delivery Info before proceeding")
    return;
    }
    
      try {
  const result = await placeOrderDirectlyMutation(payload).unwrap();
  console.log("response",result?.data.id);
  dispatch(setOrderId(result?.data.id))
  
    toast.success("Order Placed Successfully");
      navigate('payment')
    // setOrderComplete(true);
} catch (err) {
  console.error("Order failed:", err);
  toast.error("Order failed: " + err?.data?.message || "Something went wrong");
}
    
    }



  // if (orderComplete) {
  //   return (
  //     <div className="min-h-screen bg-[#f8f7f4]">
  //       <header className="sticky top-0 z-50 py-4 px-6 bg-white shadow-sm">
  //         <div className="max-w-7xl mx-auto flex items-center justify-between">
  //           <div className="text-2xl font-bold flex items-center">
  //             <Wine className="text-[#a63f3f] mr-2" />
  //             <span className="text-[#2c2c2c]">Vino</span>
  //             <span className="text-[#a63f3f]">Selecto</span>
  //           </div>
  //         </div>
  //       </header>

  //       <main className="max-w-4xl mx-auto px-4 py-12">
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           className="bg-white rounded-2xl p-8 text-center shadow-sm"
  //         >
  //           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //             <Check className="h-10 w-10 text-green-600" />
  //           </div>
  //           <h1 className="text-3xl font-serif font-light text-[#2c2c2c] mb-4">
  //             Order Confirmed
  //           </h1>
  //           <p className="text-gray-600 mb-6">
  //             Thank you for your purchase. Your order has been confirmed and will be shipped soon.
  //           </p>
  //           <p className="text-sm text-gray-500 mb-8">
  //             Order #: VS-{Math.floor(100000 + Math.random() * 900000)}
  //           </p>
  //           <motion.button
  //             whileHover={{ scale: 1.02 }}
  //             whileTap={{ scale: 0.98 }}
  //             onClick={() => navigate('/')}
  //             className="px-8 py-3 bg-[#2c2c2c] text-white rounded-full font-medium transition-all hover:opacity-90"
  //           >
  //             Continue Shopping
  //           </motion.button>
  //         </motion.div>
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
  

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-light text-[#2c2c2c] mb-8 text-center">
          Complete Your Purchase
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-serif font-light text-[#2c2c2c] mb-4 border-b border-gray-100 pb-3">
                Your Item
              </h2>
              
              {/* Product Card */}
              {
                products.map(product=>

 <ProductCard
              product={product}
              handleQuantityChange={handleQuantityChange}
           
              />
                )
              }
             
            </motion.div>
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

          </div>

          {/* Right Column - Order Summary */}
       <OrderSummary
       subtotal={subtotal}
       deliveryCharge={deliveryCharge}
       total={total}
       handleCheckout={handleCheckout}
       />
        </div>
      </main>
    </div>
  );
}
