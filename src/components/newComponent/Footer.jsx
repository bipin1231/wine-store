import React from "react";
import { FaSearch } from "react-icons/fa";
import { Wine} from "lucide-react";

export default function Footer(){
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
}