import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { axiosInstance } from "../../lib/axiosInstance";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/reset-link", { email });
      toast.success(response.data?.message || "Reset link sent successfully!");
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const msg = error.response?.data?.message;
      toast.error(
        Array.isArray(msg) ? msg[0] : msg || "Failed to send reset link"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#C8102E]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#0B192C]/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-24 h-24 bg-[#C8102E]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl text-white shadow-md mb-4">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Forgot Password
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed font-light">
            Enter your administrator email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-3.5 text-slate-400"
              size={16}
            />
            <input
              type="email"
              placeholder="Admin email address"
              className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 text-sm transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-bold transition"
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
