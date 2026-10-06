import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("customerToken");

        const response = await fetch(`${API_BASE_URL}/bookings/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings");
        }

        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="min-h-screen pt-32 px-6">
      {/* Dynamic Keyframes for smooth drop-in transition */}
      <style>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-30px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-drop-in {
          animation: dropIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <h1 className="text-3xl font-semibold text-slate-900">
        My Bookings
      </h1>

      {loading ? (
        <p className="mt-6 text-slate-500">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="mt-6 text-slate-500">
          You don't have any bookings yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-drop-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Booking
                </h2>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {booking.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <p className="text-sm text-slate-500">
                    Date & Time
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {new Date(booking.bookingDateTime).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Total Price
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    Rs. {booking.totalPrice}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {booking.totalDuration} minutes
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Services
                  </p>

                  <div className="mt-1">
                    {booking.services?.length > 0 ? (
                      booking.services.map((service) => (
                        <p
                          key={service._id}
                          className="text-sm text-slate-900"
                        >
                          {service.name}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">
                        No services
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Packages
                  </p>

                  <div className="mt-1">
                    {booking.packages?.length > 0 ? (
                      booking.packages.map((pkg) => (
                        <p
                          key={pkg._id}
                          className="text-sm text-slate-900"
                        >
                          {pkg.name}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">
                        No packages
                      </p>
                    )}
                  </div>
                </div>

                {booking.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-slate-500">
                      Notes
                    </p>

                    <p className="mt-1 text-sm text-slate-900">
                      {booking.notes}
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;