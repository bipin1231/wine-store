import React from 'react'
import { Link } from 'react-router-dom'
function FeaturedCollection({ name, img }) {
  return (
    <>
      <Link

        to={`/product-catalog/${name}`}
        className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      >
        <img
          src={img}
          alt={name}
          className="object-cover w-full h-[300px] transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
         <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{name}</h3>
                  </div>
      </Link>
    </>
  )
}

export default FeaturedCollection
