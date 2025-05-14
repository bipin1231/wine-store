import React, { useEffect, useState } from "react";
import { Star, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { Button } from "@nextui-org/button";

import api from "../../../api/axiosInstance";
export default function ProductPage() {

  const [apiProduct,setApiProduct]=useState([]);

  useEffect(()=>{
    api.get('/product')
    .then(res=> {
      console.log(res);
      
      setApiProduct(res.data)})
    .catch(err=>console.error(err));
  },[]);

  const [quantity, setQuantity] = useState(1);
  const [productDetails,setProductDetails]=useState();
  const dispatch=useDispatch();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


  const {productId}=useParams();
  const product=useSelector(state=>state.products.items.find(item=>item.id===productId))
  console.log(product);
  
  const addItemToCart=()=>{
dispatch(addToCart({id:productId,quantity:quantity}))
console.log("djadja");

  }

  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <main className="flex-1">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image[0]}
                alt="Château Margaux 2015"
                width="600"
                height="600"
                className="object-cover"
              />
            </div>
            <div className="flex space-x-2">
              <button className="btn-icon">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex-1 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={`/placeholder.svg?height=150&width=150&text=Image${i}`}
                      alt={`Product image ${i}`}
                      width="150"
                      height="150"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <button className="btn-icon">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-xl font-semibold mt-2">${product.price}</p>
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
            </div>
            <p className="text-gray-600">
             {product.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Quantity</span>
                <div className="flex items-center space-x-2">
                  <button className="btn-icon" onClick={decrementQuantity}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button className="btn-icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <Button
            type="button"
            className="btn w-full bg-slate-500" 
            onClick={addItemToCart}
            >Add to Cart</Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h3 className="font-semibold">Region</h3>
                <p>Bordeaux, France</p>
              </div>
              <div>
                <h3 className="font-semibold">Grape Varieties</h3>
                <p>Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot</p>
              </div>
              <div>
                <h3 className="font-semibold">Vintage</h3>
                <p>2015</p>
              </div>
              <div>
                <h3 className="font-semibold">Alcohol Content</h3>
                <p>13.5%</p>
              </div>
              <div>
                <h3 className="font-semibold">Bottle Size</h3>
                <p>750ml</p>
              </div>
              <div>
                <h3 className="font-semibold">Aging</h3>
                <p>18-24 months in new French oak barrels</p>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {[
                { name: "John D.", rating: 5, comment: "Exceptional wine, worth every penny." },
                { name: "Sarah M.", rating: 4, comment: "Delightful bouquet, smooth finish. A true Bordeaux gem." },
              ].map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "fill-primary text-primary" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Write a Review</h3>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="btn-icon">
                    <Star className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <textarea placeholder="Write your review here..." className="textarea"></textarea>
              <button className="btn">Submit Review</button>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                { name: "Opus One 2018", price: "$399", image: "/placeholder.svg?height=400&width=300" },
                { name: "Lafite Rothschild 2016", price: "$899", image: "/placeholder.svg?height=400&width=300" },
                { name: "Pétrus 2015", price: "$4,999", image: "/placeholder.svg?height=400&width=300" },
                { name: "Haut-Brion 2017", price: "$599", image: "/placeholder.svg?height=400&width=300" },
              ].map((wine) => (
                <div key={wine.name} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    width="300"
                    height="400"
                    className="object-cover w-full h-[300px] transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{wine.name}</h3>
                    <p className="mt-2 text-sm text-gray-300">{wine.price}</p>
                  </div>
                  <Button
                  type="button"
                  onClick={addItemToCart}
                  className="btn absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
