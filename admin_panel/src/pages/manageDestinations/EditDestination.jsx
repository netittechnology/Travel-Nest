import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DestinationForm from "../../components/DestinationForm";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(`/destinations/${id}`);
      setData(res.data.data);
    };
    fetch();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/destinations/${id}/update-data`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Updated successfully");
      navigate("/admin/destinations");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/destinations")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Destinations
      </button>

      <DestinationForm
        initialData={data}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
