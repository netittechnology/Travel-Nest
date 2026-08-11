import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { axiosInstance } from "../lib/axiosInstance";
import Hero from "../assets/header/destination-hero.webp";
import { Helmet } from "react-helmet-async";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";

/* =========================================================
   SKELETON
========================================================= */
function DestinationSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm animate-pulse"
        >
          <div className="h-60 bg-gray-200" />

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

/* =========================================================
   EMPTY STATE
========================================================= */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-[#02878b]/10 flex items-center justify-center mb-5">
        <Compass size={34} className="text-[#02878b]" />
      </div>

      <h2 className="text-2xl font-bold text-[#102a36]">
        No destinations found
      </h2>

      <p className="text-[#4b6b73] mt-2 max-w-md">
        We couldn't find any destinations matching your search. Try another
        destination or check again later.
      </p>
    </div>
  );
}

/* =========================================================
   DESTINATION PAGE
========================================================= */
export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("oldest");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const perPage = 8;

  /* =======================================================
     HERO ANIMATION
  ======================================================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  /* =======================================================
     SEARCH DEBOUNCE
  ======================================================= */
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

  /* =======================================================
     FETCH DESTINATIONS
  ======================================================= */
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/destinations", {
          params: {
            page: currentPage,
            limit: perPage,
            sort_order: sortType === "oldest" ? "ASC" : "DESC",
            search_term: debouncedSearch || undefined,
          },
        });

        const response = res.data?.data;

        setDestinations(response?.items || []);
        setTotalPages(response?.meta?.totalPages || 1);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setDestinations([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [currentPage, sortType, debouncedSearch]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      {/* =====================================================
          SEO
      ===================================================== */}
      <Helmet>
        <title>Explore Sri Lanka Destinations | Travel Nest</title>

        <meta
          name="description"
          content="Explore the best destinations in Sri Lanka with Travel Nest. Discover beaches, mountains, wildlife, cultural heritage sites, and unforgettable places across the island."
        />

        <link rel="canonical" href="https://travelnest.com/destinations" />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={Hero} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Discover Sri Lanka
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Explore Sri Lanka Destinations
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl mx-auto text-lg">
            From misty mountains and ancient kingdoms to golden beaches and
            incredible wildlife, discover the places that make Sri Lanka
            unforgettable.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="py-8 lg:py-12 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* =================================================
              HEADER
          ================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Explore & Experience
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36]">
              Places Worth
              <span className="text-[#02878b]"> Discovering</span>
            </h2>

            <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
              Explore breathtaking landscapes, rich cultural heritage, tropical
              coastlines, wildlife parks, and charming mountain towns across Sri
              Lanka.
            </p>
          </motion.div>

          {/* =================================================
              SEARCH
          ================================================= */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4b6b73] group-focus-within:text-[#02878b] transition-colors"
              />

              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;

                  setSearchTerm(value);
                  setCurrentPage(1);

                  if (value === "") {
                    setDebouncedSearch("");
                  }
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
                  setCurrentPage(1);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  sortType === type
                    ? "bg-[#02878b] text-white shadow-lg shadow-[#02878b]/20"
                    : "bg-white text-[#4b6b73] border border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* =================================================
              CONTENT STATES
          ================================================= */}
          {loading ? (
            <DestinationSkeleton />
          ) : destinations.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* =============================================
                  DESTINATION GRID
              ============================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                {destinations.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={item.image?.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/70 via-transparent to-transparent opacity-70" />

                      {/* Location */}
                      {item.location && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm">
                          <MapPin size={15} className="text-[#7dd3d3]" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-[#102a36] group-hover:text-[#02878b] transition-colors">
                        {item.title}
                      </h3>

                      {item.subtitle && (
                        <p className="text-sm text-[#4b6b73] mt-2 line-clamp-2 leading-relaxed">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* =============================================
                  PAGINATION
              ============================================= */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-14 gap-2 flex-wrap">
                  {/* Previous */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={17} />
                    Prev
                  </button>

                  {/* Pages */}
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl border font-semibold transition-all ${
                          currentPage === page
                            ? "bg-[#02878b] text-white border-[#02878b] shadow-md"
                            : "bg-white text-[#4b6b73] border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next */}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next
                    <ChevronRight size={17} />
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
