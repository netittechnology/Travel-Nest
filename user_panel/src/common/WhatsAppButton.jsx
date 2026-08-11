import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import { useFloatingButtons } from "../context/FloatingButtonContext";

export default function WhatsAppFAB() {
  const location = useLocation();
  const context = useFloatingButtons();
  const phone = "94707890663";

  const [tourTitle, setTourTitle] = useState("");

  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    if (path.includes("/tours/") && id) {
      axiosInstance.get(`/tours/slug/${id}`).then((res) => {
        setTourTitle(
          res.data?.details?.heroTitle || res.data?.tour?.title || ""
        );
      });
    } else {
      setTourTitle("");
    }
  }, [location.pathname]);

  if (!context) return null;

  const { isWhatsAppOpen, setIsWhatsAppOpen, isScrollVisible } = context;

  // ---------------- Greeting ----------------
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // ---------------- Open WhatsApp ----------------
  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // ---------------- Messages ----------------
  const getMessage = (type) => {
    const base = "*Travel Nest 🌴*\nSri Lanka Travel Experts";

    if (tourTitle) {
      if (type === "inquiry")
        return `${base}\n\n${getGreeting()},\n\nI would like to know more about the following tour:\n*${tourTitle}*\n\nCould you please share further details?\n\nThank you.`;

      if (type === "details")
        return `${base}\n\n${getGreeting()},\n\nPlease provide full details (itinerary, pricing, inclusions) for:\n*${tourTitle}*\n\nLooking forward to your response.\n\nThank you.`;
    }

    if (type === "inquiry")
      return `${base}\n\n${getGreeting()},\n\nI would like to inquire about your tour packages in Sri Lanka.\n\nCould you please assist me with more information?\n\nThank you.`;

    if (type === "details")
      return `${base}\n\n${getGreeting()},\n\nCould you please share detailed information about your available tours, including itinerary and pricing?\n\nThank you.`;

    return `${base}\n\n${getGreeting()},\n\nI would like to learn more about your travel services.\n\nThank you.`;
  };

  return (
    <div
      className={`fixed right-6 z-50 flex flex-col items-end transition-all duration-300
   ${isScrollVisible ? "bottom-24" : "bottom-6"}
    `}
    >
      {/* CHAT CARD */}
      {isWhatsAppOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-green-500 p-4 text-white flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Chat with Travel Expert</h3>
              <p className="text-sm opacity-90">
                We typically reply within minutes
              </p>
            </div>
            <button onClick={() => setIsWhatsAppOpen(false)}>✕</button>
          </div>

          <div className="flex items-center gap-3 p-4 border-b">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <FaWhatsapp className="text-white text-xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Travel Nest</p>
              <p className="text-sm text-gray-500">Online | Fast Response</p>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <button
              onClick={() => openWhatsApp(getMessage("inquiry"))}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              General Inquiry
            </button>

            <button
              onClick={() => openWhatsApp(getMessage("details"))}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            >
              Request Tour Details
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
        className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping"></span>
        <span className="absolute inset-0 rounded-full bg-green-300 opacity-20 blur-md"></span>
        <FaWhatsapp className="text-white text-2xl relative z-10" />
      </button>
    </div>
  );
}
