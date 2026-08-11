import { useState, useEffect } from "react";
import {
  MapPinned,
  FileText,
  Image as ImageIcon,
  Save,
  Pencil,
} from "lucide-react";
import ImageDropzone from "./ImageDropzone";

export default function DestinationForm({
  initialData = null,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSubtitle(initialData.subtitle || "");
      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);

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
                <MapPinned size={23} className="text-white" strokeWidth={1.8} />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {initialData ? "Edit Destination" : "Add Destination"}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {initialData
                  ? "Update the destination information and image."
                  : "Create a new destination for your travel platform."}
              </p>
            </div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-8 p-6 sm:p-8">
          {/* DESTINATION INFORMATION */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <FileText size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Destination Information
                </h3>

                <p className="text-xs text-slate-400">
                  Enter the main information for this destination.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Destination Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ella"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* SUBTITLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Subtitle
                </label>

                <input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Discover the beauty of Sri Lanka's hill country"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Keep the subtitle short, descriptive, and engaging.
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
                  Destination Image
                </h3>

                <p className="text-xs text-slate-400">
                  Upload the main image displayed for this destination.
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
                  {initialData ? "Update Destination" : "Save Destination"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <p className="text-center text-xs text-slate-400">
            Use a clear destination name, engaging subtitle, and high-quality
            image.
          </p>
        </div>
      </form>
    </div>
  );
}
