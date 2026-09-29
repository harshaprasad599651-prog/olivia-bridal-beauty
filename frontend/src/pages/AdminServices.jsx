import React, { useEffect,useState } from "react";
import { API_BASE_URL } from "../config";

function AdminServices() {
  const[services,setServices] =useState([]);
  

  const [showForm, setShowForm] = useState(false);

  const [editingService,setEditingService] = useState(null);

  const[formData,setFormData] = useState({
    name:"",
    category:"",
    description:"",
    price:"",
    duration:"",
    status:"Active",
  });

  useEffect(()=>{
    fetch(`${API_BASE_URL}/services`)
    .then((response)=>response.json())
    .then((data)=>{
      setServices(data);
    })
    .catch((error)=>{
      console.error("Error loading Service:",error);
    });
  }, []);

  const handleAddService = async()=> {
    if(!formData.name|| !formData.category || !formData.description || !formData.price || !formData.duration){
      alert("Please fill all fields");
      return;
    }
    try{
      const response = await fetch(`${API_BASE_URL}/services`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          name:formData.name,
          category:formData.category,
          description: formData.description,
          price: Number(formData.price),
          duration: formData.duration,
          status:formData.status,
        }),
      });

      


      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Failed to create services");
      }
      //Add newly created service to the table
      setServices((previousServices)=>[
        data.service,
        ...previousServices,
      ]);

      //Clear form 
      setFormData({
        name:"",
        category:"",
        description:"",
        price:"",
        duration:"",
        status:"Active",
      });

      //close form
      setShowForm(false);

    }catch(error){
      console.error("Error creating service:",error);
      alert("Failed to create service");
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category || "",
      description: service.description || "",
      price: service.price,
      duration: service.duration,
      status: service.status,
    });

    setShowForm(true);
  };

  const handleUpdateService = async () => {
    if(!formData.category){
      alert("Please select a category");
      return;
    }
  try {
    const response = await fetch(
      `${API_BASE_URL}/services/${editingService._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          description: formData.description,
          price: Number(formData.price),
          duration: formData.duration,
          status: formData.status,
        }),
      }
    );

    
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update service");
        }

        setServices((previousServices) =>
          previousServices.map((service) =>
            service._id === editingService._id
              ? data.service
              : service
          )
        );

        setEditingService(null);

        setFormData({
          name: "",
          category: "",
          description: "",
          price: "",
          duration: "",
          status: "Active",
        });

        setShowForm(false);

      } catch (error) {
        console.error("Error updating service:", error);
        alert(error.message);
      }
  };

    const handleDeleteService = async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this service?"
      );

      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/services/${id}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to delete service");
        }

        setServices((previousServices) =>
          previousServices.filter((service) => service._id !== id)
        );

      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service");
      }
      };  



  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">

          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Olivia Bridal & Beauty
          </p>

          <h1 className="text-2xl font-serif text-slate-900 mt-1">
            Manage Services
          </h1>

        </div>
      </header>


      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">

          <div>
            <h2 className="text-3xl font-serif text-slate-900">
              Services
            </h2>

            <p className="text-slate-600 mt-2">
              Add, edit and manage salon services.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em]"
          >
            + Add Service
          </button>

        </div>


        {/* Add Service Form */}
        {showForm && (
          <div className="bg-white border border-slate-200 p-6 mb-8">

            <h3 className="text-xl font-serif mb-6">
              Add New Service
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-slate-600">
                  Service Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Bridal Makeup"
                  value={formData.name}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      name:e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">
                  Category
                </label>

                <select
                value={formData.category}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    category:e.target.value,
                  })
                }
                  className="w-full mt-2 border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                >
                  <option value="">Select Category</option>
                  <option value="Hair">Hair</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Skin Care">Skin Care</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Nails">Nails</option>
                  <option value="Other">Other</option>
                  

                </select>

              </div>



              <div>
                  <label className="text-sm text-slate-600">
                    Description
                  </label>

                  <textarea
                    placeholder="Describe this service..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows="4"
                    className="w-full mt-2 border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                  />
                </div>


              <div>
                <label className="text-sm text-slate-600">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="25000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>


              <div>
                <label className="text-sm text-slate-600">
                  Duration
                </label>

                <input
                  type="number"
                  placeholder="60 minutes"
                  value = {formData.duration}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      duration:e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>


              <div>
                <label className="text-sm text-slate-600">
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      status:e.target.value,
                    })
                  }
                  className="w-full mt-2 border border-slate-300 px-4 py-3">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

            </div>


            <div className="flex gap-3 mt-6">

              <button
                onClick={editingService ? handleUpdateService : handleAddService}
                className="px-6 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em]">
                {editingService ? "Update Service" : "Save Service"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-slate-300 text-xs uppercase tracking-[0.2em]"
              >
                Cancel
              </button>

            </div>

          </div>
        )}


        {/* Services Table */}
        <div className="bg-white border border-slate-200 overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b border-slate-200">
              <tr>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Service
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                  Category
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

              {services.map((service) => (
                <tr
                  key={service._id}
                  className="border-b border-slate-100"
                >

                  <td className="px-6 py-5 font-medium text-slate-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-900">
                    {service.category}
                  </td>

                  <td className= "px-6 py-5 font-medium text-slate-900">
                    {service.description}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    Rs. {service.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {service.duration} Minutes
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-xs px-3 py-1 bg-green-50 text-green-700">
                      {service.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex gap-3">

                      <button 
                      type="button"
                      onClick={() => handleEditService(service)}
                      className="text-xs uppercase tracking-widest text-slate-700">
                        Edit
                      </button>

                      <button 
                        type="button"
                        onClick={() => handleDeleteService(service._id)}
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

      </main>

    </div>
  );
}

export default AdminServices;