import React,{useState} from 'react'
import {  ChevronDown} from "lucide-react";
import { NavLink ,useLocation} from "react-router-dom";
import { Wine, Grape, Beer, Martini, Star, ShoppingCart, Plus } from "lucide-react";
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
     <nav className=" flex justify-center gap-4 py-4 bg-white font-medium z-40 relative shadow-sm">
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
