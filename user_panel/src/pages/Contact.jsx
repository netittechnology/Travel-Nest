import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import art from "../../src/assets/sigiriya-art.webp";
import Hero from "../../src/assets/header/contact-hero.webp";
import Testimonials from "../../src/components/home/Testimonials";
import { Helmet } from "react-helmet-async";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaArrowRight,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa";
import TripadvisorReviews from "../components/home/TripadvisorReviews";

export default function Contact() {
  const [showText, setShowText] = useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleWhatsApp = (e) => {
    e.preventDefault();

    const phoneNumber = "94707890663";

    const text = `
Hello Travel Nest 🌴

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      <Helmet>
        <title>Contact Us | Travel Nest</title>

        <meta
          name="description"
          content="Get in touch with Travel Nest for Sri Lanka tour bookings and travel inquiries."
        />

        <link rel="canonical" href="https://travelnest.com/contact" />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Hero}
            className="w-full h-full object-cover"
            alt="Contact Travel Nest"
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
            Get In Touch
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Contact Travel Nest
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            We’re here to help you plan your perfect Sri Lanka journey. Reach
            out to us for personalized travel assistance, inquiries, or custom
            itinerary planning.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="text-center pt-20 pb-4 px-6 max-w-4xl mx-auto">
        <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
          Let's Connect
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-[#102a36] mt-1">
          Let's Paln Your
          <span className="text-[#02878b]"> Dream Journey</span>
        </h2>

        <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
          We’re here to help you explore Sri Lanka with comfort, authenticity,
          and unforgettable experiences. Reach out anytime - our team is ready
          to assist you.
        </p>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}
      <section className="mt-10 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
        {/* =================================================
            LEFT SIDE
        ================================================= */}
        <div className="grid sm:grid-cols-2 gap-6 h-full">
          {/* PHONE */}
          <a
            href="sms:+94759990663?body=Hello%20Travel%20Nest,%20I%20would%20like%20to%20know%20more%20about%20your%20tour%20packages.%20Please%20share%20the%20details.%20Thank%20you."
            className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center h-full"
          >
            <FaPhoneAlt className="text-[#02878b] text-3xl mx-auto mb-4" />

            <h3 className="font-semibold text-[#102a36] text-lg mb-2">Phone</h3>

            <p className="text-[#4b6b73]">+94 75 999 0663</p>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/94707890663?text=Hello%20Travel%20Nest,%20I%20would%20like%20to%20know%20more%20about%20your%20tour%20packages.%20Please%20share%20the%20details.%20Thank%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center h-full"
          >
            <FaWhatsapp className="text-[#02878b] text-3xl mx-auto mb-4" />

            <h3 className="font-semibold text-[#102a36] text-lg mb-2">
              WhatsApp
            </h3>

            <p className="text-[#4b6b73]">+94 70 789 0663</p>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:info@travelnest.com?subject=Tour%20Inquiry&body=Hello%20Travel%20Nest,%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about%20your%20Sri%20Lanka%20tour%20packages.%20Please%20share%20the%20details.%0D%0A%0D%0AThank%20you."
            className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center h-full"
          >
            <FaEnvelope className="text-[#02878b] text-3xl mx-auto mb-4" />

            <h3 className="font-semibold text-[#102a36] text-lg mb-2">Email</h3>

            <p className="text-[#4b6b73]">info@travelnest.com</p>
          </a>

          {/* ADDRESS */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Colombo+10"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center h-full"
          >
            <FaMapMarkerAlt className="text-[#02878b] text-3xl mx-auto mb-4" />

            <h3 className="font-semibold text-[#102a36] text-lg mb-2">
              Address
            </h3>

            <p className="text-[#4b6b73]">Colombo 10</p>
          </a>

          {/* SOCIAL MEDIA */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center sm:col-span-2">
            <h3 className="font-semibold text-[#102a36] text-xl mb-5">
              Follow Us
            </h3>

            <p className="text-[#4b6b73] mb-6 max-w-xl mx-auto">
              Stay connected with Travel Nest for travel inspiration, Sri
              Lanka experiences, tour updates, and traveler stories.
            </p>

            <div className="flex items-center justify-center gap-5">
              {/* INSTAGRAM */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-[#fafcfb] border border-gray-200 flex items-center justify-center text-[#02878b] hover:bg-[#02878b] hover:text-white hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <FaInstagram className="text-2xl" />
              </a>

              {/* FACEBOOK */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-[#fafcfb] border border-gray-200 flex items-center justify-center text-[#02878b] hover:bg-[#02878b] hover:text-white hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <FaFacebookF className="text-2xl" />
              </a>

              {/* TIKTOK */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-[#fafcfb] border border-gray-200 flex items-center justify-center text-[#02878b] hover:bg-[#02878b] hover:text-white hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <FaTiktok className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE - CONTACT FORM
        ================================================= */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col justify-center">
          <p className="text-[#02878b] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Send An Inquiry
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#102a36] mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleWhatsApp} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-[#102a36] font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-200 bg-[#fafcfb] p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02878b] focus:border-[#02878b] transition"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[#102a36] font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-gray-200 bg-[#fafcfb] p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02878b] focus:border-[#02878b] transition"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-[#102a36] font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full border border-gray-200 bg-[#fafcfb] p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02878b] focus:border-[#02878b] transition"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-[#102a36] font-semibold mb-2">
                Your Message
              </label>

              <textarea
                rows={5}
                placeholder="Tell us about your dream Sri Lanka journey..."
                className="w-full border border-gray-200 bg-[#fafcfb] p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02878b] focus:border-[#02878b] transition resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#02878b] hover:bg-[#026f72] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* =====================================================
          MAP
      ===================================================== */}
      <section className="bg-[#fafcfb] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center pb-10 max-w-4xl mx-auto">
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Visit Us
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36] mt-1">
              Find Us On
              <span className="text-[#02878b]"> the Map</span>
            </h2>

            <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
              Visit our office in Colombo, Sri Lanka. We are always ready to
              welcome you and help you plan your perfect journey.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
              title="Travel Nest Location"
              src="https://www.google.com/maps?q=Colombo%2010%20Sri%20Lanka&output=embed"
              width="100%"
              height="450"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}
      <TripadvisorReviews />

      <Testimonials />

      {/* =====================================================
          CTA
      ===================================================== */}
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
              href="/custom-tours"
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
