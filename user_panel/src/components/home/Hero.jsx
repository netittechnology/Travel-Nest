import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Headphones,
  X,
} from "lucide-react";
import hero from "../../assets/header/home-hero.webp";
import heroVideo from "../../assets/video.mp4";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  const whyChooseUs = [
    {
      icon: Sparkles,
      title: "Authentic Experiences",
      description: "Discover the real Sri Lanka firsthand.",
    },
    {
      icon: CalendarDays,
      title: "Tailor-Made Tours",
      description: "Journeys designed around you.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Service",
      description: "Reliable support throughout.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here whenever you need us.",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* ================= HERO ================= */}
      <div  
  className="relative min-h-screen bg-cover" 
  style={{  
    backgroundImage: `url(${hero})`, 
    backgroundPosition: "center 80%", 
  }}  
>
        {/* LEFT CONTENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-transparent" />

        {/* TOP TEAL OVERLAY */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-[#02878b]/40 via-[#02878b]/10 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* ================= LEFT ================= */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              {/* SMALL LABEL */}
              <div>
                <span className="text-[#02878b] text-3xl md:text-3xl font-normal font-allura drop-shadow-lg">
                  The Part of the Indian Ocean
                </span>
              </div>

              {/* HEADING */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-#172d35 drop-shadow-2xl">
                Discover
                <span className="block text-#172d35">Sri Lanka</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="max-w-xl mt-6 text-base md:text-lg leading-relaxed text-#172d35 drop-shadow-lg">
                Explore breathtaking landscapes, rich culture, golden beaches,
                and unforgettable experiences with journeys designed to make
                every moment in Sri Lanka special.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap items-center gap-4 mt-9">
                <Link
                  to="/destinations"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#02878b] text-white font-semibold shadow-lg shadow-black/20 hover:bg-[#026f72] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore Tours
                  <ArrowRight size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm text-white font-semibold shadow-lg hover:bg-white hover:text-[#02878b] transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#02878b] text-white">
                    <Play size={14} fill="currentColor" />
                  </span>
                  Watch Video
                </button>
              </div>
            </motion.div>

            {/* ================= RIGHT ================= */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hidden lg:flex justify-end"
            >
              <div className="max-w-md w-full">
                <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl">
                  {/* ICON */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#02878b] text-white mb-6">
                    <Sparkles size={27} />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                    Travel Your Way
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-white">
                    Tailor-Made Tours
                  </h2>

                  <p className="mt-4 text-white/85 leading-relaxed">
                    Your journey should be as unique as you are. Build your
                    perfect Sri Lankan adventure with a personalized itinerary
                    created around the places, experiences, and moments you
                    love.
                  </p>

                  <Link
                    to="/custom-tours"
                    className="mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-white text-[#102a36] font-semibold hover:bg-[#02878b] hover:text-white transition-all duration-300"
                  >
                    <CalendarDays size={18} />
                    Create Your Journey
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US BAR ================= */}
      <div className="relative z-20 -mt-10 px-6 pb-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group flex items-center gap-4 p-5 md:p-6 hover:bg-[#fafcfb] transition-colors duration-300"
                >
                  {/* ICON */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#02878b]/10 flex items-center justify-center text-[#02878b] group-hover:bg-[#02878b] group-hover:text-white transition-all duration-300">
                    <Icon size={21} />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-[#102a36] leading-tight">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs md:text-sm text-[#4b6b73] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white text-xl hover:bg-[#02878b] transition-colors"
              aria-label="Close video"
            >
              <X size={22} />
            </button>

            {/* VIDEO */}
            <video
              src={heroVideo}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
