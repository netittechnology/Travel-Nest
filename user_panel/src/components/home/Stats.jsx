import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, MapPin, Star, ShieldCheck, Globe2, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "25K+",
    label: "Happy Travelers",
    description: "Travelers who explored Sri Lanka with us",
  },
  {
    icon: MapPin,
    value: "120+",
    label: "Destinations",
    description: "Beautiful places waiting to be discovered",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Customer Rating",
    description: "Loved and recommended by our travelers",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Trusted Service",
    description: "Reliable support throughout your journey",
  },
];

export default function Stats() {
  return (
    <section className="relative bg-white py-12 lg:py-16 overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#02878b]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#02878b]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div>
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Travel With Confidence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#102a36]">
            Making Every Journey
            <span className="text-[#02878b]"> Special</span>
          </h2>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#4b6b73] max-w-3xl">
            Thousands of travelers trust us to create memorable experiences
            across the beautiful island of Sri Lanka.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group relative bg-[#fafcfb] border border-gray-100 rounded-2xl p-5 md:p-7 text-center hover:bg-white hover:border-[#02878b]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* ICON */}
                <div className="mx-auto flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#02878b]/10 text-[#02878b] group-hover:bg-[#02878b] group-hover:text-white transition-all duration-300">
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                {/* NUMBER */}
                <h3 className="mt-4 text-2xl md:text-3xl font-bold text-[#102a36]">
                  {item.value}
                </h3>

                {/* LABEL */}
                <p className="mt-1 text-sm md:text-base font-semibold text-[#02878b]">
                  {item.label}
                </p>

                {/* DESCRIPTION */}
                <p className="mt-2 text-xs md:text-sm leading-relaxed text-[#4b6b73]">
                  {item.description}
                </p>

                {/* BOTTOM ACCENT */}
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#02878b] group-hover:w-12 -translate-x-1/2 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
