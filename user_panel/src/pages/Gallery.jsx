import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../lib/axiosInstance";
import Hero from "../assets/header/gallery-hero.webp";
import { Helmet } from "react-helmet-async";

/* -------- ANIMATION -------- */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* -------- SKELETON -------- */
function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-3xl bg-gray-200 h-64" />
      ))}
    </div>
  );
}

export default function Gallery() {
  const [showText, setShowText] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [allImages, setAllImages] = useState([]);

  /* HERO animation */
  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* MODAL STATE */
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filters, setFilters] = useState([{ value: "all", label: "All" }]);

  /* FETCH */
  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/gallery", {
        params: { page: 1, limit: 100 },
      });

      const items = res.data?.data?.items || [];

      const mappedImages = items.map((item) => ({
        id: item.id,
        src: item.image?.url,
        category: item.category,
        title: item.title,
        location: item.location,
      }));

      setAllImages(mappedImages);

      /* UNIQUE FILTERS FROM ALL DATA */
      const uniqueCategories = [...new Set(items.map((item) => item.category))];

      setFilters([
        { value: "all", label: "All" },
        ...uniqueCategories.map((cat) => ({
          value: cat,
          label: cat
            .replace(/\_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        })),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const images =
    filter === "all"
      ? allImages
      : allImages.filter((img) => img.category === filter);

  const filteredCategories = filters.filter((f) =>
    f.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* NAVIGATION */
  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const current = images[selectedIndex];

  const next = () => {
    setSelectedIndex((prev) => {
      if (prev + 1 >= images.length) return null;
      return prev + 1;
    });
  };

  const prev = () => {
    setSelectedIndex((prev) => {
      if (prev === 0) return null;
      return prev - 1;
    });
  };

  /* KEYBOARD CONTROL */
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  /* SHARE */
  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        current?.title + " " + window.location.href
      )}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  return (
    <div className="bg-[#fafcfb] text-[#4b6b73] font-poppins pb-16">
      <Helmet>
        <title>Gallery | Sri Lanka Travel Moments</title>

        <meta
          name="description"
          content="Explore beautiful travel moments captured across Sri Lanka."
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Hero}
            alt="Sri Lanka Travel Gallery"
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
            Discover Sri Lanka
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Travel Gallery
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            A visual journey through Sri Lanka’s breathtaking landscapes,
            vibrant culture, and unforgettable adventures.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="py-8 lg:py-12 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* =================================================
              INTRO
          ================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Moments Worth Remembering
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36] mt-1">
              Captured Moments of
              <span className="text-[#02878b]"> Sri Lanka</span>
            </h2>

            <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
              Explore breathtaking landscapes, cultural heritage, and
              unforgettable travel experiences beautifully captured across Sri
              Lanka.
            </p>
          </motion.div>

          {/* =================================================
              FILTER
          ================================================= */}
          <div className="mb-12">
            {/* MOBILE DROPDOWN */}
            <div className="md:hidden relative max-w-md mx-auto">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full flex justify-between items-center px-5 py-3.5 rounded-full bg-[#02878b] text-white border border-[#02878b] shadow-lg shadow-[#02878b]/20"
              >
                {filters.find((f) => f.value === filter)?.label ||
                  "Select Category"}

                <span>▼</span>
              </button>

              {openDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-3">
                  {/* SEARCH */}
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 mb-3 rounded-xl border border-gray-200 text-[#102a36] placeholder:text-gray-400 focus:outline-none focus:border-[#02878b] focus:ring-4 focus:ring-[#02878b]/10"
                  />

                  {/* CATEGORY LIST */}
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {filteredCategories.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => {
                          setFilter(f.value);
                          setOpenDropdown(false);
                          setSearchTerm("");
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition ${
                          filter === f.value
                            ? "bg-[#02878b] text-white"
                            : "hover:bg-[#02878b]/10 text-[#4b6b73] hover:text-[#02878b]"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DESKTOP BUTTONS */}
            <div className="hidden md:flex justify-center gap-3 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === f.value
                      ? "bg-[#02878b] text-white shadow-lg shadow-[#02878b]/20"
                      : "bg-white text-[#4b6b73] border border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              GRID
          ================================================= */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <GallerySkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img, i) => (
                  <motion.div
                    key={img.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative cursor-pointer group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    onClick={() => openModal(i)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* IMAGE OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/80 via-transparent to-transparent opacity-80" />

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="font-bold text-base">{img.title}</p>

                        <p className="text-xs text-[#7dd3d3] mt-1">
                          {img.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* =================================================
              MODAL
          ================================================= */}
          <AnimatePresence>
            {selectedIndex !== null && current && (
              <motion.div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-9999"
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* CLOSE */}
                <button
                  onClick={closeModal}
                  className="fixed top-6 right-6 z-10000 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 hover:bg-[#02878b] text-white text-2xl shadow-lg transition"
                >
                  ✕
                </button>

                {/* LEFT */}
                <button
                  onClick={() => {
                    if (images.length <= 1) return closeModal();
                    prev();
                  }}
                  className="absolute left-5 text-white text-4xl hover:text-[#7dd3d3] transition"
                >
                  ‹
                </button>

                {/* IMAGE */}
                <motion.img
                  key={current.id}
                  onClick={(e) => e.stopPropagation()}
                  src={current.src}
                  alt={current.title}
                  className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                />

                {/* RIGHT */}
                <button
                  onClick={() => {
                    if (images.length <= 1) return closeModal();
                    next();
                  }}
                  className="absolute right-5 text-white text-4xl hover:text-[#7dd3d3] transition"
                >
                  ›
                </button>

                {/* INFO + SHARE */}
                <div className="absolute bottom-8 text-center text-white">
                  <h2 className="text-xl font-bold">{current.title}</h2>

                  <p className="text-sm text-[#7dd3d3] mt-1">
                    {current.location}
                  </p>

                  <div className="flex gap-3 justify-center mt-4">
                    <button
                      onClick={shareWhatsApp}
                      className="bg-[#02878b] hover:bg-[#026f72] px-5 py-2 rounded-full font-medium transition"
                    >
                      WhatsApp
                    </button>

                    <button
                      onClick={shareFacebook}
                      className="bg-[#102a36] hover:bg-[#1c4b56] px-5 py-2 rounded-full font-medium transition"
                    >
                      Facebook
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
