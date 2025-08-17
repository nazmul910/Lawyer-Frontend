"use client";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Practice Area", href: "#practice" },
    { name: "Blog", href: "#blog" },
  ];
  return (
    <>
      <section className=" bg-black text-white py-5  mt-16">
        <div className="flex flex-col gap-y-4 justify-between items-center">
          <Link href="/" className="text-2xl font-mono uppercase font-bold">
            <span className="text-red-700 text-4xl">J</span>ustice
          </Link>
          <div>
            <div>
              <ul className="flex space-x-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex space-x-5 mt-3 text-2xl">
            <FaFacebook />
            <FaLinkedin />
            <FaXTwitter />
            <FaInstagram />
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
