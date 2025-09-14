import React from 'react'
import { motion } from 'framer-motion';
import { FiEdit, FiSave, FiX, FiFilter, FiPlus, FiTrash2, FiImage, FiSearch } from 'react-icons/fi';
function ProductVariantImage({currentProduct,setIsImageModalOpen}) {
  console.log("dasdasdads",currentProduct);
  console.log("heellllllp");
  
  
  return (
    <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Manage Images for {currentProduct.name}</h3>
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {currentProduct?.imageUrl?.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 flex items-center justify-center">
                      <FiImage className="text-gray-400 text-2xl" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                        <FiEdit size={16} />
                      </button>
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                        <FiTrash2 size={16} className="text-rose-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FiPlus className="mx-auto text-gray-400 text-2xl mb-2" />
                <p className="text-gray-500 mb-3">Upload new images</p>
                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
                  Select Files
                </button>
                <p className="text-xs text-gray-400 mt-3">JPG, PNG or GIF • Max 5MB</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
  )
}

export default ProductVariantImage
