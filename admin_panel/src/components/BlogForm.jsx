import {
  BookOpen,
  FileText,
  Search,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import ImageDropzone from "./ImageDropzone";

export default function BlogForm({
  title,
  setTitle,
  excerpt,
  setExcerpt,
  content,
  setContent,
  tags,
  setTags,
  metaDescription,
  setMetaDescription,
  metaKeywords,
  setMetaKeywords,
  file,
  setFile,
  preview,
  setPreview,
  onSubmit,
  loading,
  buttonText,
}) {
  return (
    <div className="min-h-screen bg-[#f5f7f8] px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* HEADER */}
        <div className="border-b border-white/10 bg-[#172d35] px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <BookOpen size={23} className="text-white" strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {buttonText}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Create and manage travel blog content and SEO information.
              </p>
            </div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* BLOG CONTENT */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <FileText size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Blog Content
                </h3>

                <p className="text-xs text-slate-400">
                  Add the main content and information for your blog post.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Blog Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter an engaging blog title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* EXCERPT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Excerpt
                </label>

                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Write a short summary of the blog post..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  A concise summary that gives readers an idea of what the
                  article is about.
                </p>
              </div>

              {/* CONTENT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Content
                </label>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your complete blog content here..."
                  rows={10}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* TAGS */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Tags
                </label>

                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="travel, sri lanka, tourism, beaches"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Separate multiple tags with commas.
                </p>
              </div>
            </div>
          </section>

          {/* SEO */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <Search size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  SEO Settings
                </h3>

                <p className="text-xs text-slate-400">
                  Optimize this blog post for search engines.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* META DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Meta Description
                </label>

                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Write a concise SEO description..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Recommended length: around 150–160 characters.
                </p>
              </div>

              {/* META KEYWORDS */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Meta Keywords
                </label>

                <input
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="tourism, sri lanka, travel guide"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Add relevant keywords separated by commas.
                </p>
              </div>
            </div>
          </section>

          {/* IMAGE */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <ImageIcon size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Featured Image
                </h3>

                <p className="text-xs text-slate-400">
                  Upload the main image displayed with this blog post.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <ImageDropzone
                file={file}
                setFile={setFile}
                preview={preview}
                setPreview={setPreview}
              />
            </div>
          </section>

          {/* SUBMIT */}
          <div className="border-t border-slate-100 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#172d35] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#213f49] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#172d35]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  {buttonText}
                </>
              )}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <p className="text-center text-xs text-slate-400">
            Keep your blog content informative, engaging, and optimized for
            search engines.
          </p>
        </div>
      </form>
    </div>
  );
}
