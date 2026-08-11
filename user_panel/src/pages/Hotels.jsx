import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { axiosInstance } from "../lib/axiosInstance";
import { Link } from "react-router-dom";
import Hero from "../assets/header/dining-header.webp";
import { Helmet } from "react-helmet-async";

/* -------- SKELETON -------- */
function HotelSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="h-56 bg-gray-200" />

          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-3 bg-gray-200 rounded-lg w-1/2" />
            <div className="h-3 bg-gray-200 rounded-lg w-full" />
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
      <div className="w-20 h-20 bg-[#02878b]/10 rounded-full flex items-center justify-center mb-5">
        <span className="text-3xl">🏨</span>
      </div>

      <h2 className="text-2xl font-bold text-[#102a36]">No hotels found</h2>

      <p className="text-[#4b6b73] mt-2 max-w-md">
        Try adjusting your search or check again later.
      </p>
    </div>
  );
}

export default function Hotels() {
  const [showText, setShowText] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("oldest");
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* HERO TEXT ANIMATION */
  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* SEARCH DEBOUNCE */
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

  /* FETCH HOTELS */
  const fetchHotels = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/hotels", {
        params: {
          page,
          limit: 6,
          sort_order: sortType === "oldest" ? "ASC" : "DESC",
          is_available: true,
          search_term: debouncedSearch || undefined,
        },
      });

      let items = res.data?.data?.items || [];

      if (sortType === "random") {
        items = items
          .map((v) => ({ v, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ v }) => v);
      }

      setHotels(items);
      setMeta(res.data?.data?.meta || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page, sortType, debouncedSearch]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      <Helmet>
        <title>Best Hotels in Sri Lanka | Travel Nest</title>

        <meta
          name="description"
          content="Find and book the best hotels across Sri Lanka for luxury and budget stays."
        />

        <link rel="canonical" href="https://travelnest.com/hotels" />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Hero}
            alt="Sri Lanka Hotels and Resorts"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: showText ? 1 : 0,
            y: showText ? 0 : 40,
          }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Luxury Stays
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Hotels & Resorts
          </h1>

          <p className="text-white/90 mt-6 text-lg leading-relaxed">
            Discover handpicked hotels, luxury resorts, and boutique stays
            across Sri Lanka for a comfortable and unforgettable experience.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="py-8 lg:py-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* =================================================
              HEADER
          ================================================= */}
          <div className="text-center mb-12">
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura">
              Stay & Relax
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36] mt-1">
              Curated
              <span className="text-[#02878b]"> Hotel Stays</span>
            </h2>

            <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
              Discover handpicked hotels across Sri Lanka, from luxury resorts
              to boutique stays, designed for comfort, relaxation, and
              unforgettable experiences.
            </p>
          </div>

          {/* =================================================
              SEARCH
          ================================================= */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative group">
              <svg
                className="w-5 h-5 text-[#4b6b73] group-focus-within:text-[#02878b] absolute left-5 top-1/2 -translate-y-1/2 transition-colors"
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

              <input
                type="text"
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  setPage(1);

                  if (value === "") setDebouncedSearch("");
                }}
                className="w-full px-6 py-4 pl-14 rounded-full bg-white border border-gray-200 shadow-sm text-[#102a36] placeholder:text-gray-400 focus:outline-none focus:border-[#02878b] focus:ring-4 focus:ring-[#02878b]/10 transition-all"
              />
            </div>
          </div>

          {/* =================================================
              SORT
          ================================================= */}
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

          {/* =================================================
              CONTENT
          ================================================= */}
          {loading ? (
            <HotelSkeleton />
          ) : hotels.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* =================================================
                  HOTEL GRID
              ================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((h) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* IMAGE */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={h.images?.[0]?.url}
                        alt={h.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* IMAGE OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/70 via-transparent to-transparent opacity-70" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-[#102a36] line-clamp-1 group-hover:text-[#02878b] transition-colors">
                        {h.name}
                      </h3>

                      <p className="text-sm text-[#4b6b73] italic mt-1">
                        {h.category}
                      </p>

                      <p className="text-sm text-[#4b6b73] mt-3 line-clamp-3 leading-relaxed">
                        {h.short_description}
                      </p>

                      <Link to={`/hotels/${h.id}`}>
                        <button className="mt-5 w-full bg-[#02878b] text-white py-3 rounded-full hover:bg-[#026f72] transition-all duration-300 shadow-sm hover:shadow-md">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}
              {meta && (
                <div className="flex justify-center mt-14 gap-2 flex-wrap">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={!meta.hasPreviousPage}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Prev
                  </button>

                  {[...Array(meta.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2.5 rounded-xl border transition-all ${
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
                    className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
