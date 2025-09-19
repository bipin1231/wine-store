"use client";
import React, { useState, useRef, useEffect } from "react";
import { Wine, Beer, Martini } from "lucide-react";
import LiquorHero from "./LiquorHero";
import { useGetProductsBySizeAllQuery } from "../../redux/productApi";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

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

  // 👇 Fetch only when `shouldFetch` is true
  const { data: productData = [], isLoading } = useGetProductsBySizeAllQuery(undefined, {
    skip: !shouldFetch,
  });

  return (
    <>
      <LiquorHero />
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

          {isLoading && <p className="text-center">Loading products...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productData.map((product) => (
              <ProductCard key={product.productVariantId} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="py-16 bg-white">
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

          <div className="text-center mt-12">
            <button className="bg-[#2c2c2c] text-white rounded-full px-8 py-3 font-medium shadow hover:opacity-90">
              Browse All Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
