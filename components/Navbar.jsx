"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "@/constextApi/Context";
import { LuLogOut } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { RiMenu4Line } from "react-icons/ri";

const Navbar = () => {
  const router = useRouter();

  const [activeLink, setActiveLink] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const { role, token } = useContext(Context);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Log Out Success");
    router.push("/");
    window.location.reload(); 
  };
  console.log("role: ", role);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Practice Area", href: "#practice" },
    { name: "Blog", href: "#blog" },
  ];

  const filterdLink = navLinks.filter((link) => {
    if (role === "lawyer" && link.name === "Practice Area") return false;
    if (role === "client" && link.name === "Blog") return false;
    else {
      return navLinks;
    }
  });

  return (
    <nav className="flex justify-between fixed top-0 z-50 right-0 left-0 items-center bg-black text-white px-20 py-4">
      <Link href="/" className="text-2xl font-mono uppercase font-bold">
        <span className="text-red-700 text-4xl">J</span>ustice
      </Link>

      <div>
        <ul className="flex space-x-10">
          {filterdLink.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`transition-all duration-300 hover:scale-110 pb-1 ${
                  activeLink === link.href
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent"
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex space-x-4 items-center ">
          {token ? (
            role === "lawyer" ? (
              <>
                <button
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  {showMenu ? <CiMenuFries /> : <RiMenu4Line />}
                </button>

                {showMenu && (
                  <div className="absolute top-[72px] right-20 bg-[#0000007c] border border-gray-500  shadow-lg p-3 w-48">
                    <ul className="flex flex-col space-y-3 text-sm">
                      <li>
                        <Link
                          href="/my-profile"
                          onClick={() => setShowMenu(false)}
                          className="block px-3 py-2  hover:bg-white hover:text-black transition-all duration-300"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2 cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <li>
                  <button onClick={logout}>
                    <Link href="/login">
                      <LuLogOut className="mt-2 text-2xl transition-transform duration-300 hover:scale-110 hover:translate-x-1" />
                    </Link>
                  </button>
                </li>
              </>
            )
          ) : (
            <>
              <div className="flex items-center space-x-5">
                <li>
                  <Link
                    href="/lawyer-registration"
                    target="_blank"
                    className="hover:underline"
                  >
                    Become a Lawyer
                  </Link>
                </li>
                <button className="border px-5 py-2 hover:bg-white transition-all duration-500 hover:text-black">
                  <Link href="/login">Login</Link>
                </button>
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
