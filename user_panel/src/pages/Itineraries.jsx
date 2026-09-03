import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Hero from "../assets/header/tour-hero.webp";
import DayHero from "../assets/header/day-hero.webp";
import RoundHero from "../assets/header/round-hero.webp";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

/* -------- SKELETON -------- */
function ItinerarySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="h-56 bg-gray-200" />

          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------- EMPTY STATE -------- */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-[#02878b]/10 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">🌍</span>
      </div>

      <h2 className="text-xl font-bold text-[#102a36]">
        No itineraries available
      </h2>

      <p className="text-[#4b6b73] mt-2">
        Please check again later or explore other tours.
      </p>
    </div>
  );
}

export default function Itineraries({ tourType }) {
  const [showText, setShowText] = useState(false);
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("oldest");
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setDebouncedSearch("");
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchTours = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/tours", {
        params: {
          page,
          limit: 6,
          sort_order: sortType === "oldest" ? "ASC" : "DESC",
          is_available: true,
          search_term: debouncedSearch || undefined,
          tour_type: tourType || undefined,
        },
      });

      let items = res.data?.data?.items || [];

      if (sortType === "random") {
        items = items
          .map((v) => ({ v, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ v }) => v);
      }

      setTours(items);
      setMeta(res.data?.data?.meta || null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load itineraries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [page, sortType, debouncedSearch]);

  const heroImage =
    tourType === "DAY_TOUR"
      ? DayHero
      : tourType === "ROUND_TOUR"
      ? RoundHero
      : Hero;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      <Helmet>
        <title>
          {tourType === "DAY_TOUR"
            ? "Sri Lanka Day Tours | Tour Nest"
            : tourType === "ROUND_TOUR"
            ? "Sri Lanka Round Tours | Tour Nest"
            : "Sri Lanka Tour Itineraries | Tour Nest"}
        </title>

        <meta
          name="description"
          content={
            tourType === "DAY_TOUR"
              ? "Explore curated one-day tours across Sri Lanka."
              : tourType === "ROUND_TOUR"
              ? "Discover multi-day round tours across Sri Lanka."
              : "Explore curated Sri Lanka travel itineraries."
          }
        />

        <link
          rel="canonical"
          href={
            tourType === "DAY_TOUR"
              ? "https://tournestsrilanka.com/itineraries/day-tours"
              : tourType === "ROUND_TOUR"
              ? "https://tournestsrilanka.com/itineraries/round-tours"
              : "https://tournestsrilanka.com/itineraries"
          }
        />
      </Helmet>

      {/* HERO */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={
              tourType === "DAY_TOUR"
                ? "Sri Lanka Day Tours"
                : tourType === "ROUND_TOUR"
                ? "Sri Lanka Round Tours"
                : "Sri Lanka Tours"
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Explore With Us
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            {tourType === "DAY_TOUR"
              ? "Day Tours"
              : tourType === "ROUND_TOUR"
              ? "Round Tours"
              : "All Tours"}
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl mx-auto text-lg">
            {tourType === "DAY_TOUR"
              ? "Discover unforgettable one-day experiences across Sri Lanka."
              : tourType === "ROUND_TOUR"
              ? "Explore multi-day journeys through Sri Lanka's most beautiful destinations."
              : "Discover carefully crafted journeys across Sri Lanka designed for unforgettable experiences."}
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
            {tourType === "DAY_TOUR"
              ? "Explore & Discover"
              : tourType === "ROUND_TOUR"
              ? "Journey & Experience"
              : "Explore & Experience"}
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#102a36] mt-2">
            {tourType === "DAY_TOUR"
              ? "Curated Day "
              : tourType === "ROUND_TOUR"
              ? "Curated Round "
              : "Curated Travel "}

            <span className="text-[#02878b]">
              {tourType === "DAY_TOUR"
                ? "Tours"
                : tourType === "ROUND_TOUR"
                ? "Tours"
                : "Itineraries"}
            </span>
          </h2>

          <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
            {tourType === "DAY_TOUR"
              ? "Discover unforgettable one-day experiences featuring Sri Lanka's scenic beauty, culture, and adventure."
              : tourType === "ROUND_TOUR"
              ? "Explore thoughtfully planned multi-day journeys through Sri Lanka's most beautiful destinations."
              : "Explore thoughtfully designed travel plans combining scenic beauty, culture, and adventure."}
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;

                setSearchTerm(value);
                setPage(1);

                if (value === "") {
                  setDebouncedSearch("");
                }
              }}
              className="w-full px-5 py-4 pl-12 rounded-full bg-white border border-gray-200 shadow-sm text-[#102a36] placeholder:text-gray-400 focus:outline-none focus:border-[#02878b] focus:ring-4 focus:ring-[#02878b]/10 transition-all"
            />

            <svg
              className="w-5 h-5 text-[#4b6b73] absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* SORT BUTTONS */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {["oldest", "latest", "random"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSortType(type);
                setPage(1);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                sortType === type
                  ? "bg-[#02878b] text-white shadow-lg shadow-[#02878b]/20"
                  : "bg-white text-[#4b6b73] border border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT STATE */}
        {loading ? (
          <ItinerarySkeleton />
        ) : tours.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((t) => (
                <div
                  key={t.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={t.image?.url}
                      alt={t.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/70 via-transparent to-transparent opacity-70" />

                    {/* CATEGORY / BADGE */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02878b] text-white text-xs font-semibold shadow-md">
                      {t.tour_type
                        ?.replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())} - {t.duration}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#102a36] line-clamp-1 group-hover:text-[#02878b] transition-colors">
                      {t.title}
                    </h3>

                    <p className="text-sm text-[#4b6b73] italic mt-1">
                      {t.location}
                    </p>

                    <p className="text-sm text-[#02878b] font-semibold mt-1">
                      {t.duration}
                    </p>

                    <p className="text-sm text-[#4b6b73] mt-3 line-clamp-3 leading-relaxed">
                      {t.description}
                    </p>

                    <button
                      onClick={() => navigate(`/itinerary/${t.slug}`)}
                      className="mt-5 w-full bg-[#02878b] text-white py-3 rounded-full hover:bg-[#026f72] hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {meta && (
              <div className="flex justify-center mt-14 gap-2 flex-wrap">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={!meta.hasPreviousPage}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Prev
                </button>

                {[...Array(meta.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl border font-semibold transition-all ${
                      meta.currentPage === i + 1
                        ? "bg-[#02878b] text-white border-[#02878b] shadow-md"
                        : "bg-white text-[#4b6b73] border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, meta.totalPages))
                  }
                  disabled={!meta.hasNextPage}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
