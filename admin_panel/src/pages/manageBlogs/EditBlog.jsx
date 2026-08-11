import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import BlogForm from "../../components/BlogForm";
import { ArrowLeft } from "lucide-react";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    meta_description: "",
    meta_keywords: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axiosInstance.get(`/blogs/${id}`);
      const b = res.data.data;

      setState({
        title: b.title || "",
        excerpt: b.excerpt || "",
        content: b.content || "",
        tags: b.tags?.join(", ") || "",
        meta_description: b.meta_description || "",
        meta_keywords: b.meta_keywords?.join(", ") || "",
      });

      setPreview(b.image?.url || null);
    } catch {
      toast.error("Failed to load blog");
    }
  };

  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(state).forEach(([k, v]) => {
      if (v) formData.append(k, v);
    });

    if (file) formData.append("file", file);

    try {
      await axiosInstance.put(`/blogs/${id}/update-data`, formData);
      toast.success("Blog updated");
      navigate("/admin/blogs");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/blogs")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Blogs
      </button>

      <BlogForm
        title={state.title}
        setTitle={(v) => handleChange("title", v)}
        excerpt={state.excerpt}
        setExcerpt={(v) => handleChange("excerpt", v)}
        content={state.content}
        setContent={(v) => handleChange("content", v)}
        tags={state.tags}
        setTags={(v) => handleChange("tags", v)}
        metaDescription={state.meta_description}
        setMetaDescription={(v) => handleChange("meta_description", v)}
        metaKeywords={state.meta_keywords}
        setMetaKeywords={(v) => handleChange("meta_keywords", v)}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Update Blog"
      />
    </div>
  );
}
