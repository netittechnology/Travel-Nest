import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstance";
import BlogForm from "../../components/BlogForm";
import { ArrowLeft } from "lucide-react";

export default function AddBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("meta_description", metaDescription);
    formData.append("meta_keywords", metaKeywords);
    formData.append("file", file);

    try {
      await axiosInstance.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog created");
      navigate("/admin/blogs");
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
        onClick={() => navigate("/admin/blogs")}
        className="flex items-center gap-2 text-sm font-medium text-[#0f2f1f] hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Blogs
      </button>

      <BlogForm
        title={title}
        setTitle={setTitle}
        excerpt={excerpt}
        setExcerpt={setExcerpt}
        content={content}
        setContent={setContent}
        tags={tags}
        setTags={setTags}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
        metaKeywords={metaKeywords}
        setMetaKeywords={setMetaKeywords}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Add Blog"
      />
    </div>
  );
}
