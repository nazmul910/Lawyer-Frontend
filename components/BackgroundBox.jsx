"use client";
import React from "react";
import { Boxes } from '../components/ui/background-boxes';
import { cn } from "@/lib/utils";

const BackgroundBoxesDemo =() =>{
  return (
    <div
      className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center mt-20">
      <div
        className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Client Says About Us
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Female divided bearing rule one called said Beginning set you living above saw seasons void <br /> created fruitful third years god.
      </p>
    </div>
  );
}

export default BackgroundBoxesDemo;