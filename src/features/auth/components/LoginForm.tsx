import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import propertyImg from "../../../assets/pexels-mukula-igavinchi-443985808-15496495.jpg";
import ardhiLogo from "../../../assets/ardhitech_logo.png"
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
    <>
      {/* Poppins font import — add to your index.html if not already present */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" /> */}

      <style>{`
        * { font-family: 'Poppins', sans-serif; }

        .input-ardhitech {
          width: 100%;
          padding: 13px 16px;
          border-radius: 10px;
          background: #F9FAFB;
          border: 1.5px solid #E5E7EB;
          font-size: 14px;
          color: #111827;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .input-ardhitech::placeholder { color: #9CA3AF; }
        .input-ardhitech:focus {
          border-color: #C0182A;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(192, 24, 42, 0.08);
        }

        .btn-ardhitech {
          width: 100%;
          padding: 13px 20px;
          border-radius: 10px;
          background: #C0182A;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: -0.2px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(192, 24, 42, 0.22);
        }
        .btn-ardhitech:hover:not(:disabled) {
          background: #8C1020;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(192, 24, 42, 0.30);
        }
        .btn-ardhitech:active:not(:disabled) { transform: translateY(0); }
        .btn-ardhitech:disabled { opacity: 0.7; cursor: not-allowed; }

        .pulse-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
          animation: pulse-anim 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-anim {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.1); }
        }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .right-panel-overlay::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(192,24,42,0.60) 0%, rgba(192,24,42,0.22) 50%, transparent 100%);
          z-index: 1; pointer-events: none;
        }

        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(192,24,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,24,42,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
      `}</style>

      <div className="min-h-screen flex bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>

        {/* ── LEFT PANEL ── */}
        <div className="relative flex flex-col w-full lg:w-[52%] px-10 py-10 overflow-y-auto">

          {/* Grid background */}
          <div className="grid-bg" />

          {/* Top: Logo */}
          <div className="relative z-10 mb-10">
            <div className="flex items-center gap-3">
              {/* Logo mark */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">

                <img
                  src={ardhiLogo}
                  alt="Property"
                  className="absolute inset-0 w-36"
                />

              </div>
            </div>
          </div>

          {/* Middle: Preamble + Form */}
          <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[440px] w-full mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 mb-5 w-fit"
              style={{
                background: "rgba(192,24,42,0.05)",
                border: "1px solid rgba(192,24,42,0.12)",
                borderRadius: "100px",
                padding: "4px 10px 4px 6px",
              }}
            >
              <span className="pulse-dot" />
              <span className="text-xs font-500" style={{ color: "#C0182A", fontWeight: 500 }}>
                Property Management Portal
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl leading-tight mb-2" style={{ color: "#111827", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Ardhitech Dashboard
            </h1>

            {/* Preamble */}
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6B7280", fontWeight: 400 }}>
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
                  className="flex flex-col gap-0.5 flex-1 min-w-[90px]"
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    boxShadow: "0 1px 4px rgba(192,24,42,0.05)",
                  }}
                >
                  <span className="text-base" style={{ color: "#C0182A", fontWeight: 700 }}>{value}</span>
                  <span className="text-xs" style={{ color: "#6B7280", fontWeight: 400 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full mb-6" style={{ height: "1px", background: "#E5E7EB" }} />

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div
                  className="text-xs px-4 py-3 rounded-lg"
                  style={{ background: "rgba(239,68,68,0.07)", color: "#DC2626", border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs" style={{ color: "#6B7280", fontWeight: 500 }}>
                  Organisational Email
                </label>
                <input
                  className="input-ardhitech"
                  type="email"
                  name="email"
                  placeholder="you@ardhitech.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs" style={{ color: "#6B7280", fontWeight: 500 }}>
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs transition-colors"
                    style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C0182A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  className="input-ardhitech"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" disabled={isLoading} className="btn-ardhitech mt-1">
                {isLoading ? (
                  <>
                    <span className="spinner" />
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
            <p className="text-xs text-center mt-6" style={{ color: "#9CA3AF" }}>
              Access is provisioned by your organisation · ardhitech.com
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="hidden lg:block lg:w-[48%] relative right-panel-overlay overflow-hidden">
          {/* Background image */}
          <img
            src={propertyImg}
            alt="Property"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top-right decorative element */}
          <div
            className="absolute top-8 right-8 z-10 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span className="pulse-dot" style={{ background: "#22C55E" }} />
            <span className="text-white text-xs font-500" style={{ fontWeight: 500 }}>Live Portfolio View</span>
          </div>

          {/* Bottom overlay card */}
          <div
            className="absolute bottom-8 left-8 right-8 z-10 text-white"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              What you get access to
            </p>

            {[
              "Property listings — upload, publish & manage",
              "Invoice tracking & financial reporting",
              "Blog management & content publishing",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 mb-2 last:mb-0">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 28, height: 28,
                    borderRadius: 7,
                    background: "rgba(192,24,42,0.30)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)", fontWeight: 400 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};
