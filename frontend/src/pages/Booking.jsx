import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Booking() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  // Modal state
  const [modal, setModal] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    buttonText: "OK",
  });

  const bookingDateTime =
    bookingDate && bookingTime
      ? new Date(`${bookingDate}T${bookingTime}`)
      : null;

  // =========================
  // MODAL FUNCTION
  // =========================
  const showModal = ({
    type = "info",
    title,
    message,
    buttonText = "OK",
  }) => {
    setModal({
      show: true,
      type,
      title,
      message,
      buttonText,
    });
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    setModal((previous) => ({
      ...previous,
      show: false,
    }));
  };

  // =========================
  // MODAL OK BUTTON
  // =========================
  const handleModalOk = () => {
    const isSuccess = modal.type === "success";

    closeModal();

    if (isSuccess) {
      navigate("/");
    }
  };

  // =========================
  // LOAD SERVICES
  // =========================
  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Error loading services:", error);

        showModal({
          type: "error",
          title: "Unable to Load Services",
          message:
            "We could not load the available services. Please try again.",
        });
      });
  }, []);

  // =========================
  // ADD SERVICE
  // =========================
  const handleAddService = () => {
    if (!selectedService) {
      showModal({
        type: "warning",
        title: "Select a Service",
        message:
          "Please select a service before adding it to your appointment.",
      });
      return;
    }

    if (selectedServices.includes(selectedService)) {
      showModal({
        type: "warning",
        title: "Service Already Selected",
        message:
          "This service has already been added to your appointment.",
      });
      return;
    }

    setSelectedServices((previousServices) => [
      ...previousServices,
      selectedService,
    ]);

    setSelectedService("");
  };

  // =========================
  // REMOVE SERVICE
  // =========================
  const handleRemoveService = (serviceId) => {
    setSelectedServices((previousServices) =>
      previousServices.filter((id) => id !== serviceId)
    );
  };

  // =========================
  // TOTAL PRICE
  // =========================
  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = services.find((item) => item._id === serviceId);

    return total + (service ? Number(service.price) : 0);
  }, 0);

  // =========================
  // TOTAL DURATION
  // =========================
  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = services.find((item) => item._id === serviceId);

    return total + (service ? Number(service.duration) : 0);
  }, 0);

  // =========================
  // CONFIRM BOOKING
  // =========================
  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showModal({
        type: "warning",
        title: "Login Required",
        message:
          "Please login or create an account before making an appointment.",
      });
      return;
    }

    if (selectedServices.length === 0) {
      showModal({
        type: "warning",
        title: "No Service Selected",
        message:
          "Please select at least one service before confirming your appointment.",
      });
      return;
    }

    if (!bookingDate || !bookingTime) {
      showModal({
        type: "warning",
        title: "Date & Time Required",
        message:
          "Please select your preferred appointment date and time.",
      });
      return;
    }

    try {
      setBookingLoading(true);

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          services: selectedServices,
          packages: [],
          bookingDateTime,
          totalPrice,
          totalDuration,
          notes: "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModal({
          show: true,
          type: "success",
          title: "Booking Confirmed",
          message:
            "Your appointment request has been successfully created. We look forward to welcoming you to Olivia Bridal & Beauty.",
          buttonText: "OK",
        });
      } else {
        showModal({
          type: "error",
          title: "Booking Failed",
          message:
            data.message ||
            "We could not create your booking. Please try again.",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);

      showModal({
        type: "error",
        title: "Something Went Wrong",
        message:
          "We were unable to connect to the server. Please try again later.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  // =========================
  // MODAL ICON
  // =========================
  const getModalIcon = () => {
    if (modal.type === "success") {
      return "✓";
    }

    if (modal.type === "error") {
      return "!";
    }

    return "i";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* =========================
            PAGE HEADER
        ========================== */}
        <div className="text-center mb-8">

          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">
            Olivia Bridal & Beauty
          </p>

          <h1 className="text-3xl md:text-4xl font-serif font-light text-slate-900">
            Book an Appointment
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Choose your services and preferred appointment time.
          </p>

        </div>


        {/* =========================
            BOOKING FORM
        ========================== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Choose Your Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CATEGORY */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Category
              </label>

              <select
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedService("");
                }}
              >
                <option value="">
                  Select Category
                </option>

                <option value="Hair">Hair</option>
                <option value="Bridal">Bridal</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Makeup">Makeup</option>
                <option value="Nails">Nails</option>
                <option value="Other">Other</option>
              </select>

            </div>


            {/* SERVICE */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Service
              </label>

              <select
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">
                  Select Service
                </option>

                {services
                  .filter(
                    (service) =>
                      service.category === selectedCategory
                  )
                  .map((service) => (
                    <option
                      key={service._id}
                      value={service._id}
                    >
                      {service.name}
                    </option>
                  ))}
              </select>

              <button
                type="button"
                onClick={handleAddService}
                className="mt-4 px-5 py-3 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800 transition"
              >
                Add Service
              </button>

            </div>


            {/* DATE & TIME */}
            <div className="md:col-span-2">

              <h2 className="text-xl md:text-2xl font-semibold mt-4 mb-5">
                Choose Date and Time
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* DATE */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3"
                    value={bookingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setBookingDate(e.target.value)
                    }
                  />

                </div>


                {/* TIME */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3"
                    value={bookingTime}
                    onChange={(e) =>
                      setBookingTime(e.target.value)
                    }
                  />

                </div>

              </div>

            </div>


            {/* SELECTED SERVICES */}
            {selectedServices.length > 0 && (
              <div className="md:col-span-2 mt-4">

                <h3 className="font-semibold mb-3">
                  Selected Services
                </h3>

                <div className="space-y-3">

                  {selectedServices.map((serviceId) => {

                    const service = services.find(
                      (item) => item._id === serviceId
                    );

                    if (!service) return null;

                    return (
                      <div
                        key={serviceId}
                        className="flex justify-between items-center border border-slate-200 rounded-lg p-4"
                      >

                        <div>

                          <p className="font-medium text-slate-900">
                            {service.name}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            Rs.{" "}
                            {Number(service.price).toLocaleString()}
                          </p>

                          <p className="text-sm text-slate-500">
                            {Math.floor(
                              Number(service.duration) / 60
                            )}{" "}
                            hours{" "}
                            {Number(service.duration) % 60}{" "}
                            minutes
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveService(serviceId)
                          }
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


            {/* TOTALS */}
            <div className="md:col-span-2 mt-4">

              <div className="pt-4 flex justify-between font-semibold border-t border-slate-200">

                <span>Total Price</span>

                <span>
                  Rs. {totalPrice.toLocaleString()}
                </span>

              </div>

              <div className="pt-4 flex justify-between font-semibold">

                <span>Total Time</span>

                <span>
                  {Math.floor(totalDuration / 60)} hours{" "}
                  {totalDuration % 60} minutes
                </span>

              </div>

            </div>


            {/* CONFIRM BOOKING */}
            <div className="md:col-span-2">

              <button
                type="button"
                onClick={handleBooking}
                disabled={bookingLoading}
                className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
                  bookingLoading
                    ? "bg-slate-400 text-white cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {bookingLoading
                  ? "Creating Booking..."
                  : "Confirm Booking"}
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MODAL
      ====================================================== */}
      {modal.show && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

          {/* BLURRED BACKGROUND */}
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-md"
            onClick={closeModal}
          ></div>


          {/* DIALOG BOX */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center animate-[fadeIn_0.2s_ease-out]">

            {/* ICON */}
            <div
              className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                modal.type === "success"
                  ? "bg-slate-900 text-white"
                  : modal.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >

              <span className="text-2xl font-semibold">
                {getModalIcon()}
              </span>

            </div>


            {/* BRAND */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Olivia Bridal & Beauty
            </p>


            {/* TITLE */}
            <h2 className="text-2xl font-serif text-slate-900 mt-3">
              {modal.title}
            </h2>


            {/* MESSAGE */}
            <p className="text-sm text-slate-600 leading-6 mt-4">
              {modal.message}
            </p>


            {/* SUCCESS DETAILS */}
            {modal.type === "success" && (
              <div className="mt-6 border-t border-b border-slate-200 py-4 text-sm">

                <div className="flex justify-between mb-2">
                  <span className="text-slate-500">
                    Date
                  </span>

                  <span className="font-medium text-slate-900">
                    {bookingDate}
                  </span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-slate-500">
                    Time
                  </span>

                  <span className="font-medium text-slate-900">
                    {bookingTime}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Total
                  </span>

                  <span className="font-medium text-slate-900">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

              </div>
            )}


            {/* OK BUTTON */}
            <button
              type="button"
              onClick={handleModalOk}
              className="mt-7 w-full py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.25em] rounded-md hover:bg-slate-800 transition"
            >
              {modal.buttonText}
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Booking;