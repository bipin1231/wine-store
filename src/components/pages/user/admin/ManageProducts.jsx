import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetProductsQuery } from '../../../../redux/productApi';

function EditableCell({ value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);


  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onSave(editValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (editValue !== value) {
        onSave(editValue);
      }
    }
  };

  return (
    <td
      className="py-2 px-4 cursor-pointer hover:bg-indigo-50"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full px-2 py-1 border rounded-md text-sm"
        />
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
}



export default function ManageProducts() {
  const { data, error, isLoading } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  console.log(products);
  
  useEffect(() => {
    if (data) {
      const uniqueCategories = [
        'All',
        ...Array.from(new Set(data.map((product) => product.categoryName))),
      ];
      setCategories(uniqueCategories);
      setProducts(data);
    }
  }, [data]);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.categoryName === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-semibold text-gray-800">Product Management</h2>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 border rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.categoryName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">ID: {product.id}</span>
                </div>
              </div>

              <div className="px-6 py-4 bg-white">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4">Size</th>
                      <th className="py-2 px-4">Cost Price (Rs)</th>
                      <th className="py-2 px-4">Selling Price (Rs)</th>
                      <th className="py-2 px-4">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
  {product.productSize.map((size, index) => (
    <tr key={index} className="border-b">
      {['size', 'costPrice', 'sellingPrice', 'stock'].map((field) => (
      
        <EditableCell
          key={field}
          value={size[field]}
          onSave={(newValue) => {
            const updatedProducts = products.map((p) => {
              if (p.id !== product.id) return p;
          
              // Deep copy the productSize array
              const updatedSizes = p.productSize.map((s, i) =>
                s.id === size.id ? { ...s, [field]: newValue } : s
              );
          
              return { ...p, productSize: updatedSizes };
            });
          
            setProducts(updatedProducts);
            // TODO: Add API call here to persist changes
          }}
        />
      ))}
    </tr>
  ))}
</tbody>
                </table>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
