"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";



export default function Hero() {

  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() =>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text1.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(text1.current, { opacity: 0, y: 50, duration: 0.5 })
      .from(text2.current, { opacity: 0, y: 50, duration: 0.5 }, "-=0.3")
      .from(text3.current, { opacity: 0, y: 50, duration: 0.5 }, "-=0.3");
  })

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#0e0e0e,#222C30,#0e0e0e)]">
        <div className="container1 h-[70vh]">
          <div className="flex flex-col md:items-center justify-center h-full md:text-center text-white">
            <div>
              <p ref={text1} className="text-[18px] mb-5 md:mb-0 lg:mb-2 2xl:mb-0 uppercase font-pt_serif">Practice Areas</p>
            </div>
            <div className=" md:w-[70%] 2xl:w-[65%]">
              <h1 ref={text2} className="text-[28px]  leading-[40px] md:text-[40px] lg:text-[60px] 2xl:text-[86px] md:text-center font-playfair lg:tracking-[-3px] 2xl:tracking-[-4px] md:leading-[45px]  lg:leading-[60px] 2xl:leading-[86px] font-medium uppercase">Comprehensive legal support</h1>
            </div>
            <div className="md:w-[70%] lg:w-1/2 2xl:w-1/3 mt-5 md:mt-2 lg:mt-4">
              <p ref={text3} className="text-[16px] md:text-[20px]">
                We provide expert advice and advocacy across a wide range of
                legal issues.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
