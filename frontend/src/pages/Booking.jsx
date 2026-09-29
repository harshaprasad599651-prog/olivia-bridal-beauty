import { useEffect,useState } from "react";
import { API_BASE_URL } from "../config";


function Booking() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const bookingDateTime =
  bookingDate && bookingTime
    ? new Date(`${bookingDate}T${bookingTime}`)
    : null;
  
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
      });
  }, []);

  const handleAddService = () => {
    if (!selectedService) {
      return;
    }
    if (selectedServices.includes(selectedService)) {
      alert("This service has selected. Select another service");
    return;
    }

    setSelectedServices((previousServices) => [
      ...previousServices,
      selectedService,
    ]);
  };

  const handleRemoveService = (serviceId) => {
    setSelectedServices((previousServices)=>
      previousServices.filter((id)=>id !== serviceId)
    );
  };

  const totalPrice = selectedServices.reduce((total, serviceId) => {
  const service = services.find((item) => item._id === serviceId);

  return total + (service ? service.price : 0);
  }, 0);

  const totalDuration = selectedServices.reduce((total, serviceId) => {
  const service = services.find((item) => item._id === serviceId);

  return total + (service ? Number(service.duration) : 0);
  }, 0);

  


  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Book an Appointment
        </h1>
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Choose Your Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              className="w-full border rounded-lg px-4 py-3"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >  <option>Select Category</option>
              <option>Hair</option>
              <option>Bridal</option>
              <option>Skin Care</option>
              <option>Makeup</option>
              <option>Nails</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Service
            </label>

            <select
              className="w-full border rounded-lg px-4 py-3"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              
            >           
            <option value="">Select Service</option>

            {services
              .filter((service) => service.category === selectedCategory)
              .map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>


          <button
            type="button"
            onClick={handleAddService}
            className="mt-4 px-5 py-3 rounded-lg bg-slate-900 text-white"
          >
            Add Service
          </button>   

            <h2  className="text-xl md:text-2xl font-semibold mt-4">
              Choose Date and Time
            </h2>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
              </div>
            <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Appointment Time
            </label>

            <input
              type="time"
              className="w-full border rounded-lg px-4 py-3"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>


          <div className="mt-5  pt-4 flex justify-between font-semibold border-t">
            <span>Total Price</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div> 

           <div className="pt-4 flex justify-between font-semibold">
            <span>Total Time</span>
            <span>
              {Math.floor(totalDuration / 60)} hours{" "}
              {totalDuration % 60} minutes
            </span>
          </div> 

          
          

          {selectedServices.length > 0 && (
          <div className="mt-6">

            <h3 className="font-semibold mb-3">
              Selected Services
            </h3>

            <div className="space-y-3">
              {selectedServices.map((serviceId) => {
                const service = services.find(
                  (item) => item._id === serviceId
                );

                return (
                  <div
                    key={serviceId}
                    className="flex justify-between items-center border rounded-lg p-4"
                  >
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-slate-500">
                        Rs. {service.price}
                      </p>
                      <p className="font-medium">{Math.floor(service.duration / 60)} hours{" "}
                        {service.duration % 60} minutes</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveService(serviceId)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        )}

          </div>

        </div>

      </div>

      </div>
    </div>
  );
}

export default Booking;