import React, { useEffect, useState } from "react";
import { Star, Minus, Plus, ChevronLeft, ChevronRight, Heart, Share, Shield, Truck, RotateCw } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/button";
import { useGetProductsByIdQuery } from "../../../redux/productApi";
import { useAddToCartMutation } from "../../../redux/cartApi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { setCheckoutProduct, clearCheckoutProduct } from "../../../redux/productsSlice";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { productSizeId } = location.state || {};
  console.log("product id", productId);
  console.log("product size id", productSizeId);

  const { data: product, error, isLoading } = useGetProductsByIdQuery(productId);

  console.log("product data", product);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const [addToCart] = useAddToCartMutation();
  const userInfo = useSelector((state) => state.users.userInfo);
  const userId = userInfo?.id;

  // Set initial size
  useEffect(() => {
    const foundSize = product?.productVariant.find(s => s.productSizeId === productSizeId);
    console.log("found size", foundSize);

    setSelectedSize(foundSize);
  }, [product]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === product.productVariant.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.productVariant.length - 1 : prev - 1
    );
  };

  const addItemToCart = async () => {
    if (!selectedSize) return alert("Please select a size.");
    if (!userId) {
      toast.error("Please Login Before Adding To Cart");
      return;
    }


    const cartProduct = {
      userId: userId,
      productId: product.id,
      productVariantId: selectedSize.id,
      quantity,
    };

    try {
      setIsButtonDisabled(true)
      await addToCart(cartProduct).unwrap();
      toast.success("Successfully Added to Cart")
      console.log("Added to cart:", cartProduct);
    } catch (e) {
      toast.error("Failed to add");
    } finally {
      setIsButtonDisabled(false)
    }
  };

  const buyNow = async () => {
    if (!selectedSize) return alert("Please select a size.");
    if (!userId) return alert("Please login to proceed with purchase.");

    console.log("selectde product info", selectedSize);


    try {
      dispatch(clearCheckoutProduct())
      dispatch(setCheckoutProduct({
        name: product.name,
        productId: product.id,
        ...selectedSize,
        quantity: quantity,

      }))


      //   await addToCart(cartProduct).unwrap();
      // Redirect to checkout page
      navigate('/checkout');
    } catch (e) {
      console.log("Failed to add:", e);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-[#f8f7f4]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8b5a2b] mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading product details...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="flex justify-center items-center h-screen bg-[#f8f7f4]">
      <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h3>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or may have been removed.</p>
        <Button
          onClick={() => window.history.back()}
          className="bg-[#2c2c2c] text-white px-6 py-3 rounded-full font-medium"
        >
          Go Back
        </Button>
      </div>
    </div>
  );

  // Merge all images from variants
  const images = product.productVariant.map((v) => v.imageUrl[0]);

  return (
    <main className="bg-[#f8f7f4] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid gap-8 md:grid-cols-2 p-6 md:p-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
                {images.length > 0 ? (
                  <>
                    <img
                      src={`http://localhost:8080/images/${images[currentImageIndex]}`}
                      alt={product.name}
                      className="object-contain w-full h-full p-6"
                      onError={(e) => (e.target.style.display = "none")}
                    />

                    {/* Navigation */}
                    {images.length > 1 && (
                      <>
                        <motion.button
                          className="absolute top-1/2 left-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                          onClick={prevImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          className="absolute top-1/2 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                          onClick={nextImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.button>
                      </>
                    )}

                    {/* Image counter */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.button
                        className="bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </motion.button>
                      <motion.button
                        className="bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share className="h-5 w-5 text-gray-600" />
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#8b5a2b]' : 'border-transparent'
                        }`}
                    >
                      <img
                        src={`http://localhost:8080/images/${img}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 py-4">
              <div>
                <h1 className="text-3xl font-bold text-[#2c2c2c] mb-2">{product.name}</h1>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Ratings */}
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
              </div>

              {/* Price & Stock */}
              {selectedSize && (
                <div className="flex items-center justify-between py-4 border-y border-gray-100">
                  <div>
                    <p className="text-2xl font-bold text-[#8b5a2b]">
                      Rs. {selectedSize.sellingPrice}
                    </p>
                    <p className="text-sm text-gray-600">
                      In Stock: {selectedSize.stock} units
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-600 mb-1">Quantity</span>
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-l-full"
                        onClick={decrementQuantity}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-r-full"
                        onClick={incrementQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.productVariant?.length > 0 && (
                <div>
                  <h2 className="font-semibold text-gray-800 mb-3">Available Sizes</h2>
                  <div className="flex gap-2 flex-wrap">
                    {product.productVariant.map((s) => (
                      <motion.button
                        key={s.id}
                        onClick={() => setSelectedSize(s)}
                        className={`px-5 py-3 rounded-xl font-medium transition-all ${selectedSize?.id === s.id
                            ? "bg-[#2c2c2c] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {s.size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="pt-4 grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  className="w-full bg-white border border-[#2c2c2c] text-[#2c2c2c] py-6 rounded-xl font-medium text-lg hover:bg-gray-50"
                  onClick={addItemToCart}
                  disabled={isButtonDisabled}
                >
                  Add to Cart
                </Button>
                <Button
                  className="w-full bg-[#2c2c2c] text-white py-6 rounded-xl font-medium text-lg hover:opacity-90"
                  onClick={buyNow}
                >
                  Buy Now
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-[#8b5a2b] mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCw className="h-6 w-6 text-[#8b5a2b] mx-auto mb-1" />
                  <p className="text-xs text-gray-600">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-[#8b5a2b] mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Product Details</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex">
                    <span className="w-24 font-medium">Category:</span>
                    <span>{product.category || "N/A"}</span>
                  </li>
                  <li className="flex">
                    <span className="w-24 font-medium">ABV:</span>
                    <span>{product.abv || "N/A"}%</span>
                  </li>
                  <li className="flex">
                    <span className="w-24 font-medium">Origin:</span>
                    <span>{product.origin || "N/A"}</span>
                  </li>
                  <li className="flex">
                    <span className="w-24 font-medium">Volume:</span>
                    <span>{selectedSize?.size || "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">Customer Reviews</h2>

          <div className="flex items-center mb-8">
            <div className="flex items-center mr-4">
              <div className="text-3xl font-bold text-[#2c2c2c] mr-2">4.8</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-gray-600">Based on 128 reviews</div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Review items would go here */}
            <div className="text-center py-12 text-gray-500 col-span-2">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}