import React from 'react'

function Footer() {
  return (
    <>
     <footer className="w-full py-6 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className=" gap-8 sm:grid-cols-2 md:grid-cols-4 flex justify-around">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">About Us</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/our-story" className="hover:text-blue-500">Our Story</a></li>
                <li><a href="/team" className="hover:text-blue-500">Our Team</a></li>
                <li><a href="/careers" className="hover:text-blue-500">Careers</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Customer Service</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/faq" className="hover:text-blue-500">FAQ</a></li>
                <li><a href="/shipping" className="hover:text-blue-500">Shipping & Returns</a></li>
                <li><a href="/contact" className="hover:text-blue-500">Contact Us</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-blue-500">Facebook</a></li>
                <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
                <li><a href="#" className="hover:text-blue-500">Twitter</a></li>
              </ul>
            </div>
     
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm">
            © 2023 Elegant Wines. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
