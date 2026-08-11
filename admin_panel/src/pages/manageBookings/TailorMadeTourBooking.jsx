import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import useAuthStore from "../../lib/authStore";
import { FaEye, FaCheckCircle } from "react-icons/fa";

export default function TailorMadeTourBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const { isHydrated, accessToken } = useAuthStore();

  useEffect(() => {
    if (!isHydrated || !accessToken) return;
    fetchBookings(1, search);
  }, [isHydrated, accessToken]);

  const fetchBookings = async (pageNumber = 1, searchTerm = "") => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/tailor-made-tour-booking", {
        params: {
          page: pageNumber,
          limit: 10,
          search_term: searchTerm || undefined,
        },
      });

      const data = res.data?.data;

      setBookings(data.items || []);
      setMeta(data.meta);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axiosInstance.put(`/tailor-made-tour-booking/${id}/read`);
      toast.success("Marked as read");
      fetchBookings();
    } catch {
      toast.error("Failed to update");
    }
  };

  const openBooking = async (booking) => {
    setSelectedBooking(booking);

    if (!booking.is_read) {
      await markAsRead(booking.id);
    }
  };

  const getStatusColor = (is_read) => {
    return is_read
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-amber-50 text-amber-700 border border-amber-200";
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.whatsapp_number?.includes(search) ||
      b.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#172d35]/60 mb-1">
              Booking Management
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172d35]">
              Tailor Made Tour Bookings
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage and review custom tour requests from customers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-xs text-slate-500 block">
                Total Bookings
              </span>
              <span className="text-lg font-bold text-[#172d35]">
                {filteredBookings.length}
              </span>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-[#172d35] rounded-2xl p-4 sm:p-5 shadow-lg shadow-[#172d35]/10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition"
              />
            </div>

            <div className="md:ml-auto">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-sm text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {filteredBookings.length} bookings
              </span>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* CARD HEADER */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#172d35]">Booking Requests</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Recent custom tour enquiries
              </p>
            </div>

            <div className="text-xs text-slate-500">
              Page {meta?.currentPage || page} of {meta?.totalPages || 1}
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-[#172d35] text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Location
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Dates
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Budget
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-3 border-[#172d35]/20 border-t-[#172d35] rounded-full animate-spin"></div>
                        <span className="text-sm text-slate-500">
                          Loading bookings...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                          <svg
                            className="w-6 h-6 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.7}
                              d="M9 12h6m-6 4h6M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                            />
                          </svg>
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No bookings found
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          Try changing your search terms.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      className={`group transition-colors hover:bg-slate-50 ${
                        !b.is_read ? "bg-amber-50/40" : "bg-white"
                      }`}
                    >
                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#172d35] text-white flex items-center justify-center font-bold text-sm shrink-0">
                            {b.full_name?.charAt(0)?.toUpperCase() || "?"}
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold text-[#172d35] truncate max-w-[220px]">
                              {b.full_name}
                            </div>

                            <div className="text-xs text-slate-500 truncate max-w-[220px] mt-0.5">
                              {b.email}
                            </div>

                            <div className="text-xs text-slate-400 mt-0.5">
                              {b.whatsapp_number}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td className="px-5 py-4">
                        <div className="text-sm font-medium text-slate-700">
                          {b.pickup_location || "—"}
                        </div>
                      </td>

                      {/* DATES */}
                      <td className="px-5 py-4">
                        <div className="text-sm font-medium text-slate-700">
                          {b.start_date || "—"}
                        </div>

                        <div className="text-xs text-slate-400 mt-1">
                          → {b.end_date || "—"}
                        </div>
                      </td>

                      {/* BUDGET */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[#172d35]">
                          {b.budget_per_day || "—"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(
                            b.is_read
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              b.is_read ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          ></span>
                          {b.is_read ? "Read" : "Unread"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openBooking(b)}
                            title="View booking"
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#172d35] text-white hover:bg-[#24434d] transition shadow-sm"
                          >
                            <FaEye size={14} />
                          </button>

                          <button
                            onClick={() => markAsRead(b.id)}
                            title="Mark as read"
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition"
                          >
                            <FaCheckCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {meta && (
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing page{" "}
                <span className="font-semibold text-[#172d35]">
                  {meta.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#172d35]">
                  {meta.totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={!meta.hasPreviousPage}
                  onClick={() => fetchBookings(page - 1, search)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-[#172d35] hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="min-w-10 h-9 px-3 rounded-lg bg-[#172d35] text-white flex items-center justify-center text-sm font-semibold">
                  {meta.currentPage}
                </div>

                <button
                  disabled={!meta.hasNextPage}
                  onClick={() => fetchBookings(page + 1, search)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-[#172d35] hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-[#172d35]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* MODAL HEADER */}
            <div className="bg-[#172d35] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Custom Tour
                </p>

                <h3 className="text-xl font-bold text-white">
                  Booking Details
                </h3>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* CUSTOMER SECTION */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-[#172d35]"></div>
                  <h4 className="font-bold text-[#172d35]">
                    Customer Information
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.full_name || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Email</p>
                    <p className="text-sm font-semibold text-[#172d35] break-all">
                      {selectedBooking.email || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 sm:col-span-2">
                    <p className="text-xs text-slate-400 mb-1">
                      WhatsApp Number
                    </p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.whatsapp_number || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* LOCATION SECTION */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-[#172d35]"></div>
                  <h4 className="font-bold text-[#172d35]">Journey Details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Pickup</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.pickup_location || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Drop</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.drop_location || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Start Date</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.start_date || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">End Date</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.end_date || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* PREFERENCES */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-[#172d35]"></div>
                  <h4 className="font-bold text-[#172d35]">
                    Travel Preferences
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Travel Style</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.travel_style || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Experience</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.experience_type || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Vehicle</p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.vehicle_preference || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">
                      Budget Per Day
                    </p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.budget_per_day || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ADDITIONAL INFORMATION */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-[#172d35]"></div>
                  <h4 className="font-bold text-[#172d35]">
                    Additional Information
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">
                      Special Requests
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedBooking.special_requests || "—"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">
                      How They Found Us
                    </p>
                    <p className="text-sm font-semibold text-[#172d35]">
                      {selectedBooking.how_know_us || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2.5 rounded-xl bg-[#172d35] text-white text-sm font-semibold hover:bg-[#24434d] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
