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
  BookOpen,
} from "lucide-react";
import { axiosInstance } from "../../lib/axiosInstance";
import { confirmAction } from "../../lib/confirmAction";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async (pageNumber = 1) => {
    const res = await axiosInstance.get("/blogs", {
      params: {
        page: pageNumber,
        limit: 10,
      },
    });

    setBlogs(res.data?.data?.items || []);
    setMeta(res.data?.data?.meta);
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  /* ---------------- SEARCH (frontend only) ---------------- */
  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const ok = await confirmAction({ title: "Delete blog?" });
    if (!ok) return;

    try {
      await axiosInstance.delete(`/blogs/${id}`);
      toast.success("Deleted");
      fetchData(page);
    } catch {
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
              <BookOpen size={21} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#172d35] sm:text-2xl">
                Blogs Management
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Create, manage, publish and organize your travel blogs.
              </p>
            </div>
          </div>

          <Link
            to="/admin/blogs/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#213f49] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#172d35]/15"
          >
            <Plus size={18} />
            Add Blog
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#172d35]">Blog Posts</h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Manage your published and unpublished articles.
                </p>
              </div>

              <span className="rounded-lg bg-[#172d35]/10 px-3 py-1.5 text-xs font-semibold text-[#172d35]">
                {filteredBlogs.length} Results
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
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((b) => (
                    <tr
                      key={b.id}
                      className="group transition-colors duration-150 hover:bg-[#172d35]/[0.03]"
                    >
                      {/* IMAGE */}
                      <td className="px-5 py-4">
                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          {b.image?.url ? (
                            <img
                              src={b.image.url}
                              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                              alt={b.title || "Blog"}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <BookOpen size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* TITLE */}
                      <td className="px-5 py-4">
                        <div className="max-w-md">
                          <p className="font-semibold text-[#172d35]">
                            {b.title}
                          </p>

                          {b.excerpt && (
                            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                              {b.excerpt}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            b.is_published
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              b.is_published ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />

                          {b.is_published ? "Published" : "Unpublished"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* EDIT */}
                          <Link
                            to={`/admin/blogs/edit/${b.id}`}
                            title="Edit blog"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white"
                          >
                            <Pencil size={14} />
                          </Link>

                          {/* PUBLISH / UNPUBLISH */}
                          <button
                            onClick={async () => {
                              try {
                                await axiosInstance.put(
                                  `/blogs/${b.id}/toggle-published`
                                );
                                toast.success("Status updated");
                                fetchData(page);
                              } catch (err) {
                                toast.error("Failed to update");
                              }
                            }}
                            title={
                              b.is_published ? "Unpublish blog" : "Publish blog"
                            }
                            className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white transition-all ${
                              b.is_published
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {b.is_published ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(b.id)}
                            title="Delete blog"
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
                    <td colSpan="4" className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <BookOpen size={22} />
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No blogs found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Try changing your search or add a new blog post.
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
