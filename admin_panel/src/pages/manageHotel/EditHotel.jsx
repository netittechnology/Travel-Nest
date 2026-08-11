import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import HotelForm from "../../components/HotelForm";
import { ArrowLeft } from "lucide-react";

export default function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    shortDescription: "",
    description: "",
    category: "",
    latitude: "",
    longitude: "",
    highlightKeywords: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/hotels/${id}`);
      const h = res.data.data;

      setState({
        name: h.name,
        shortDescription: h.short_description,
        description: h.description,
        category: h.category,
        latitude: h.latitude,
        longitude: h.longitude,
        highlightKeywords: h.highlight_keywords?.join(", "),
      });

      setPreview(h.images?.[0]?.url);
    } catch {
      toast.error("Failed to load hotel");
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

    if (state.name) formData.append("name", state.name);
    if (state.shortDescription)
      formData.append("short_description", state.shortDescription);
    if (state.description) formData.append("description", state.description);
    if (state.category) formData.append("category", state.category);

    if (state.latitude) formData.append("latitude", Number(state.latitude));
    if (state.longitude) formData.append("longitude", Number(state.longitude));

    if (state.highlightKeywords)
      formData.append("highlight_keywords", state.highlightKeywords);

    if (file) formData.append("files", file);

    try {
      await axiosInstance.put(`/hotels/${id}/update-data`, formData);
      toast.success("Hotel updated");
      navigate("/admin/hotels");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/hotels")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Hotels
      </button>

    <HotelForm
      {...state}
      setName={(v) => handleChange("name", v)}
      setShortDescription={(v) => handleChange("shortDescription", v)}
      setDescription={(v) => handleChange("description", v)}
      setCategory={(v) => handleChange("category", v)}
      setLatitude={(v) => handleChange("latitude", v)}
      setLongitude={(v) => handleChange("longitude", v)}
      setHighlightKeywords={(v) => handleChange("highlightKeywords", v)}
      file={file}
      setFile={setFile}
      preview={preview}
      setPreview={setPreview}
      onSubmit={handleSubmit}
      loading={loading}
      buttonText="Update Hotel"
    />
    </div>
  );
}
