"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "@/constextApi/Context";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { role, token } = useContext(Context);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    setMenuOpen(false);
    router.push("/");
    window.location.reload();
  };

  const navLinks = [
    { num: "01", name: "Home",           href: "/" },
    { num: "02", name: "About",          href: "#about" },
    { num: "03", name: "Practice Areas", href: "#practice" },
    { num: "04", name: "Blog",           href: "#blog" },
     { num: "05", name: "Service",       href: "/service" },
  ].filter((link) => {
    if (role === "lawyer" && link.name === "Practice Areas") return false;
    if (role === "client" && link.name === "Blog") return false;
    return true;
  });

  const close = () => setMenuOpen(false);


  const desktopLinkClass = (href) => {
    const base = "text-[14px] tracking-[0.16em] uppercase transition-all duration-300 pb-0.5 border-b";
    if (activeLink === href) {
      return base + " text-[#F5F4F0] border-[#C41E3A]";
    }
    return base + " text-white/45 hover:text-[#F5F4F0] border-transparent";
  };

  const sidebarLinkClass = (href, isOpen) => {
    const base = "flex items-center gap-4 pl-8 pr-6 py-[15px] text-[16px] tracking-[0.18em] uppercase border-l-2 ml-[2px] transition-all duration-300";
    const anim = isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3";
    if (activeLink === href) {
      return `${base} ${anim} text-[#F5F4F0] border-l-[#C41E3A]`;
    }
    return `${base} ${anim} text-white/40 border-l-transparent hover:text-[#F5F4F0] hover:border-l-[#9A7E4F] hover:pl-10`;
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[60px] px-5 lg:px-20 bg-[#0a0a0a] border-b border-white/[0.06]">
        
        {/* Logo */}
        <Link href="/" className="font-serif text-[13px] tracking-[0.22em] uppercase text-[#F5F4F0] flex items-baseline">
          <span className="text-[#C41E3A] text-[26px] font-bold leading-none mr-[2px]">J</span>
          ustice
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>

              <Link href={link.href} onClick={() => setActiveLink(link.href)} className={desktopLinkClass(link.href)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {token ? (
              <>
                {role === "lawyer" && (
                  <Link
                    href="/my-profile"
                    className="text-[12px] tracking-[0.14em] uppercase text-white/45 hover:text-[#F5F4F0] transition-colors duration-200"
                  >
                    My Profile
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-white/45 hover:text-[#F5F4F0] transition-colors duration-200"
                >
                  <LuLogOut className="text-base" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/lawyer-registration"
                  target="_blank"
                  className="text-[14px] tracking-[0.14em] uppercase text-[#9A7E4F] hover:text-[#F5F4F0] transition-colors duration-200"
                >
                  Become a Lawyer
                </Link>
                <Link
                  href="/login"
                  className="text-[12px] tracking-[0.14em] uppercase text-[#F5F4F0] border border-white/25 px-5 py-2 hover:bg-[#F5F4F0] hover:text-[#0a0a0a] hover:border-[#F5F4F0] transition-all duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            {!token && (
              <Link
                href="/login"
                className="text-[10px] tracking-[0.14em] uppercase text-[#F5F4F0] border border-white/25 px-4 py-1.5 hover:bg-[#F5F4F0] hover:text-[#0a0a0a] transition-all duration-200"
              >
                Login
              </Link>
            )}
            {token && role !== "lawyer" && (
              <button onClick={logout}>
                <LuLogOut className="text-xl text-white/70" />
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="flex flex-col gap-[5px] p-1 w-8"
              aria-label="Toggle menu"
            >
              <span
                className="block h-px bg-[#F5F4F0] transition-all duration-300 origin-left"
                style={{ width: "22px", transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              />
              <span
                className="block h-px bg-[#F5F4F0] transition-all duration-200"
                style={{ width: "16px", opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="block h-px bg-[#F5F4F0] transition-all duration-300 origin-left"
                style={{ width: menuOpen ? "22px" : "10px", transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── OVERLAY ── */}
      <div
        onClick={close}
        className="fixed inset-0 z-[998] lg:hidden bg-black/65 backdrop-blur-sm transition-opacity duration-400"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
      />

      {/* ── SIDEBAR ── */}
      <aside
        className="fixed top-0 left-0 h-screen w-[82%] max-w-[380px] z-[999] bg-[#0a0a0a] flex flex-col lg:hidden border-r border-white/[0.06] transition-transform duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        {/* Crimson signature line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#C41E3A] to-transparent transition-opacity duration-500"
          style={{ opacity: menuOpen ? 1 : 0, transitionDelay: menuOpen ? "250ms" : "0ms" }}
        />

        {/* Head */}
        <div className="flex items-center justify-between h-[60px] px-6 border-b border-white/[0.06] shrink-0">
          <Link href="/" onClick={close} className="font-serif text-[13px] tracking-[0.22em] uppercase text-[#F5F4F0] flex items-baseline">
            <span className="text-[#C41E3A] text-[22px] font-bold leading-none mr-[2px]">J</span>
            ustice
          </Link>
          <button onClick={close} className="text-white/40 hover:text-white transition-colors text-lg leading-none">
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 py-8 overflow-y-auto">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { setActiveLink(link.href); close(); }}
              className={sidebarLinkClass(link.href, menuOpen)}
              style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms" }}
            >

              {link.name}
            </a>
          ))}

          {/* Divider */}
          <div
            className="mx-7 mt-2 mb-6 h-px bg-white/[0.06] transition-opacity duration-300"
            style={{ opacity: menuOpen ? 1 : 0, transitionDelay: menuOpen ? "300ms" : "0ms" }}
          />

          {!token && (
            <Link
              href="/lawyer-registration"
              target="_blank"
              onClick={close}
              className="block px-8 py-3 text-[16px] tracking-[0.16em] uppercase text-[#9A7E4F] hover:text-[#F5F4F0] border-b border-white/[0.06] transition-all duration-300"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                transitionDelay: menuOpen ? "330ms" : "0ms",
              }}
            >
              Become a Lawyer →
            </Link>
          )}

          {role === "lawyer" && (
            <Link
              href="/my-profile"
              onClick={close}
              className="block px-8 py-3 text-[10px] tracking-[0.16em] uppercase text-white/40 hover:text-[#F5F4F0] border-b border-white/[0.06] transition-all duration-300"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                transitionDelay: menuOpen ? "330ms" : "0ms",
              }}
            >
              My Profile
            </Link>
          )}
        </nav>

        {/* Footer */}
        {token && (
          <div
            className="px-7 py-6 border-t border-white/[0.06] shrink-0 transition-opacity duration-300"
            style={{ opacity: menuOpen ? 1 : 0, transitionDelay: menuOpen ? "350ms" : "0ms" }}
          >
            <p className="text-[9px] tracking-[0.14em] uppercase text-white/30 mb-1">Signed in as</p>
            <p className="text-[11px] text-[#9A7E4F] font-serif italic mb-4">
              {role === "lawyer" ? "Lawyer Account" : "Client Account"}
            </p>
            <button
              onClick={logout}
              className="w-full py-2.5 text-[10px] tracking-[0.14em] uppercase border border-white/20 text-white/50 hover:border-[#C41E3A] hover:text-[#C41E3A] transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;