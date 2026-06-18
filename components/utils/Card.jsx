"use client";

import { AdminContext } from "@/app/admin/AdminContext";
import img from "@/public/image/area/img1.jpg";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Card() {
  const { lawyerData, loading, role, token } = useContext(AdminContext);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!lawyerData || lawyerData.length === 0) {
    return <p className="text-center py-10">No Data Here</p>;
  }

  return (
    <>
      <div>
        {lawyerData?.map((lawyer, idx) => {
          return (
            <div>
              <div className="border border-[#dadada]">
                <div className=" pt-6 md:pt-8 px-5 md:px-8 flex flex-col items-start justify-start gap-3">
                  <p className="text-[24px] font-playfair">01</p>
                  <div className="flex flex-col items-start justify-start gap-2">
                    <h3 className="text-[26px] font-inter font-medium">
                      Business Law
                    </h3>
                    <p className="text-[16px] font-inter">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptas, voluptate.{" "}
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="text-[#404c4f] cursor-pointer font-inter font-medium group flex justify-center items-center gap-2"
                  >
                    Learn More
                    <MoveRight
                      size={18}
                      color="#404c4f"
                      className="group-hover:translate-x-1 transition-all duration-300 ease-in-out"
                    />
                  </Link>
                </div>
                <div className="relative overflow-hidden w-full mt-5 h-[220px] md:h-[250px]">
                  <Image
                    src={img}
                    alt="Business Law"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
