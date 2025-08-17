"use client";
import "../app/globals.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ContainerTextFlipDemo } from "./ContainerTextFlipDemo";
import { Context } from "@/constextApi/Context";




const Counter = ({ target, start = 0 }) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let frame;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const newValue = Math.floor(start + (target - start) * easedProgress);
      setCount(newValue);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [start, target, hasStarted]);

  return (
    <h1 ref={counterRef} className="border-b-[1.5px] px-10 pb-3">
      {count.toLocaleString()}
    </h1>
  );
};

const HeroSection = () => {

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="h-screen bg-[url('/image/landing.jpg')] bg-cover bg-center mt-14 mb-28"
      id="home"
    >
      <div className="flex justify-start items-center h-full p-20">
        <div className="flex flex-col space-y-4">
          <h1 className="text-6xl text-primary font-bold">
            High Quality <ContainerTextFlipDemo /> <br /> Advice and Support 
          </h1>
          <p className="text-white text-2xl font-sans">
            Leading Polish Lawyer in your city
          </p>
          <div className="mt-7">
            <button className="px-10 py-3 font-semibold bg-button-bg hover:text-button-bg hover:bg-button-color transition-all cursor-pointer duration-300 hover:border-0 border">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 -mt-12 font-pt_serif font-bold">
        {[
          { start: 0, value: 35, label: "Dedicated Lawyer" },
          { start: 800, value: 1526, label: "Successful Cases" },
          { start: 300, value: 725, label: "Satisfied Client" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-2xl space-y-3 py-7 px-12 text-center rounded-2xl text-button-color"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl flex justify-center">
              <Counter start={item.start} target={item.value} />
            </div>
            <h1 className="text-2xl">{item.label}</h1>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
