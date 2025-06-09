import React, { useState, useEffect } from "react";

function ImageEditorModal({id, images, onClose, onSave,deleteImage }) {
  // images is array of URLs or existing images
  const [localImages, setLocalImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]); // store newly uploaded files
 console.log("localImages",localImages);
 console.log("newFiles",newFiles);
 
 
  // Load image URLs into preview objects on open
  useEffect(() => {
    setLocalImages(images.map((url) => ({url:url,file:null})));
    setNewFiles([]);
  }, [images]);

  // Delete image by index
  const handleDelete = (idx) => {
    console.log(idx);
    
    setLocalImages((imgs) => imgs.filter((_, i) => i !== idx));
   // deleteImage(id,imgUrl)
  };

  // Handle adding new files
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Convert files to preview URLs
    const newImgs = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setLocalImages((imgs) => [...imgs, ...newImgs]);
    setNewFiles((old) => [...old, ...files]);
  };

  const handleSaveClick = () => {
    // On save return array of updated images info:
    // For simplicity here we just return URLs and new files,
    // you can handle upload logic outside this component
    onSave(id,localImages);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-auto p-6">
        <h3 className="text-2xl font-semibold mb-4">Edit Images</h3>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {localImages.length === 0 && (
            <p className="col-span-3 text-center text-gray-500">
              No images yet. Add some below.
            </p>
          )}
          {localImages.map((img, idx) => (
            <div key={idx} className="relative group rounded overflow-hidden border">
              {
                img.file!=null?   <img
                src={img.url}
                alt={`Product Image ${idx + 1}`}
                className="object-cover w-full h-24"
              />:

       
              <img
                src={`http://localhost:8080/images/${img.url}`}
                alt={`Product Image ${idx + 1}`}
                className="object-cover w-full h-24"
              />
}
              <button
                onClick={() => handleDelete(idx)}
                className="absolute top-1 right-1 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                title="Delete Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditProductInfo({ product, categories, onSave,onDeleteImage,handleSaveImages }) {
  const [modifiedChange, setModifiedChange] = useState({});
  const [imageId, setImageId] = useState(null); // product id or null
  const [imagesForEditing, setImagesForEditing] = useState([]);

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

  const openImageEditor = (prod) => {
    setImageId(prod.id);
    setImagesForEditing(prod.imageUrl ? [...prod.imageUrl] : []);
  };

  const closeImageEditor = () => {
    setImageId(null);
    setImagesForEditing([]);
  };

  const saveImages = (newImages) => {
    // newImages is array of {url, file|null}
    // For simplicity, let's just save urls in modifiedChange
    setModifiedChange((prev) => ({
      ...prev,
      [editingImagesFor]: {
        ...prev[editingImagesFor],
        imageUrl: newImages.map((img) => img.url),
      },
    }));
   
  };

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
            <th className="py-3 px-4 font-semibold border-b">Image</th>
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
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-3 px-4 flex flex-col space-y-2">
                {prod.imageUrl && prod.imageUrl.length > 0 ? (
                  <img
                    src={prod.imageUrl[0]}
                    alt={`Product ${prod.id}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                    No Image
                  </div>
                )}
                <button
                  onClick={() => openImageEditor(prod)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit Images
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      { imageId!== null && (
        <ImageEditorModal
          id={imageId}
          images={imagesForEditing}
          onClose={closeImageEditor}
          onSave={handleSaveImages}
          deleteImage={onDeleteImage}
        />
      )}
    </div>
  );
}
