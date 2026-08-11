import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaCar,
  FaArrowRight,
  FaMapMarkedAlt,
  FaPlane,
} from "react-icons/fa";
import TailorMadeForm from "../components/tailor-made-tours/CustomizeTourForm";
import art from "../../src/assets/sigiriya-art.webp";
import Hero from "../../src/assets/header/customtour-header.webp";
import Testimonials from "../../src/components/home/Testimonials";
import TripadvisorReviews from "../components/home/TripadvisorReviews";

export default function TailorMadeTours() {
  const [showText, setShowText] = useState(false);

  /* contact */
  const tourData = {
    description:
      "Create your perfect Sri Lanka journey with complete flexibility, comfort, and personalized experiences designed just for you.",
    phone: "+94 77 123 4567",
    whatsapp: "+94 77 123 4567",
  };

  // Hero animation
  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full bg-[#fafcfb]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={Hero} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Customize Tours
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Your Journey, Your Way
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl mx-auto text-lg">
            Experience Sri Lanka with tailor-made tours designed around your
            preferences, budget, and travel dreams — crafted just for you.
          </p>
        </motion.div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="text-center pt-20 pb-8 px-6 max-w-4xl mx-auto">
        <div className="items-center">
          <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
            Tailor-Made Travel
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-[#102a36]">
          Design Your
          <span className="text-[#02878b]"> Perfect Journey</span>
        </h2>

        <p className="text-[#4b6b73] mt-3 max-w-2xl mx-auto leading-relaxed">
          {tourData.description}
        </p>
      </section>

      {/* ================= FORM + CONTACT ================= */}
      <section className="max-w-7xl mx-auto pb-16 px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* FORM */}
        <div className="lg:col-span-1">
          <TailorMadeForm />
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-10 h-full">
          {/* TITLE */}
          <div className="text-center lg:text-left">
            <div className="items-center">
              <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
                Let's Plan Together
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-bold text-[#172d35] leading-snug">
              The Best Call You’ll Make Today
            </h3>
          </div>

          {/* CONTACT CARDS */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* WHATSAPP */}
            <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl px-5 py-4 border border-[#e4eeee] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-[#02878b]/10 p-3 rounded-full">
                <FaWhatsapp className="text-[#02878b] text-xl" />
              </div>

              <div>
                <p className="text-sm text-[#4b6b73]">WhatsApp</p>

                <p className="font-semibold text-[#102a36]">
                  <a
                    href={`https://wa.me/${tourData?.whatsapp.replace(
                      /\D/g,
                      ""
                    )}?text=Hello%20Travel%20Nest!%20I%E2%80%99m%20interested%20in%20your%20Sri%20Lanka%20tour%20packages.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#02878b] transition"
                  >
                    {tourData?.whatsapp}
                  </a>
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl px-5 py-4 border border-[#e4eeee] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-[#d9a441]/10 p-3 rounded-full">
                <FaPhoneAlt className="text-[#d9a441] text-xl" />
              </div>

              <div>
                <p className="text-sm text-[#4b6b73]">Call Us</p>

                <p className="font-semibold text-[#102a36]">
                  <a
                    href={`tel:${tourData?.phone}`}
                    className="hover:text-[#d9a441] transition"
                  >
                    {tourData?.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-[#4b6b73] text-center lg:text-left text-base md:text-lg leading-relaxed max-w-2xl">
            We are here to support you 24 hours a day. If you’re travelling and
            need emergency assistance, our team is always ready to help you
            instantly.
          </p>

          {/* HOW IT WORKS */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-4xl font-bold text-[#172d35]">
                How Our Service Works?
              </h3>

              <p className="mt-3 text-[#4b6b73]">
                A simple and personalized way to plan your Sri Lankan adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* STEP 1 */}
              <div className="group flex flex-col items-center text-center bg-white rounded-2xl border border-[#e4eeee] shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#02878b]/10 flex items-center justify-center mb-4 group-hover:bg-[#02878b] transition-colors duration-300">
                  <FaMapMarkedAlt className="text-[#02878b] group-hover:text-white text-3xl transition-colors" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#02878b] mb-2">
                  Step 01
                </span>

                <p className="text-[#4b6b73]">
                  Choose destinations & customize your itinerary
                </p>
              </div>

              {/* STEP 2 */}
              <div className="group flex flex-col items-center text-center bg-white rounded-2xl border border-[#e4eeee] shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#d9a441]/10 flex items-center justify-center mb-4 group-hover:bg-[#d9a441] transition-colors duration-300">
                  <FaPlane className="text-[#d9a441] group-hover:text-white text-3xl transition-colors" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#d9a441] mb-2">
                  Step 02
                </span>

                <p className="text-[#4b6b73]">
                  We plan flights, hotels & experiences for you
                </p>
              </div>

              {/* STEP 3 */}
              <div className="group flex flex-col items-center text-center bg-white rounded-2xl border border-[#e4eeee] shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#02878b]/10 flex items-center justify-center mb-4 group-hover:bg-[#02878b] transition-colors duration-300">
                  <FaCar className="text-[#02878b] group-hover:text-white text-3xl transition-colors" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#02878b] mb-2">
                  Step 03
                </span>

                <p className="text-[#4b6b73]">
                  Enjoy a smooth private tour with 24/7 support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <TripadvisorReviews />
      <Testimonials />

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-[#fafcfb]">
        <div className="flex flex-col lg:flex-row items-center">
          {/* CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 md:px-16 lg:px-20 py-16 md:py-20">
            <div>
              <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
                Start Your Adventure
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#102a36]">
              Begin Your Journey
              <span className="text-[#02878b]"> With Us</span>
            </h2>

            <p className="mt-2 text-sm md:text-base leading-relaxed text-[#4b6b73] max-w-3xl mb-6">
              Whether you seek luxury, adventure, or cultural exploration, we
              design journeys that reflect your travel dreams — with elegance,
              authenticity, and precision.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#02878b] hover:bg-[#026f72] text-white uppercase px-10 py-4 rounded-full font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Plan Your Trip
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* IMAGE */}
          <div className="w-full lg:w-1/2">
            <img
              src={art}
              alt="Sri Lanka Travel"
              className="w-full h-[300px] md:h-[500px] lg:h-[650px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
