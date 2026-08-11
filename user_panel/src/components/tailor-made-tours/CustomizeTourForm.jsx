import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPlane,
  FaRegStickyNote,
} from "react-icons/fa";

export default function CustomizeTourForm() {
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [loadingDest, setLoadingDest] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    country: "",
    email: "",
    whatsapp_number: "",

    pickup_location: "",
    drop_location: "",
    start_date: "",
    end_date: "",
    destination: [],

    travel_style: "PRIVATE",
    experience_type: "CULTURE",
    vehicle_preference: "VAN",
    currency: "USD",
    customCurrency: "",
    budget_per_day: "",

    special_requests: "",
    how_know_us: "GOOGLE",
    is_agree: false,
  });

  const resetForm = () => {
    setFormData({
      full_name: "",
      country: "",
      email: "",
      whatsapp_number: "",

      pickup_location: "",
      drop_location: "",
      start_date: "",
      end_date: "",
      destination: [],

      travel_style: "PRIVATE_GUIDED",
      experience_type: "CULTURE",
      vehicle_preference: "VAN",
      currency: "USD",
      customCurrency: "",
      budget_per_day: "",

      special_requests: "",
      how_know_us: "GOOGLE",
      is_agree: false,
    });

    setSelectedDestinations([]);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingDest(true);

        const res = await axiosInstance.get("/destinations", {
          params: { limit: 50 },
        });

        const items = res.data?.data?.items || [];
        setDestinations(items);
      } catch (err) {
        console.error("Destination fetch error:", err);
        setDestinations([]);
      } finally {
        setLoadingDest(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destination: selectedDestinations.map((d) => d.title),
    }));
  }, [selectedDestinations]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : typeof value === "string"
          ? value
          : value,
    }));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1c4b56]";

  const btnPrimary =
    "w-full py-3 rounded-lg bg-[#1c4b56] text-white font-semibold hover:bg-[#02878b] transition";

  const btnOutline =
    "w-full py-3 rounded-lg border border-[#1c4b56] text-[#1c4b56] font-semibold hover:bg-[#1c4b56] hover:text-white transition";

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // STEP 1
  const handleStep1 = async () => {
    try {
      resetMessages();

      const res = await axiosInstance.post("/tailor-made-tour-booking", {
        full_name: formData.full_name,
        country: formData.country,
        email: formData.email,
        whatsapp_number: formData.whatsapp_number,
      });

      setBookingId(res.data.data.id);
      setStep(2);
      setSuccess("Step 1 completed successfully");
      toast.success("Step 1 completed");
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || "Step 1 failed");
      console.log("FULL ERROR:", err.response?.data);
    }
  };

  // STEP 2
  const handleStep2 = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (startDate < today) {
      setError("Start date cannot be in the past");
      return;
    }

    if (endDate < startDate) {
      setError("End date must be after start date");
      return;
    }

    try {
      resetMessages();

      await axiosInstance.put(`/tailor-made-tour-booking/${bookingId}/step-2`, {
        pickup_location: formData.pickup_location,
        drop_location: formData.drop_location,
        start_date: formData.start_date,
        end_date: formData.end_date,
        destination: formData.destination,
      });

      setStep(3);
      setSuccess("Step 2 completed successfully");
      toast.success("Step 2 completed");
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || "Step 2 failed");
      console.log("FULL ERROR:", err.response?.data);
    }
  };

  // STEP 3
  const handleStep3 = async () => {
    try {
      resetMessages();
  
      await axiosInstance.put(
        `/tailor-made-tour-booking/${bookingId}/step-3`,
        {
          travel_style: formData.travel_style,
          experience_type: formData.experience_type,
          vehicle_preference: formData.vehicle_preference,
  
          budget_per_day:
            formData.currency === "No Idea"
              ? null
              : formData.budget_per_day === ""
              ? null
              : parseFloat(formData.budget_per_day),
        }
      );
  
      setStep(4);
      setSuccess("Step 3 completed successfully");
      toast.success("Step 3 completed");
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || "Step 3 failed");
      console.log("FULL ERROR:", err.response?.data);
    }
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "94707890663";

    const message = `
  New Tailor Made Tour Booking
  
  Name: ${formData.full_name}
  Country: ${formData.country}
  Email: ${formData.email}
  WhatsApp: ${formData.whatsapp_number}
  
  Pickup: ${formData.pickup_location}
  Drop: ${formData.drop_location}
  Dates: ${formatDate(formData.start_date)} → ${formatDate(formData.end_date)}
  Destination: ${formData.destination}
  
  Style: ${formData.travel_style}
  Experience: ${formData.experience_type}
  Vehicle: ${formData.vehicle_preference}
  Budget: ${
    formData.currency === "No Idea"
      ? "No Idea"
      : `${formData.budget_per_day} ${
          formData.currency === "Other"
            ? formData.customCurrency
            : formData.currency
        }`
  }
  Requests: ${formData.special_requests}
  Heard from: ${formData.how_know_us}
  `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // STEP 4
  const handleStep4 = async () => {
    try {
      resetMessages();

      await axiosInstance.put(`/tailor-made-tour-booking/${bookingId}/step-4`, {
        special_requests: formData.special_requests || "",
        how_know_us: formData.how_know_us,
        is_agree: formData.is_agree === true,
      });

      setSuccess("Booking completed successfully!");
      toast.success("Booking sent! Click WhatsApp button to confirm");
      sendToWhatsApp();

      setStep(1);
      setBookingId(null);
      resetForm();
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || "Step 4 failed");
      console.log("STEP 4 ERROR:", err.response?.data);
    }
  };

  const travelStyles = [
    { label: "Private Tour with Guide", value: "PRIVATE_GUIDED" },
    { label: "Chauffeur Guided Tour", value: "CHAUFFEUR_GUIDED" },
    { label: "Area Guided Experience", value: "AREA_GUIDED" },
    { label: "Group Tour", value: "GROUP_TOUR" },
    {
      label: "Hotel & Transfer Only (No Guide)",
      value: "NO_GUIDE_HOTEL_TRANSFER",
    },
    { label: "Self Drive (No Guide)", value: "SELF_DRIVE_NO_GUIDE" },
  ];

  const experienceTypes = [
    { label: "Safari & Wildlife Experience", value: "SAFARI" },
    { label: "Beach & Coastal Relaxation", value: "BEACH_ESCAPE" },
    { label: "Cultural & Heritage Exploration", value: "CULTURAL_EXPLORATION" },
    { label: "Adventure Hiking & Trekking", value: "ADVENTURE_HIKING" },
    { label: "Wildlife Photography Tour", value: "WILDLIFE_PHOTOGRAPHY" },
    { label: "City & Urban Discovery", value: "CITY_DISCOVERY" },
    { label: "Wellness & Retreat Experience", value: "WELLNESS_RETREAT" },
    { label: "Luxury Leisure Travel", value: "LUXURY_LEISURE" },
  ];

  const vehicles = [
    { label: "Economy Car (Budget Travel)", value: "ECONOMY_CAR" },
    { label: "Standard Car (Comfort Travel)", value: "STANDARD_CAR" },
    { label: "Premium Car (Luxury Sedan)", value: "PREMIUM_CAR" },

    { label: "Minivan (4 Pax)", value: "MINIVAN_4PAX" },
    { label: "Minivan (7 Pax)", value: "MINIVAN_7PAX" },
    { label: "Large Van (10 Pax+)", value: "LARGE_VAN_10PAX" },

    { label: "4x4 SUV (Adventure Travel)", value: "SUV_4X4" },
    { label: "Luxury SUV", value: "LUXURY_SUV" },

    { label: "Tuk Tuk (Local Experience)", value: "TUK_TUK" },

    { label: "Coach / Bus (Group Tours)", value: "COACH_BUS" },

    { label: "Luxury VIP Van", value: "LUXURY_VAN" },

    { label: "Self Drive Car", value: "SELF_DRIVE_CAR" },

    { label: "No Transport Needed", value: "NO_TRANSPORT_NEEDED" },
  ];

  return (
    <div className="flex justify-center items-center py-10 px-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#1c4b56] text-white text-center p-6">
          <h2 className="text-2xl font-bold">Customize Your Tour</h2>
          <p className="text-sm opacity-80 mt-1">Step {step} of 4</p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex justify-center gap-3 py-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                step >= n
                  ? "bg-[#1c4b56] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {n}
            </div>
          ))}
        </div>

        <div className="px-6 pb-8 space-y-4">
          {/* ERROR / SUCCESS DISPLAY */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h3 className="flex items-center gap-2 font-semibold text-[#0f2f1f] text-lg">
                <FaUser /> Personal Details
              </h3>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your country name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="whatsapp_number"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="+94 777 000 000"
                />
              </div>

              <button onClick={handleStep1} className={btnPrimary}>
                Next
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h3 className="flex items-center gap-2 font-semibold text-[#0f2f1f] text-lg">
                <FaMapMarkerAlt /> Travel Details
              </h3>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Pickup Location *
                </label>
                <input
                  type="text"
                  name="pickup_location"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Where should we pick you up?"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Drop Location *
                </label>
                <input
                  type="text"
                  name="drop_location"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Where should we drop you off?"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Start Date *
                  </label>
                  <DatePicker
                    selected={formData.start_date}
                    onChange={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        start_date: date,
                      }))
                    }
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className={inputClass + " w-full"}
                    wrapperClassName="w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    End Date *
                  </label>
                  <DatePicker
                    selected={formData.end_date}
                    onChange={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        end_date: date,
                      }))
                    }
                    dateFormat="dd/MM/yyyy"
                    minDate={formData.start_date || new Date()}
                    className={inputClass + " w-full"}
                    wrapperClassName="w-full"
                  />
                </div>
              </div>

              {/* Destination Selection */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowDestinationModal(true)}
                  className="w-full flex justify-between items-center bg-white border border-gray-400 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
                >
                  Select Destinations
                  <svg
                    className="w-5 h-5 ml-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>

                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDestinations.length > 0 ? (
                    selectedDestinations.map((d) => (
                      <span
                        key={d.id}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {d.title}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">
                      No destination selected
                    </span>
                  )}
                </div>
              </div>

              {showDestinationModal && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000] flex items-center justify-center"
                  onClick={(e) =>
                    e.target === e.currentTarget &&
                    setShowDestinationModal(false)
                  }
                >
                  <div className="w-[95vw] max-w-[800px] h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* HEADER */}
                    <div className="flex justify-between items-center p-4 border-b border-[#1c4b56] bg-white sticky top-0 z-10">
                      <h2 className="text-lg font-bold text-[#1c4b56]">
                        Select Destinations
                      </h2>

                      <button
                        onClick={() => setShowDestinationModal(false)}
                        className="text-gray-500 hover:text-black text-2xl font-bold"
                      >
                        &times;
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {loadingDest ? (
                          <p className="text-center col-span-full">
                            Loading...
                          </p>
                        ) : (
                          destinations.map((d) => {
                            const isSelected = selectedDestinations.some(
                              (x) => x.id === d.id
                            );

                            return (
                              <div
                                key={d.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedDestinations((prev) =>
                                      prev.filter((x) => x.id !== d.id)
                                    );
                                  } else {
                                    setSelectedDestinations((prev) => [
                                      ...prev,
                                      d,
                                    ]);
                                  }
                                }}
                                className={`relative border rounded-xl overflow-hidden cursor-pointer transition hover:shadow-md ${
                                  isSelected
                                    ? "border-[#1c4b56] ring-2 ring-[#1c4b56]"
                                    : "border-gray-200"
                                }`}
                              >
                                {/* CHECK ICON */}
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full border bg-white flex items-center justify-center">
                                  {isSelected && (
                                    <div className="w-3 h-3 bg-[#1c4b56] rounded-full" />
                                  )}
                                </div>

                                {/* IMAGE */}
                                <img
                                  src={
                                    d.image?.url ||
                                    d.image ||
                                    "/placeholder.jpg"
                                  }
                                  alt={d.title}
                                  className="w-full h-32 object-cover"
                                />

                                {/* TITLE */}
                                <div className="p-2 text-center">
                                  <h3 className="text-sm font-semibold text-gray-800">
                                    {d.title}
                                  </h3>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="p-4 border-t border-[#1c4b56] bg-white">
                      <button
                        onClick={() => setShowDestinationModal(false)}
                        className="w-full bg-[#02878b] text-white py-3 rounded-lg hover:bg-[#1c4b56] transition"
                      >
                        Confirm Selection
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={prev} className={btnOutline}>
                  Back
                </button>
                <button onClick={handleStep2} className={btnPrimary}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h3 className="flex items-center gap-2 font-semibold text-[#0f2f1f] text-lg">
                <FaPlane /> Preferences
              </h3>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Travel Style *
                </label>

                <select
                  name="travel_style"
                  onChange={handleChange}
                  value={formData.travel_style}
                  className="w-full p-4 rounded-lg border border-gray-300 bg-white cursor-pointer focus:ring-2 focus:ring-[#0f2f1f]"
                >
                  <option value="">Select a travel style</option>

                  {travelStyles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Experience Type *
                </label>

                <select
                  name="experience_type"
                  onChange={handleChange}
                  value={formData.experience_type}
                  className="w-full p-4 rounded-lg border border-gray-300 bg-white cursor-pointer focus:ring-2 focus:ring-[#0f2f1f]"
                >
                  <option value="">Select experience type</option>

                  {experienceTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Vehicle *
                </label>
                <select
                  name="vehicle_preference"
                  onChange={handleChange}
                  value={formData.vehicles}
                  className="w-full p-4 rounded-lg border border-gray-300 bg-white cursor-pointer focus:ring-2 focus:ring-[#0f2f1f]"
                >
                  <option value="">Select vehicle</option>

                  {vehicles.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* ---------------- Budget Per Day ---------------- */}
              <div className="mt-4 w-full sm:w-full">
                <label className="block text-gray-700 font-semibold mb-1">
                  Budget Per Day (Per Person)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Currency Dropdown */}
                  <div className="relative">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-800 cursor-pointer appearance-none pr-10 transition-all duration-300 hover:border-[#0f2f1f]"
                    >
                      <option value="" disabled>
                        Select currency
                      </option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="LKR">LKR</option>
                      <option value="No Idea">No Idea</option>
                      <option value="Other">Other</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      ▼
                    </div>
                  </div>

                  {/* Budget Input */}
                  {formData.currency !== "Other" ? (
                    <input
                      type="number"
                      name="budget_per_day"
                      value={formData.budget_per_day}
                      onChange={handleChange}
                      placeholder="Amount per day"
                      disabled={formData.currency === "No Idea"}
                      min={0}
                      className={`p-4 rounded-lg border border-gray-300 w-full col-span-2 transition-all duration-300 ${
                        formData.currency === "No Idea"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "hover:border-[#0f2f1f]"
                      }`}
                    />
                  ) : (
                    <>
                      {/* Custom Currency */}
                      <input
                        type="text"
                        name="customCurrency"
                        value={formData.customCurrency || ""}
                        onChange={handleChange}
                        placeholder="Enter Currency (e.g., INR)"
                        className="p-4 rounded-lg border border-gray-300 w-full transition-all duration-300 hover:border-[#0f2f1f]"
                      />

                      {/* Budget */}
                      <input
                        type="number"
                        name="budget_per_day"
                        value={formData.budget_per_day}
                        onChange={handleChange}
                        placeholder="Amount per day"
                        min={0}
                        className="p-4 rounded-lg border border-gray-300 w-full transition-all duration-300 hover:border-[#0f2f1f]"
                      />
                    </>
                  )}
                </div>

                {/* Helper Text */}
                {formData.currency !== "No Idea" &&
                  formData.budget_per_day &&
                  (formData.currency !== "Other" ||
                    formData.customCurrency) && (
                    <p className="text-xs text-gray-500 mt-1">
                      Estimated budget per day:{" "}
                      <strong>
                        {formData.budget_per_day}{" "}
                        {formData.currency === "Other"
                          ? formData.customCurrency
                          : formData.currency}
                      </strong>
                    </p>
                  )}

                {formData.currency === "No Idea" && (
                  <p className="text-xs text-gray-500 mt-1">
                    No worries - we will suggest the best travel options for
                    you.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={prev} className={btnOutline}>
                  Back
                </button>
                <button onClick={handleStep3} className={btnPrimary}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <h3 className="flex items-center gap-2 font-semibold text-[#0f2f1f] text-lg">
                <FaRegStickyNote /> Final Notes
              </h3>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Special Requests / Notes
                </label>

                <textarea
                  name="special_requests"
                  onChange={handleChange}
                  rows={4}
                  placeholder="Hotel preferences, food requirements, wheelchair access, honeymoon details, etc."
                  className="w-full border border-gray-300 rounded-md p-3 resize-none
        focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* ---------------- How Did You Hear About Us ---------------- */}
              <div className="mt-6 w-full">
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  How did you hear about us?
                  <span className="text-gray-400 text-sm block">
                    Please select one option
                  </span>
                </label>

                <div className="relative">
                  <select
                    name="how_know_us"
                    value={formData.how_know_us || ""}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-800 cursor-pointer appearance-none pr-10 transition-all duration-300 hover:border-blue-200"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>

                    {[
                      { label: "Friend / Family", value: "FRIEND" },
                      { label: "Social Media", value: "FACEBOOK" },
                      { label: "Google", value: "GOOGLE" },
                      { label: "Search Engine", value: "SEARCH_ENGINE" },
                      { label: "Advertisement", value: "ADVERTISEMENT" },
                      { label: "Travel Blog / Website", value: "BLOG" },
                      { label: "Other", value: "OTHER" },
                    ].map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.is_agree}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_agree: e.target.checked,
                      }))
                    }
                    className="w-5 h-5"
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

              <div className="flex gap-3">
                <button onClick={prev} className={btnOutline}>
                  Back
                </button>
                <button onClick={handleStep4} className={btnPrimary}>
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
