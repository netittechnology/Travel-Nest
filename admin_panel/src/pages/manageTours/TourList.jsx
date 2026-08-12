import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Compass,
  Tags,
} from "lucide-react";
import { axiosInstance } from "../../lib/axiosInstance";
import { confirmAction } from "../../lib/confirmAction";

export default function TourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [tourType, setTourType] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/tours", {
        params: {
          page,
          limit: 10,
          search_term: search || undefined,
          tour_type: tourType || undefined,
        },
      });

      const data = res.data?.data;

      setTours(data?.items || []);
      setTotalPages(data?.meta?.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load itineraries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, tourType]);

  const handleDelete = async (id) => {
    const ok = await confirmAction({ title: "Delete itinerary?" });
    if (!ok) return;

    try {
      await axiosInstance.delete(`/tours/${id}`);
      toast.success("Deleted successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172d35] shadow-sm">
              <Compass size={21} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#172d35] sm:text-2xl">
                Manage Itineraries
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Create, manage and organize your travel itineraries.
              </p>
            </div>
          </div>

          <Link
            to="/admin/tours/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#213f49] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#172d35]/15"
          >
            <Plus size={18} />
            Add Itinerary
          </Link>
        </div>

        {/* SEARCH / TOOLBAR */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search itineraries..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
            />
          </div>
        </div>

        {/* TOUR TYPE FILTER */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {/* ALL */}
            <button
              type="button"
              onClick={() => {
                setTourType("");
                setPage(1);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                tourType === ""
                  ? "bg-[#172d35] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#172d35]"
              }`}
            >
              <Compass size={16} strokeWidth={2} />
              All Tours
            </button>

            {/* DAY TOURS */}
            <button
              type="button"
              onClick={() => {
                setTourType("DAY_TOUR");
                setPage(1);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                tourType === "DAY_TOUR"
                  ? "bg-[#172d35] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#172d35]"
              }`}
            >
              <Tags size={16} strokeWidth={2} />
              Day Tours
            </button>

            {/* ROUND TOURS */}
            <button
              type="button"
              onClick={() => {
                setTourType("ROUND_TOUR");
                setPage(1);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                tourType === "ROUND_TOUR"
                  ? "bg-[#172d35] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#172d35]"
              }`}
            >
              <MapPin size={16} strokeWidth={2} />
              Round Tours
            </button>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Travel Itineraries
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Manage your available and unavailable itineraries.
                </p>
              </div>

              <span className="rounded-lg bg-[#172d35]/10 px-3 py-1.5 text-xs font-semibold text-[#172d35]">
                {tours.length} Results
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200 bg-[#172d35] text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Image
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Title
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Location
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Type
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#172d35]" />

                        <p className="text-sm font-medium text-slate-500">
                          Loading itineraries...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : tours.length > 0 ? (
                  tours.map((t) => (
                    <tr
                      key={t.id}
                      className="group transition-colors duration-150 hover:bg-[#172d35]/[0.03]"
                    >
                      {/* IMAGE */}
                      <td className="px-5 py-4">
                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          {t.image?.url ? (
                            <img
                              src={t.image.url}
                              alt={t.title || "Itinerary"}
                              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <Compass size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* TITLE */}
                      <td className="px-5 py-4">
                        <div className="max-w-md">
                          <p className="font-semibold text-[#172d35]">
                            {t.title}
                          </p>
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin size={15} className="text-[#172d35]" />
                          <span>{t.location || "—"}</span>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            t.tour_type === "ROUND_TOUR"
                              ? "bg-purple-50 text-purple-700 ring-1 ring-purple-200"
                              : "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                          }`}
                        >
                          <Tags size={13} />

                          {t.tour_type === "ROUND_TOUR"
                            ? "Round Tour"
                            : "Day Tour"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            t.is_available
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              t.is_available ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />

                          {t.is_available ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* EDIT */}
                          <Link
                            to={`/admin/tours/edit/${t.id}`}
                            title="Edit itinerary"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white"
                          >
                            <Pencil size={14} />
                          </Link>

                          {/* TOGGLE */}
                          <button
                            onClick={async () => {
                              try {
                                await axiosInstance.put(
                                  `/tours/${t.id}/toggle-availability`
                                );

                                toast.success("Status updated");
                                fetchData();
                              } catch {
                                toast.error("Failed to update status");
                              }
                            }}
                            title={
                              t.is_available
                                ? "Make unavailable"
                                : "Make available"
                            }
                            className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white transition-all ${
                              t.is_available
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {t.is_available ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(t.id)}
                            title="Delete itinerary"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 ring-1 ring-red-200 transition-all hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <Compass size={22} />
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No itineraries found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Try changing your search or add a new itinerary.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row">
          <p className="text-sm text-slate-500">
            Page <span className="font-semibold text-[#172d35]">{page}</span> of{" "}
            <span className="font-semibold text-[#172d35]">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            {/* PREVIOUS */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#172d35]"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            {/* CURRENT PAGE */}
            <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#172d35] px-3 text-sm font-semibold text-white shadow-sm">
              {page}
            </span>

            {/* NEXT */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#172d35]"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
