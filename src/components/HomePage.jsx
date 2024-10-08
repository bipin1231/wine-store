import React, { useState } from 'react';
import { Wine, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedCollection from './reusable/FeaturedCollection';
import Arrivals from './reusable/Arrivals';
import { useSelector } from 'react-redux';

const Button = ({ children, variant, size, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded ${variant === 'ghost' ? 'bg-transparent' : 'bg-blue-500 text-white'
      } ${size === 'icon' ? 'p-2' : ''} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    className={`border rounded px-3 py-2 ${className}`}
    {...props}
  />
);




const HomePage = () => {
  const [latestArrivals, setLatestArrival] = useState([
    { name: "Château Margaux 2015", price: "$699", image: "/api/placeholder/300/400" },
    { name: "Opus One 2018", price: "$399", image: "/api/placeholder/300/400" },
    { name: "Dom Pérignon 2010", price: "$249", image: "/api/placeholder/300/400" },
    { name: "Sassicaia 2017", price: "$279", image: "/api/placeholder/300/400" },
  ]);

    const [featuredCollection,setFeaturedCollection]=useState([
      { name: "Red Wines", image: "/api/placeholder/600/400" },
      { name: "White Wines", image: "/api/placeholder/600/400" },
      { name: "Sparkling Wines", image: "/api/placeholder/600/400" },
    ])

    const collection=useSelector(state=>state.products.collection)
    console.log(collection);
    


  return (
    <>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Exquisite Wines
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Explore our curated selection of premium wines from around the world.
              </p>
              <div className="space-x-4">
                <Button>Shop Now</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Featured Collections
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collection.map((collection) => (
            <FeaturedCollection
            key={collection.name}
            name={collection.name}
            img={collection.image}
          />
              ))}
              
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Latest Arrivals
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latestArrivals.map((wine) => (

                <Arrivals
                key={wine.name}
                  name={wine.name}
                  price={wine.price}
                  img={wine.image}
                />
                // <div key={wine.name} className="group relative overflow-hidden rounded-lg shadow-lg">
                //   <img
                //     src={wine.image}
                //     alt={wine.name}
                //     className="object-cover w-full h-[400px] transition-transform group-hover:scale-105"
                //   />
                //   <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
                //   <div className="absolute inset-x-0 bottom-0 p-4">
                //     <h3 className="text-lg font-semibold text-white">{wine.name}</h3>
                //     <p className="mt-2 text-sm text-gray-300">{wine.price}</p>
                //   </div>
                //   <Button className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                //     Add to Cart
                //   </Button>
                // </div>
              ))}

            </div>
          </div>
        </section>
      </main>

    </>
  );
};

export default HomePage;