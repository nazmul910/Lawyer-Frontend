"use client"

import {useRef, useEffect} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


export default function TopTitleSection({title,subtitle,description}) {

    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
                end: "bottom 20%",
            },
        });

        tl.from(subtitleRef.current, { opacity: 0, y: 50, duration: 0.5 })
          .from(titleRef.current, { opacity: 0, y: 50, duration: 0.5 }, "-=0.3")
          .from(descriptionRef.current, { opacity: 0, y: 50, duration: 0.5 }, "-=0.3");
    });

    return(
        <>
            <div className="grid space-y-10 md:space-y-0 md:flex justify-between items-end">
                <div className="w-[100%] md:w-[50%] lg:w-[50%] 2xl:w-[30%] space-y-3 md:space-y-5 lg:space-y-6 2xl:space-y-8">
                    <p ref={subtitleRef} className="text-[16px] text-[#404c4f] font-pt_serif uppercase font-bold leading-[130%]">{subtitle}</p>
                    <h2 ref={titleRef} className="text-[40px] md:text-[44px] lg:text-[46px] 2xl:text-[48px] leading-[110%] font-playfair">{title}</h2>
                </div>
                <div className="w-[100%] md:w-[45%] lg:w-[40%] 2xl:w-[30%] text-[#222c30] ">
                    <p ref={descriptionRef} className="text-[16px] font-pt_serif leading-[130%] text-[#404c4f] ">{description}</p>
                </div>
            </div>
        </>
    )
}
