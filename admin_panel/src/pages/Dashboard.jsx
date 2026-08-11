import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import {
  MapPinned,
  Map,
  PenTool,
  BookOpen,
  Route,
  Hotel,
  UserCog,
  UsersIcon,
  ArrowUpRight,
  CalendarDays,
  FileText,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    tours: 0,
    bookings: 0,
    tailorBookings: 0,
    users: 0,
    destinations: 0,
    hotels: 0,
    experiences: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [
        blogsRes,
        toursRes,
        bookingsRes,
        tailorRes,
        usersRes,
        destinationsRes,
        hotelsRes,
        experiencesRes,
      ] = await Promise.all([
        axiosInstance.get("/blogs"),
        axiosInstance.get("/tours"),
        axiosInstance.get("/tour-booking"),
        axiosInstance.get("/tailor-made-tour-booking"),
        axiosInstance.get("/users"),
        axiosInstance.get("/destinations"),
        axiosInstance.get("/hotels"),
        axiosInstance.get("/experiences"),
      ]);

      const blogs = blogsRes.data?.data?.items || [];
      const tours = toursRes.data?.data?.items || [];
      const bookings = bookingsRes.data?.data?.items || [];
      const tailorBookings = tailorRes.data?.data?.items || [];
      const users = usersRes.data?.items || usersRes.data?.data?.items || [];
      const destinations = destinationsRes.data?.data?.items || [];
      const hotels = hotelsRes.data?.data?.items || [];
      const experiences = experiencesRes.data?.data?.items || [];

      setStats({
        blogs: blogs.length,
        tours: tours.length,
        bookings: bookings.length,
        tailorBookings: tailorBookings.length,
        users: users.length,
        destinations: destinations.length,
        hotels: hotels.length,
        experiences: experiences.length,
      });

      setRecentBookings(bookings.slice(0, 5));
      setRecentBlogs(blogs.slice(0, 5));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ title, value, icon: Icon }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#172d35]/[0.03] -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-[#172d35]">
            {value}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400">
            <Activity size={13} />
            <span>Current total</span>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172d35] shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Icon size={21} strokeWidth={1.8} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-[#172d35]" />
              Overview
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#172d35] sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor your travel platform and manage your content.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <CalendarDays size={17} className="text-[#172d35]" />
            <span className="text-sm font-medium text-slate-600">
              Dashboard Overview
            </span>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-3 rounded-xl border border-[#172d35]/10 bg-white px-5 py-4 text-sm font-medium text-[#172d35] shadow-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#172d35]/20 border-t-[#172d35]" />
            Loading dashboard data...
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card title="Admins" value={stats.users} icon={UsersIcon} />
          <Card title="Destinations" value={stats.destinations} icon={Map} />
          <Card title="Itineraries" value={stats.tours} icon={MapPinned} />
          <Card title="Hotels" value={stats.hotels} icon={Hotel} />
          <Card title="Experiences" value={stats.experiences} icon={PenTool} />
          <Card title="Blogs" value={stats.blogs} icon={BookOpen} />
          <Card
            title="Itinerary Bookings"
            value={stats.bookings}
            icon={Route}
          />
          <Card
            title="Custom Tour Bookings"
            value={stats.tailorBookings}
            icon={UserCog}
          />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          {/* RECENT BOOKINGS */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172d35]/10">
                  <Route size={18} className="text-[#172d35]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#172d35]">
                    Recent Bookings
                  </h2>
                  <p className="text-xs text-slate-400">
                    Latest itinerary reservations
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
                <ArrowUpRight size={16} className="text-slate-500" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#172d35] text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-5 py-10 text-center">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                          <FileText size={18} className="text-slate-400" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-slate-600">
                          No recent bookings
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          New bookings will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#172d35] text-xs font-bold text-white">
                              {b.full_name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <div>
                              <p className="font-semibold text-[#172d35]">
                                {b.full_name}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-400">
                                {b.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-600">
                          {b.tour?.title || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {b.booking_date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT BLOGS */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172d35]/10">
                  <BookOpen size={18} className="text-[#172d35]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#172d35]">Recent Blogs</h2>
                  <p className="text-xs text-slate-400">
                    Latest content updates
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
                <ArrowUpRight size={16} className="text-slate-500" />
              </div>
            </div>

            <div className="p-5">
              {recentBlogs.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                    <BookOpen size={18} className="text-slate-400" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No blogs found
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Published content will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentBlogs.map((b) => (
                    <div
                      key={b.id}
                      className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      {b.image?.url ? (
                        <img
                          src={b.image.url}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#172d35]/10">
                          <BookOpen size={18} className="text-[#172d35]" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#172d35]">
                          {b.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              b.is_published
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`mr-1 h-1.5 w-1.5 rounded-full ${
                                b.is_published
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            {b.is_published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="text-slate-300 transition-colors group-hover:text-[#172d35]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER SUMMARY */}
        <div className="rounded-2xl bg-[#172d35] p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Travel Platform Overview
              </p>
              <p className="mt-1 text-xs text-white/60">
                Manage your destinations, tours, bookings and content from one
                place.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white/80">
                System Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
