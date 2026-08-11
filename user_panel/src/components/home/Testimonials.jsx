import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { axiosInstance } from "../../lib/axiosInstance";

function Stars({ count }) {
  return (
    <div className="flex gap-1 text-[#0f2f1f] text-sm mt-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < count ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

function TestimonialCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);

  const shortText =
    item.text?.length > 180 ? item.text.slice(0, 180) + "..." : item.text;

  return (
    <div className="h-full min-h-90 bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Quote decoration */}
      <div className="text-green-500 text-5xl font-bold absolute top-3 right-4 opacity-20">
        ❝
      </div>

      <div className="w-12 h-12 rounded-full bg-[#0f2f1f] text-white flex items-center justify-center font-semibold mb-4">
        {item.author_name?.charAt(0).toUpperCase()}
      </div>

      <h3 className="font-semibold text-lg text-[#0f2f1f] mb-1">
        {item.author_name}
      </h3>

      <p className="text-gray-500 text-sm mb-1">{item.author_country}</p>

      <p className="text-xs text-gray-400 mb-2">
        {new Date(item.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <p className="text-gray-700 text-sm leading-relaxed">
        {expanded ? item.text : shortText}
      </p>

      {item.text?.length > 180 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#0f2f1f] font-medium text-sm mt-2 hover:underline"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

      <div className="mt-auto pt-4 flex text-yellow-500 text-sm">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < item.rating ? "★" : "☆"}</span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedReviews = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/reviews", {
        params: {
          is_approved: true,
          page: 1,
          limit: 10,
        },
      });

      console.log("REVIEWS RESPONSE:", res.data);

      const data = res.data?.data ?? res.data;

      setReviews(data?.items || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  // Don't show anything while loading
  if (loading) {
    return null;
  }

  // Don't show the section if there are no approved reviews
  if (!reviews.length) {
    return null;
  }

  return (
    <section className="bg-[#f0f8f5] py-16 lg:py-20">
      {/* SEO hidden content */}
      <p className="sr-only">
        Sri Lanka travel testimonials and reviews from international tourists
        who experienced Sri Lanka tour packages including Yala safari, Sigiriya
        Rock, Kandy cultural tours, Ella train journeys, and beach holidays in
        Mirissa and Bentota.
      </p>

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12 px-6">
        <p className="text-[#02878b] uppercase tracking-[0.3em] font-semibold text-sm mb-4">
          Traveler Reviews
        </p>

        <h2 className="text-2xl md:text-4xl font-extrabold text-[#102a36]">
          Real Experiences From Sri Lanka Travelers
        </h2>

        <p className="mt-5 text-[#4b6b73] text-sm leading-relaxed">
          Discover authentic reviews from travelers who explored Sri Lanka's
          wildlife, beaches, cultural heritage sites, and scenic landscapes with
          our curated tour packages.
        </p>
      </div>

      {/* Reviews */}
      <div className="px-6 md:px-16 lg:px-20">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={reviews.length > 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
