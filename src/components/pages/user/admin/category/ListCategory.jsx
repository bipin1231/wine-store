import React, { useState } from "react";

function ListCategory({ categories, isEditing, onSaveAll, onDelete }) {
  const [modifiedCategories, setModifiedCategories] = useState({});

  const handleFieldChange = (id, field, value) => {
    setModifiedCategories((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === "img" ? value[0] : value, // take first file if img
      },
    }));
  };

  const handleSaveAll = () => {
    const updated = Object.entries(modifiedCategories).map(([id, field]) => ({
      id: Number(id),
      ...field,
    }));

    console.log("Final changes:", updated);

    if (updated.length > 0) {
      onSaveAll(updated);
    }
  };

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="py-3 px-4 border">Category</th>
            <th className="py-3 px-4 border">Subcategory</th>
            <th className="py-3 px-4 border">Image</th>
            {isEditing && <th className="py-3 px-4 border">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat) => (
            <React.Fragment key={cat.id}>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                {/* Category name */}
                <td className="py-2 px-4 border font-medium">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={cat.name}
                      onChange={(e) =>
                        handleFieldChange(cat.id, "name", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    cat.name || "—"
                  )}
                </td>

                {/* Subcategory placeholder */}
                <td className="py-2 px-4 border text-gray-400 italic">—</td>

                {/* Category image */}
                <td className="py-2 px-4 border">
                  {isEditing && !cat?.subcategories ? (
                    <div className="flex flex-col items-start space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFieldChange(cat.id, "img", e.target.files)
                        }
                        className="text-sm text-gray-500
                          file:mr-3 file:py-1 file:px-3
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                      {cat.img && (
                        <img
                          src={`http://localhost:8080/images/${cat.img}`}
                          alt=""
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )}
                    </div>
                  ) : (
                    cat.img && (
                      <img
                        src={`http://localhost:8080/images/${cat.img}`}
                        alt=""
                        className="w-16 h-16 object-cover rounded border"
                      />
                    )
                  )}
                </td>

                {/* ✅ Delete column */}
                {isEditing && (
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => onDelete(cat.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>

              {/* Subcategories */}
              {cat.subcategories?.map((sub) => (
                <tr
                  key={sub.id}
                  className="bg-gray-50 border-b hover:bg-gray-100"
                >
                  {/* parent ref */}
                  <td className="py-2 px-4 border pl-8 text-sm text-gray-500">
                    ↳ {cat.name}
                  </td>

                  {/* sub name */}
                  <td className="py-2 px-4 border">
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={sub.name}
                        onChange={(e) =>
                          handleFieldChange(sub.id, "name", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      sub.name || "—"
                    )}
                  </td>

                  {/* sub image */}
                  <td className="py-2 px-4 border">
                    {isEditing ? (
                      <div className="flex flex-col items-start space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFieldChange(sub.id, "img", e.target.files)
                          }
                          className="text-sm text-gray-500
                            file:mr-3 file:py-1 file:px-3
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                        {sub.img && (
                          <img
                            src={`http://localhost:8080/images/${sub.img}`}
                            alt=""
                            className="w-16 h-16 object-cover rounded border"
                          />
                        )}
                      </div>
                    ) : (
                      sub.img && (
                        <img
                          src={`http://localhost:8080/images/${sub.img}`}
                          alt=""
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )
                    )}
                  </td>

                  {/* ✅ Subcategory delete */}
                  {isEditing && (
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => onDelete(sub.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Save all changes button */}
      {isEditing && (
        <div className="mt-4 text-right">
          <button
            onClick={handleSaveAll}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            💾 Save All Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ListCategory;
