import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { confirmAction } from "../../lib/confirmAction";
import { axiosInstance } from "../../lib/axiosInstance";

export default function DestinationList() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchData = async (pageNumber = 1, searchTerm = "") => {
    const res = await axiosInstance.get("/destinations", {
      params: {
        page: pageNumber,
        limit: 10,
        search_term: searchTerm || undefined,
      },
    });

    setData(res.data.data.items);
    setMeta(res.data.data.meta);
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchData(1, search);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchData(1, value);
  };

  const handleDelete = async (id) => {
    const ok = await confirmAction({ title: "Delete destination?" });

    if (!ok) return;

    await axiosInstance.delete(`/destinations/${id}`);

    toast.success("Deleted");

    fetchData(page, search);
  };

  const handleToggle = async (id) => {
    await axiosInstance.put(`/destinations/${id}/toggle-availability`);

    fetchData(page, search);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172d35] shadow-sm">
              <MapPin size={21} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#172d35] sm:text-2xl">
                Manage Destinations
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Create, manage and organize your travel destinations.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/destinations/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#213f49] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#172d35]/15"
          >
            <Plus size={18} />
            Add Destination
          </button>
        </div>

        {/* SEARCH / TOOLBAR */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search destinations..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
              />
            </div>

            <span className="w-fit rounded-lg bg-[#172d35]/10 px-3 py-1.5 text-xs font-semibold text-[#172d35]">
              {data.length} Results
            </span>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* CARD HEADER */}
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Destinations
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Manage available destinations and their visibility.
                </p>
              </div>

              <div className="hidden text-xs text-slate-400 sm:block">
                Page {meta?.currentPage || page} of {meta?.totalPages || 1}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-slate-200 bg-[#172d35] text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Image
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Title
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Subtitle
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
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="group transition-colors duration-150 hover:bg-[#172d35]/[0.03]"
                    >

                      {/* IMAGE */}
                      <td className="px-5 py-4">
                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          <img
                            src={
                              item.image?.url ||
                              "https://via.placeholder.com/100"
                            }
                            alt={item.title || "Destination"}
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                      </td>

                      {/* TITLE */}
                      <td className="px-5 py-4">
                        <div className="max-w-xs">
                          <p className="font-semibold text-[#172d35]">
                            {item.title}
                          </p>
                        </div>
                      </td>

                      {/* SUBTITLE */}
                      <td className="px-5 py-4">
                        <p className="max-w-sm line-clamp-2 text-sm text-slate-500">
                          {item.subtitle || "—"}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.is_available
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.is_available
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          />

                          {item.is_available ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          {/* EDIT */}
                          <button
                            onClick={() =>
                              navigate(`/admin/destinations/edit/${item.id}`)
                            }
                            title="Edit destination"
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white"
                          >
                            <Pencil size={14} />
                          </button>

                          {/* TOGGLE */}
                          <button
                            onClick={() => handleToggle(item.id)}
                            title={
                              item.is_available
                                ? "Inactivate destination"
                                : "Activate destination"
                            }
                            className={`inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-semibold text-white transition-all ${
                              item.is_available
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {item.is_available ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete destination"
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 ring-1 ring-red-200 transition-all hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 size={14} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">

                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <MapPin size={22} />
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No destinations found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Try changing your search or add a new destination.
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
        {meta && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row">

            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-[#172d35]">
                {meta.currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#172d35]">
                {meta.totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">

              {/* PREVIOUS */}
              <button
                disabled={!meta.hasPreviousPage}
                onClick={() => fetchData(page - 1, search)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#172d35]"
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              {/* CURRENT PAGE */}
              <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#172d35] px-3 text-sm font-semibold text-white shadow-sm">
                {meta.currentPage}
              </span>

              {/* NEXT */}
              <button
                disabled={!meta.hasNextPage}
                onClick={() => fetchData(page + 1, search)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#172d35]"
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}