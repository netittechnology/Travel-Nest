import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import HotelForm from "../../components/HotelForm";
import { ArrowLeft } from "lucide-react";

export default function AddHotel() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [highlightKeywords, setHighlightKeywords] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("short_description", shortDescription);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("highlight_keywords", highlightKeywords);
    formData.append("files", file);

    try {
      await axiosInstance.post("/hotels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Hotel created");
      navigate("/admin/hotels");
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
        onClick={() => navigate("/admin/hotels")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Hotels
      </button>

      <HotelForm
        name={name}
        setName={setName}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
        highlightKeywords={highlightKeywords}
        setHighlightKeywords={setHighlightKeywords}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Add Hotel"
      />
    </div>
  );
}
