"use client";
import { FaKey } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import { forgetPassword } from "@/server/Api";
import { ClipLoader } from "react-spinners";
import SideImage from "@/components/SideImage";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const forgetMutation = useMutation({
    mutationFn: async (emailLink) => {
      const res = await forgetPassword(emailLink)
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      reset();
      
    },
    onError: (error) => {
      console.error("Forget unsuccess:", error.response?.data || error.message);
      // alert(error.response?.data?.message || "Login failed!");
      toast.error(error.response?.data?.message);
    },
  });

  const onSubmit = (data) => {
    forgetMutation.mutate(data);
  };
  return (
    <>
      <div className="bg-gray-500 min-h-screen flex justify-center items-center px-40">
        <div className="flex w-full max-w-6xl shadow-lg rounded overflow-hidden">
          <SideImage/>
          <div className="w-1/2 flex items-center justify-center bg-white p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md space-y-4"
            >
              <div className="flex flex-col justify-center items-center">
                <FaKey className="bg-black text-white text-6xl p-3 rounded-full " />
                <p className="font-semibold">Enter your email to receive a reset link</p>
              </div>

              <div>
                <label htmlFor="email" className="text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email address"
                  className={`border border-gray-400 rounded-md p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <button
                type="submit"
                disabled={forgetMutation.isPending}
                className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-500 cursor-pointer font-semibold disabled:opacity-50"
              >
                {forgetMutation.isPending ?  <ClipLoader color="#fff" size={25} /> : "Send Reset Link"}
              </button>
              <Link href="/login">
                <p className="text-center text-[15px] font-semibold">
                  Back to{" "}
                  <span className="text-blue-600 cursor-pointer"> Login </span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
