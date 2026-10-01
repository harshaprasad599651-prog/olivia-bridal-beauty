import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage,setEditingPackage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    content: [],
    description: "",
    price: "",
    duration: "",
    status: "Active",
  });
  const [contentInput, setContentInput] = useState("");

  const handleAddContent = () => {
  if (!contentInput.trim()) {
    return;
  }

  setFormData({
    ...formData,
    content: [...formData.content, contentInput.trim()],
  });

  setContentInput("");
  };  

  const handleRemoveContent = (index) => {
  setFormData({
    ...formData,
    content: formData.content.filter((_, i) => i !== index),
  });
  };

  const handleAddPackage = async()=>{
    if(
      !formData.name ||
      formData.content.length === 0 ||
      !formData.description ||
      !formData.price ||
      !formData.duration 
    ){
      alert("Please fill all fields");
      return;
    }
  
  try{
    const response = await fetch(
      `${API_BASE_URL}/packages`,
      {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          content: formData.content,
          description: formData.description,
          price: Number(formData.price),
          duration: formData.duration,
          status: formData.status,
        }),
      }
    );

    const data = await response.json();
    if(!response.ok){
      throw new Error(
        data.message || "Failed to create package"
      );
    }

    setPackages((previousPackages)=>[
      data.package,
      ...previousPackages,
    ]);

    setFormData({
      name:"",
      content:[],
      description:"",
      price:"",
      duration:"",
      status:"Active",
    });
    setShowForm(false);


  }catch(error){
    console.error("Error creating package",error);
    alert("Failed to create a package");
  }
 };
 
 const handleEditPackage = (pkg)=>{
  setEditingPackage(pkg);
  setFormData({
    name : pkg.name,
    content:pkg.content|| [],
    description:pkg.description || "",
    price: pkg.price,
    duration:pkg.duration,
    status: pkg.status,
  });
  setShowForm(true);
 };

 const handleUpdatePackage = async () => {
   
  try {
    const response = await fetch(
      `${API_BASE_URL}/packages/${editingPackage._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          content : formData.content,
          description: formData.description,
          price: Number(formData.price),
          duration: formData.duration,
          status: formData.status,
        }),
      }
    );

    
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update package");
        }

        setPackages((previousPackages) =>
          previousPackages.map((pkg) =>
            pkg._id === editingPackage._id
              ? data.package
              : pkg
          )
        );

        setEditingPackage(null);

        setFormData({
          name: "",
          content: "",
          description: "",
          price: "",
          duration: "",
          status: "Active",
        });

        setShowForm(false);

      } catch (error) {
        console.error("Error updating package:", error);
        alert(error.message);
      }
  };


 const handleDeletePackage = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure to want to delete this package?"
  );

  if(!confirmDelete){
    return;
  }
  try{
    const response = await fetch(
      `${API_BASE_URL}/packages/${id}`,
      {
        method:"DELETE",
      }
    );

    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || "Failed to delete package");
    }

    setPackages((previousPackages)=>
    previousPackages.filter((pkg)=>pkg._id !== id)
  );

  }catch(error){
    console.error("Error deleting package:",error);
    alert("Failed to delete Package");
  }

 };



  // Load packages from MongoDB
  useEffect(() => {
    fetch(`${API_BASE_URL}/packages`)
      .then((response) => response.json())
      .then((data) => {
        setPackages(data);
      })
      .catch((error) => {
        console.error("Error loading packages:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-6 pt-52 md:pt-40">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-slate-900">
              Packages
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Manage bridal and beauty packages
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em]"
          >
            Add Package
          </button>
        </div>

        {/* Add Package Form */}
        {showForm && (
          <div className="bg-white border border-slate-200 p-6 mb-8">

            <h2 className="text-lg font-medium text-slate-900 mb-6">
              Add New Package
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Package Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Package Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Enter package name"
                />
              </div>

              {/* Package Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    placeholder="Enter service"
                    className="flex-1 border rounded-lg px-3 py-2"
                  />

                  <button
                    type="button"
                    onClick={handleAddContent}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>

                {formData.content.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {formData.content.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
                      >
                        <span>{item}</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveContent(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Description
                </label>

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Describe the package"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Enter price"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 px-4 py-3 outline-none"
                  placeholder="e.g. 4 hours"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 px-4 py-3 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>

            {/* Form Buttons */}
            <div className="flex gap-4 mt-6">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-slate-300 text-xs uppercase tracking-[0.2em]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={editingPackage ? handleUpdatePackage : handleAddPackage}
                className="px-6 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em]"
              >
                {editingPackage ? "Update Package" : "Save Package"}
              </button>

            </div>
          </div>
        )}

        {/* Package List */}
        <div className="bg-white border border-slate-200">

          <div className="p-6">
            <h2 className="text-lg font-medium text-slate-900">
              All Packages
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {packages.length} package(s)
            </p>
          </div>

          <div className="border-t border-slate-200">

            {packages.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                No packages found.
              </div>
            ) : (
              <div className="bg-white border border-slate-200 overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b border-slate-200">
              <tr>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Package
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Content
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Description
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Duration
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>


            <tbody>

              {packages.map((pkg) => (
                <tr
                  key={pkg._id}
                  className="border-b border-slate-100"
                >

                  <td className="px-6 py-5 font-medium text-slate-900">
                    {pkg.name}
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-900">
                    
                      {Array.isArray(pkg.content) ? (
                      <ul>
                        {pkg.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>{pkg.content}</span>
                    )}
                    
                  </td>

                  <td className= "px-6 py-5 font-medium text-slate-900">
                    {pkg.description}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    Rs. {pkg.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {pkg.duration}
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-xs px-3 py-1 bg-green-50 text-green-700">
                      {pkg.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex gap-3">

                      <button 
                      type="button"
                      onClick ={() => handleEditPackage(pkg)}
                      className="text-xs uppercase tracking-widest text-slate-700">
                        Edit
                      </button>

                      <button 
                        type="button"
                        onClick={() => handleDeletePackage(pkg._id)}
                       className="text-xs uppercase tracking-widest text-red-600">
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
              
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPackages;