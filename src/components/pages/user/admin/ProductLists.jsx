import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetProductsQuery } from '../../../../redux/productApi';

const topProducts = [
  { id: 1, name: "nude", sales: 152, revenue: "$106,248" },
  { id: 2, name: "8848", sales: 98, revenue: "$24,402" },
  { id: 3, name: "Opus One 2018", sales: 76, revenue: "$30,324" },
  { id: 4, name: "Whispering Angel Rosé 2022", sales: 203, revenue: "$5,075" },
  { id: 5, name: "Sassicaia 2019", sales: 67, revenue: "$16,750" },
];

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductLists() {
  const {data,error,isLoading}=useGetProductsQuery();
  const [searchData,setSearchData]=useState("");
  const [filteredProducts, setFilteredProducts] = useState(topProducts);

  useEffect(() => {
    const results = topProducts.filter(
      (obj) =>
        obj.name.toLowerCase().includes(searchData.toLowerCase()) ||
        obj.sales.toString() === searchData
    );
    console.log(results);
    
    setFilteredProducts(results );
  }, [searchData]);

  


  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >

        <input type="search" onChange={(e)=>setSearchData(e.target.value)} />
 
   
      <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}