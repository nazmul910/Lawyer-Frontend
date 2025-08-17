"use client"

import { Context } from "@/constextApi/Context";
import { useContext } from "react";
import { MdArrowRightAlt } from "react-icons/md";


const PracticeArea = () => {

  const {role} = useContext(Context)
  
  if(role === 'lawyer') return false

  return (
    <>
      <section className="mb-20 px-20" id="practice">
        <div className="text-center space-y-5 mb-10">
          <h1 className="text-5xl font-pt_serif font-semibold ">
            Our Practice Area
          </h1>
          <p className="text-secondary">
            Female divided bearing rule one called said Beginning set you living
            above saw seasons void <br /> created fruitful third years god.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-12 ">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <img
                src="/image/subject-1.png.webp"
                alt="Family Law"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#17161677] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M14.7 5.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-1.3 1.3 1.3 1.3a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4 0l-1.3-1.3-4.3 4.3a1 1 0 0 1-1.4 0L4 15.4a1 1 0 0 1 0-1.4l4.3-4.3-1.3-1.3a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 0l1.3 1.3 1.3-1.3z" />
                </svg>
              </div>
            </div>

            <div className="px-10 py-5 space-y-2 bg-white">
              <h3 className="text-2xl font-bold">Employment Law</h3>
              <p className="text-gray-600 text-sm">
                Dominion there fifth fowl eving heaven in life you're over us
                moved creepeth morn make
              </p>
            </div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <img
                src="/image/subject-2.png.webp"
                alt="Family Law"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#17161677] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M14.7 5.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-1.3 1.3 1.3 1.3a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4 0l-1.3-1.3-4.3 4.3a1 1 0 0 1-1.4 0L4 15.4a1 1 0 0 1 0-1.4l4.3-4.3-1.3-1.3a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 0l1.3 1.3 1.3-1.3z" />
                </svg>
              </div>
            </div>

            <div className="px-10 py-5 space-y-2 bg-white">
              <h3 className="text-2xl font-bold">Personal Injury</h3>
              <p className="text-gray-600 text-sm">
                Dominion there fifth fowl eving heaven in life you're over us
                moved creepeth morn make
              </p>
            </div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <img
                src="/image/subject-3.png.webp"
                alt="Family Law"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#17161677] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M14.7 5.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-1.3 1.3 1.3 1.3a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4 0l-1.3-1.3-4.3 4.3a1 1 0 0 1-1.4 0L4 15.4a1 1 0 0 1 0-1.4l4.3-4.3-1.3-1.3a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 0l1.3 1.3 1.3-1.3z" />
                </svg>
              </div>
            </div>

            <div className="px-10 py-5  space-y-2 bg-white">
              <h3 className="text-2xl font-bold">Family Law</h3>
              <p className="text-gray-600 text-sm">
                Dominion there fifth fowl eving heaven in life you're over us
                moved creepeth morn make
              </p>
            </div>
          </div>
          {/* <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <img
                src="/image/subject-4.png.webp"
                alt="Family Law"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#17161677] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M14.7 5.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-1.3 1.3 1.3 1.3a1 1 0 0 1 0 1.4l-2.6 2.6a1 1 0 0 1-1.4 0l-1.3-1.3-4.3 4.3a1 1 0 0 1-1.4 0L4 15.4a1 1 0 0 1 0-1.4l4.3-4.3-1.3-1.3a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 0l1.3 1.3 1.3-1.3z" />
                </svg>
              </div>
            </div>

            <div className="px-10 py-5 bg-white space-y-2">
              <h3 className="text-2xl font-bold"> Bank & Financial</h3>
              <p className="text-gray-600 text-sm">
                Dominion there fifth fowl eving heaven in life you're over us
                moved creepeth morn make
              </p>
            </div>
          </div> */}
        </div>

        <div className="flex justify-center mt-10">
            <button className="bg-button-bg flex items-center gap-2 justify-center px-10 font-semibold py-4 hover:bg-button-color hover:text-button-bg transition-all duration-500">View All Practices <MdArrowRightAlt className="text-2xl pt-1" /></button>
        </div>
      </section>
    </>
  );
};
export default PracticeArea;
