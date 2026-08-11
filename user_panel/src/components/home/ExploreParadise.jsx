import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { axiosInstance } from "../../lib/axiosInstance";
import "swiper/css";

export default function ExploreParadise() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/tours", {
          params: {
            page: 1,
            limit: 10,
            is_available: true,
            sort_order: "ASC",
          },
        });

        const items = res.data?.data?.items || [];

        setTours(items);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="bg-[#fafcfb] py-8 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* SCRIPT LABEL */}
            <p className="font-allura text-3xl md:text-4xl text-[#02878b] mb-2">
              Curated Sri Lanka Tour Packages
            </p>

            {/* HEADING */}
            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36]">
              Explore Sri Lanka <span className="text-[#02878b]">Your Way</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 text-sm md:text-base leading-relaxed text-[#4b6b73] max-w-2xl">
              Discover handpicked Sri Lanka tour packages featuring wildlife
              safaris, cultural heritage, tropical beaches, and unforgettable
              adventures designed around your journey.
            </p>
          </motion.div>

          {/* RIGHT BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/itineraries"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#02878b] text-white font-semibold shadow-lg hover:bg-[#026f72] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              View All Itineraries
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden bg-white shadow-lg animate-pulse"
              >
                <div className="h-64 bg-gray-200" />

                <div className="p-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
                  <div className="h-3 bg-gray-200 rounded w-full mt-5" />
                  <div className="h-3 bg-gray-200 rounded w-5/6 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
          /* ================= EMPTY ================= */
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#02878b]/10 flex items-center justify-center">
              <Sparkles size={26} className="text-[#02878b]" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#102a36]">
              No tour packages available
            </h3>

            <p className="mt-2 text-sm text-[#4b6b73]">
              Please check back again later.
            </p>
          </div>
        ) : (
          /* ================= TOURS SLIDER ================= */
          <div
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay]}
              loop={tours.length > 3}
              spaceBetween={28}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1.2,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {tours.map((tour, index) => (
                <SwiperSlide key={tour.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="h-full pb-4"
                  >
                    <div className="group h-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
                      {/* ================= IMAGE ================= */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={tour.image?.url}
                          alt={`${tour.title} - Sri Lanka tour`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/70 via-transparent to-transparent" />

                        {/* CATEGORY / BADGE */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02878b] text-white text-xs font-semibold shadow-md">
                          <Clock size={13} />
                          {tour.duration}
                        </div>
                      </div>

                      {/* ================= CONTENT ================= */}
                      <div className="p-6 flex flex-col">
                        {/* TITLE */}
                        <h3 className="text-xl font-bold text-[#102a36] line-clamp-2 leading-snug">
                          {tour.title || "Sri Lanka Tour"}
                        </h3>

                        {/* LOCATION */}
                        {tour.location && (
                          <div className="flex items-center gap-2 mt-3 text-sm text-[#4b6b73]">
                            <MapPin
                              size={16}
                              className="text-[#02878b] flex-shrink-0"
                            />

                            <span className="line-clamp-1">
                              {tour.location}
                            </span>
                          </div>
                        )}

                        {/* DESCRIPTION */}
                        <p className="mt-4 text-sm text-[#4b6b73] leading-relaxed line-clamp-3">
                          {tour.description ||
                            "Discover breathtaking landscapes, rich culture, and unforgettable experiences across Sri Lanka."}
                        </p>

                        {/* BUTTON */}
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/itinerary/${tour.slug || tour.id}`)
                          }
                          className="mt-6 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#02878b] text-white font-semibold text-sm hover:bg-[#026f72] transition-all duration-300 group/button"
                          aria-label={`Explore ${tour.title} tour in Sri Lanka`}
                        >
                          Explore Tour
                          <ArrowRight
                            size={17}
                            className="group-hover/button:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
