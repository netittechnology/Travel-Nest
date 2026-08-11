import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import TourBookingForm from "../components/Itineraries/TourBookingForm";
import TourReviewForm from "../components/Itineraries/TourReviewForm";

export default function ItineraryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [recentTours, setRecentTours] = useState([]);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ================= RECENT TOURS SLIDER =================
  useEffect(() => {
    if (!recentTours.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === recentTours.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [recentTours]);

  // ================= FETCH RECENT TOURS =================
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axiosInstance.get("/tours", {
          params: {
            limit: 5,
            sort_order: "DESC",
          },
        });

        setRecentTours(res.data?.data?.items || []);
      } catch (err) {
        console.error("Failed to load recent itineraries", err);
      }
    };

    fetchRecent();
  }, []);

  // ================= FETCH TOUR =================
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/tours", {
          params: { limit: 100 },
        });

        const tours = res.data?.data?.items || [];
        const found = tours.find((t) => t.slug === slug);

        if (!found) {
          toast.error("Tour not found");
          return;
        }

        const detailRes = await axiosInstance.get(`/tours/${found.id}`);

        setTour(detailRes.data?.data || detailRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tour");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#02878b]/20 border-t-[#02878b] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  // ================= TOUR NOT FOUND =================
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Tour not found</h2>

          <button
            onClick={() => navigate("/itineraries")}
            className="mt-5 bg-[#02878b] hover:bg-[#026f72] text-white px-6 py-3 rounded-full transition"
          >
            Back to Itineraries
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img
          src={
            tour.image?.url ||
            tour.thumbnail?.url ||
            tour.thumbnail ||
            "/images/default-tour.jpg"
          }
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[#4db8b8] uppercase tracking-widest text-sm font-bold">
            Itinerary Detail
          </span>

          <h1 className="text-white text-4xl md:text-6xl font-black mt-4">
            {tour.title}
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-10">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/itineraries")}
            className="inline-flex items-center gap-2 text-[#02878b] font-semibold hover:text-[#026f72] transition"
          >
            ← Explore Itineraries
          </button>

          {/* ================= INFO BAR ================= */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {tour.title}
            </h2>

            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              {/* LOCATION */}
              <div className="flex items-center gap-2 bg-[#f0fafa] px-3 py-1 rounded-full">
                <FaMapMarkerAlt className="text-[#02878b]" />

                <span className="text-gray-600">{tour.location}</span>
              </div>

              {/* DURATION */}
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                <FaClock className="text-gray-500" />

                <span className="text-gray-600">
                  {tour.duration || "Flexible duration"}
                </span>
              </div>
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Overview</h3>

            <div className="text-gray-600 leading-relaxed space-y-4">
              {tour.description?.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* ================= DAY BY DAY ITINERARY ================= */}
          {tour.itinerary_days?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Day by Day Itinerary
              </h3>

              <div className="space-y-10">
                {tour.itinerary_days.map((day, index) => (
                  <div key={index}>
                    {/* TITLE */}
                    <div className="flex items-start gap-4">
                      {/* TEAL CIRCLE NUMBER */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#02878b] text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      {/* TITLE */}
                      <div>
                        <h4 className="text-2xl font-bold text-[#026f72]">
                          {day.title}
                        </h4>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="text-gray-600 leading-relaxed space-y-4 mt-4 mb-6 pl-4">
                      {day.description?.split("\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    {/* DETAILS TABLE */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f0fafa]">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-[#026f72] border-b">
                              Day
                            </th>

                            <th className="px-4 py-3 text-left font-semibold text-[#026f72] border-b">
                              Day to Day Details
                            </th>

                            <th className="px-4 py-3 text-left font-semibold text-[#026f72] border-b">
                              Location
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="hover:bg-[#f8fdfd] transition">
                            <td className="px-4 py-3 border-b text-gray-600">
                              {day.day || `Day ${index + 1}`}
                            </td>

                            <td className="px-4 py-3 border-b text-gray-700">
                              {day.details?.split(",").map((point, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="text-[#02878b] font-bold">
                                    •
                                  </span>

                                  <span>{point.trim()}</span>
                                </div>
                              ))}
                            </td>

                            <td className="px-4 py-3 border-b text-gray-600">
                              {day.location}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= HIGHLIGHTS ================= */}
          {tour.highlights?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Highlights
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {tour.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#f0fafa] hover:bg-[#e3f6f6] transition p-3 rounded-xl"
                  >
                    <FaStar className="text-[#02878b] mt-1" />

                    <span className="text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= INCLUDES ================= */}
          {tour.includes?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                What's Included
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {tour.includes.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl hover:shadow-sm transition"
                  >
                    <FaCheckCircle className="text-[#02878b] mt-1" />

                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* ================= ACTION CARD ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-800">
                Plan Your Trip
              </h3>

              {/* BOOK NOW */}
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full bg-[#02878b] hover:bg-[#026f72] text-white py-3 rounded-full font-semibold transition"
              >
                Book Now
              </button>

              {/* REVIEW */}
              <button
                onClick={() => setReviewOpen(true)}
                className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-full font-semibold transition"
              >
                Leave Review
              </button>
            </div>

            {/* ================= CONTACT CARD ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>

              <div className="space-y-3 text-sm">
                {/* PHONE */}
                <a
                  href="sms:+94771234567?body=Hello%20Travel%20Nest,%20I%20would%20like%20to%20inquire%20about%20your%20tour%20packages.%20Please%20share%20more%20details.%20Thank%20you."
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaPhone className="text-[#02878b]" />

                  <span>+94 77 123 4567</span>
                </a>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${"94771234567".replace(
                    /\D/g,
                    ""
                  )}?text=Hello%20Travel%20Nest!%20I%E2%80%99m%20interested%20in%20your%20Sri%20Lanka%20tour%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#f0fafa] p-3 rounded-lg hover:bg-[#e3f6f6]"
                >
                  <FaWhatsapp className="text-[#02878b]" />

                  <span>WhatsApp Chat</span>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:info@travelnest.com"
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaEnvelope className="text-gray-600" />

                  <span>Email Support</span>
                </a>
              </div>
            </div>

            {/* ================= RECENT ITINERARIES ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                Recent Itineraries
              </h3>

              {recentTours.length > 0 && (
                <div className="relative h-80 overflow-hidden rounded-xl">
                  {recentTours.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeIndex
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      {/* IMAGE */}
                      <img
                        src={item.image?.url}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-xl"
                      />

                      <div className="mt-3">
                        <h4 className="font-semibold text-gray-800 line-clamp-1">
                          {item.title}
                        </h4>

                        <p className="text-xs text-gray-500">{item.location}</p>

                        {/* VIEW DETAILS */}
                        <button
                          onClick={() => navigate(`/itinerary/${item.slug}`)}
                          className="mt-3 w-full bg-[#02878b] hover:bg-[#026f72] text-white py-2 rounded-lg text-sm transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <TourBookingForm
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        tour={tour}
      />

      <TourReviewForm open={reviewOpen} onClose={() => setReviewOpen(false)} />
    </>
  );
}
