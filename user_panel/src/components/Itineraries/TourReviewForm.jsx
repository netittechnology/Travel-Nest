import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axiosInstance";

export default function TourReviewForm({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [review, setReview] = useState({
    author_name: "",
    author_email: "",
    author_country: "",
    text: "",
    rating: 0,
  });

  useEffect(() => {
    if (open) {
      setReview({
        author_name: "",
        author_email: "",
        author_country: "",
        text: "",
        rating: 0,
      });
      setMessage({ type: "", text: "" });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setReview({ ...review, rating: value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      setLoading(true);

      await axiosInstance.post("/reviews", {
        ...review,
        rating: Number(review.rating),
      });

      setMessage({
        type: "success",
        text: "Review submitted successfully! Waiting for approval.",
      });

      setReview({
        author_name: "",
        author_email: "",
        author_country: "",
        text: "",
        rating: 0,
      });

      setTimeout(() => {
        setMessage({ type: "", text: "" });
        onClose();
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err?.response?.data?.message || "Failed to submit review. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-9999 p-4">
      {/* MODAL */}
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative
                      max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="text-center mb-4 pt-6 px-6">
          <h2 className="text-2xl font-bold text-gray-800">Leave a Review</h2>
          <p className="text-sm text-gray-500">Share your travel experience</p>
        </div>

        {/* SCROLL AREA */}
        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <form onSubmit={submitReview} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="author_name"
                value={review.author_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="author_email"
                value={review.author_email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* COUNTRY */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                name="author_country"
                value={review.author_country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* RATING */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Rating
              </label>

              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`cursor-pointer text-2xl transition ${
                      review.rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* REVIEW */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Your Review
              </label>
              <textarea
                name="text"
                value={review.text}
                onChange={handleChange}
                rows="4"
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* MESSAGE */}
            {message.text && (
              <div
                className={`text-sm p-2 rounded-lg text-center font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* SUBMIT */}
            <button
              disabled={loading || review.rating === 0}
              className="w-full bg-linear-to-r from-[#0f2f1f] to-[#184d35] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
