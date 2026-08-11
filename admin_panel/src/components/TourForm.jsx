import {
  MapPinned,
  MapPin,
  FileText,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Plus,
  X,
  Save,
} from "lucide-react";
import ImageDropzone from "./ImageDropzone";

export default function TourForm({
  title,
  setTitle,
  slug,
  setSlug,
  location,
  setLocation,
  description,
  setDescription,
  duration,
  setDuration,
  itineraryDays,
  setItineraryDays,
  includes,
  setIncludes,
  highlights,
  setHighlights,
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
              <MapPinned size={23} className="text-white" strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {buttonText}
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Create and manage your travel itinerary information.
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
                  Basic Information
                </h3>
                <p className="text-xs text-slate-400">
                  Enter the main details of your itinerary.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter itinerary title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* SLUG */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Slug
                </label>

                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-friendly-slug"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <MapPin size={15} />
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#172d35]">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
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
                  placeholder="e.g. 1 Day, 2 Days / 1 Night"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>
            </div>
          </section>

          {/* ITINERARY DAYS */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                  <CalendarDays size={17} className="text-[#172d35]" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#172d35]">
                    Itinerary Days
                  </h3>
                  <p className="text-xs text-slate-400">
                    Build your day-by-day travel schedule.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setItineraryDays([
                    ...itineraryDays,
                    {
                      day: `Day ${itineraryDays.length + 1}`,
                      title: "",
                      description: "",
                      details: "",
                      location: "",
                    },
                  ])
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-[#172d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#213f49] hover:shadow-md"
              >
                <Plus size={16} />
                Add Day
              </button>
            </div>

            <div className="space-y-4">
              {itineraryDays?.map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:border-slate-300"
                >
                  {/* DAY HEADER */}
                  <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35] text-xs font-bold text-white">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#172d35]">
                          {item.day || `Day ${index + 1}`}
                        </p>
                        <p className="text-xs text-slate-400">
                          Itinerary day details
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = itineraryDays.filter(
                          (_, i) => i !== index
                        );
                        setItineraryDays(updated);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Remove Day"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* DAY */}
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-[#172d35]">
                        Day
                      </label>

                      <input
                        value={item.day || `Day ${index + 1}`}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[index].day = e.target.value;
                          setItineraryDays(updated);
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:ring-4 focus:ring-[#172d35]/10"
                        placeholder={`Day ${index + 1}`}
                      />
                    </div>

                    {/* LOCATION */}
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-[#172d35]">
                        Location
                      </label>

                      <input
                        placeholder="Enter location"
                        value={item.location}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[index].location = e.target.value;
                          setItineraryDays(updated);
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:ring-4 focus:ring-[#172d35]/10"
                      />
                    </div>

                    {/* TITLE */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold text-[#172d35]">
                        Title
                      </label>

                      <input
                        placeholder="Enter title"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[index].title = e.target.value;
                          setItineraryDays(updated);
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:ring-4 focus:ring-[#172d35]/10"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold text-[#172d35]">
                        Day to Day Details
                      </label>

                      <input
                        placeholder="Comma separated, e.g. Pickup, Hotel check-in, Relax"
                        value={item.details}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[index].details = e.target.value;
                          setItineraryDays(updated);
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:ring-4 focus:ring-[#172d35]/10"
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold text-[#172d35]">
                        Description
                      </label>

                      <textarea
                        placeholder="Enter itinerary description"
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[index].description = e.target.value;
                          setItineraryDays(updated);
                        }}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:ring-4 focus:ring-[#172d35]/10"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {(!itineraryDays || itineraryDays.length === 0) && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                  <CalendarDays size={25} className="mx-auto text-slate-300" />
                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    No itinerary days added
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Click “Add Day” to start building your itinerary.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* INCLUDES & HIGHLIGHTS */}
          <section className="border-t border-slate-100 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172d35]/10">
                <Sparkles size={17} className="text-[#172d35]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  Tour Details
                </h3>
                <p className="text-xs text-slate-400">
                  Add inclusions and memorable highlights.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* INCLUDES */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <CheckCircle2 size={15} />
                  Includes
                </label>

                <textarea
                  value={includes}
                  onChange={(e) => setIncludes(e.target.value)}
                  placeholder="Comma separated (e.g. Guide, Transport, Meals)"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                />
              </div>

              {/* HIGHLIGHTS */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#172d35]">
                  <Sparkles size={15} />
                  Highlights
                </label>

                <textarea
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  placeholder="Comma separated highlights"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
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
                  Featured Image
                </h3>
                <p className="text-xs text-slate-400">
                  Upload an image for your itinerary.
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
            Keep your itinerary information clear, accurate, and up to date.
          </p>
        </div>
      </form>
    </div>
  );
}
