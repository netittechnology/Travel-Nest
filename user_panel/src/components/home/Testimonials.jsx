import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star, Quote, CheckCircle } from "lucide-react";

import "swiper/css";
import { axiosInstance } from "../../lib/axiosInstance";

/* =========================
   STAR RATING
========================= */
function Stars({ count = 5, size = 16 }) {
  const rating = Math.max(0, Math.min(5, Number(count) || 0));

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < Math.round(rating) ? "#0f8b8d" : "transparent"}
          color={index < Math.round(rating) ? "#0f8b8d" : "#c7d6d7"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

/* =========================
   TESTIMONIAL CARD
========================= */
function TestimonialCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const reviewText = item?.text?.trim() || "A wonderful travel experience.";

  const isLongReview = reviewText.length > 180;

  const shortText = isLongReview
    ? `${reviewText.slice(0, 180)}...`
    : reviewText;

  const formattedDate = item?.created_at
    ? new Date(item.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const authorName = item?.author_name?.trim() || "Traveler";
  const authorCountry = item?.author_country?.trim() || "Sri Lanka";
  const rating = Math.max(0, Math.min(5, Number(item?.rating) || 5));

  const displayRating = Number.isInteger(rating)
    ? rating.toString()
    : rating.toFixed(1);

  return (
    <article className="group flex h-[390px] flex-col rounded-3xl border border-[#0f8b8d]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-7">
      {/* =========================
          TOP
      ========================= */}
      <div className="flex items-start justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0f8b8d]/10 bg-[#f1f8f7] px-3 py-1.5">
          <Stars count={rating} size={14} />

          <span className="text-xs font-bold text-[#173b45]">
            {displayRating}
          </span>
        </div>

        <Quote
          size={36}
          strokeWidth={1.4}
          className="text-[#0f8b8d]/10 transition-colors duration-300 group-hover:text-[#0f8b8d]/20"
        />
      </div>

      {/* =========================
          REVIEWER
      ========================= */}
      <div className="mt-6 flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f8b8d] text-lg font-bold text-white shadow-md shadow-[#0f8b8d]/20">
          {authorName.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-[#173b45]">
            {authorName}
          </h3>

          <p className="mt-0.5 text-sm text-[#668087]">{authorCountry}</p>
        </div>
      </div>

      {/* =========================
          REVIEW
      ========================= */}
      <div className="mt-5 flex-1 overflow-hidden">
        <p className="text-sm leading-7 text-[#526b72] md:text-[15px]">
          “{expanded ? reviewText : shortText}”
        </p>

        {isLongReview && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-sm font-semibold text-[#0f8b8d] transition-colors hover:text-[#086e70]"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* =========================
          FOOTER
      ========================= */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-[#71858a]">{formattedDate}</span>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f8b8d]">
          <CheckCircle size={14} strokeWidth={2.2} />
          Verified Traveler
        </div>
      </div>
    </article>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedReviews = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/reviews", {
        params: {
          is_approved: true,
          page: 1,
          limit: 10,
        },
      });

      console.log("REVIEWS RESPONSE:", response.data);

      const data = response.data?.data ?? response.data;

      const items = Array.isArray(data) ? data : data?.items || [];

      setReviews(items);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  /* =========================
     LOADING / EMPTY STATE
  ========================= */
  if (loading || !reviews.length) {
    return null;
  }

  /* =========================
     AVERAGE RATING
  ========================= */
  const averageRating =
    reviews.reduce((sum, item) => sum + (Number(item?.rating) || 5), 0) /
    reviews.length;

  const roundedAverage = Math.round(averageRating);

  return (
    <section className="bg-[#f4f9f8] py-8 lg:py-12">
      {/* =========================
          SEO CONTENT
      ========================= */}
      <p className="sr-only">
        Sri Lanka travel testimonials and reviews from international tourists
        who experienced Sri Lanka tour packages including Yala safari, Sigiriya
        Rock, Kandy cultural tours, Ella train journeys, and beach holidays in
        Mirissa and Bentota.
      </p>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="font-allura text-2xl font-normal text-[#0f8b8d] md:text-3xl">
            Verified Traveler Reviews
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#173b45] md:text-5xl">
            Loved by <span className="text-[#0f8b8d]">Travelers</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#60777d] md:text-base">
            Discover authentic experiences shared by travelers who explored Sri
            Lanka with Travel Nest. From cultural adventures to scenic escapes,
            every journey is designed to be memorable.
          </p>
        </div>

        {/* =========================
            MAIN CONTAINER
        ========================= */}
        <div className="overflow-hidden rounded-[2rem] border border-[#0f8b8d]/10 bg-white shadow-lg">
          {/* =========================
              RATING SUMMARY
          ========================= */}
          <div className="border-b border-gray-100 p-7 md:p-10 lg:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              {/* Rating */}
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#0f8b8d] text-white shadow-lg shadow-[#0f8b8d]/20">
                  <span className="text-3xl font-extrabold leading-none">
                    {averageRating.toFixed(1)}
                  </span>

                  <span className="mt-1 text-[10px] uppercase tracking-wide opacity-90">
                    out of 5
                  </span>
                </div>

                <div>
                  <Stars count={roundedAverage} size={20} />

                  <h3 className="mt-2 text-lg font-bold text-[#173b45] md:text-xl">
                    Excellent Experiences
                  </h3>

                  <p className="mt-1 text-sm text-[#687d82]">
                    Based on {reviews.length} verified traveler
                    {reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Trust Points */}
              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-[#38565e]">
                  <CheckCircle size={17} className="shrink-0 text-[#0f8b8d]" />
                  Authentic experiences
                </div>

                <div className="flex items-center gap-2 text-sm text-[#38565e]">
                  <CheckCircle size={17} className="shrink-0 text-[#0f8b8d]" />
                  Trusted service
                </div>

                <div className="flex items-center gap-2 text-sm text-[#38565e]">
                  <CheckCircle size={17} className="shrink-0 text-[#0f8b8d]" />
                  Personalized journeys
                </div>

                <div className="flex items-center gap-2 text-sm text-[#38565e]">
                  <CheckCircle size={17} className="shrink-0 text-[#0f8b8d]" />
                  Dedicated support
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              REVIEW SECTION HEADER
          ========================= */}
          <div className="bg-[#f9fcfb] px-6 pb-5 pt-8 md:px-10 lg:px-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f8b8d]">
                  Traveler Stories
                </p>

                <h3 className="mt-1 text-2xl font-bold text-[#173b45] md:text-3xl">
                  What Our Travelers Say
                </h3>
              </div>

              <Quote
                size={42}
                strokeWidth={1.3}
                className="hidden text-[#0f8b8d]/10 sm:block"
              />
            </div>
          </div>

          {/* =========================
              SWIPER
          ========================= */}
          <div className="bg-[#f9fcfb] px-5 pb-10 sm:px-6 md:px-10 lg:px-12">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={18}
              loop={reviews.length > 3}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 22 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {reviews.map((item) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <TestimonialCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
