import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetSizeQuery, useAddSizeMutation } from "../../../../../redux/sizeApi";

function SizeManagementPage() {
  // fetch from API
  const { data: sizesData = [], isLoading } = useGetSizeQuery();
  const [addSize] = useAddSizeMutation();

  const [sizes, setSizes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedSizes, setModifiedSizes] = useState({});

  // react-hook-form for adding new size
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (!isLoading && sizesData.length > 0) {
      setSizes(sizesData);
    }
  }, [isLoading, sizesData]);

  // Track field changes (editing)
  const handleFieldChange = (id, field, value) => {
    setModifiedSizes((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]:
          field === "bottleInCartoon" ? parseInt(value, 10) || 0 : value,
      },
    }));
  };

  // Save all edited changes
  const handleSaveAll = () => {
    const updated = sizes.map((sz) =>
      modifiedSizes[sz.id] ? { ...sz, ...modifiedSizes[sz.id] } : sz
    );

    console.log("Final saved:", updated);
    setSizes(updated);
    setModifiedSizes({});
    setIsEditing(false);
    // TODO: call updateSizeMutation here if API available
  };

  // Delete a size (local only for now)
  const handleDelete = (id) => {
    setSizes((prev) => prev.filter((sz) => sz.id !== id));
    const copy = { ...modifiedSizes };
    delete copy[id];
    setModifiedSizes(copy);
    // TODO: call deleteSizeMutation if available
  };

  // Add a new size via API
  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const newSize = await addSize({
        size: data.size,
        bottleInCartoon: parseInt(data.bottleInCartoon),
      }).unwrap();

      setSizes((prev) => [...prev, newSize]);
      reset();
    } catch (err) {
      console.error("Failed to add size:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🍾 Manage Liquor Sizes</h1>

      {/* Sizes Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 border">Size</th>
              <th className="py-3 px-4 border">Bottles per Carton</th>
              {isEditing && <th className="py-3 px-4 border">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {sizes.map((sz) => (
              <tr
                key={sz.id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                {/* Size */}
                <td className="py-2 px-4 border">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={sz.size}
                      onChange={(e) =>
                        handleFieldChange(sz.id, "size", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    sz.size || "—"
                  )}
                </td>

                {/* Bottles per Carton */}
                <td className="py-2 px-4 border">
                  {isEditing ? (
                    <input
                      type="number"
                      defaultValue={sz.bottleInCartoon}
                      onChange={(e) =>
                        handleFieldChange(
                          sz.id,
                          "bottleInCartoon",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    sz.bottleInCartoon || "—"
                  )}
                </td>

                {/* Delete button */}
                {isEditing && (
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleDelete(sz.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between mt-4">
        {isEditing ? (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              💾 Save All Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            ✏️ Edit Sizes
          </button>
        )}
      </div>

      {/* Add New Size (react-hook-form) */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">➕ Add New Size</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 items-center"
        >
          <div>
            <input
              type="text"
              placeholder="e.g. 750ml"
              {...register("size", { required: true })}
              className="border border-gray-300 rounded px-3 py-2 w-32"
            />
            {errors.size && (
              <span className="text-red-500 text-xs">Required</span>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="e.g. 12"
              {...register("bottleInCartoon", {
                required: true,
                valueAsNumber: true,
              })}
              className="border border-gray-300 rounded px-3 py-2 w-40"
            />
            {errors.bottleInCartoon && (
              <span className="text-red-500 text-xs">Required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-md shadow hover:bg-green-700 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default SizeManagementPage;
