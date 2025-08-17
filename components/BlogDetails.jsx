import { MdArrowRightAlt } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { LuMessageSquareDashed } from "react-icons/lu";
const BlogDetails = () => {
  return (
    <>
      <section>
        <div className="grid grid-cols-3 gap-9">
          <div>
            <img src="/image/blog1.png.webp" alt="" />
            <div className=" space-y-2 border-b-[1.5px] py-3">
              <h1 className="text-xl font-bold mt-5">
                Founder Defends Site After Shoot
              </h1>
              <div
                className="text-secondary flex gap-5"
              >
                <p className="flex justify-center items-center gap-2"><SlCalender /> Feb 25 2018</p>
                <p className="flex justify-center items-center gap-2"><LuMessageSquareDashed /> 1 comment</p>
              </div>
              <p className="text-gray-500">
                Varius conubia a mauris litora lacus. Cubilia proin on ornare et
                nunc dapibus vel rutrum augue facilisis malesuada et porta impe.
              </p>
            </div>
            <button className="mt-2 flex justify-center items-center hover:text-red-500 cursor-pointer transition-all duration-300">Read More <MdArrowRightAlt className="pt-1 text-2xl" /></button>
          </div>
          <div>
            <img src="/image/blog2.png.webp" alt="" />
            <div className=" space-y-2 border-b-[1.5px] py-3">
              <h1 className="text-xl font-bold mt-5">
                Computer models to investors Short
              </h1>
              <div
                className="text-secondary flex gap-5"
              >
                <p className="flex justify-center items-center gap-2"><SlCalender /> Feb 25 2018</p>
                <p className="flex justify-center items-center gap-2"><LuMessageSquareDashed /> 1 comment</p>
              </div>
              <p className="text-gray-500">
                Varius conubia a mauris litora lacus. Cubilia proin on ornare et
                nunc dapibus vel rutrum augue facilisis malesuada et porta impe.
              </p>
            </div>
            <button className="mt-2 flex justify-center items-center hover:text-red-500 cursor-pointer transition-all duration-300">Read More <MdArrowRightAlt className="pt-1 text-2xl" /></button>
          </div>
          <div>
            <img src="/image/blog3.png.webp" alt="" />
            <div className=" space-y-2 border-b-[1.5px] py-3">
              <h1 className="text-xl font-bold mt-5">
                Computer models to investors Short
              </h1>
              <div
                className="text-secondary flex gap-5"
              >
                <p className="flex justify-center items-center gap-2"><SlCalender /> Feb 25 2018</p>
                <p className="flex justify-center items-center gap-2"><LuMessageSquareDashed /> 1 comment</p>
              </div>
              <p className="text-gray-500">
                Varius conubia a mauris litora lacus. Cubilia proin on ornare et
                nunc dapibus vel rutrum augue facilisis malesuada et porta impe.
              </p>
            </div>
            <button className="mt-2 flex justify-center items-center hover:text-red-500 cursor-pointer transition-all duration-300">Read More <MdArrowRightAlt className="pt-1 text-2xl" /></button>
          </div>
         
        </div>
      </section>
    </>
  );
};
export default BlogDetails;
