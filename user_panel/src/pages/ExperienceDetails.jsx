import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLink,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";

/* ---------------- RECENT CARD CAROUSEL ---------------- */
function RecentExperienceCarousel({ items, navigate }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items.length) return null;

  const current = items[index];

  return (
    <div>
      <img
        src={current.image?.url}
        alt={current.title}
        className="w-full h-40 object-cover rounded-xl"
      />

      <div className="mt-3">
        <h4 className="font-semibold text-gray-800 line-clamp-1">
          {current.title}
        </h4>

        <p className="text-xs text-gray-500">{current.category}</p>

        <button
          onClick={() => navigate(`/experience/${current.id}`)}
          className="mt-3 w-full bg-[#02878b] hover:bg-[#026f72] text-white py-2 rounded-lg text-sm transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function ExperienceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageUrl, setPageUrl] = useState("");

  /* FETCH EXPERIENCE */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [expRes, recentRes] = await Promise.all([
          axiosInstance.get(`/experiences/${id}`),
          axiosInstance.get("/experiences", {
            params: { limit: 5, sort_order: "DESC" },
          }),
        ]);

        setExp(expRes.data.data);
        setRecent(recentRes.data.data.items || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#02878b]/20 border-t-[#02878b] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600 font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!exp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Experience not found
          </h2>

          <button
            onClick={() => navigate("/experience")}
            className="mt-5 bg-[#02878b] hover:bg-[#026f72] text-white px-6 py-3 rounded-full transition"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = exp.content?.split(/\n\s*\n/) || [];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img
          src={
            exp.image?.url ||
            exp.images?.[0]?.url ||
            "https://via.placeholder.com/1200x600"
          }
          alt={exp.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#4db8b8] uppercase text-sm tracking-widest">
            Experience
          </span>

          <h1 className="text-white text-4xl md:text-6xl font-black mt-4 max-w-4xl">
            {exp.title}
          </h1>

          <p className="text-white/80 mt-3">
            {exp.category} • {exp.duration}
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-10">
          {/* BACK */}
          <button
            onClick={() => navigate("/experience")}
            className="inline-flex items-center gap-2 text-[#02878b] font-semibold hover:text-[#026f72] transition"
          >
            ← Back to Experiences
          </button>

          {/* EXPERIENCE INFO */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{exp.title}</h2>

            <div className="flex gap-2 mt-3 flex-wrap">
              {/* CATEGORY */}
              <span className="bg-[#e3f6f6] text-[#026f72] px-3 py-1 rounded-full text-sm">
                {exp.category}
              </span>

              {/* DURATION */}
              <span className="bg-[#f0fafa] text-[#02878b] px-3 py-1 rounded-full text-sm">
                {exp.duration}
              </span>
            </div>

            <p className="text-gray-500 italic mt-4">
              Experience the beauty of Sri Lanka through this activity.
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 text-gray-700 leading-7">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Overview</h3>

            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* ================= MAP ================= */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 text-gray-700 leading-7">
            {exp.latitude && exp.longitude && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Location
                </h3>

                <iframe
                  className="w-full h-[350px] rounded-xl"
                  src={`https://maps.google.com/maps?q=${exp.latitude},${exp.longitude}&z=14&output=embed`}
                  title="Experience Location"
                />
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* ================= INFO ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold mb-3 text-gray-800">Info</h3>

              <p className="text-sm text-gray-600">Category: {exp.category}</p>

              <p className="text-sm text-gray-600">Duration: {exp.duration}</p>
            </div>

            {/* ================= SHARE ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h4 className="font-semibold mb-4 text-gray-800">Share</h4>

              <div className="flex gap-3 flex-wrap">
                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#02878b] hover:bg-[#026f72] text-white transition"
                >
                  <FaWhatsapp />
                </a>

                {/* FACEBOOK */}
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    pageUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#026f72] hover:bg-[#025b5e] text-white transition"
                >
                  <FaFacebookF />
                </a>

                {/* X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    pageUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white"
                >
                  <FaXTwitter />
                </a>

                {/* COPY LINK */}
                <button
                  onClick={handleCopy}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#02878b] hover:bg-[#026f72] text-white transition"
                >
                  <FaLink />
                </button>
              </div>
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
                  +94 75 999 0663
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
                  WhatsApp Chat
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:info@travelnest.com"
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaEnvelope className="text-gray-600" />
                  Email Support
                </a>
              </div>
            </div>

            {/* ================= RECENT EXPERIENCES ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold mb-4 text-gray-800">
                Recent Experiences
              </h3>

              <RecentExperienceCarousel items={recent} navigate={navigate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
