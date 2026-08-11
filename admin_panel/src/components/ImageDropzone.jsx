import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Image as ImageIcon, CheckCircle2, FileImage } from "lucide-react";

export default function ImageDropzone({ file, setFile, preview, setPreview }) {
  const inputRef = useRef();

  const handleFile = (f) => {
    if (!f) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    // Validate file type
    if (!allowedTypes.includes(f.type)) {
      alert("Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP).");
      return;
    }

    // Validate file size (10MB max)
    const maxSizeMB = 10;
    if (f.size > maxSizeMB * 1024 * 1024) {
      alert("File too large. Maximum allowed size is 10MB.");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <div className="w-full">
      {/* LABEL */}
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
        <ImageIcon size={16} />
        Image Upload
      </label>

      {/* DROPZONE */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white px-5 py-10 text-center transition-all duration-200 hover:border-[#172d35]/50 hover:bg-[#172d35]/[0.02]"
      >
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {/* UPLOAD ICON */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172d35]/10 transition-transform duration-200 group-hover:scale-105">
          <FiUploadCloud size={30} className="text-[#172d35]" />
        </div>

        {/* MAIN TEXT */}
        <p className="mt-4 text-sm font-semibold text-[#172d35]">
          Drag & Drop or Click to Upload
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Upload your itinerary featured image
        </p>

        {/* INFO */}
        <div className="mx-auto mt-5 flex max-w-md flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-500">
            <CheckCircle2 size={12} className="text-[#172d35]" />
            Max 10MB
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-500">
            <FileImage size={12} className="text-[#172d35]" />
            WebP Recommended
          </span>
        </div>
      </div>

      {/* SUPPORTED FORMATS */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Supported: JPG, JPEG, PNG, GIF, WEBP</span>
        <span>Maximum 10MB</span>
      </div>

      {/* SELECTED FILE */}
      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#172d35]/10">
            <FileImage size={17} className="text-[#172d35]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Selected file
            </p>

            <p className="truncate text-sm font-semibold text-[#172d35]">
              {file.name}
            </p>
          </div>

          <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#172d35]">
                Image Preview
              </p>
              <p className="text-xs text-slate-400">Selected image</p>
            </div>

            <div className="rounded-lg bg-[#172d35]/10 px-2.5 py-1 text-[10px] font-semibold text-[#172d35]">
              PREVIEW
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img
              src={preview}
              alt="preview"
              className="mx-auto h-64 w-full object-cover sm:h-72"
            />
          </div>
        </div>
      )}
    </div>
  );
}
