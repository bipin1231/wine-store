"use client";
import React, { useState, useRef, useEffect } from "react";
import { Wine, Beer, Martini } from "lucide-react";
import LiquorHero from "./LiquorHero";
import { useGetProductsBySizeAllQuery, useGetBestSellingProductQuery } from "../../redux/productApi";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Wine",
    icon: Wine,
    items: [
      { name: "Red Wine", href: "/wine/red" },
      { name: "White Wine", href: "/wine/white" },
    ],
  },
  {
    title: "Spirits",
    icon: Martini,
    items: [
      { name: "Whiskey", href: "/spirits/whiskey" },
      { name: "Vodka", href: "/spirits/vodka" },
      { name: "Gin", href: "/spirits/gin" },
      { name: "Rum", href: "/spirits/rum" },
    ],
  },
  {
    title: "Beer",
    icon: Beer,
    items: [
      { name: "Craft Beer", href: "/beer/craft" },
      { name: "Light Beer", href: "/beer/import" },
      { name: "Strong", href: "/beer/domestic" },
      { name: "Super Strong", href: "/beer/light" },
    ],
  },
];

function HomePage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const sectionRef = useRef(null);
  const bestSellingRef = useRef(null);
  const [shouldFetchBestSelling, setShouldFetchBestSelling] = useState(false);

  // 👇 Observe when "Latest Arrivals" section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true); // enable the query
          observer.disconnect(); // stop observing after first fetch
        }
      },
      { threshold: 0.2 } // trigger when 20% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetchBestSelling(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (bestSellingRef.current) observer.observe(bestSellingRef.current);
    return () => observer.disconnect();
  }, []);

  // 👇 Fetch only when `shouldFetch` is true
  const { 
    data: productData = [], 
    isLoading, 
    error: latestArrivalsError,
    isError: isLatestArrivalsError 
  } = useGetProductsBySizeAllQuery(undefined, {
    skip: !shouldFetch,
  });

  const { 
    data: bestSellingProductData = [], 
    isLoading: isLoadingBestSellingProductData, 
    error: bestSellingError,
    isError: isBestSellingError 
  } = useGetBestSellingProductQuery(undefined, {
    skip: !shouldFetchBestSelling,
  });

  // Empty state component for products
  const EmptyProductState = ({ title, message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="col-span-full text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-[#f0e6d9] rounded-full flex items-center justify-center mx-auto mb-4">
          <Wine className="w-8 h-8 text-[#8b5a2b]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </motion.div>
  );

  // Error state component
  const ErrorState = ({ title, message }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#2c2c2c] text-white rounded-full px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  );

  return (
    <>
      <LiquorHero />
      
      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
          <div className="flex justify-around">
            {categories.map((category) => (
              <Link to={`product-catalog/${category.title}`} key={category.title}>
                <div className="bg-[#f8f7f4] rounded-xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="w-16 h-16 bg-[#e6d5c1] rounded-full flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-[#8b5a2b]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.items.length} Categories</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Arrivals Section */}
      <section className="py-16 bg-[#f8f7f4]" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Arrivals</h2>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="w-4 h-4 bg-[#a63f3f] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-[#a63f3f] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-[#a63f3f] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </motion.div>
          )}

          {isLatestArrivalsError && (
            <ErrorState
              title="Unable to Load Products"
              message="We're having trouble loading the latest arrivals. Please check your connection and try again."
            />
          )}

          {!isLoading && !isLatestArrivalsError && productData.length === 0 && (
            <EmptyProductState
              title="No Latest Arrivals"
              message="Check back soon for new products arriving in our collection."
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {!isLoading && !isLatestArrivalsError && productData.length > 0 && 
              productData.map((product) => (
                <ProductCard key={product.productVariantId} product={product} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="py-16 bg-white" ref={bestSellingRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#f0e6d9] text-[#8b5a2b] px-4 py-1 rounded-full font-medium mb-4">
              Customer Favorites
            </div>
            <h2 className="text-3xl font-bold">Best Selling Products</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Discover our customers' favorites - premium selections loved by wine enthusiasts
            </p>
          </div>

          {isLoadingBestSellingProductData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="w-4 h-4 bg-[#a63f3f] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-[#a63f3f] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-[#a63f3f] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <p className="mt-2 text-gray-600">Loading best sellers...</p>
            </motion.div>
          )}

          {isBestSellingError && (
            <ErrorState
              title="Unable to Load Best Sellers"
              message="We're having trouble loading the popular products. Please check your connection and try again."
            />
          )}

          {!isLoadingBestSellingProductData && !isBestSellingError && 
           (!bestSellingProductData?.content || bestSellingProductData.content.length === 0) && (
            <EmptyProductState
              title="No Best Sellers Available"
              message="Our best selling products will appear here once customers start making purchases."
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {!isLoadingBestSellingProductData && !isBestSellingError && 
             bestSellingProductData?.content && bestSellingProductData.content.length > 0 &&
              bestSellingProductData.content.map((product) => (
                <ProductCard key={product.productVariantId} product={product} />
              ))
            }
          </div>

          <div className="text-center mt-12">
            <Link to={"product-catalog"}>
              <button className="bg-[#2c2c2c] text-white rounded-full px-8 py-3 font-medium shadow hover:opacity-90">
                Browse All Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;