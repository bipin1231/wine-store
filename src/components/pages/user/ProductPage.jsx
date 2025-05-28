import React, { useEffect, useState } from "react";
import { Star, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { Button } from "@nextui-org/button";
import { useGetProductsByIdQuery } from "../../../redux/productApi";
import { useGetCategoryQuery } from "../../../redux/categoryApi";
import { useAddToCartMutation } from "../../../redux/cartApi";


export default function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data: product, error, isLoading } = useGetProductsByIdQuery(productId);
  const { data: category } = useGetCategoryQuery();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const [addToCart]=useAddToCartMutation();
   const userInfo=useSelector(state=>state.users.userInfo)
   const userId = userInfo?.user?.id;

  useEffect(() => {
    if (product?.productSize?.length) {
      setSelectedSize(product.productSize[0]);
    }
    console.log(selectedSize);
    
  }, [product]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addItemToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

if(userId){
    const cartProduct={
      userId:userId,
      productId:product.id,
      sizeId:selectedSize.id,
      quantity:quantity
    }
    await addToCart(cartProduct)
        .unwrap()
        .then(() => console.log("product aaded to cart"))
        .catch((e) => console.log("Failed product aaded to cart",e));
    console.log(cartProduct);
  }

    // dispatch(
    //   addToCart({
    //     id: productId,
    //     sizeId: selectedSize.id,
    //     size: selectedSize.size,
    //     price: selectedSize.sellingPrice,
    //     quantity,
    //   })
    // );
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error || !product) return <div className="p-4 text-red-500">Product not found.</div>;

  return (
    <main className="flex-1">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {product.imageUrl?.length ? (
                product.imageUrl.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:8080/images/${img}`}
                    alt={`${product.name}-${idx}`}
                    width="600"
                    height="600"
                    className="object-cover w-full h-full"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="btn-icon">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="btn-icon">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>

            {/* Sizes */}
            {product.productSize?.length > 0 && (
              <div>
                <h2 className="font-semibold mb-1">Available Sizes</h2>
                <div className="flex gap-2 flex-wrap">
                  {product.productSize.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSize(s)}
                      className={`border px-4 py-2 rounded ${
                        selectedSize?.id === s.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price and Stock */}
            {selectedSize && (
              <div>
                <p className="text-xl font-bold text-green-600">
                  Rs. {selectedSize.sellingPrice}
                </p>
                <p className="text-sm text-gray-600">In Stock: {selectedSize.stock}</p>
              </div>
            )}

            {/* Ratings */}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center space-x-4 mt-4">
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

            {/* Add to cart */}
            <Button
              type="button"
              className="btn w-full bg-slate-500 text-white"
              onClick={addItemToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
