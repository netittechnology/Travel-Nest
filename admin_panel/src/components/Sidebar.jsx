import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../lib/authStore";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  MapPinned,
  Map,
  Image,
  PenTool,
  BookOpen,
  Star,
  LogOut,
  Route,
  Hotel,
  UserCog,
  UsersIcon,
  ChevronRight,
} from "lucide-react";
// import logo from "../../assets/logo/logo.webp";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const logoutLocal = useAuthStore((s) => s.logoutLocal);

  const baseLink =
    "group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium";

  const activeLink = "bg-white/[0.10] text-white shadow-sm";

  const inactiveLink = "text-slate-400 hover:bg-white/[0.06] hover:text-white";

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      logoutLocal();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      logoutLocal();
      navigate("/login");
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col overflow-hidden border-r border-white/[0.08] bg-[#172d35] text-slate-200 shadow-2xl">
      {/* BRAND */}
      <div className="border-b border-white/[0.08] px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#172d35] shadow-sm">
            <MapPinned size={21} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-white">
              Tour Nest
            </h1>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">
              ADMIN PANEL
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="admin-sidebar-scroll flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Main Menu
        </p>

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <LayoutDashboard size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Dashboard</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <UsersIcon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Admins</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/destinations"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <Map size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Destinations</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/tours"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <MapPinned size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Itineraries</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/hotels"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <Hotel size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Hotels</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/gallery"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <Image size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Gallery</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/experiences"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <PenTool size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Experiences</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <BookOpen size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Blog</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <div className="my-4 border-t border-white/[0.06]" />

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Bookings & Reviews
        </p>

        <NavLink
          to="/admin/tour-booking"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <Route size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Itinerary Bookings</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/tailor-made-tour-booking"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <UserCog size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Custom Tours</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/tour-reviews"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
              )}
              <Star size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="flex-1">Reviews</span>
              {isActive && (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </>
          )}
        </NavLink>
      </nav>

      {/* BOTTOM GRADIENT */}
      <div className="pointer-events-none absolute bottom-[77px] left-0 h-12 w-full bg-gradient-to-t from-[#172d35] to-transparent" />

      {/* LOGOUT */}
      <div className="border-t border-white/[0.08] bg-[#172d35] p-3">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-colors group-hover:bg-red-500/10">
            <LogOut size={17} />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
