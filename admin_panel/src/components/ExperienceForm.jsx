import { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  MapPin,
  Clock3,
  Image as ImageIcon,
  Save,
  Pencil,
} from "lucide-react";
import ImageDropzone from "./ImageDropzone";

export default function ExperienceForm({
  initialData = null,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [content, setContent] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setDuration(initialData.duration || "");
      setContent(initialData.content || "");
      setLatitude(initialData.latitude || "");
      setLongitude(initialData.longitude || "");
      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("content", content);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    if (file) formData.append("file", file);

    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* HEADER */}
        <div className="border-b border-white/10 bg-[#172d35] px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
              {initialData ? (
                <Pencil size={22} className="text-white" strokeWidth={1.8} />
              ) : (
                <Sparkles
                  size={23}
                  className="text-white"
                  strokeWidth={1.8}
                />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {initialData ? "Edit Experience" : "Add Experience"}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {initialData
                  ? "Update the experience information and location."
                  : "Create a new travel experience for your platform."}
              </p>
            </div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* BASIC INFORMATION */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <FileText size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Experience Information
                </h3>

                <p className="text-xs text-slate-400">
                  Enter the main details of the experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Experience Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sri Lankan Tea Plantation Experience"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Adventure, Culture, Nature"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* DURATION */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <Clock3 size={15} />
                  Duration
                </label>

                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 3 Hours"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* CONTENT */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Experience Content
                </label>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe the experience, activities, highlights, and what visitors can expect."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>
            </div>
          </section>

          {/* LOCATION */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <MapPin size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Experience Location
                </h3>

                <p className="text-xs text-slate-400">
                  Add the geographical coordinates for this experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* LATITUDE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Latitude
                </label>

                <input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g. 6.9271"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* LONGITUDE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Longitude
                </label>

                <input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g. 79.8612"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
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
                  Experience Image
                </h3>

                <p className="text-xs text-slate-400">
                  Upload the main image for this experience.
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
                  {initialData ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <p className="text-center text-xs text-slate-400">
            Provide clear and accurate information to create a better travel
            experience.
          </p>
        </div>
      </form>
    </div>
  );
}