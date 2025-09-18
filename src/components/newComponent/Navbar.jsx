import React, { useState } from 'react'
import { ChevronDown } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { Wine, Beer, Martini } from "lucide-react"

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

function Navbar() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isCategoryActive = (category) => {
    const path = location.pathname.toLowerCase();

    // highlight if parent matches
    if (path.includes(category.title.toLowerCase())) return true;

    // highlight if any item inside matches
    if (category.items) {
      return category.items.some(item =>
        path.includes(item.name.toLowerCase())
      );
    }

    return false;
  };

  return (
    <nav className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 py-3 md:py-4 bg-white font-medium z-40 relative shadow-sm overflow-x-auto scrollbar-hide">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `relative px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isActive ? "text-[#a63f3f]" : "text-gray-700 hover:text-[#a63f3f]"
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
          `relative px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isActive ? "text-[#a63f3f]" : "text-gray-700 hover:text-[#a63f3f]"
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
          className="relative group whitespace-nowrap"
          onMouseEnter={() => setActiveDropdown(category.title)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <NavLink
            to={`/product-catalog/${category.title}`}
            className={`flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium transition-colors relative ${
              isCategoryActive(category)
                ? "text-[#a63f3f]"
                : "text-gray-700 hover:text-[#a63f3f]"
            }`}
          >
            <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{category.title}</span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
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
            <div className="absolute top-full left-0 mt-0 w-56 sm:w-64 md:w-80 bg-white rounded-xl shadow-lg z-50 p-3 sm:p-4 border border-gray-100">
              <ul className="grid gap-1 sm:gap-2 mt-2 sm:mt-4">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={`/product-catalog/${item.name}`}
                      className={({ isActive }) =>
                        `relative block px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm transition ${isActive
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
      
      {/* Hide scrollbar for a cleaner look */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  )
}

export default Navbar