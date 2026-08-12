import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import useAuthStore from "../../lib/authStore";

import { FaCheckCircle, FaTimesCircle, FaEye, FaTasks } from "react-icons/fa";

export default function TourBooking() {
  const [bookings, setBookings] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const { isHydrated, accessToken } = useAuthStore();
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
  });

  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!isHydrated || !accessToken) return;
    fetchBookings();
  }, [filters, isHydrated, accessToken]);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/tour-booking", {
        params: {
          page: filters.page,
          limit: filters.limit,
          status: filters.status || undefined,
        },
      });

      const data = res.data?.data || res.data;

      setBookings(data.items || []);
      setMeta(data.meta || {});
      setPage(data?.meta?.currentPage || 1);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error("Failed to load bookings");
      }

      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axiosInstance.put(`/tour-booking/${id}/complete`);
      toast.success("Marked as completed");
      fetchBookings();
    } catch {
      toast.error("Failed");
    }
  };

  const handleDecline = async (id) => {
    try {
      await axiosInstance.put(`/tour-booking/${id}/decline`);
      toast.success("Declined");
      fetchBookings();
    } catch {
      toast.error("Failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "DECLINED":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border border-amber-200";
    }
  };

  // SEARCH FILTER
  const filteredBookings = bookings.filter(
    (b) =>
      b.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search) ||
      b.tour?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-[#172d35]">
            Itinerary Booking Management
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor all itinerary bookings
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2">
          <span className="text-sm text-gray-500">Total Results</span>
          <div className="text-xl font-bold text-[#172d35]">
            {filteredBookings.length}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-[#172d35] rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          {/* SEARCH */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search name / email / tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                px-4 py-2.5
                rounded-xl
                text-sm
                bg-[#213c46]
                text-white
                placeholder:text-gray-400
                border border-[#35535d]
                focus:outline-none
                focus:ring-2
                focus:ring-[#6ca6ad]
                focus:border-[#6ca6ad]
                transition
              "
            />
          </div>

          {/* STATUS */}
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
                page: 1,
              })
            }
            className="
              px-4 py-2.5
              rounded-xl
              text-sm
              bg-[#213c46]
              text-white
              border border-[#35535d]
              focus:outline-none
              focus:ring-2
              focus:ring-[#6ca6ad]
              focus:border-[#6ca6ad]
              transition
            "
          >
            <option value="">All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="DECLINED">Declined</option>
          </select>

          {/* COUNT */}
          <div className="lg:ml-auto flex items-center gap-2 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#6ca6ad]" />
            {filteredBookings.length} bookings
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-[#172d35] text-white">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Tour
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Date
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                  People
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#172d35] rounded-full animate-spin" />
                      <span className="text-sm text-gray-500">
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
                        <FaTasks className="w-5 h-5 text-slate-400" />
                      </div>

                      <p className="font-semibold text-[#172d35]">
                        No bookings found
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-[#f4f8f9] transition-colors duration-150"
                  >
                    {/* CUSTOMER */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#172d35]">
                        {b.full_name}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {b.email}
                      </div>

                      <div className="text-xs text-gray-400 mt-0.5">
                        {b.phone}
                      </div>
                    </td>

                    {/* TOUR */}
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">
                        {b.tour?.title}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {b.tour?.location}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-700">
                        {b.booking_date}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {b.booking_time}
                      </div>
                    </td>

                    {/* PEOPLE */}
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[36px] px-3 py-1.5 rounded-lg bg-gray-100 text-[#172d35] font-semibold text-sm">
                        {(b.adult_count || 0) + (b.children_count || 0)}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          title="View booking"
                          className="
                            w-9 h-9
                            flex items-center justify-center
                            rounded-lg
                            bg-[#172d35]
                            text-white
                            hover:bg-[#274752]
                            transition
                            shadow-sm
                          "
                        >
                          <FaEye size={14} />
                        </button>

                        <button
                          onClick={() => handleComplete(b.id)}
                          title="Mark as completed"
                          className="
                            w-9 h-9
                            flex items-center justify-center
                            rounded-lg
                            bg-emerald-500
                            text-white
                            hover:bg-emerald-600
                            transition
                            shadow-sm
                          "
                        >
                          <FaCheckCircle size={14} />
                        </button>

                        <button
                          onClick={() => handleDecline(b.id)}
                          title="Decline booking"
                          className="
                            w-9 h-9
                            flex items-center justify-center
                            rounded-lg
                            bg-red-500
                            text-white
                            hover:bg-red-600
                            transition
                            shadow-sm
                          "
                        >
                          <FaTimesCircle size={14} />
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
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 mt-6 shadow-sm">
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

      {/* MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-[#172d35]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center bg-[#172d35] px-6 py-4 flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Tour Booking Details
                </h3>

                <p className="text-xs text-gray-300 mt-1">
                  Booking information
                </p>
              </div>

              <button
                className="
                  w-9 h-9
                  flex items-center justify-center
                  rounded-lg
                  bg-white/10
                  text-white
                  hover:bg-white/20
                  transition
                  text-lg
                "
                onClick={() => setSelectedBooking(null)}
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-4 text-sm text-gray-700 overflow-y-auto flex-1">
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                {/* TOUR */}
                <div className="grid grid-cols-2">
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Tour
                  </p>

                  <p className="p-3 border-b">
                    {selectedBooking.tour?.title || "—"}
                  </p>

                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Location
                  </p>

                  <p className="p-3 border-b">
                    {selectedBooking.tour?.location || "—"}
                  </p>

                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Duration
                  </p>

                  <p className="p-3 border-b">
                    {selectedBooking.tour?.duration || "—"}
                  </p>

                  {/* CUSTOMER */}
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Name
                  </p>

                  <p className="p-3 border-b">{selectedBooking.full_name}</p>

                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Email
                  </p>

                  <p className="p-3 border-b break-words">
                    {selectedBooking.email}
                  </p>

                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Phone
                  </p>

                  <p className="p-3 border-b">{selectedBooking.phone}</p>

                  {/* PEOPLE */}
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Adults
                  </p>

                  <p className="p-3 border-b">{selectedBooking.adult_count}</p>

                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Children
                  </p>

                  <p className="p-3 border-b">
                    {selectedBooking.children_count}
                  </p>

                  {/* DATE */}
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Date
                  </p>

                  <p className="p-3 border-b">{selectedBooking.booking_date}</p>

                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Time
                  </p>

                  <p className="p-3 border-b">{selectedBooking.booking_time}</p>

                  {/* PICKUP LOCATION */}
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Pickup Location
                  </p>

                  <p className="p-3 border-b break-words">
                    {selectedBooking.pickup_location || "Not provided"}
                  </p>

                  {/* LATITUDE */}
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Latitude
                  </p>

                  <p className="p-3 border-b">
                    {selectedBooking.pickup_location_latitude ?? "Not provided"}
                  </p>

                  {/* LONGITUDE */}
                  <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-b border-r">
                    Longitude
                  </p>

                  <p className="p-3 border-b">
                    {selectedBooking.pickup_location_longitude ??
                      "Not provided"}
                  </p>

                  {/* MESSAGE */}
                  {selectedBooking.message && (
                    <>
                      <p className="p-3 font-semibold text-[#172d35] bg-[#f4f8f9] border-r">
                        Message
                      </p>

                      <p className="p-3 break-words">
                        {selectedBooking.message}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
