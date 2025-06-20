import React from 'react';
import { FiEdit, FiSave, FiX, FiFilter } from 'react-icons/fi';

const Controls = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isEditing,
  setIsEditing,
  activeTab,
  setActiveTab,
  handleSaveProductVariant
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
      <div className="flex gap-4">
        {['inventory', 'analytics', 'categories'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={()=>handleSaveProductVariant()}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
              >
                <FiSave size={18} /> Save Changeshhhh
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
  );
};

export default Controls;