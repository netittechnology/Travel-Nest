import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../assets/header/blog-hero.webp";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

/* =========================================================
   SKELETON
========================================================= */
function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm animate-pulse"
        >
          <div className="h-56 bg-gray-200" />

          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-3 bg-gray-200 rounded-lg w-1/3" />
            <div className="h-3 bg-gray-200 rounded-lg w-full" />
            <div className="h-3 bg-gray-200 rounded-lg w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-[#02878b]/10 flex items-center justify-center mb-5 text-3xl">
        ✍️
      </div>

      <h2 className="text-2xl font-bold text-[#102a36]">
        No blogs found
      </h2>

      <p className="text-[#4b6b73] mt-2 max-w-md">
        Try changing your search or filters, or check again later.
      </p>
    </div>
  );
}

export default function Blogs() {
  const [showText, setShowText] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("oldest");

  const [loading, setLoading] = useState(false);

  /* =========================================================
     HERO ANIMATION
  ========================================================= */
  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* =========================================================
     FETCH BLOGS
  ========================================================= */
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/blogs", {
        params: {
          page,
          limit: 6,
          sort_order: sortType === "oldest" ? "ASC" : "DESC",
          is_published: true,
        },
      });

      setBlogs(res.data?.data?.items || []);
      setMeta(res.data?.data?.meta || null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, sortType]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafcfb]">
      {/* =====================================================
          SEO
      ===================================================== */}
      <Helmet>
        <title>Travel Blog | Travel Nest</title>

        <meta
          name="description"
          content="Explore travel stories, guides, cultural experiences, hidden gems, and travel insights from Sri Lanka."
        />

        <link
          rel="canonical"
          href="https://travelnest.com/blog"
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Hero}
            alt="Sri Lanka Travel Blog"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: showText ? 1 : 0,
            y: showText ? 0 : 40,
          }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <span className="text-[#7dd3d3] uppercase tracking-widest text-sm font-bold">
            Travel Stories
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            Blogs & Insights
          </h1>

          <p className="text-white/90 mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
            Explore travel stories, guides, hidden gems, and inspiring
            experiences from across Sri Lanka.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="py-8 lg:py-12 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* =================================================
              HEADER
          ================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-[#02878b] text-2xl md:text-3xl font-normal font-allura drop-shadow-lg">
              Stories From Sri Lanka
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#102a36] mt-1">
              Travel Stories &
              <span className="text-[#02878b]"> Insights</span>
            </h2>

            <p className="text-[#4b6b73] mt-4 max-w-2xl mx-auto leading-relaxed">
              Discover inspiring travel guides, hidden gems, cultural
              experiences, and expert tips to explore Sri Lanka like never
              before.
            </p>
          </motion.div>

          {/* =================================================
              SORT
          ================================================= */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {["oldest", "latest", "random"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSortType(type);
                  setPage(1);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  sortType === type
                    ? "bg-[#02878b] text-white shadow-lg shadow-[#02878b]/20"
                    : "bg-white text-[#4b6b73] border border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}
          {loading ? (
            <BlogSkeleton />
          ) : blogs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={blog.image?.url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102a36]/70 via-transparent to-transparent opacity-70" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#102a36] line-clamp-1 group-hover:text-[#02878b] transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-[#4b6b73] mt-2">
                      {new Date(blog.created_at).toDateString()}
                    </p>

                    <p className="text-sm text-[#4b6b73] mt-3 line-clamp-3 leading-relaxed">
                      {blog.excerpt || blog.content}
                    </p>

                    <Link to={`/blog/${blog.slug}`}>
                      <button className="mt-5 w-full bg-[#02878b] text-white py-3 rounded-full font-semibold hover:bg-[#026f72] transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                        Read More
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* =================================================
              PAGINATION
          ================================================= */}
          {meta && (
            <div className="flex justify-center mt-14 gap-2 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={!meta.hasPreviousPage}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Prev
              </button>

              {[...Array(meta.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl border font-semibold transition-all ${
                    meta.currentPage === i + 1
                      ? "bg-[#02878b] text-white border-[#02878b] shadow-md"
                      : "bg-white text-[#4b6b73] border-gray-200 hover:border-[#02878b] hover:text-[#02878b]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, meta.totalPages))
                }
                disabled={!meta.hasNextPage}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#4b6b73] hover:border-[#02878b] hover:text-[#02878b] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
