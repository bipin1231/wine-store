import React from 'react'

function Arrivals({name,img,price}) {
  return (
    <>
                    <div key={name} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                  <img
                    src={img}
                    alt={name}
                    className="object-cover w-full h-[400px] transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <p className="mt-2 text-sm text-gray-300">{price}</p>
                  </div>
                  <button className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    Add to Cart
                  </button>
                </div>
    </>
  )
}

export default Arrivals
