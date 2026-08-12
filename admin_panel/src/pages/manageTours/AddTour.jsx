import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import TourForm from "../../components/TourForm";
import { ArrowLeft } from "lucide-react";

export default function AddTour() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [tourType, setTourType] = useState("DAY_TOUR");
  const [itineraryDays, setItineraryDays] = useState([]);
  const [includes, setIncludes] = useState("");
  const [highlights, setHighlights] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("tour_type", tourType);
    itineraryDays.forEach((day, index) => {
      formData.append(
        `itinerary_days[${index}][day]`,
        day.day || `Day ${index + 1}`
      );
      formData.append(`itinerary_days[${index}][title]`, day.title || "");
      formData.append(
        `itinerary_days[${index}][description]`,
        day.description || ""
      );
      formData.append(`itinerary_days[${index}][details]`, day.details || "");
      formData.append(`itinerary_days[${index}][location]`, day.location || "");
    });
    formData.append("file", file);
    if (includes.trim()) {
      formData.append(
        "includes",
        includes.split(",").map((i) => i.trim())
      );
    }

    if (highlights.trim()) {
      formData.append(
        "highlights",
        highlights.split(",").map((h) => h.trim())
      );
    }

    try {
      await axiosInstance.post("/tours", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Itinerary created");
      navigate("/admin/tours");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/tours")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Tours
      </button>

      <TourForm
        title={title}
        setTitle={setTitle}
        location={location}
        setLocation={setLocation}
        description={description}
        setDescription={setDescription}
        duration={duration}
        setDuration={setDuration}
        tourType={tourType}
        setTourType={setTourType}
        itineraryDays={itineraryDays}
        setItineraryDays={setItineraryDays}
        includes={includes}
        setIncludes={setIncludes}
        highlights={highlights}
        setHighlights={setHighlights}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Add Tour"
      />
    </div>
  );
}
