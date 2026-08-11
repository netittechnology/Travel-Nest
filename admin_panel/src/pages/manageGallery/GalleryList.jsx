import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Search,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { axiosInstance } from "../../lib/axiosInstance";
import { confirmAction } from "../../lib/confirmAction";

export default function GalleryList() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchData = async (pageNumber = 1) => {
    const res = await axiosInstance.get("/gallery", {
      params: {
        page: pageNumber,
        limit: 10,
      },
    });

    setData(res.data.data.items);
    setMeta(res.data.data.meta);
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleDelete = async (id) => {
    const ok = await confirmAction({ title: "Delete gallery image?" });
    if (!ok) return;

    await axiosInstance.delete(`/gallery/${id}`);
    toast.success("Deleted");
    fetchData(page);
  };

  const handleToggle = async (id) => {
    await axiosInstance.put(`/gallery/${id}/toggle-publish`);
    toast.success("Status updated");
    fetchData(page);
  };

  // FRONTEND SEARCH ONLY
  const filteredData = data.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  const categoryLabelMap = {
    WILDLIFE_PHOTOGRAPHY: "Wildlife Photography",
    BIRDWATCHING_EXPERIENCES: "Birdwatching Experiences",
    WHALE_MARINE_LIFE: "Whale & Marine Life",
    DAY_EXCURSIONS: "Day Excursions",
    CULTURAL_HERITAGE: "Cultural Heritage",
    ADVENTURE_EXPERIENCES: "Adventure Experiences",
    WILDLIFE_NATURE: "Wildlife & Nature",
    COASTAL_BEACHES: "Coastal & Beaches",
    HILL_COUNTRY_MOUNTAINS: "Hill Country & Mountains",
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172d35] shadow-sm">
              <Images size={21} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#172d35] sm:text-2xl">
                Gallery Management
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Manage, publish and organize your travel gallery images.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/gallery/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#213f49] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#172d35]/15"
          >
            <Plus size={18} />
            Add Image
          </button>
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gallery..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Gallery Images
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Manage your published and unpublished gallery images.
                </p>
              </div>

              <span className="rounded-lg bg-[#172d35]/10 px-3 py-1.5 text-xs font-semibold text-[#172d35]">
                {filteredData.length} Results
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">

              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-slate-200 bg-[#172d35] text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Image
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Title
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Category
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="group transition-colors duration-150 hover:bg-[#172d35]/[0.03]"
                    >
                      {/* IMAGE */}
                      <td className="px-5 py-4">
                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          {item.image?.url ? (
                            <img
                              src={item.image.url}
                              alt={item.title || "Gallery"}
                              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <Images size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* TITLE */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#172d35]">
                          {item.title || "Untitled"}
                        </p>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {categoryLabelMap[item.category] || item.category}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.is_published
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.is_published
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          />

                          {item.is_published
                            ? "Published"
                            : "Unpublished"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          {/* PUBLISH / UNPUBLISH */}
                          <button
                            onClick={() => handleToggle(item.id)}
                            title={
                              item.is_published
                                ? "Unpublish image"
                                : "Publish image"
                            }
                            className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white transition-all ${
                              item.is_published
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {item.is_published ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete image"
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
                    <td colSpan="5" className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <Images size={22} />
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No gallery images found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Try changing your search or add a new gallery image.
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
                onClick={() => fetchData(page - 1)}
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
                onClick={() => fetchData(page + 1)}
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
