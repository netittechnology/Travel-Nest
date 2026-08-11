import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Bird,
  Waves,
  Map,
  Landmark,
  Mountain,
  Trees,
  Umbrella,
  Compass,
} from "lucide-react";
import sigiriya from "../../assets/sigiriya.webp";

const activities = [
  {
    title: "Wildlife Photography",
    description:
      "Capture Sri Lanka's incredible wildlife in its natural habitat.",
    icon: Camera,
  },
  {
    title: "Birdwatching Experiences",
    description:
      "Discover colorful native and migratory birds across Sri Lanka.",
    icon: Bird,
  },
  {
    title: "Whale & Marine Life",
    description:
      "Experience unforgettable encounters with whales and marine life.",
    icon: Waves,
  },
  {
    title: "Day Excursions",
    description:
      "Enjoy memorable day trips to Sri Lanka's most beautiful places.",
    icon: Map,
  },
  {
    title: "Cultural Heritage",
    description:
      "Explore ancient cities, temples, traditions, and local culture.",
    icon: Landmark,
  },
  {
    title: "Adventure Experiences",
    description:
      "Add excitement to your journey with thrilling outdoor adventures.",
    icon: Mountain,
  },
  {
    title: "Wildlife & Nature",
    description: "Explore lush forests, national parks, and diverse wildlife.",
    icon: Trees,
  },
  {
    title: "Coastal & Beaches",
    description:
      "Relax on golden beaches and discover Sri Lanka's beautiful coast.",
    icon: Umbrella,
  },
  {
    title: "Hill Country & Mountains",
    description:
      "Experience misty mountains, tea plantations, and scenic landscapes.",
    icon: Compass,
  },
];

export default function PopularActivities() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-12 lg:py-16"
      style={{ backgroundImage: `url(${sigiriya})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#102a36]/80" />

      {/* TEAL GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02878b]/30 via-transparent to-[#102a36]/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="text-white text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Explore & Experience
            </span>

            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-white">
              Popular <span className="text-[#47d7c8]">Activities</span>
            </h2>

            <p className="mt-4 text-white/75 text-sm md:text-base leading-relaxed max-w-2xl">
              Experience the very best of Sri Lanka with unforgettable
              adventures, cultural discoveries, wildlife encounters, and
              breathtaking landscapes.
            </p>
          </motion.div>

          {/* RIGHT CONTROLS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            {/* VIEW ALL */}
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#02878b] text-white text-sm font-semibold shadow-lg hover:bg-[#026f72] transition-all duration-300"
            >
              View All Experiences
              <ArrowRight size={16} />
            </Link>

            {/* LEFT ARROW */}
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous activities"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-[#02878b] hover:border-[#02878b] transition-all duration-300"
            >
              <ArrowLeft size={19} />
            </button>

            {/* RIGHT ARROW */}
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next activities"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-[#02878b] hover:border-[#02878b] transition-all duration-300"
            >
              <ArrowRight size={19} />
            </button>
          </motion.div>
        </div>

        {/* ================= ACTIVITIES SLIDER ================= */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[calc(25%-15px)] snap-start"
              >
                <Link
                  to="/experience"
                  className="group h-full min-h-[150px] flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 hover:bg-white hover:border-white transition-all duration-300"
                >
                  {/* ICON */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#02878b] text-white shadow-lg group-hover:bg-[#026f72] transition-colors duration-300">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  {/* CONTENT */}
                  <div className="mt-6">
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#102a36] transition-colors duration-300">
                      {activity.title}
                    </h3>

                    <div className="flex items-center gap-1 mt-2 text-sm text-white/60 group-hover:text-[#02878b] transition-colors duration-300">
                      {activity.description}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
