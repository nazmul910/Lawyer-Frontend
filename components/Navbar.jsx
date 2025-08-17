"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "@/constextApi/Context";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const router = useRouter();

  const [activeLink, setActiveLink] = useState("home");
  const { role, token } = useContext(Context);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Log Out Success");
    window.location.reload();
    router.replace("/");
  };
  console.log("role: ", role);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Practice Area", href: "#practice" },
    { name: "Blog", href: "#blog" },
  ];


  const filterdLink = navLinks.filter((link) =>{
    if(role === 'lawyer' && link.name === 'Practice Area')  return false;
    if(role === 'client' && link.name === 'Blog')  return false;
    else{
      return navLinks
    }
  })

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
            <li>
              <button onClick={logout}>
                <Link href="/login">
                  <LuLogOut className="mt-2 text-2xl transition-transform duration-300 hover:scale-110 hover:translate-x-1" />
                </Link>
              </button>
            </li>
          ) : (
            <>
              <div className="flex items-center space-x-5">
                <li>
                  <Link href="/lawyer-registration" target="_blank" className="hover:underline">
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

      {/* <div>
        <ul className="flex space-x-4 items-center ">
          {
            role === "client" ? (
              <>
                <li>
                  <Link href="/login">
                    Become a Lawyer
                  </Link>
                </li>
              </>
            ): (
              ""
            )
          }
            <li>
              <button onClick={logout}>
                <Link
                  href="/login"
                >
                 <LuLogOut className="mt-2 text-2xl transition-transform duration-300 hover:scale-110 hover:translate-x-1" />
                </Link>
              </button>
            </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
