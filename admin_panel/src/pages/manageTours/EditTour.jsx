import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import TourForm from "../../components/TourForm";
import { ArrowLeft } from "lucide-react";

export default function EditDayTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
    duration: "",
    tourType: "DAY_TOUR",
    includes: "",
    highlights: "",
  });

  const [itineraryDays, setItineraryDays] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/tours/${id}`);
      const t = res.data.data;

      setState({
        title: t.title || "",
        location: t.location || "",
        description: t.description || "",
        duration: t.duration || "",
        tourType: t.tour_type || "DAY_TOUR",
        includes: t.includes?.join(", ") || "",
        highlights: t.highlights?.join(", ") || "",
      });

      setItineraryDays(t.itinerary_days || []);
      setPreview(t.image?.url || null);
    } catch {
      toast.error("Failed to load tour");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (state.title) formData.append("title", state.title);
    if (state.location) formData.append("location", state.location);
    if (state.description) formData.append("description", state.description);
    if (state.duration) formData.append("duration", state.duration);
    if (state.tourType) {
      formData.append("tour_type", state.tourType);
    }
    if (state.includes) formData.append("includes", state.includes);
    if (state.highlights) formData.append("highlights", state.highlights);

    if (file) formData.append("file", file);
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
    try {
      await axiosInstance.put(`/tours/${id}/update-data`, formData);

      toast.success("Itinerary updated");
      navigate("/admin/tours");
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err?.response?.data?.message || "Update failed");
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
        {...state}
        setTitle={(v) => handleChange("title", v)}
        setLocation={(v) => handleChange("location", v)}
        setDescription={(v) => handleChange("description", v)}
        setDuration={(v) => handleChange("duration", v)}
        tourType={state.tourType}
        setTourType={(v) => handleChange("tourType", v)}
        setIncludes={(v) => handleChange("includes", v)}
        setHighlights={(v) => handleChange("highlights", v)}
        itineraryDays={itineraryDays}
        setItineraryDays={setItineraryDays}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Update Tour"
      />
    </div>
  );
}
