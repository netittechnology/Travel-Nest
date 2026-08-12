import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";
import { FaWhatsapp, FaMapMarkedAlt } from "react-icons/fa";
import { getHomePathByRole } from "../lib/roles.js";
// import logo from "../assets/logo/logo.webp";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NormalNavbar({ user }) {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const homePath = getHomePathByRole(user?.role);

  const close = useCallback(() => {
    setOpen(false);
    setMobileDropdown(null);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    close();
    setDropdown(null);
  }, [location.pathname, close]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".dropdown-area")) {
        setDropdown(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const MENU = useMemo(
    () => [
      { name: "HOME", to: "/" },
      { name: "DESTINATIONS", to: "/destinations" },
      { name: "CUSTOM TOURS", to: "/custom-tours" },
      {
        name: "TOURS",
        dropdown: [
          { name: "ALL TOURS", to: "/itineraries" },
          { name: "DAY TOURS", to: "/itineraries/day-tours" },
          { name: "ROUND TOURS", to: "/itineraries/round-tours" },
        ],
      },
      { name: "HOTELS", to: "/hotels" },
      {
        name: "EXPLORE",
        dropdown: [
          { name: "EXPERIENCES", to: "/experience" },
          { name: "BLOGS", to: "/blog" },
          { name: "GALLERY", to: "/gallery" },
        ],
      },
      { name: "ABOUT", to: "/about" },
      { name: "CONTACT", to: "/contact" },
    ],
    []
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white py-2 lg:py-3 text-[#102a36] shadow-md"
          : "bg-transparent py-3 lg:py-6 text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link to={homePath || "/"} className="flex items-center shrink-0">
          {/* <img
            src={logo}
            alt="Logo"
            className={cn(
              "w-auto object-contain transition-all duration-500",
              isScrolled ? "h-10 lg:h-12" : "h-11 lg:h-14"
            )}
          /> */}

          {/* TEMPORARY 3 ICON LOGO */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-full bg-[#02878b] flex items-center justify-center shadow-lg">
              <FaMapMarkedAlt className="text-white text-xl" />
            </div>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[13px] xl:text-[14px] font-semibold tracking-widest">
          {MENU.map((item, idx) => (
            <div key={idx} className="relative dropdown-area">
              {!item.dropdown ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "relative block py-2 transition-colors duration-300",
                      "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-300",
                      isActive
                        ? isScrolled
                          ? "text-[#102a36] after:w-full after:bg-[#02878b]"
                          : "text-white after:w-full after:bg-[#02878b]"
                        : isScrolled
                        ? "text-[#102a36] hover:text-[#02878b] after:w-0 hover:after:w-full after:bg-[#02878b]"
                        : "text-white hover:text-[#02878b] after:w-0 hover:after:w-full after:bg-[#02878b]"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setDropdown(dropdown === idx ? null : idx)}
                    className={cn(
                      "relative flex items-center gap-1 py-2 transition-colors duration-300",
                      dropdown === idx
                        ? "text-[#02878b]"
                        : isScrolled
                        ? "text-[#102a36] hover:text-[#02878b]"
                        : "text-white hover:text-[#02878b]"
                    )}
                  >
                    {item.name}
                    <HiChevronDown
                      className={cn(
                        "text-sm transition-transform duration-300",
                        dropdown === idx && "rotate-180"
                      )}
                    />
                  </button>

                  {dropdown === idx && (
                    <div className="absolute top-full left-0 mt-3 w-52 bg-white text-[#102a36] rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                      {item.dropdown.map((d, i) => (
                        <Link
                          key={i}
                          to={d.to}
                          onClick={() => setDropdown(null)}
                          className="block px-5 py-3 text-sm font-medium transition-colors duration-200 hover:bg-[#02878b] hover:text-white"
                        >
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "lg:hidden text-2xl transition-colors duration-300",
            isScrolled
              ? "text-[#102a36] hover:text-[#02878b]"
              : "text-white hover:text-[#02878b]"
          )}
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-[82%] max-w-[340px] bg-white text-[#102a36] shadow-2xl transition-transform duration-500 lg:hidden flex flex-col z-[60]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* MOBILE HEADER */}
        <div className="flex justify-between items-center px-5 py-5 border-b border-gray-200">
          <Link to={homePath || "/"} onClick={close}>
            {/* <img src={logo} alt="Logo" className="h-10 w-auto object-contain" /> */}
            {/* TEMPORARY 3 ICON LOGO */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#02878b] flex items-center justify-center shadow-lg">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="text-2xl text-[#102a36] hover:text-[#02878b] transition-colors"
          >
            <HiOutlineX />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
          {MENU.map((item, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0">
              {!item.dropdown ? (
                <NavLink
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) =>
                    cn(
                      "relative block py-4 text-[15px] font-semibold tracking-wider transition-colors duration-300",
                      isActive
                        ? "text-[#02878b]"
                        : "text-[#102a36] hover:text-[#02878b]"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileDropdown(mobileDropdown === idx ? null : idx)
                    }
                    className="flex items-center justify-between w-full py-4 text-[15px] font-semibold tracking-wider text-[#102a36] hover:text-[#02878b] transition-colors"
                  >
                    {item.name}

                    <HiChevronDown
                      className={cn(
                        "text-lg transition-transform duration-300",
                        mobileDropdown === idx && "rotate-180 text-[#02878b]"
                      )}
                    />
                  </button>

                  {mobileDropdown === idx && (
                    <div className="ml-3 mb-3 pl-4 border-l-2 border-[#02878b] space-y-1">
                      {item.dropdown.map((d, i) => (
                        <Link
                          key={i}
                          to={d.to}
                          onClick={close}
                          className="block py-2.5 text-sm text-[#4b6b73] hover:text-[#02878b] transition-colors"
                        >
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE FOOTER */}
        <div className="p-5 border-t border-gray-200">
          <a
            href="https://wa.me/94705325512"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#02878b] px-4 py-3 text-white font-semibold hover:bg-[#026f72] transition-colors duration-300"
          >
            <FaWhatsapp className="text-lg" />
            Chat with us
          </a>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={close}
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] lg:hidden z-[50]"
        />
      )}
    </header>
  );
}
