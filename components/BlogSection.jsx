"use client"
import { useContext } from "react";
import BlogDetails from "./BlogDetails";
import { Context } from "@/constextApi/Context";

const BlogSection = () => {

  const {role} = useContext(Context);

  if(role === 'client') return false

  return (
    <>
      <section className=" pt-20 " id="blog">
        <div className="text-center space-y-5 ">
          <h1 className="text-5xl font-pt_serif font-semibold ">
            Latest From Blog
          </h1>
          <p className="text-secondary">
            Female divided bearing rule one called said Beginning set you living
            above saw seasons void <br /> created fruitful third years god.
          </p>
        </div>
      </section>
      <div className=" pt-10 px-20">
        <BlogDetails />
      </div>
    </>
  );
};
export default BlogSection;
