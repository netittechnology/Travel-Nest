import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { axiosInstance } from "../../lib/axiosInstance";

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/destinations", {
          params: {
            page: 1,
            limit: 4,
            sort_order: "ASC",
          },
        });

        const response = res.data.data;

        setDestinations(response?.items || []);
      } catch (error) {
        console.error("Error fetching popular destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  return (
    <section className="bg-[#fafcfb] py-8 lg:py-12">
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
            <div>
              <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
                Explore Sri Lanka
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#102a36]">
              Popular
              <span className="text-[#02878b]"> Destinations</span>
            </h2>

            <p className="mt-5 text-sm md:text-base leading-relaxed text-[#4b6b73] max-w-2xl">
              Discover breathtaking places across Sri Lanka. From misty
              mountains and ancient cities to tropical beaches and wildlife
              adventures, experience unforgettable journeys with Tour Nest.
            </p>
          </motion.div>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#02878b] text-white font-semibold shadow-lg hover:bg-[#026f72] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              View All Destinations
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[320px] rounded-3xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#02878b]/10 flex items-center justify-center">
              <MapPin className="text-[#02878b]" size={28} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#102a36]">
              No destinations available
            </h3>

            <p className="mt-2 text-sm text-[#4b6b73]">
              Please check back again later.
            </p>
          </div>
        ) : (
          /* ================= DESTINATION CARDS ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-3xl h-[320px] shadow-xl"
              >
                {/* IMAGE */}
                <img
                  src={destination.image?.url}
                  alt={destination.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02878b]/80 via-[#02878b]/30 to-transparent" />

                {/* RATING */}
                {destination.rating && (
                  <div className="absolute top-5 right-5 flex items-center gap-1 px-3 py-2 rounded-full bg-white/95 text-sm font-semibold text-[#102a36] shadow-md">
                    <Star
                      size={15}
                      fill="#facc15"
                      className="text-yellow-400"
                    />
                    {destination.rating}
                  </div>
                )}

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {/* LOCATION */}
                  {destination.location && (
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                      <MapPin size={15} className="text-[#47d7c8]" />
                      <span className="line-clamp-1">
                        {destination.location}
                      </span>
                    </div>
                  )}

                  {/* TITLE */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-1 text-center">
                    {destination.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-2 text-center">
                    {destination.description ||
                      destination.subtitle ||
                      "Discover the beauty and culture of this amazing destination."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
