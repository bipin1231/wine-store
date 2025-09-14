import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // React Router Link
import { Wine, Search, ShoppingCart, User, ArrowRight } from 'lucide-react';
import {Button, ButtonGroup} from "@nextui-org/button";
import { useSelector } from 'react-redux';
import { useGetCategoryQuery } from '../../../redux/categoryApi';

const collections = [
  { id: 1, name: "Red Wines", description: "Bold and robust flavors", image: "https://via.placeholder.com/600x400", count: 45 },
  { id: 2, name: "White Wines", description: "Crisp and refreshing varieties", image: "https://via.placeholder.com/600x400", count: 38 },
  { id: 3, name: "Rosé Wines", description: "Delicate and fruity blends", image: "https://via.placeholder.com/600x400", count: 22 },
  { id: 4, name: "Sparkling Wines", description: "Effervescent and celebratory", image: "https://via.placeholder.com/600x400", count: 30 },
  { id: 5, name: "Dessert Wines", description: "Sweet and indulgent selections", image: "https://via.placeholder.com/600x400", count: 15 },
  { id: 6, name: "Natural Wines", description: "Organic and biodynamic choices", image: "https://via.placeholder.com/600x400", count: 20 },
];

export default function CollectionPage() {
     const { data: categoryData } = useGetCategoryQuery();

  const collection=useSelector(state=>state.products.collection)
  console.log(collection);

      const localManagedCategory = categoryData?.flatMap((cat) => {
    if (Array.isArray(cat.subcategories) && cat.subcategories.length > 0) {
      return cat.subcategories.map((sub) => ({
        id: sub.id,
        name: sub.name,
        img:sub.img
      }));
    } else {
      return [{ id: cat.id, name: cat.name, img:cat.img }];
    }
  }) || [];

  
  return (

  
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Explore Our Wine Collections
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-700 mt-4">
                  Discover a world of exquisite flavors curated by our expert sommeliers.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {localManagedCategory.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/product-catalog/${collection.name}`} className="group block">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={`http://localhost:8080/images/${collection.img}`}
                        alt={collection.name}
                        className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h2 className="text-2xl font-bold text-white mb-2">{collection.name}</h2>
                        <p className="text-sm text-gray-300 mb-4">{collection.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-white">{collection.count} Wines</span>
                          <motion.div
                            className="text-white"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
     
             
  );
}
