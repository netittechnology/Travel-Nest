import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Hero from "../assets/header/terms-hero.webp";
import { Helmet } from "react-helmet-async";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
  FiCreditCard,
  FiUser,
  FiShield,
  FiGlobe,
  FiRefreshCw,
  FiXCircle,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function TermsConditions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  const sections = [
    {
      icon: <FiFileText />,
      title: "Introduction",
      text: "By using Tour Nest services, you agree to comply with these Terms & Conditions. Please read them carefully before booking any tour or service.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Booking Confirmation",
      text: "All bookings are confirmed only after receiving a confirmation email or WhatsApp message from our team. Availability is subject to change.",
    },
    {
      icon: <FiCreditCard />,
      title: "Payments",
      list: [
        "Full or partial payment may be required to confirm booking",
        "Payments must be made through approved methods only",
        "Prices may change without prior notice",
      ],
    },
    {
      icon: <FiXCircle />,
      title: "Cancellation Policy",
      list: [
        "Cancellations must be requested before tour start date",
        "Refunds depend on cancellation timing and service provider rules",
        "No refund for last-minute cancellations or no-shows",
      ],
    },
    {
      icon: <FiUser />,
      title: "User Responsibilities",
      list: [
        "Provide accurate personal and travel information",
        "Follow safety instructions during tours",
        "Respect local culture and environment",
      ],
    },
    {
      icon: <FiShield />,
      title: "Liability",
      text: "Tour Nest is not responsible for personal loss, injury, delays, or damages caused during travel due to unforeseen circumstances.",
    },
    {
      icon: <FiGlobe />,
      title: "Third-Party Services",
      text: "We may use third-party providers (transport, hotels, safari operators). Their own terms and conditions may also apply.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Changes to Tours",
      text: "We reserve the right to modify itineraries, schedules, or pricing due to weather, safety, or operational reasons.",
    },
    {
      icon: <FiAlertTriangle />,
      title: "Important Notice",
      text: "Travel involves natural risks. Customers are advised to follow all safety instructions and ensure they are physically fit for selected activities.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>Terms & Conditions | Tour Nest</title>
      </Helmet>

      {/* HERO */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={Hero} className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <span className="text-green-400 uppercase tracking-widest text-sm font-semibold">
            Legal Information
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4">
            Terms & Conditions
          </h1>

          <p className="text-white/85 mt-6 text-lg">
            Please read these terms carefully before using our services or
            booking any tour.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div className="py-16 px-5 sm:px-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3 text-green-600 text-xl">
              {sec.icon}
              <h2 className="text-xl font-bold text-gray-800">{sec.title}</h2>
            </div>

            {sec.text && (
              <p className="text-gray-600 leading-relaxed">{sec.text}</p>
            )}

            {sec.list && (
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {sec.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* CONTACT SECTION */}
        <div className="md:col-span-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h3>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <FiMail className="text-green-600 text-2xl" />
              <p className="font-medium text-gray-700">Email</p>
              <p className="text-gray-600">info@tournest.com</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FiPhone className="text-green-600 text-2xl" />
              <p className="font-medium text-gray-700">Phone</p>
              <p className="text-gray-600">+94 77 123 4567</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FiMapPin className="text-green-600 text-2xl" />
              <p className="font-medium text-gray-700">Location</p>
              <p className="text-gray-600">Colombo 10</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="md:col-span-2 text-center text-sm text-gray-400 pt-6">
          © {new Date().getFullYear()} Tour Nest. All rights reserved.
        </div>
      </div>
    </div>
  );
}