import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingToRemove, setBookingToRemove] = useState(null);
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        console.log("Loading admin bookings:", `${API_BASE_URL}/admin/bookings`);

        const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
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

  },
  
  
  
  []);

  const handleStatusChange = async (bookingId, newStatus) => {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(
      `${API_BASE_URL}/admin/bookings/${bookingId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update booking status");
    }

    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking._id === bookingId ? data.booking : booking
      )
    );
  } catch (error) {
    console.error("Error updating booking status:", error);
  }
};

const handleRemoveBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(
      `${API_BASE_URL}/admin/bookings/${bookingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to remove booking"
      );
    }

    setBookings((previousBookings) =>
      previousBookings.filter(
        (booking) => booking._id !== bookingId
      )
    );

  } catch (error) {
    console.error("Error removing booking:", error);
  }
};
  

  return (
    <div className="min-h-screen bg-slate-50 px-6 pb-6 pt-52 md:pt-40">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900">
            Bookings
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Manage customer appointments
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white border border-slate-200 p-10 text-center">
            <p className="text-slate-500">
              Loading bookings...
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 p-10 text-center">
            <p className="text-slate-500">
              No bookings found.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b border-slate-200">
                <tr>

                  <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Services
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Date & Time
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs uppercase tracking-[0.15em] text-slate-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-slate-100"
                  >

                    {/* Customer */}
                    <td className="px-6 py-5">

                      <p className="font-medium text-slate-900">
                        {booking.customer?.name || "Unknown"}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {booking.customer?.phone || ""}
                      </p>

                    </td>

                    {/* Services */}
                    <td className="px-6 py-5">

                      {booking.services?.length > 0 ? (
                        <div className="space-y-1">
                          {booking.services.map((service) => (
                            <p
                              key={service._id}
                              className="text-sm text-slate-700"
                            >
                              {service.name}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">
                          No services
                        </span>
                      )}

                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-5 text-sm text-slate-600">

                      {new Date(
                        booking.bookingDateTime
                      ).toLocaleDateString()}

                      <br />

                      {new Date(
                        booking.bookingDateTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </td>

                    {/* Total */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      Rs.{" "}
                      {Number(
                        booking.totalPrice || 0
                      ).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="text-xs border border-slate-300 rounded-md px-3 py-2 bg-white outline-none focus:border-slate-900"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </td>

                  <td>
                    <button
                    type="button"
                    onClick={() => setBookingToRemove(booking)}
                    className="text-xs text-red-600 border border-red-200 px-3 py-2 rounded-md hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                  </td>

                  

                  </tr>
                ))}

              </tbody>

            </table>
            

          </div>
        )}

            </div>

      {/* REMOVE BOOKING CONFIRMATION */}
      {bookingToRemove && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

          {/* Background */}
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-md"
            onClick={() => setBookingToRemove(null)}
          ></div>

          {/* Dialog */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

            <div className="mx-auto w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-5">
              <span className="text-xl">!</span>
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              Remove Booking?
            </h2>

            <p className="text-sm text-slate-500 mt-3 leading-6">
              Are you sure you want to remove this booking?
              <br />
              This action cannot be undone.
            </p>

            {bookingToRemove.customer?.name && (
              <p className="text-sm font-medium text-slate-800 mt-4">
                {bookingToRemove.customer.name}
              </p>
            )}

            <div className="flex gap-3 mt-7">

              <button
                type="button"
                onClick={() => setBookingToRemove(null)}
                className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-md text-xs uppercase tracking-[0.15em] hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  handleRemoveBooking(bookingToRemove._id);
                  setBookingToRemove(null);
                }}
                className="flex-1 py-3 bg-red-600 text-white rounded-md text-xs uppercase tracking-[0.15em] hover:bg-red-700 transition"
              >
                Remove
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}


export default AdminBookings;