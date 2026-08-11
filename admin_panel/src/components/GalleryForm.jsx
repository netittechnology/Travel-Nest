import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  MapPin,
  Tags,
  Save,
  Pencil,
  Plus,
} from "lucide-react";
import ImageDropzone from "./ImageDropzone";

export default function GalleryForm({
  initialData = null,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const [categories] = useState([
    {
      value: "WILDLIFE_PHOTOGRAPHY",
      label: "Wildlife Photography",
    },
    {
      value: "BIRDWATCHING_EXPERIENCES",
      label: "Birdwatching Experiences",
    },
    {
      value: "WHALE_MARINE_LIFE",
      label: "Whale & Marine Life",
    },
    {
      value: "DAY_EXCURSIONS",
      label: "Day Excursions",
    },
    {
      value: "CULTURAL_HERITAGE",
      label: "Cultural Heritage",
    },
    {
      value: "ADVENTURE_EXPERIENCES",
      label: "Adventure Experiences",
    },
    {
      value: "WILDLIFE_NATURE",
      label: "Wildlife & Nature",
    },
    {
      value: "COASTAL_BEACHES",
      label: "Coastal & Beaches",
    },
    {
      value: "HILL_COUNTRY_MOUNTAINS",
      label: "Hill Country & Mountains",
    },
  ]);

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category || "");
      setTitle(initialData.title || "");
      setLocation(initialData.location || "");
      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "category",
      category === "CUSTOM" ? customCategory : category
    );

    formData.append("title", title);
    formData.append("location", location || "");

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
                <ImageIcon size={23} className="text-white" strokeWidth={1.8} />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {initialData ? "Edit Gallery Image" : "Add Gallery Image"}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {initialData
                  ? "Update the gallery image and its information."
                  : "Add a new image to your travel gallery."}
              </p>
            </div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* IMAGE INFORMATION */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <ImageIcon size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Image Information
                </h3>

                <p className="text-xs text-slate-400">
                  Provide the basic information for this gallery image.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Image Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Yala Safari Sunrise"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* LOCATION */}
              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <MapPin size={15} />
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Yala National Park, Sri Lanka"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* CATEGORY */}
              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <Tags size={15} />
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                >
                  <option value="">Select Category</option>

                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}

                  <option value="CUSTOM">Other (Custom Category)</option>
                </select>
              </div>

              {/* CUSTOM CATEGORY */}
              {category === "CUSTOM" && (
                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                    <Plus size={15} />
                    Custom Category
                  </label>

                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="w-full rounded-xl border border-[#172d35]/30 bg-[#172d35]/[0.03] px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Enter a category that is not available in the list.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* IMAGE UPLOAD */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <ImageIcon size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Gallery Image
                </h3>

                <p className="text-xs text-slate-400">
                  Upload the image you want to display in the gallery.
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
                  {initialData ? "Update" : "Save"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <p className="text-center text-xs text-slate-400">
            Use high-quality images to create a professional travel gallery.
          </p>
        </div>
      </form>
    </div>
  );
}
