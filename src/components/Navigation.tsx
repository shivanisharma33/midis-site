import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useScrollHide } from "@/hooks/useScrollHide";

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hideNav = useScrollHide();

  const isActive = (path: string) => location.pathname === path;

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50
        transition-transform duration-300 ease-in-out
        ${hideNav ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`
          relative mx-auto flex items-center justify-between
          lg:max-w-[1400px] lg:px-6 lg:py-4 lg:bg-transparent lg:mt-0 lg:rounded-none lg:border-none lg:backdrop-blur-none
          mx-4 mt-4 px-4 py-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg
        `}>
          {/* ================= LOGO (LEFT) ================= */}
          <Link to="/" className="flex items-center z-50 relative">
            <img
              src="/images/midis final logo-01.png"
              alt="Midis Logo"
              className="h-8 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* ================= CENTER WHITE PILL ================= */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center bg-white rounded-full px-6 py-2 gap-6 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm font-medium transition-colors ${isActive(item.to)
                  ? "text-black"
                  : "text-black/60 hover:text-black"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors">
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* ================= RIGHT SIDE (DESKTOP ICONS) ================= */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white z-50 relative focus:outline-none bg-white/10 rounded-full backdrop-blur-sm border border-white/10 active:scale-95 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 lg:hidden flex flex-col bg-black/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-full"
          }`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-white/50 hover:text-white transition-colors duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Footer (Social Icons) */}
        <div className="pb-12 flex items-center justify-center gap-6">
          <a
            href="https://instagram.com"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://twitter.com"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </>
  );
};
