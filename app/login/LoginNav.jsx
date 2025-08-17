"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LogInNavbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Log Out Success");
    router.push("/login");
    
  };

  return (
    <nav className="flex justify-between fixed top-0 z-50 right-0 left-0 items-center bg-[#0c0c0c8e] text-white px-10 py-4">
      <Link href="/" className="text-2xl font-mono uppercase font-bold">
        <span className="text-red-700 text-4xl">J</span>ustice
      </Link>
      <div>
        <ul className="flex items-center gap-5">
            <li>
                <button>
                  <Link
                    href="/login"
                    className="border px-5 py-2 duration-300 hover:bg-white hover:text-black  transition-all"
                  >
                    Login
                  </Link>
                </button>
              </li>
          <li>
                <button>
                  <Link
                    href="/registration"
                    className="border px-5 py-2 duration-300 hover:bg-white hover:text-black  transition-all"
                  >
                    Registration
                  </Link>
                </button>
              </li>
        </ul>
      </div>
      
    </nav>
  );
};
export default LogInNavbar;
