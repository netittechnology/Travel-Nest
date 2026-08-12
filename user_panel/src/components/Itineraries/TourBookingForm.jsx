import React, { useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TourBookingForm({ open, onClose, tour }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const initialState = {
    full_name: "",
    email: "",
    phone: "",
    booking_date: null,
    booking_time: "08:00",
    adult_count: 1,
    children_count: 0,

    // Pickup location
    pickup_location: "",
    pickup_location_latitude: "",
    pickup_location_longitude: "",

    message: "",
    is_agree: false,
  };

  const [form, setForm] = useState(initialState);

  if (!open || !tour) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isValid = () => {
    if (!form.full_name || form.full_name.trim().length < 3) {
      return false;
    }

    if (!form.email.includes("@")) {
      return false;
    }

    if (!form.phone.match(/^[+]?[0-9]{10,15}$/)) {
      return false;
    }

    if (!form.booking_date) {
      return false;
    }

    if (!form.booking_time) {
      return false;
    }

    if (!form.is_agree) {
      return false;
    }

    // Coordinates are OPTIONAL.
    // No validation is required for latitude/longitude.

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(form.booking_date);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate.getTime() < today.getTime()) {
      return false;
    }

    return true;
  };

  const generateWhatsAppMessage = () => {
    const coordinates =
      form.pickup_location_latitude && form.pickup_location_longitude
        ? `${form.pickup_location_latitude}, ${form.pickup_location_longitude}`
        : "Not provided";

    return `Hello, I just booked a tour

Name: ${form.full_name}
Email: ${form.email}
Phone: ${form.phone}

Date: ${form.booking_date ? form.booking_date.toLocaleDateString("en-GB") : ""}
Time: ${form.booking_time}

Adults: ${form.adult_count}
Children: ${form.children_count}

Pickup Location: ${form.pickup_location || "Not provided"}
Coordinates: ${coordinates}

Message: ${form.message || "N/A"}

Tour: ${tour?.title}`;
  };

  const openWhatsApp = () => {
    const phoneNumber = "94771234567";
    const text = generateWhatsAppMessage();

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!isValid()) {
      setMessage({
        type: "error",
        text: "Please fill all required fields correctly and select a valid future date.",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone,

        booking_date: form.booking_date
          ? form.booking_date.toISOString().split("T")[0]
          : "",

        booking_time: form.booking_time,
        adult_count: Number(form.adult_count),
        children_count: Number(form.children_count),

        pickup_location: form.pickup_location.trim(),

        message: form.message,
        is_agree: Boolean(form.is_agree),
      };

      // Only send latitude if provided
      if (form.pickup_location_latitude !== "") {
        payload.pickup_location_latitude = Number(
          form.pickup_location_latitude
        );
      }

      // Only send longitude if provided
      if (form.pickup_location_longitude !== "") {
        payload.pickup_location_longitude = Number(
          form.pickup_location_longitude
        );
      }

      await axiosInstance.post(`/tour-booking/${tour.id}`, payload);

      setMessage({
        type: "success",
        text: "Booking successful! Redirecting to WhatsApp...",
      });

      setTimeout(() => {
        openWhatsApp();
        setForm(initialState);
        onClose();
      }, 1200);
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Booking failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-9999 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          <FaTimes />
        </button>

        {/* HEADER */}
        <div className="text-center mb-4 pt-6 px-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Book {tour?.title}
          </h2>

          <p className="text-sm text-gray-500">Fill your travel details</p>
        </div>

        {/* FORM */}
        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <form onSubmit={submitBooking} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                name="full_name"
                placeholder="Enter your full name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                name="phone"
                placeholder="+94 77 123 4567"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            {/* DATE + TIME */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Booking Date
                </label>

                <DatePicker
                  selected={form.booking_date}
                  onChange={(date) =>
                    setForm((prev) => ({
                      ...prev,
                      booking_date: date,
                    }))
                  }
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Select booking date"
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Booking Time
                </label>

                <input
                  type="time"
                  name="booking_time"
                  value={form.booking_time}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {/* ADULTS + CHILDREN */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Adults
                </label>

                <input
                  type="number"
                  name="adult_count"
                  value={form.adult_count}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                  min="1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Children
                </label>

                <input
                  type="number"
                  name="children_count"
                  value={form.children_count}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                  min="0"
                />
              </div>
            </div>

            {/* PICKUP LOCATION */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Pickup Location / Address
              </label>

              <input
                name="pickup_location"
                placeholder="Enter your hotel, address, or pickup location"
                value={form.pickup_location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
              />

              <p className="text-xs text-gray-500 mt-1">
                Example: Cinnamon Grand Colombo
              </p>
            </div>

            {/* OPTIONAL COORDINATES */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Latitude
                  <span className="text-gray-400"> (Optional)</span>
                </label>

                <input
                  type="number"
                  step="any"
                  name="pickup_location_latitude"
                  placeholder="Latitude"
                  value={form.pickup_location_latitude}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Longitude
                  <span className="text-gray-400"> (Optional)</span>
                </label>

                <input
                  type="number"
                  step="any"
                  name="pickup_location_longitude"
                  placeholder="Longitude"
                  value={form.pickup_location_longitude}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Additional Message
              </label>

              <textarea
                name="message"
                placeholder="Write additional travel requests..."
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* TERMS */}
            <div className="mt-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_agree"
                  checked={form.is_agree}
                  onChange={handleChange}
                />

                <span className="text-gray-700 text-sm">
                  I accept the{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* MESSAGE */}
            {message.text && (
              <div
                className={`text-sm p-2 rounded-lg text-center font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#0f2f1f] to-[#184d35] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaWhatsapp />
              {loading ? "Booking..." : "Book & WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
