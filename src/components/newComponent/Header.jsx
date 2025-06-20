"use client";
import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser, FaHeart, FaShoppingCart, FaStar,FaPlus } from "react-icons/fa";
import { Wine, Grape, Beer, Martini, ChevronDown, Star, ShoppingCart, Plus } from "lucide-react";
import LiquorHero from "./LiquorHero";

const categories = [
  {
    title: "Wine",
    icon: Wine,
    items: [
      { name: "Red Wine", href: "/wine/red" },
      { name: "White Wine", href: "/wine/white" },
      { name: "Rosé", href: "/wine/rose" },
      { name: "Sparkling", href: "/wine/sparkling" },
      { name: "Dessert Wine", href: "/wine/dessert" },
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
      { name: "Tequila", href: "/spirits/tequila" },
    ],
  },
  {
    title: "Beer",
    icon: Beer,
    items: [
      { name: "Craft Beer", href: "/beer/craft" },
      { name: "Import", href: "/beer/import" },
      { name: "Domestic", href: "/beer/domestic" },
      { name: "Light Beer", href: "/beer/light" },
      { name: "IPA", href: "/beer/ipa" },
    ],
  },
  {
    title: "Premium",
    icon: Grape,
    items: [
      { name: "Rare Whiskeys", href: "/premium/whiskey" },
      { name: "Vintage Wine", href: "/premium/wine" },
      { name: "Limited Edition", href: "/premium/limited" },
      { name: "Collector's Items", href: "/premium/collectors" },
    ],
  },
];

export default function HomePage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";
  const accentText = "text-[#8b5a2b]";
  const highlight = "text-[#a63f3f]";

  const buttonStyle = "bg-[#2c2c2c] text-white rounded-full px-6 py-2 transition hover:opacity-90 shadow-md";
  const inputStyle = "bg-white border border-gray-200 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#8b5a2b]";

  // Mock data for products
  const latestArrivals = [
    {
      id: 1,
      name: "Château Lafite Rothschild",
      category: "Red Wine",
      price: 299.99,
      rating: 4.9,
      size:"750ml",
      image: "/images/wine1.png",
      region: "Bordeaux, France",
      year: 2018,
      discount: 15
    },
    {
      id: 2,
      name: "Dom Pérignon Vintage",
      category: "Sparkling Wine",
      price: 189.99,
      rating: 4.8,
      image: "/images/wine2.png",
      region: "Champagne, France",
      year: 2012,
      discount: 10
    },
    {
      id: 3,
      name: "Macallan 18 Year",
      category: "Whiskey",
      price: 349.99,
      rating: 4.7,
      image: "/images/whiskey.png",
      region: "Speyside, Scotland",
      year: 2005
    },
    {
      id: 4,
      name: "Patrón Silver",
      category: "Tequila",
      price: 49.99,
      rating: 4.5,
      image: "/images/tequila.png",
      region: "Jalisco, Mexico"
    }
  ];

  const bestSellers = [
    {
      id: 5,
      name: "Cloudy Bay Sauvignon Blanc",
      category: "White Wine",
      price: 39.99,
      rating: 4.8,
      image: "/images/wine3.png",
      region: "Marlborough, New Zealand",
      year: 2021,
      discount: 20
    },
    {
      id: 6,
      name: "Grey Goose Vodka",
      category: "Vodka",
      price: 34.99,
      rating: 4.6,
      image: "/images/vodka.png",
      region: "France"
    },
    {
      id: 7,
      name: "BrewDog IPA",
      category: "Craft Beer",
      price: 12.99,
      rating: 4.4,
      image: "/images/beer.png",
      region: "Scotland, UK"
    },
    {
      id: 8,
      name: "Hendrick's Gin",
      category: "Gin",
      price: 42.99,
      rating: 4.7,
      image: "/images/gin.png",
      region: "Scotland, UK"
    }
  ];

  // Enhanced Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl w-full max-w-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=Product+Image"}
        />
        
        {/* Add to Cart Button - Appears on hover */}
        <button
          className={`absolute bottom-4 right-4 bg-gray-900 text-white rounded-full p-3 shadow-lg transform transition-all duration-300 ${
            isHovered 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-2 opacity-0'
          } hover:scale-105 hover:bg-gray-700`}
          aria-label="Add to cart"
        >
          <FaPlus size={16} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Name & Price Row */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 text-lg line-clamp-1">{product.name}</h3>
   
        </div>

        {/* Size & Action */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
            {product.size}
          </span>
          <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
    ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="bg-[#f8f7f4] min-h-screen font-sans text-[#2c2c2c]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold flex items-center">
            <Wine className="text-[#a63f3f] mr-2" />
            <span className="text-[#2c2c2c]">Vino</span>
            <span className="text-[#a63f3f]">Selecto</span>
          </div>

          <div className="flex-1 flex items-center gap-2 w-full md:w-auto max-w-2xl">
            <div className="relative w-full">
              <input 
                placeholder="Search for wines, spirits, beer..." 
                className={inputStyle}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm font-medium">
              <FaMapMarkerAlt className="text-[#8b5a2b]" />
              <span>Locations</span>
            </button>
            
            <button className="relative p-2">
              <FaHeart className="text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#a63f3f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button className="relative p-2">
              <FaUser className="text-gray-700" />
            </button>
            
            <button className="relative p-2">
              <FaShoppingCart className="text-gray-700" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#a63f3f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="hidden lg:flex justify-center gap-4 py-4 bg-white font-medium z-40 relative shadow-sm">
        <button className="px-4 py-2 text-sm font-medium hover:text-[#a63f3f] transition-colors">
          Home
        </button>
        <button className="px-4 py-2 text-sm font-medium hover:text-[#a63f3f] transition-colors">
          All Products
        </button>

        {categories.map((category) => (
          <div
            key={category.title}
            className="relative group"
            onMouseEnter={() => setActiveDropdown(category.title)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-[#a63f3f] transition-colors">
              <category.icon className="w-4 h-4" />
              <span>{category.title}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {activeDropdown === category.title && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50 p-4 border border-gray-100">
                <a
                  href={`/${category.title.toLowerCase()}`}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-[#f8f7f4] transition"
                >
                  <category.icon className="w-6 h-6 text-[#8b5a2b]" />
                  <div>
                    <h3 className="text-black font-semibold">{category.title}</h3>
                    <p className="text-sm text-gray-600">
                      Explore premium {category.title.toLowerCase()} options
                    </p>
                  </div>
                </a>

                <ul className="grid gap-2 mt-4">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-2 rounded-md hover:bg-[#f8f7f4] transition text-sm text-gray-700"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Hero Section */}
     <section className="py-16 md:py-24 bg-[#faf7f2]">
  <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 items-center gap-8 lg:gap-16">
    {/* Text Content - Elevated Minimalism */}
    <div className="text-center lg:text-left">
      <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight tracking-wide">
        <span className="block font-serif italic text-gray-700">Exceptional</span>
        <span className="block mt-2 font-bold text-[#2c2c2c]">Wine Experiences</span>
      </h1>
      
      <div className="relative max-w-lg mx-auto lg:mx-0">
        <div className="absolute top-0 left-0 w-24 h-px bg-[#a63f3f] transform -translate-y-4"></div>
        <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
          Carefully selected vintages from renowned terroirs, delivered to your doorstep with precision care.
        </p>
        <div className="absolute bottom-0 right-0 w-24 h-px bg-[#a63f3f] transform translate-y-4"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <button className="bg-[#2c2c2c] text-white rounded-sm px-8 py-3 hover:opacity-90 transition font-normal tracking-wider uppercase text-sm">
          Discover Collection
        </button>
        <button className="border border-[#2c2c2c] text-[#2c2c2c] rounded-sm px-8 py-3 hover:bg-[#f0f0f0] transition font-normal tracking-wider uppercase text-sm">
          Tasting Events
        </button>
      </div>
    </div>

    {/* Visual Element - Sophisticated Wine Presentation */}
    <div className="relative mt-12 lg:mt-0">
      <div className="relative z-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="col-span-2 bg-white p-8 flex items-center justify-center min-h-[400px]">
          <img 
            src="/images/premium-wine.png" 
            alt="Premium Wine Selection"
            className="w-full max-w-[180px] object-contain transition-transform duration-500 hover:scale-105"
            onError={(e) => e.target.src = "https://via.placeholder.com/300x500/f0e6d9/8b5a2b?text=Wine+Essence"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-[#2c2c2c] text-white p-6 flex-1 flex flex-col justify-center">
            <span className="block text-sm font-light tracking-widest mb-2 opacity-80">Est.</span>
            <span className="block text-3xl font-serif italic">1987</span>
          </div>
          <div className="bg-[#a63f3f] text-white p-6 flex-1 flex flex-col justify-center">
            <span className="block text-sm font-light tracking-widest mb-2 opacity-90">Vintages</span>
            <span className="block text-3xl font-serif italic">200+</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-8 -left-8 w-24 h-24 border-2 border-[#a63f3f] opacity-20 z-0"></div>
      <div className="absolute bottom-8 -right-8 w-16 h-16 border border-[#2c2c2c] opacity-10 z-0"></div>
    </div>
  </div>
</section>

<LiquorHero/>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-[#f8f7f4] rounded-xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="w-16 h-16 bg-[#e6d5c1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <category.icon className="w-8 h-8 text-[#8b5a2b]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.items.length} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Arrivals Section */}
      <section className="py-16 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl font-bold">Latest Arrivals</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition">
                Wine
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition">
                Spirits
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-white hover:shadow-sm transition">
                Beer
              </button>
              <button className="flex items-center text-[#a63f3f] font-medium text-sm">
                View All
                <ChevronDown className="w-4 h-4 ml-1 rotate-90" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#2c2c2c] text-white rounded-full px-8 py-3 font-medium shadow hover:opacity-90">
              Browse All Products
            </button>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-[#2c2c2c] to-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="bg-[#a63f3f] inline-block px-4 py-1 rounded-full font-medium mb-4">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Summer Wine Festival
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                Enjoy 25% off on all white wines and rosés. Perfect selections for your summer gatherings.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">03</div>
                  <div className="text-sm text-gray-300">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-300">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-gray-300">Mins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">22</div>
                  <div className="text-sm text-gray-300">Secs</div>
                </div>
              </div>
              <button className="bg-white text-[#2c2c2c] rounded-full px-8 py-3 font-medium shadow hover:bg-gray-200">
                Shop the Collection
              </button>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <img 
                  src="/images/wine-bottles.png" 
                  alt="Summer Wine Collection"
                  className="rounded-xl w-full max-w-md"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/500x300?text=Summer+Wines";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2c2c] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold flex items-center mb-4">
              <Wine className="text-[#a63f3f] mr-2" />
              <span>Vino</span>
              <span className="text-[#a63f3f]">Selecto</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium wines and spirits curated for discerning enthusiasts.
            </p>
            <div className="flex gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-[#3c3c3c] w-8 h-8 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">All Products</a></li>
              <li><a href="#" className="hover:text-white">Wine</a></li>
              <li><a href="#" className="hover:text-white">Spirits</a></li>
              <li><a href="#" className="hover:text-white">Beer</a></li>
              <li><a href="#" className="hover:text-white">Premium</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Return Policy</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-[#3c3c3c] rounded-full px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#8b5a2b]"
              />
              <button className="bg-[#a63f3f] text-white rounded-full px-4 py-2 hover:bg-[#8b3434]">
                <FaSearch className="rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}