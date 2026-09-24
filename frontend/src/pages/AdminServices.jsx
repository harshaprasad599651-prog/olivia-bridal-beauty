import React, { useEffect,useState } from "react";

function AdminServices() {
  const[services,setServices] =useState([]);
  

  const [showForm, setShowForm] = useState(false);

  const[formData,setFormData] = useState({
    name:"",
    description:"",
    price:"",
    duration:"",
    status:"Active",
  });

  useEffect(()=>{
    fetch("http://localhost:5000/api/services")
    .then((response)=>response.json())
    .then((data)=>{
      setServices(data);
    })
    .catch((error)=>{
      console.error("Error loading Service:",error);
    });
  }, []);

  const handleAddService = async()=> {
    if(!formData.name|| !formData.description || !formData.price || !formData.duration){
      alert("Please fill all fields");
      return;
    }
    try{
      const response = await fetch("http://localhost:5000/api/services",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          name:formData.name,
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
                  type="text"
                  placeholder="2 Hours"
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
                onClick={handleAddService}
                className="px-6 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em]">
                Save Service
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

                  <td className="px-6 py-5 text-slate-600">
                    Rs. {service.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {service.duration}
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-xs px-3 py-1 bg-green-50 text-green-700">
                      {service.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex gap-3">

                      <button className="text-xs uppercase tracking-[0.1em] text-slate-700">
                        Edit
                      </button>

                      <button className="text-xs uppercase tracking-[0.1em] text-red-600">
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