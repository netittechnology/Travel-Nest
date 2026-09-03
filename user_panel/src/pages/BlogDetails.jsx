import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import Hero from "../assets/header/blog-hero.webp";
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLink,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

/* ---------------- RECENT BLOG CAROUSEL ---------------- */
function RecentBlogCarousel({ items, navigate }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items.length) return null;

  const current = items[index];

  return (
    <div>
      <img
        src={current.image?.url || Hero}
        alt={current.title}
        className="w-full h-40 object-cover rounded-xl"
      />

      <div className="p-4">
        <h4 className="font-semibold text-gray-800 line-clamp-1">
          {current.title}
        </h4>

        <p className="text-xs text-gray-500 mt-1">
          {new Date(current.created_at).toDateString()}
        </p>

        <button
          onClick={() => navigate(`/blog/${current.slug}`)}
          className="mt-3 w-full bg-[#02878b] hover:bg-[#026f72] text-white py-2 rounded-lg text-sm transition"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});
  const [pageUrl, setPageUrl] = useState("");
  const [recentBlogs, setRecentBlogs] = useState([]);

  /* FETCH BLOG */
  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/blogs?limit=100");

      const found = res.data?.data?.items?.find(
        (b) => b.slug === slug
      );

      setBlog(found || null);

      // recent blogs
      const recent =
        res.data?.data?.items?.slice(0, 5) || [];

      setRecentBlogs(recent);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* URL */
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  /* CONTACT */
  useEffect(() => {
    setContact({
      phone: "+94 11 234 5678",
      whatsapp: "+94771234567",
      emails: ["info@tournest.com"],
    });
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert("Link copied!");
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#02878b]/20 border-t-[#02878b] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600 font-medium">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  /* ================= BLOG NOT FOUND ================= */
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Blog not found
          </h2>

          <button
            onClick={() => navigate("/blog")}
            className="mt-5 bg-[#02878b] hover:bg-[#026f72] text-white px-6 py-3 rounded-full transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const paragraphs =
    blog.content?.split(/\n\s*\n/) || [];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img
          src={blog.image?.url || Hero}
          className="w-full h-full object-cover"
          alt={blog.title}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <span className="text-[#4db8b8] uppercase text-sm tracking-widest">
           Blog
          </span>

          <h1 className="text-white text-3xl md:text-5xl font-bold max-w-4xl">
            {blog.title}
          </h1>

          <p className="text-gray-200 mt-3 text-sm md:text-base">
            {new Date(blog.created_at).toDateString()}
          </p>
        </div>
      </section>

      {/* ================= CONTENT GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-10">
          {/* BACK */}
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-[#02878b] font-semibold hover:text-[#026f72] transition"
          >
            ← Back to Blogs
          </button>

          <div>
            {/* TITLE */}
            <h2 className="text-3xl font-bold text-gray-800">
              {blog.title}
            </h2>

            {/* DATE */}
            <div className="flex gap-2 mt-6 mb-6">
              <span className="bg-[#e3f6f6] text-[#026f72] px-3 py-1 rounded-full text-sm">
                {new Date(blog.created_at).toDateString()}
              </span>
            </div>

            {/* EXCERPT */}
            <p className="text-gray-500 italic mb-6">
              {blog.excerpt}
            </p>

            {/* CONTENT */}
            <div className="text-gray-700 leading-7 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* TAGS */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#e3f6f6] text-[#026f72] px-3 py-1 rounded-full text-sm border border-[#cceeee]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* ================= BLOG INFO ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold mb-3 text-gray-800">
                Blog Info
              </h3>

              <p className="text-sm text-gray-600">
                Published
              </p>

              <p className="text-gray-500 text-sm mb-3">
                {new Date(blog.created_at).toDateString()}
              </p>

              <p className="text-sm text-gray-600">
                Meta Description
              </p>

              <p className="text-gray-500 text-sm mb-3">
                {blog.meta_description ||
                  "No meta description"}
              </p>

              <p className="text-sm text-gray-600">
                Meta Keywords
              </p>

              <p className="text-gray-500 text-sm">
                {blog.meta_keywords?.length
                  ? blog.meta_keywords.join(", ")
                  : "No keywords"}
              </p>
            </div>

            {/* ================= SHARE ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold mb-4 text-gray-800">
                Share
              </h3>

              <div className="flex gap-3 flex-wrap">
                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    pageUrl
                  )}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#02878b] hover:bg-[#026f72] text-white transition"
                >
                  <FaWhatsapp />
                </a>

                {/* FACEBOOK */}
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    pageUrl
                  )}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#026f72] hover:bg-[#025b5e] text-white transition"
                >
                  <FaFacebookF />
                </a>

                {/* X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    pageUrl
                  )}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white"
                >
                  <FaXTwitter />
                </a>

                {/* COPY LINK */}
                <button
                  onClick={handleCopyLink}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#02878b] hover:bg-[#026f72] text-white transition"
                >
                  <FaLink />
                </button>
              </div>
            </div>

            {/* ================= CONTACT ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3">
                Need Help?
              </h3>

              <div className="space-y-3 text-sm">
                {/* PHONE */}
                <a
                  href="sms:+94759990663?body=Hello%20Tour%20Nest,%20I%20would%20like%20to%20inquire%20about%20your%20tour%20packages.%20Please%20share%20more%20details.%20Thank%20you."
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaPhone className="text-[#02878b]" />

                  +94 75 999 0663
                </a>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${"94707890663".replace(
                    /\D/g,
                    ""
                  )}?text=Hello%20Tour%20Nest!%20I%E2%80%99m%20interested%20in%20your%20Sri%20Lanka%20tour%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#f0fafa] p-3 rounded-lg hover:bg-[#e3f6f6]"
                >
                  <FaWhatsapp className="text-[#02878b]" />

                  WhatsApp Chat
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:info@tournest.com"
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100"
                >
                  <FaEnvelope className="text-gray-600" />

                  Email Support
                </a>
              </div>
            </div>

            {/* ================= RECENT BLOGS ================= */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="font-bold mb-4 text-gray-800">
                Recent Blogs
              </h3>

              <RecentBlogCarousel
                items={recentBlogs}
                navigate={(path) =>
                  (window.location.href = path)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
