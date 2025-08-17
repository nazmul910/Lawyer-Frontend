"use client";
import { AnimatedTestimonialsDemo } from "./AnimatedTestomoni";

const ClientSection = () => {
  return (
    <>
      <section className="mb-20 " >
        <div className="text-center space-y-5 mb-10">
          <h1 className="text-5xl font-pt_serif font-semibold ">
            Client Says About Us
          </h1>
          <p className="text-secondary">
            Female divided bearing rule one called said Beginning set you living
            above saw seasons void <br /> created fruitful third years god.
          </p>
        </div>
        <div className="bg-gray-200">
          <AnimatedTestimonialsDemo />
        </div>
      </section>
    </>
  );
};
export default ClientSection;
