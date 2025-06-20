import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiSave, FiX, FiFilter, FiPlus, FiTrash2, FiImage, FiSearch } from 'react-icons/fi';
import ProductVariantImage from './product/ProductVariantImage';

const ManageProducts = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Sample data
  const categories = ['All', 'Vodka', 'Whiskey', 'Rum', 'Gin', 'Tequila'];
  
  const products = [
    {
      id: 1,
      name: "Nude Vodka",
      categoryName: "Vodka",
      description: "Premium triple-distilled vodka",
      productVariant: [
        {
          id: 5,
          costPrice: 500,
          sellingPrice: 550,
          size: "180ml",
          stock: 10,
          imageUrl: ['3c9d5fa5-c2a2-46ef-8c85-0a52a57679f6_vodka.jpg']
        },
        {
          id: 6,
          costPrice: 1000,
          sellingPrice: 1100,
          size: "750ml",
          stock: 5,
          imageUrl: ['a957b63d-5ef6-4eb8-9fd5-5cc019da7a1b_vodka.jpg']
        }
      ]
    },
    {
      id: 2,
      name: "Premium Whiskey",
      categoryName: "Whiskey",
      description: "Aged 12 years in oak barrels",
      productVariant: [
        {
          id: 7,
          costPrice: 1200,
          sellingPrice: 1400,
          size: "500ml",
          stock: 8,
          imageUrl: ['whiskey_image1.jpg', 'whiskey_image2.jpg']
        }
      ]
    },
    {
      id: 3,
      name: "Golden Rum",
      categoryName: "Rum",
      description: "Caribbean style aged rum",
      productVariant: [
        {
          id: 8,
          costPrice: 450,
          sellingPrice: 600,
          size: "700ml",
          stock: 15,
          imageUrl: ['rum_image.jpg']
        }
      ]
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.categoryName === selectedCategory);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsImageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light text-gray-800">Product Inventory</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your product catalog efficiently</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
              <FiPlus size={18} /> Add Product
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'inventory' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Inventory
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'analytics' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'categories' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Categories
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                  >
                    <FiSave size={18} /> Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg transition"
                  >
                    <FiX size={18} /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
                >
                  <FiEdit size={18} /> Edit Products
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="text-gray-500 text-sm">Total Products</div>
            <div className="text-3xl font-light mt-2">24</div>
            <div className="text-emerald-500 text-sm mt-1">+3 this month</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="text-gray-500 text-sm">Out of Stock</div>
            <div className="text-3xl font-light mt-2">2</div>
            <div className="text-rose-500 text-sm mt-1">Need attention</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="text-gray-500 text-sm">Top Category</div>
            <div className="text-3xl font-light mt-2">Vodka</div>
            <div className="text-indigo-500 text-sm mt-1">42% of sales</div>
          </motion.div>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-medium text-gray-800">{product.name}</h2>
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                      {product.categoryName}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditClick(product)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 hover:bg-gray-50 rounded-lg transition"
                  >
                    <FiImage size={16} /> Images
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 hover:bg-gray-50 rounded-lg transition">
                    <FiEdit size={16} /> Details
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="py-3 px-5 text-left font-medium">Size</th>
                      <th className="py-3 px-5 text-right font-medium">Cost Price</th>
                      <th className="py-3 px-5 text-right font-medium">Selling Price</th>
                      <th className="py-3 px-5 text-right font-medium">Stock</th>
                      <th className="py-3 px-5 text-right font-medium">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {product.productVariant.map(variant => (
                      <tr key={variant.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-5 font-medium">
                          <div className="flex items-center gap-2">
                            {variant.size}
                            {variant.stock === 0 && (
                              <span className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                                Out of stock
                              </span>
                            )}
                          </div>
                        </td>
                        
                        {isEditing ? (
                          <>
                            <td className="py-3 px-5">
                              <div className="flex justify-end">
                                <input
                                  type="number"
                                  defaultValue={variant.costPrice}
                                  className="w-28 text-right py-1 px-3 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-5">
                              <div className="flex justify-end">
                                <input
                                  type="number"
                                  defaultValue={variant.sellingPrice}
                                  className="w-28 text-right py-1 px-3 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-5">
                              <div className="flex justify-end">
                                <input
                                  type="number"
                                  defaultValue={variant.stock}
                                  className="w-20 text-right py-1 px-3 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-5 text-right text-gray-700">
                              Rs. {variant.costPrice.toLocaleString()}
                            </td>
                            <td className="py-3 px-5 text-right font-medium text-indigo-600">
                              Rs. {variant.sellingPrice.toLocaleString()}
                            </td>
                            <td className={`py-3 px-5 text-right ${
                              variant.stock < 5 ? 'text-amber-600' : 'text-gray-700'
                            }`}>
                              {variant.stock} units
                            </td>
                          </>
                        )}
                        <td className="py-3 px-5 text-right">
                          <span className="text-emerald-600 font-medium">
                            Rs. {(variant.sellingPrice - variant.costPrice).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <FiFilter className="text-indigo-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No products found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try changing your category filter or search query to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Image Management Modal */}
      {isImageModalOpen && currentProduct && (
        <ProductVariantImage
        currentProduct={currentProduct}
        setIsImageModalOpen={setIsImageModalOpen}
        />     
      )}
    </div>
  );
};

export default ManageProducts;