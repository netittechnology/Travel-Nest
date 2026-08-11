import React from "react";
import heroVideo from "../../assets/video.mp4";
import { useNavigate } from "react-router-dom";

export default function PlanTripCTA() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-[85vh] md:h-screen overflow-hidden"
      aria-labelledby="plan-trip-title"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/stats.webp"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5">
        <span className="text-white text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
          Custom Sri Lanka Travel Planning
        </span>

        <h2
          id="plan-trip-title"
          className="text-white text-2xl sm:text-4xl md:text-6xl font-extrabold mb-8"
        >
          Plan Your Sri Lanka Tour Experience
        </h2>
        <p className="sr-only">
          Plan Sri Lanka tours including Sigiriya, Kandy, Ella, Yala safari,
          Mirissa beaches, Bentota resorts, cultural heritage tours, and
          adventure travel experiences with custom itineraries and private tour
          packages.
        </p>

        <p className="text-gray-200 max-w-2xl text-sm md:text-lg mb-10">
          Design your perfect Sri Lanka holiday with customized itineraries,
          private chauffeur tours, cultural explorations, wildlife safaris, and
          beach getaways tailored to your travel style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(`/custom-tours`)}
            className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm md:text-lg shadow-lg hover:bg-gray-200 transition"
            aria-label="Plan custom Sri Lanka tour package"
          >
            Plan Sri Lanka Trip
          </button>

          <button
            onClick={() => navigate(`/itineraries`)}
            className="border border-white text-white px-8 py-3 rounded-full font-medium text-sm md:text-lg hover:bg-white hover:text-black transition"
            aria-label="Explore Sri Lanka tour itineraries"
          >
            View Sri Lanka Tours
          </button>
        </div>
      </div>
    </section>
  );
}
