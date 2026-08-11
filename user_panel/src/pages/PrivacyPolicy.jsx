import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Hero from "../assets/header/privacy-hero.webp";
import { Helmet } from "react-helmet-async";
import {
  FiShield,
  FiDatabase,
  FiEye,
  FiLock,
  FiGlobe,
  FiUserCheck,
  FiRefreshCw,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSettings,
} from "react-icons/fi";

export default function PrivacyPolicy() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  const sections = [
    {
      icon: <FiShield />,
      title: "Introduction",
      text: "Travel Nest respects your privacy and is committed to protecting your personal information while delivering safe and personalized travel experiences across Sri Lanka.",
    },
    {
      icon: <FiDatabase />,
      title: "Information We Collect",
      text: "We collect basic personal data including your name, email, phone number, travel preferences, and booking details when you interact with our services.",
    },
    {
      icon: <FiEye />,
      title: "How We Use Your Data",
      list: [
        "Process bookings and travel inquiries",
        "Provide personalized tour experiences",
        "Improve website functionality and services",
        "Send offers (only with your consent)",
      ],
    },
    {
      icon: <FiLock />,
      title: "Data Protection",
      text: "We use secure systems and encryption methods to protect your data from unauthorized access, misuse, or disclosure.",
    },
    {
      icon: <FiGlobe />,
      title: "Third-Party Services",
      text: "We may use trusted third-party providers such as payment gateways and analytics tools. They follow their own privacy policies.",
    },
    {
      icon: <FiUserCheck />,
      title: "Your Rights",
      text: "You have full rights to access, update, or request deletion of your personal data by contacting our support team.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Policy Updates",
      text: "We may update this policy from time to time. Any changes will be posted on this page with a revised date.",
    },
    {
      icon: <FiSettings />,
      title: "Cookies Policy",
      text: "We use cookies to improve user experience, analyze traffic, and enhance website performance. You may disable cookies anytime in your browser.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | Travel Nest</title>
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
            Privacy Policy
          </h1>

          <p className="text-white/85 mt-6 text-lg">
            Your privacy matters. Learn how we collect, use, and protect your
            information.
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
              <p className="text-gray-600">info@travelnest.com</p>
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
          © {new Date().getFullYear()} Travel Nest. All rights reserved.
        </div>
      </div>
    </div>
  );
}
