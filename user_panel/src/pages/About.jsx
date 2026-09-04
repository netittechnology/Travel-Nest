import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import mapImage from "../../src/assets/sri.webp";
import aboutHero from "../../src/assets/header/about-hero.webp";
import art from "../../src/assets/sigiriya-art.webp";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaShieldAlt,
  FaLeaf,
  FaStar,
  FaRoute,
  FaEye,
  FaBullseye,
  FaGlobeAsia,
  FaArrowRight,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import TripadvisorReviews from "../components/home/TripadvisorReviews";

export default function About() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      <Helmet>
        <title>About Us | Tour Nest</title>
        <meta
          name="description"
          content="Learn about Tour Nest, a trusted Sri Lanka travel company offering customized tours and travel experiences."
        />
        <link
          rel="canonical"
          href="https://tournestsrilanka.com/about"
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            className="w-full h-full object-cover"
            alt="About Tour Nest"
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
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Discover Sri Lanka
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            About Tour Nest
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Crafting meaningful journeys across Sri Lanka with authentic
            experiences, cultural depth, and unforgettable moments designed
            just for you.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-stretch">
          {/* TEXT */}
          <div className="flex flex-col justify-center">
            <p className="text-[#02878b] uppercase tracking-[0.35em] text-xs font-semibold">
              Who We Are
            </p>

            <h2 className="text-2xl md:text-4xl font-extrabold text-[#102a36] leading-tight mt-4">
              Designing Meaningful Journeys Through Sri Lanka
            </h2>

            <div className="mt-8 space-y-6 text-[#4b6b73] leading-relaxed text-justify">
              <p>
                At Tour Nest, we are dedicated to crafting
                unforgettable travel experiences that showcase the true beauty,
                culture, and diversity of Sri Lanka. Every journey is
                thoughtfully designed to go beyond sightseeing and create
                meaningful memories.
              </p>

              <p>
                We specialize in personalized travel planning, offering
                tailor-made itineraries that reflect each traveler’s interests
                - from cultural heritage tours and scenic landscapes to
                adventure escapes and luxury experiences across the island.
              </p>

              <p>
                With strong local expertise and trusted community partnerships,
                we ensure every journey is authentic, seamless, and enriched
                with genuine Sri Lankan hospitality and hidden gems that most
                travelers never discover.
              </p>

              <p>
                Our commitment extends to responsible and sustainable tourism,
                supporting local communities while preserving the natural
                beauty of Sri Lanka for future generations to explore and enjoy.
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex items-center justify-center relative">
            <div className="absolute"></div>

            <div className="relative">
              <img
                src={mapImage}
                alt="Sri Lanka Map"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION / MISSION / VALUES
      ===================================================== */}
      <section className="py-28 bg-[#102a36] text-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide">
              Our Purpose
            </h2>

            <p className="mt-5 text-white/70 max-w-2xl mx-auto">
              Guided by passion, we create meaningful journeys that connect
              people, culture, and nature across Sri Lanka.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* VISION */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-6">
                <FaEye />
              </div>

              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>

              <p className="text-white/70 leading-relaxed">
                To become Sri Lanka’s most trusted travel partner, inspiring
                travelers worldwide to experience the island’s beauty through
                authentic, meaningful, and transformative journeys.
              </p>
            </div>

            {/* MISSION */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-6">
                <FaBullseye />
              </div>

              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>

              <p className="text-white/70 leading-relaxed">
                To design personalized travel experiences that combine
                comfort, culture, and adventure while ensuring seamless
                service and lasting memories for every traveler.
              </p>
            </div>

            {/* VALUES */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-6">
                <FaGlobeAsia />
              </div>

              <h3 className="text-xl font-semibold mb-4">Our Values</h3>

              <p className="text-white/70 leading-relaxed">
                Authenticity, sustainability, and care define everything we
                do. We believe in responsible tourism that supports local
                communities and preserves Sri Lanka’s natural beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}
      <section className="py-28 bg-[#fafcfb] px-6">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102a36]">
              Why Choose Us
            </h2>

            <p className="mt-5 text-[#4b6b73] max-w-2xl mx-auto">
              We go beyond travel planning — delivering personalized,
              meaningful, and unforgettable experiences across Sri Lanka.
            </p>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* ITEM */}
            <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition rounded-2xl p-8 text-center">
              <div className="text-[#02878b] text-4xl flex justify-center mb-5">
                <FaMapMarkedAlt />
              </div>

              <h3 className="text-xl font-semibold text-[#102a36] mb-3">
                Tailor-Made Journeys
              </h3>

              <p className="text-[#4b6b73] leading-relaxed">
                Every itinerary is customized based on your interests, travel
                style, and pace — ensuring a truly personal experience.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition rounded-2xl p-8 text-center">
              <div className="text-[#02878b] text-4xl flex justify-center mb-5">
                <FaUsers />
              </div>

              <h3 className="text-xl font-semibold text-[#102a36] mb-3">
                Local Expertise
              </h3>

              <p className="text-[#4b6b73] leading-relaxed">
                Our deep local knowledge helps you explore hidden gems and
                authentic cultural experiences beyond typical tourist routes.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition rounded-2xl p-8 text-center">
              <div className="text-[#02878b] text-4xl flex justify-center mb-5">
                <FaShieldAlt />
              </div>

              <h3 className="text-xl font-semibold text-[#102a36] mb-3">
                Trusted & Safe Travel
              </h3>

              <p className="text-[#4b6b73] leading-relaxed">
                We ensure secure, well-planned, and reliable travel experiences
                from start to finish with complete peace of mind.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition rounded-2xl p-8 text-center">
              <div className="text-[#02878b] text-4xl flex justify-center mb-5">
                <FaLeaf />
              </div>

              <h3 className="text-xl font-semibold text-[#102a36] mb-3">
                Sustainable Travel
              </h3>

              <p className="text-[#4b6b73] leading-relaxed">
                We promote eco-friendly tourism that supports local communities
                and protects Sri Lanka’s natural beauty.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition rounded-2xl p-8 text-center">
              <div className="text-[#02878b] text-4xl flex justify-center mb-5">
                <FaStar />
              </div>

              <h3 className="text-xl font-semibold text-[#102a36] mb-3">
                Premium Experiences
              </h3>

              <p className="text-[#4b6b73] leading-relaxed">
                Carefully selected stays, experiences, and routes designed to
                deliver comfort, elegance, and unforgettable moments.
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition rounded-2xl p-8 text-center">
              <div className="text-[#02878b] text-4xl flex justify-center mb-5">
                <FaRoute />
              </div>

              <h3 className="text-xl font-semibold text-[#102a36] mb-3">
                Seamless Planning
              </h3>

              <p className="text-[#4b6b73] leading-relaxed">
                From arrival to departure, we handle every detail to ensure a
                smooth, stress-free travel experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT SECTION
      ===================================================== */}
      <section className="py-28 bg-[#102a36] text-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide">
            Trusted Travel Experience
          </h2>

          <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
            Over the years, we have built meaningful journeys for travelers
            from around the world, delivering unforgettable Sri Lankan
            experiences with trust and care.
          </p>

          {/* STATS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-4">
                <FaUsers />
              </div>

              <h3 className="text-3xl font-extrabold">500+</h3>
              <p className="text-white/70 mt-2">Happy Travelers</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-4">
                <FaMapMarkedAlt />
              </div>

              <h3 className="text-3xl font-extrabold">120+</h3>
              <p className="text-white/70 mt-2">Custom Itineraries</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-4">
                <FaGlobeAsia />
              </div>

              <h3 className="text-3xl font-extrabold">25+</h3>
              <p className="text-white/70 mt-2">Countries Served</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
              <div className="text-[#7dd3d3] text-4xl flex justify-center mb-4">
                <FaStar />
              </div>

              <h3 className="text-3xl font-extrabold">4.9/5</h3>
              <p className="text-white/70 mt-2">Customer Rating</p>
            </div>
          </div>

          {/* BOTTOM TEXT */}
          <p className="mt-16 text-white/50 italic max-w-2xl mx-auto">
            “Every journey we design is built on trust, passion, and a deep
            love for Sri Lanka.”
          </p>
        </div>
      </section>

      <TripadvisorReviews />

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative bg-white">
        <div className="flex flex-col lg:flex-row items-center relative">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 md:px-20 py-20 space-y-6 z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102a36] leading-tight">
              Begin Your Journey
              <span className="text-[#02878b]"> With Us</span>
            </h2>

            <p className="text-[#4b6b73] text-lg max-w-xl leading-relaxed">
              Whether you seek luxury, adventure, or cultural exploration, we
              design journeys that reflect your travel dreams — with elegance,
              authenticity, and precision.
            </p>

            <a
              href="/custom-tours"
              className="bg-[#02878b] hover:bg-[#026f72] text-white uppercase px-10 py-4 rounded-full font-semibold flex items-center gap-3 text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Plan Your Trip
              <FaArrowRight />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={art}
              alt="Sri Lanka Travel"
              className="w-full h-75 md:h-125 lg:h-162.5 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
