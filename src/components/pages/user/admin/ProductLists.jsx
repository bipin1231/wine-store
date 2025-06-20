import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetProductsQuery } from '../../../../redux/productApi';

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductLists() {
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const [searchData, setSearchData] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const results = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchData.toLowerCase()) ||
          product.productSize.some((s) =>
            s.stock.toString().includes(searchData)
          )
        );
      });
      setFilteredProducts(results);
    }
  }, [searchData, products]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <input
        type="search"
        onChange={(e) => setSearchData(e.target.value)}
        placeholder="Search by name or stock"
        className="p-2 border rounded mb-4"
      />

      <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Inventory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sizes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts?.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.categoryName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="font-semibold">Size</div>
                      <div className="font-semibold">Price</div>
                      <div className="font-semibold">Stock</div>
                      {product?.productSize?.map((size) => (
                        <React.Fragment key={size.id}>
                          <div>{size.size}</div>
                          <div>NPR {size.sellingPrice}</div>
                          <div>{size.stock}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
