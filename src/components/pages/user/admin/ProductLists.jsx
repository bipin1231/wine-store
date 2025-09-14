import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../../../../redux/productApi";

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductLists() {
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const [searchData, setSearchData] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchData, products]);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading products.</p>;

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Search + Heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <input
          type="search"
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Search by name"
          className="p-2 w-64 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Product Inventory
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Variants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts?.map((product, idx) => (
                <tr
                  key={product.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {/* ID */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.id}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 text-gray-800">{product.name}</td>

                  {/* Category */}
                  <td className="px-6 py-4 text-gray-600">
                    {product.categoryName || "—"}
                  </td>

                  {/* Variants Section */}
                  <td className="px-6 py-4">
                    {product.productVariant?.length > 0 ? (
                      <div className="rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-100 text-gray-600">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium">
                                Size
                              </th>
                              <th className="px-3 py-2 text-left font-medium">
                                Price (NPR)
                              </th>
                              <th className="px-3 py-2 text-left font-medium">
                                Stock
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.productVariant.map((variant) => (
                              <tr key={variant.id} className="border-t">
                                <td className="px-3 py-2 text-gray-800">
                                  {variant.size || "—"}
                                </td>
                                <td className="px-3 py-2 text-gray-700">
                                  {variant.sellingPrice}
                                </td>
                                <td
                                  className={`px-3 py-2 ${
                                    variant.stock <= 5
                                      ? "text-red-600 font-semibold"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {variant.stock}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">
                        No variants
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-6 text-center text-gray-400"
                  >
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
