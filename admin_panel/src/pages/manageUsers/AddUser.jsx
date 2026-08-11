import { useState } from "react";
import UserForm from "../../components/UserForm";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await axiosInstance.post("/auth/register", data);

      toast.success("User created");
      navigate("/admin/users");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return <UserForm onSubmit={handleSubmit} loading={loading} />;
}
