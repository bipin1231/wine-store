import React, { useState, useEffect } from "react";


export default function EditProductInfo({ product, categories, onSave,onDeleteImage,handleSaveImages }) {
  const [modifiedChange, setModifiedChange] = useState({});



  const handleDataChange = (id, val, field) => {
    setModifiedChange((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: val,
      },
    }));
  };

  const handleSave = () => {
    onSave(modifiedChange);
  };

  console.log(modifiedChange);
  
 
 

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Product Info
      </h2>
      <span
        className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded mb-4 inline-block"
        onClick={handleSave}
      >
        Save
      </span>
      <table className="w-full min-w-[700px] text-sm text-left text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 font-semibold border-b">ID</th>
            <th className="py-3 px-4 font-semibold border-b">Name</th>
            <th className="py-3 px-4 font-semibold border-b">Category</th>
            <th className="py-3 px-4 font-semibold border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {product?.map((prod) => (
            <tr
              key={prod.id}
              className="border-b last:border-none hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-mono text-gray-600">{prod.id}</td>
              <td className="py-3 px-4">
                <input
                  type="text"
                  defaultValue={prod.name}
                  onChange={(e) => handleDataChange(prod.id, e.target.value, "name")}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-3 px-4">
                <select
                  defaultValue={prod.categoryName}
                  onChange={(e) =>
                    handleDataChange(prod.id, e.target.value, "categoryName")
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </td>

                <td className="py-3 px-4">
                <input
                  type="text"
                  defaultValue={prod?.description}
                  onChange={(e) => handleDataChange(prod.id, e.target.value, "description")}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

   
    </div>
  );
}
