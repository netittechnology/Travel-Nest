import {
  Hotel,
  FileText,
  MapPin,
  Tags,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import ImageDropzone from "./ImageDropzone";

export default function HotelForm({
  name,
  setName,
  shortDescription,
  setShortDescription,
  description,
  setDescription,
  category,
  setCategory,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  highlightKeywords,
  setHighlightKeywords,
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
              <Hotel size={23} className="text-white" strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {buttonText}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Add and manage hotel information for your travel platform.
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
                  Hotel Information
                </h3>

                <p className="text-xs text-slate-400">
                  Enter the main details of the hotel.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* HOTEL NAME */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Hotel Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter hotel name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* SHORT DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Short Description
                </label>

                <input
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter a short description"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* ABOUT HOTEL */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  About Hotel
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe the hotel, facilities, atmosphere, services, and other important information."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <Tags size={15} />
                  Category
                </label>

                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Luxury, Beach, Boutique"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
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
                  Hotel Location
                </h3>

                <p className="text-xs text-slate-400">
                  Add the geographical coordinates of the hotel.
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
                  placeholder="e.g. 6.9271"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* LONGITUDE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Longitude
                </label>

                <input
                  placeholder="e.g. 79.8612"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>
            </div>
          </section>

          {/* KEYWORDS */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <Tags size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Highlight Keywords
                </h3>

                <p className="text-xs text-slate-400">
                  Add keywords that describe the hotel.
                </p>
              </div>
            </div>

            <textarea
              value={highlightKeywords}
              onChange={(e) => setHighlightKeywords(e.target.value)}
              placeholder="beach, spa, luxury, ocean view"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate multiple keywords with commas.
            </p>
          </section>

          {/* IMAGE */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <ImageIcon size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Hotel Image
                </h3>

                <p className="text-xs text-slate-400">
                  Upload the main image for this hotel.
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
            Keep hotel information accurate and up to date.
          </p>
        </div>
      </form>
    </div>
  );
}
