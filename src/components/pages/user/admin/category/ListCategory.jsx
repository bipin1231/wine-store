import React, { useState, useEffect } from 'react';

function ListCategory({ categories, isEditing, onSaveAll }) {
  const [modifiedCategories, setModifiedCategories] = useState({});

const handleFieldChange = (id, field, value) => {
  setModifiedCategories(prev => ({
    ...prev,
    [id]: {
      ...prev[id],        // keep existing changes for that ID
      [field]: field === 'img' ? value[0] : value     // update this field
    }
  }));
};




console.log(modifiedCategories);
const handleSaveAll = () => {
  const updated = Object.entries(modifiedCategories).map(([id, field]) => ({
    id: Number(id),
    ...field
  }));



  console.log("Final changes:", updated);

  if (updated.length > 0) {
   onSaveAll(updated);
   //setModifiedCategories({});
  }
};

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Subcategory</th>
            <th className="py-3 px-4">Image</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat) => (
            <React.Fragment key={cat.id}>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4 font-medium">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={cat.name}
                      onChange={(e) =>
                        handleFieldChange(cat.id,"name", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    cat.name || '—'
                  )}
                </td>
                <td className="py-2 px-4 text-gray-400 italic">—</td>
                <td className="py-2 px-4">
                 <td className="py-2 px-4">
  {isEditing && !cat?.subcategories ? (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFieldChange(cat.id, "img", e.target.files)}
      />
      {cat.img && (
        <img
          src={`http://localhost:8080/images/${cat.img}`}
          alt=""
          className="w-16 h-16 object-cover mt-2"
        />
      )}
    </>
  ) : (
    <img
      src={`http://localhost:8080/images/${cat.img}`}
      alt=""
      className="w-16 h-16 object-cover"
    />
  )}
</td>

                </td>
              </tr>
        
               {cat.subcategories?.map((sub) => (
                  <tr key={sub.id} className="bg-gray-50 border-b">
                  <td className="py-2 px-4 pl-8 text-sm text-gray-500">↳ {cat.name}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={sub.name}
                        onChange={(e) =>
                          handleFieldChange(sub.id, "name", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      sub.name || '—'
                    )}
                  </td>
                  <td className="py-2 px-4">
               <td className="py-2 px-4">
  {isEditing ? (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFieldChange(sub.id, "img", e.target.files)}
      />
      {sub.img && (
        <img
          src={`http://localhost:8080/images/${sub.img}`}
          alt=""
          className="w-16 h-16 object-cover mt-2"
        />
      )}
    </>
  ) : (
    <img
      src={`http://localhost:8080/images/${sub.img}`}
      alt=""
      className="w-16 h-16 object-cover"
    />
  )}
</td>

                    </td>
                </tr>
              ))} 
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="mt-4 text-right">
          <button
            onClick={handleSaveAll}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save All Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ListCategory;
