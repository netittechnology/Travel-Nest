import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { FaTrash, FaStar, FaSyncAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { confirmAction } from "../lib/confirmAction";

export default function TourReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/reviews", {
        params: {
          page: pageNumber,
          limit: 10,
        },
      });

      console.log("API RESPONSE:", res.data);

      const data = res.data?.data || res.data;

      setReviews(data?.items || []);
      setTotalPages(data?.meta?.totalPages || 1);
      setPage(data?.meta?.currentPage || 1);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, []);

  // Toggle approve
  const handleToggleApprove = async (id) => {
    try {
      setActionLoading(id);

      await axiosInstance.put(`/reviews/${id}/toggle-approve`);

      fetchReviews(page);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete review
  const handleDelete = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete Review?",
      text: "This review will be permanently removed.",
      confirmButtonText: "Yes, delete it",
    });

    if (!confirmed) return;

    try {
      setActionLoading(id);

      await axiosInstance.delete(`/reviews/${id}`);

      fetchReviews(page);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#172d35]/60 mb-1">
              Customer Feedback
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172d35]">
              Itinerary Reviews Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Review, approve, and manage customer feedback.
            </p>
          </div>

          <button
            onClick={() => fetchReviews(page)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172d35] text-white text-sm font-semibold hover:bg-[#24434d] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* SUMMARY BAR */}
        <div className="bg-[#172d35] rounded-2xl p-4 sm:p-5 shadow-lg shadow-[#172d35]/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">
                Review Management
              </p>

              <p className="text-sm text-slate-300 mt-1">
                Manage customer ratings and published reviews.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-sm text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {reviews.length} reviews
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* CARD HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 sm:px-6 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#172d35]">
                Customer Reviews
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                Review and manage submitted itinerary feedback.
              </p>
            </div>

            <div className="text-xs text-slate-500">
              Page <span className="font-semibold text-[#172d35]">{page}</span> of{" "}
              <span className="font-semibold text-[#172d35]">{totalPages}</span>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-[#172d35] text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Customer
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Country
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Rating
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide">
                    Review
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
                          Loading reviews...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                          <FaStar className="w-5 h-5 text-slate-400" />
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No reviews found
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          Customer reviews will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="group bg-white hover:bg-slate-50 transition-colors"
                    >
                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#172d35] text-white flex items-center justify-center font-bold text-sm shrink-0">
                            {review.author_name?.charAt(0)?.toUpperCase() || "?"}
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold text-[#172d35] truncate max-w-[220px]">
                              {review.author_name || "—"}
                            </div>

                            <div className="text-xs text-slate-500 truncate max-w-[220px] mt-0.5">
                              {review.author_email || "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* COUNTRY */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-slate-700">
                          {review.author_country || "—"}
                        </span>
                      </td>

                      {/* RATING */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <FaStar key={i} className="text-amber-400 text-sm" />
                          ))}

                          <span className="ml-1 text-xs font-semibold text-slate-500">
                            {review.rating}/5
                          </span>
                        </div>
                      </td>

                      {/* REVIEW */}
                      <td className="px-5 py-4 max-w-[350px]">
                        <p
                          className="text-sm text-slate-600 truncate"
                          title={review.text}
                        >
                          {review.text || "—"}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        {review.is_approved ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Pending
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          {/* APPROVE / REJECT */}
                          <button
                            onClick={() => handleToggleApprove(review.id)}
                            disabled={actionLoading === review.id}
                            title={review.is_approved ? "Reject review" : "Approve review"}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                              review.is_approved
                                ? "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                                : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                            }`}
                          >
                            {review.is_approved ? (
                              <FaTimesCircle size={14} />
                            ) : (
                              <FaCheckCircle size={14} />
                            )}
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(review.id)}
                            disabled={actionLoading === review.id}
                            title="Delete review"
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaTrash size={14} />
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
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Showing page{" "}
              <span className="font-semibold text-[#172d35]">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#172d35]">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => fetchReviews(page - 1)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-[#172d35] hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="min-w-10 h-9 px-3 rounded-lg bg-[#172d35] text-white flex items-center justify-center text-sm font-semibold">
                {page}
              </div>

              <button
                disabled={page >= totalPages || loading}
                onClick={() => fetchReviews(page + 1)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-[#172d35] hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}