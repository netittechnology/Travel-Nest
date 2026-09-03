import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../assets/header/experience-hero.jpg";
import { axiosInstance } from "../lib/axiosInstance";
import { Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";

/* -------- SKELETON -------- */
function ExperienceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="h-56 bg-gray-200" />

          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-3 bg-gray-200 rounded-lg w-1/2" />
            <div className="h-3 bg-gray-200 rounded-lg w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------- EMPTY -------- */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-[#02878b]/10 flex items-center justify-center mb-5">
        <span className="text-3xl">🌿</span>
      </div>

      <h2 className="text-2xl font-bold text-[#102a36]">
        No experiences available
      </h2>

      <p className="text-[#4b6b73] mt-2 max-w-md">
        Please check again later or explore other categories.
      </p>
    </div>
  );
}

export default function Experiences() {
  const [showText, setShowText] = useState(false);

  const [experiences, setExperiences] = useState([]);
  const [meta, setMeta] = useState(null);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("oldest");

  const [loading, setLoading] = useState(false);

  const perPage = 6;

  /* HERO */
  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* fetch */
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/experiences", {
        params: {
          page,
          limit: perPage,
          is_available: true,
          sort_order: sortType === "oldest" ? "ASC" : "DESC",
        },
      });

      setExperiences(res.data.data.items);
      setMeta(res.data.data.meta);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortType]);

  /* random only UI side */
  const displayData =
    sortType === "random"
      ? [...experiences].sort(() => Math.random() - 0.5)
      : experiences;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      <Helmet>
        <title>Travel Experiences | Tour Nest</title>
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Hero}
            alt="Sri Lanka Travel Experiences"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div
          className={`relative z-10 text-center px-4 max-w-3xl transition-all duration-700 ${
            showText
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Explore With Us
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Travel Experiences
          </h1>

          <p className="text-white/90 mt-6 text-lg leading-relaxed">
            Discover unforgettable moments across Sri Lanka.
          </p>
        </div>
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
              Explore & Experience
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36] mt-1">
              Real Travel
              <span className="text-[#02878b]"> Experiences</span>
            </h2>

            <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
              Explore authentic journeys, unforgettable moments, and real
              traveler experiences across Sri Lanka's most beautiful
              destinations.
            </p>
          </div>

          {/* =================================================
              SORT BUTTONS
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
              GRID
          ================================================= */}
          {loading ? (
            <ExperienceSkeleton />
          ) : displayData.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayData.map((exp) => (
                <div
                  key={exp.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={exp.image?.url}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/70 via-transparent to-transparent opacity-70" />

                    {/* CATEGORY */}
                    {exp.category && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#102a36] px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-sm">
                        <Tag
                          size={12}
                          className="text-[#02878b]"
                        />
                        {exp.category}
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#102a36] line-clamp-1 group-hover:text-[#02878b] transition-colors">
                      {exp.title}
                    </h3>

                    <p className="text-sm text-[#4b6b73] mt-3 line-clamp-3 leading-relaxed">
                      {exp.content}
                    </p>

                    <Link to={`/experience/${exp.id}`}>
                      <button className="mt-5 w-full bg-[#02878b] text-white py-3 rounded-full hover:bg-[#026f72] transition-all duration-300 shadow-sm hover:shadow-md">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

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
                  setPage((p) =>
                    Math.min(p + 1, meta.totalPages)
                  )
                }
                disabled={!meta.hasNextPage}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}