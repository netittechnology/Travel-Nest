import { useState } from "react";
import GalleryForm from "../../components/GalleryForm";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddGalleryImage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await axiosInstance.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Gallery image uploaded");
      navigate("/admin/gallery");
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
        onClick={() => navigate("/admin/gallery")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Gallery
      </button>
      <GalleryForm onSubmit={handleSubmit} loading={loading} />;
    </div>
  );
}
