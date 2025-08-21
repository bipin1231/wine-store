import React from 'react'
import {  ChevronDown} from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar({categories,isCategoryActive,activeDropdown,setActiveDropdown}) {
  return (
     <nav className="hidden lg:flex justify-center gap-4 py-4 bg-white font-medium z-40 relative shadow-sm">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-[#a63f3f]" : "text-gray-700 hover:text-[#a63f3f]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              Home
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#a63f3f] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                  }`}
              />
            </>
          )}
        </NavLink>

        <NavLink
          to="/product-catalog"
          end
          className={({ isActive }) =>
            `relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-[#a63f3f]" : "text-gray-700 hover:text-[#a63f3f]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              All Products
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#a63f3f] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                  }`}
              />
            </>
          )}
        </NavLink>

        {categories.map((category) => (
          <div
            key={category.title}
            className="relative group"
            onMouseEnter={() => setActiveDropdown(category.title)}
            onMouseLeave={() => setActiveDropdown(null)}
          >

<NavLink
  to={`/product-catalog/${category.title}`}
  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors relative ${
    isCategoryActive(category)
      ? "text-[#a63f3f]"
      : "text-gray-700 hover:text-[#a63f3f]"
  }`}
>
  <category.icon className="w-4 h-4" />
  <span>{category.title}</span>
  <ChevronDown
    className={`w-4 h-4 transition-transform duration-300 ${
      isCategoryActive(category) ? "rotate-180" : "rotate-0"
    }`}
  />
  <span
    className={`absolute left-0 bottom-0 h-[2px] bg-[#a63f3f] transition-all duration-300 ${
      isCategoryActive(category) ? "w-full" : "w-0"
    }`}
  />
</NavLink>

            {activeDropdown === category.title && (
              <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-xl shadow-lg z-50 p-4 border border-gray-100">
                <ul className="grid gap-2 mt-4">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={`/product-catalog/${item.name}`}
                        className={({ isActive }) =>
                          `relative block px-3 py-2 rounded-md text-sm transition ${isActive
                            ? "text-[#a63f3f] bg-gray-50"
                            : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {item.name}
                            <span
                              className={`absolute left-0 bottom-0 h-[2px] bg-[#a63f3f] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                                }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>
  )
}

export default Navbar
