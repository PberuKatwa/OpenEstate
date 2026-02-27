import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";
import ardhiLogo from "../../../assets/ardhitech_logo.png";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

export const LoginForm = function () {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } catch (error) {
      console.error(`Error in handling event change`, error);
    }
  };

  const handleSubmit = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      await login(formData.email, formData.password);
      toast.success(`Successfully logged in`);
      navigate("/dashboard/blogs");
    } catch (error) {
      console.error(`Error in handling submit`, error);
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-[Poppins,sans-serif]">

      {/* ── LEFT PANEL ── */}
      <div className="relative flex flex-col w-full lg:w-[52%] px-10 py-10 overflow-y-auto">

        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(192,24,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(192,24,42,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top: Logo */}
        <div className="relative z-10 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
              <img src={ardhiLogo} alt="Ardhitech Logo" className="absolute inset-0 w-36" />
            </div>
          </div>
        </div>

        {/* Middle: Preamble + Form */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[440px] w-full mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 mb-5 w-fit bg-[rgba(192,24,42,0.05)] border border-[rgba(192,24,42,0.12)] rounded-full px-2.5 py-1">
            {/* Pulse dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.3)] animate-pulse flex-shrink-0" />
            <span className="text-xs font-medium text-[#C0182A]">
              Property Management Portal
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl leading-tight mb-2 text-gray-900 font-bold tracking-tight">
            Ardhitech Dashboard
          </h1>

          {/* Preamble */}
          <p className="text-sm mb-6 leading-relaxed text-gray-500 font-normal">
            Manage your properties, publish listings, track invoices, and oversee your entire real estate portfolio — all in one place.
          </p>

          {/* Stat chips */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {[
              { value: "500+", label: "Properties" },
              { value: "98%", label: "Uptime" },
              { value: "10k+", label: "Transactions" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 flex-1 min-w-[90px] bg-white border-[1.5px] border-gray-200 rounded-[10px] px-3.5 py-3 shadow-[0_1px_4px_rgba(192,24,42,0.05)]"
              >
                <span className="text-base text-[#C0182A] font-bold">{value}</span>
                <span className="text-xs text-gray-500 font-normal">{label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full mb-6 h-px bg-gray-200" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="text-xs px-4 py-3 rounded-lg bg-red-50 text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 font-medium">
                Organisational Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@ardhitech.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-[13px] rounded-[10px] bg-gray-50 border-[1.5px] border-gray-200 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#C0182A] focus:bg-white focus:shadow-[0_0_0_3px_rgba(192,24,42,0.08)] font-[inherit]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-500 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-[#C0182A] transition-colors bg-transparent border-none cursor-pointer font-[inherit]"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-[13px] rounded-[10px] bg-gray-50 border-[1.5px] border-gray-200 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#C0182A] focus:bg-white focus:shadow-[0_0_0_3px_rgba(192,24,42,0.08)] font-[inherit]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-5 py-[13px] mt-1 rounded-[10px] bg-[#C0182A] text-white font-bold text-sm flex items-center justify-center gap-2 tracking-[-0.2px] transition-all duration-200 shadow-[0_4px_14px_rgba(192,24,42,0.22)] hover:enabled:bg-[#8C1020] hover:enabled:-translate-y-px hover:enabled:shadow-[0_6px_20px_rgba(192,24,42,0.30)] active:enabled:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed font-[inherit]"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center mt-6 text-gray-400">
            Access is provisioned by your organisation · ardhitech.com
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="hidden lg:block lg:w-[48%] relative overflow-hidden">
        {/* Background image */}
        <img
          src={propertyImg}
          alt="Property"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(192,24,42,0.60)] via-[rgba(192,24,42,0.22)] to-transparent pointer-events-none z-[1]" />

        {/* Top-right decorative element */}
        <div className="absolute top-8 right-8 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.12] backdrop-blur-xl border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
          <span className="text-white text-xs font-medium">Live Portfolio View</span>
        </div>

        {/* Bottom overlay card */}
        <div className="absolute bottom-8 left-8 right-8 z-10 text-white bg-white/[0.10] backdrop-blur-xl border border-white/20 rounded-[14px] px-5 py-[18px]">
          <p className="text-xs mb-3 text-white/60 font-medium uppercase tracking-[0.05em]">
            What you get access to
          </p>

          {[
            "Property listings — upload, publish & manage",
            "Invoice tracking & financial reporting",
            "Blog management & content publishing",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 mb-2 last:mb-0">
              <div className="flex items-center justify-center flex-shrink-0 w-7 h-7 rounded-[7px] bg-[rgba(192,24,42,0.30)]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-white/90 font-normal">{feature}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
