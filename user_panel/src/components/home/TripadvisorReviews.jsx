import React from "react";
import { Star, ExternalLink, Quote, CheckCircle } from "lucide-react";
import sigiriyaImg from "../../assets/header/activity-hero.webp";

const reviews = [
  {
    name: "Reshiwaran Jegatheswaran",
    country: "Malaysia",
    date: "February 2026",
    review:
      "The Tour Nest team was extremely friendly, helpful, and knowledgeable. Everything was well-organized, making our Sri Lankan experience smooth and enjoyable.",
  },
  {
    name: "Jane M",
    country: "United Kingdom",
    date: "February 2026",
    review:
      "A fabulous two-week journey through Sri Lanka. The team was helpful, knowledgeable, flexible, and made every part of the trip comfortable and memorable.",
  },
  {
    name: "mpjh",
    country: "United Kingdom",
    date: "December 2025",
    review:
      "The support throughout our journey was incredible. The team kept us informed, helped us stay safe, and made sure we were comfortable throughout the trip.",
  },
  {
    name: "Marianne K",
    country: "Germany",
    date: "November 2025",
    review:
      "A wonderful Sri Lanka experience. We learned so much about the country's culture and history while enjoying a comfortable and well-planned journey.",
  },
];

export default function TripadvisorReviews() {
  return (
    <section className="bg-[#f0f8f5] py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div>
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Verified Traveler Reviews
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#102a36]">
            Loved by
            <span className="text-[#02878b]"> Travelers</span>
          </h2>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-[#4b6b73] max-w-3xl">
            Discover what travelers have to say about their experiences with
            Tour Nest. From cultural adventures to scenic escapes, we're proud
            to create journeys worth remembering.
          </p>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-[#02878b]/10 overflow-hidden">
          {/* ================= TOP INFO ================= */}
          <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-14 items-center border-b border-gray-100">
            {/* LEFT */}
            <div>
              {/* Tripadvisor Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#f0f8f5] border border-[#02878b]/10 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#02878b" color="#02878b" />
                  ))}
                </div>

                <span className="text-sm font-semibold text-[#102a36]">
                  Tripadvisor Travelers
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-[#102a36] mb-4">
                Tour Nest
              </h3>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={23} fill="#02878b" color="#02878b" />
                  ))}
                </div>

                <div>
                  <div className="font-bold text-lg text-[#102a36]">
                    4.9 / 5 Excellent
                  </div>

                  <p className="text-sm text-[#4b6b73]">
                    Highly rated by our travelers
                  </p>
                </div>
              </div>

              <p className="text-[#4b6b73] leading-relaxed mb-8">
                At Tour Nest, we believe every journey should feel personal.
                Our carefully planned Sri Lanka tours combine authentic
                experiences, beautiful destinations, reliable service, and
                unforgettable moments.
              </p>

              {/* Trust Points */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-[#102a36]">
                  <CheckCircle size={18} className="text-[#02878b]" />
                  Personalized journeys
                </div>

                <div className="flex items-center gap-2 text-sm text-[#102a36]">
                  <CheckCircle size={18} className="text-[#02878b]" />
                  Local experiences
                </div>

                <div className="flex items-center gap-2 text-sm text-[#102a36]">
                  <CheckCircle size={18} className="text-[#02878b]" />
                  Trusted service
                </div>

                <div className="flex items-center gap-2 text-sm text-[#102a36]">
                  <CheckCircle size={18} className="text-[#02878b]" />
                  Dedicated support
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#02878b] hover:bg-[#026f72] text-white font-semibold shadow-lg shadow-[#02878b]/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  View All Reviews
                  <ExternalLink size={17} />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#02878b] text-[#02878b] hover:bg-[#02878b] hover:text-white font-semibold transition-all duration-300"
                >
                  Write a Review
                </a>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <img
                src={sigiriyaImg}
                alt="Beautiful Sigiriya landscape in Sri Lanka"
                className="rounded-3xl shadow-lg object-cover w-full h-[350px]"
              />

              {/* Floating Rating Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#02878b] text-white">
                    <Star size={21} fill="currentColor" />
                  </div>

                  <div>
                    <p className="font-bold text-[#102a36]">
                      Exceptional Experiences
                    </p>

                    <p className="text-sm text-[#4b6b73]">
                      Trusted by travelers exploring Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= REVIEWS ================= */}
          <div className="p-8 md:p-10 bg-[#fafcfb]">
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#02878b]">
                  Traveler Stories
                </p>

                <h3 className="text-2xl font-bold text-[#102a36] mt-1">
                  What Our Travelers Say
                </h3>
              </div>

              <Quote size={38} className="hidden sm:block text-[#02878b]/20" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={17} fill="#02878b" color="#02878b" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-[#4b6b73] leading-relaxed text-sm mb-6">
                    "{item.review}"
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#02878b] text-white font-bold flex items-center justify-center">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="font-bold text-[#102a36]">{item.name}</h4>

                      <p className="text-sm text-[#4b6b73]">
                        {item.country} • {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
