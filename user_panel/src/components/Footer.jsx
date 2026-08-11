import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTripadvisor,
  FaPlane,
  FaMapMarkedAlt,
  FaUmbrellaBeach,
} from "react-icons/fa";
// import logo from "../assets/logo/logo.webp";

export default function Footer() {
  const [email, setEmail] = useState("");

  // CONTACT DETAILS
  const contact = {
    phone: "+94 77 123 4567",
    whatsapp: "+94 77 123 4567",
    emails: ["info@travelnest.com"],
    workingHours: { start: "08:00 AM", end: "10:00 PM" },
    offices: [
      {
        name: "Travel Nest",
        address: "Colombo 10",
      },
    ],
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Custom Tours", path: "/custom-tours" },
    { name: "Itineraries", path: "/itineraries" },
    { name: "Hotels", path: "/hotels" },
    { name: "Experiences", path: "/experience" },
    { name: "Blogs", path: "/blog" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSubscribe = () => {
    if (!email) return;

    const phoneNumber = "94771234567";

    const text = `Hello Travel Nest!

I would like to subscribe for travel deals and updates.

Subscriber Email: ${email}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    setEmail("");
  };

  return (
    <footer className="bg-[#0f2f2f] text-white">
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* ================= BRAND ================= */}
        <div>
          <div className="flex flex-col items-center justify-center text-center">
            {/* <img
              src={logo}
              alt="Travel Nest Logo"
              className="h-40 w-40 object-contain"
            /> */}

            {/* TEMPORARY 3 ICON LOGO */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#02878b] flex items-center justify-center shadow-lg">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
            </div>

            {/* BRAND NAME */}
            <h2 className="text-2xl font-bold text-white">Travel Nest</h2>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mt-3">
              Experience Sri Lanka like never before, curated journeys across
              beaches, mountains, wildlife, and cultural wonders.
            </p>

            {/* ================= SOCIAL ================= */}
            <div className="flex gap-4 mt-6">
              {[
                {
                  icon: FaFacebookF,
                  link: "#",
                },
                {
                  icon: FaInstagram,
                  link: "#",
                },
                {
                  icon: FaTiktok,
                  link: "#",
                },
                {
                  icon: FaTripadvisor,
                  link: "#",
                },
                {
                  icon: FaWhatsapp,
                  link: "#",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#02878b] hover:text-white hover:border-[#02878b] transition duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact</h3>

            <div className="space-y-4 text-sm text-gray-300">
              {/* PHONE */}
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#02878b]" />

                <a
                  href={`sms:${contact.phone}?body=Hello%20Travel%20Nest,%20I%20am%20interested%20in%20your%20Sri%20Lanka%20tour%20packages.%20Could%20you%20please%20share%20more%20details%20regarding%20availability,%20pricing,%20and%20itineraries%3F%20Thank%20you.`}
                  className="hover:text-[#02878b] transition"
                >
                  {contact.phone}
                </a>
              </div>

              {/* WHATSAPP */}
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-[#02878b]" />

                <a
                  href={`https://wa.me/${contact.whatsapp.replace(
                    /\D/g,
                    ""
                  )}?text=Hello%20Travel%20Nest!%20I%E2%80%99m%20interested%20in%20your%20Sri%20Lanka%20tour%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#02878b] transition"
                >
                  {contact.whatsapp}
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#02878b]" />

                <a
                  href={`mailto:${contact.emails[0]}`}
                  className="hover:text-[#02878b] transition"
                >
                  {contact.emails[0]}
                </a>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#02878b] mt-1" />

                <span>{contact.offices[0].address}</span>
              </div>

              {/* WORKING HOURS */}
              <div className="flex items-center gap-3">
                <FaClock className="text-[#02878b]" />
                {contact.workingHours.start} - {contact.workingHours.end}
              </div>
            </div>
          </div>

          {/* ================= LEGAL ================= */}
          <nav aria-label="Legal Links">
            <h3 className="text-lg font-semibold mb-5">Legal</h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-[#02878b] transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms-and-conditions"
                  className="hover:text-[#02878b] transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Quick Navigation</h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="hover:text-[#02878b] transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Stay Updated</h3>

          <p className="text-gray-300 text-sm mb-4">
            Subscribe for exclusive travel deals & updates.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02878b]"
            />

            <button
              onClick={handleSubscribe}
              className="bg-[#02878b] text-white font-semibold py-3 rounded-full hover:bg-[#026f72] hover:scale-105 transition"
            >
              Subscribe
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-300 leading-relaxed">
            By subscribing, you agree to our{" "}
            <a
              href="/privacy-policy"
              className="underline hover:text-[#02878b] transition"
            >
              Privacy Policy
            </a>{" "}
            and consent to receive emails from Travel Nest.
          </p>
        </div>
      </div>

      {/* ================= DIVIDER ================= */}
      <hr className="border-[#02878b] my-6" />

      {/* ================= COPYRIGHT ================= */}
      <div className="px-6 text-white font-medium text-xs md:text-sm flex flex-col sm:flex-row justify-between gap-2 relative z-10 pb-6">
        <p>© {new Date().getFullYear()} Travel Nest. All rights reserved.</p>

        <p>Website Design & Development by NetIT Technology</p>
      </div>
    </footer>
  );
}
