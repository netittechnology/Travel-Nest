import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../../lib/authStore";
import { getHomePathByRole } from "../../lib/roles";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import GoogleLoginButton from "../../common/GoogleLoginButton";

export default function Auth() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email: loginEmail, password: loginPassword });
    if (res.success) {
      navigate(getHomePathByRole(res.user?.role));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 relative overflow-hidden">
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-4 left-4 md:top-8 md:left-8 z-30"
      >
        <a
          href={import.meta.env.VITE_USER_PANEL_URL}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-white transition duration-300 bg-white border border-slate-200 shadow-md hover:bg-blue-600 px-4 py-2.5 rounded-full group active:scale-95"
        >
          <ArrowLeft
            size={14}
            className="text-slate-500 group-hover:text-white transition-colors duration-300"
          />
          <span>Back to Home</span>
        </a>
      </motion.div>

      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Desktop Layout Container */}
      <div className="relative w-full max-w-3xl h-[490px] bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden hidden md:flex">
        {/* Left Side Banner (Gradient Overlay Promo) */}
        <div className="w-1/2 h-full bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-500 text-white p-8 flex flex-col justify-center overflow-hidden z-20 shadow-2xl relative">
          <div className="absolute top-[-80px] right-[-80px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-80px] left-[-80px] w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col justify-center h-full relative z-10 text-left space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider w-fit backdrop-blur-md">
              <ShieldCheck size={14} className="text-cyan-200" />
              <span>Tour Nest Admin</span>
            </div>

            <h2 className="text-2xl font-display font-bold uppercase tracking-wide">
              Tour Nest
            </h2>

            <p className="text-xs text-white/95 leading-relaxed font-light">
              Secure administration portal for managing tour packages, bookings,
              customers, inquiries, and website content from one centralized
              dashboard.
            </p>

            {/* Feature Cards inside Promo */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                <LayoutDashboard size={16} className="text-cyan-200 shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Manage Tours & Bookings
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                <ShieldCheck size={16} className="text-cyan-200 shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Secure Admin Access
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                <Sparkles size={16} className="text-cyan-200 shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Customer & Inquiry Management
                </span>
              </div>
            </div>

            <div className="pt-2 text-left border-t border-white/10 mt-4">
              <p className="text-[10px] text-white/70 font-light">
                © {new Date().getFullYear()} Tour Nest. All Rights Reserved.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side Container (Log In Form) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-1/2 h-full flex flex-col justify-center px-10 py-6 ml-auto text-left"
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-cyan-600" size={16} />
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Tour Nest
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-800 uppercase mb-1">
            Admin Login
          </h2>
          <p className="text-xs text-slate-500 mb-4 font-light">
            Enter administrator credentials to access your account
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-3">
            {/* Email input */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <input
                type="email"
                placeholder="Admin email address"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm font-light transition"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-9 pr-9 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm font-light transition"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end text-xs">
              <Link
                to="/forgot-password"
                className="text-xs text-cyan-600 hover:text-blue-600 transition font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isAuthLoading ? "Logging in..." : "Log In to Admin Panel"}
            </button>
            <GoogleLoginButton />
          </form>

          <p className="text-[9px] text-center text-slate-400 mt-4 font-light">
            By continuing, you agree to Tour Nest Terms & Privacy Policy
          </p>
        </motion.div>
      </div>

      {/* Mobile Layout Container */}
      <div className="relative w-full max-w-sm bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 md:hidden overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-left"
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-cyan-600" size={16} />
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
             Tour Nest
            </span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-800 uppercase mb-1">
            Admin Login
          </h2>
          <p className="text-xs text-slate-500 mb-4 font-light">
            Enter administrator credentials to access your account
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-3">
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <input
                type="email"
                placeholder="Admin email address"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm font-light transition"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-9 pr-9 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm font-light transition"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end text-xs">
              <Link
                to="/forgot-password"
                className="text-xs text-cyan-600 hover:text-blue-600 transition font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition shadow-md hover:shadow-blue-500/20 cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? "Logging in..." : "Log In to Admin Panel"}
            </button>
            <GoogleLoginButton />
          </form>

          <p className="text-[9px] text-center text-slate-400 mt-4 relative z-10 font-light">
            By continuing, you agree to Tour Nest <a
                  href="/privacy-policy"
                  className="hover:text-[#02878b] transition"
                >
                  Privacy Policy
                </a> & Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
