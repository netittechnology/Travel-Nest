import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import {
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recentHotels, setRecentHotels] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH RECENT HOTELS =================
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axiosInstance.get("/hotels", {
          params: {
            limit: 5,
            sort_order: "DESC",
          },
        });

        setRecentHotels(res.data?.data?.items || []);
      } catch (err) {
        console.error("Failed to load recent hotels", err);
      }
    };

    fetchRecent();
  }, []);

  // ================= RECENT HOTELS SLIDER =================
  useEffect(() => {
    if (!recentHotels.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === recentHotels.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [recentHotels]);

  // ================= FETCH HOTEL =================
  const fetchHotel = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/hotels/${id}`);

      setHotel(res.data?.data || res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load hotel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#02878b]/20 border-t-[#02878b] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600 font-medium">
            Loading hotel details...
          </p>
        </div>
      </div>
    );
  }

  // ================= HOTEL NOT FOUND =================
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Hotel not found
          </h2>

          <button
            onClick={() => navigate("/hotels")}
            className="mt-5 bg-[#02878b] hover:bg-[#026f72] text-white px-6 py-3 rounded-full transition"
          >
            Back to Hotels
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
            hotel.images?.[0]?.url ||
            "https://via.placeholder.com/800"
          }
          className="w-full h-full object-cover"
          alt={hotel.name}
        />

        {/* HERO OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[#4db8b8] uppercase tracking-widest text-sm font-bold">
            Hotel Stay
          </span>

          <h1 className="text-white text-4xl md:text-6xl font-black mt-4">
            {hotel.name}
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-10">
          {/* BACK */}
          <button
            onClick={() => navigate("/hotels")}
            className="text-[#02878b] font-semibold hover:text-[#026f72] transition"
          >
            ← Back to Hotels
          </button>

          {/* ================= INFO CARD ================= */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {hotel.name}
            </h2>

            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <div className="flex items-center gap-2 bg-[#f0fafa] px-3 py-1 rounded-full">
                <FaMapMarkerAlt className="text-[#02878b]" />

                <span className="text-gray-600">
                  {hotel.category}
                </span>
              </div>
            </div>
          </div>

          {/* ================= SHORT DESCRIPTION ================= */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Overview
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {hotel.short_description}
            </p>
          </div>

          {/* ================= FULL DESCRIPTION ================= */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              About Hotel
            </h3>

            <div className="text-gray-600 leading-relaxed space-y-4">
              {hotel.description
                ?.split(/\n+/)
                .filter((p) => p.trim() !== "")
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          </div>

          {/* ================= HIGHLIGHTS ================= */}
          {hotel.highlight_keywords?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Highlights
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {hotel.highlight_keywords.map((k, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#f0fafa] p-3 rounded-xl hover:bg-[#e3f6f6] transition"
                  >
                    <FaStar className="text-[#02878b] mt-1" />

                    <span className="text-gray-700">
                      {k}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* ================= MAP CARD ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3">
                Location
              </h3>

              {hotel.latitude && hotel.longitude ? (
                <iframe
                  title="map"
                  className="w-full h-64 rounded-xl border"
                  src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
                />
              ) : (
                <p className="text-gray-500 text-sm">
                  Location not available
                </p>
              )}
            </div>

            {/* ================= CONTACT CARD ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3">
                Need Help?
              </h3>

              <div className="space-y-3 text-sm">
                {/* PHONE */}
                <a
                  href="sms:+94771234567?body=Hello%20Tour%20Nest,%20I%20would%20like%20to%20inquire%20about%20your%20tour%20packages.%20Please%20share%20more%20details.%20Thank%20you."
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaPhone className="text-[#02878b]" />

                  +94 75 999 0663
                </a>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${"94771234567".replace(
                    /\D/g,
                    ""
                  )}?text=Hello%20Tour%20Nest!%20I%E2%80%99m%20interested%20in%20your%20Sri%20Lanka%20tour%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#f0fafa] p-3 rounded-lg hover:bg-[#e3f6f6]"
                >
                  <FaWhatsapp className="text-[#02878b]" />

                  WhatsApp Chat
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:info@tournest.com"
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaEnvelope className="text-gray-600" />

                  Email Support
                </a>
              </div>
            </div>

            {/* ================= RECENT HOTELS ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                Recent Hotels
              </h3>

              {recentHotels.length > 0 && (
                <div className="relative h-80 overflow-hidden rounded-xl">
                  {recentHotels.map((item, index) => (
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
                        src={item.images?.[0]?.url}
                        className="w-full h-40 object-cover rounded-xl"
                        alt={item.name}
                      />

                      {/* CONTENT */}
                      <div className="mt-3">
                        <h4 className="font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </h4>

                        <p className="text-xs text-gray-500">
                          {item.category}
                        </p>

                        {/* VIEW DETAILS */}
                        <button
                          onClick={() =>
                            navigate(`/hotels/${item.id}`)
                          }
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
    </>
  );
}
