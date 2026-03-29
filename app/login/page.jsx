"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logIn } from "@/server/Api";
import { ClipLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import SideImage from "@/components/SideImage";

import {signIn} from "next-auth/react"

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await logIn(userData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login Success ", data);
      const token = data?.data?.accessToken;
      const decode = jwtDecode(token);
      const role = decode?.role;
    

      if (token) {
        localStorage.setItem("token", token);
        if (role === "admin") {
          toast.success(data?.data?.message);
          router.push("/admin");
        } else {
          toast.success(data?.data?.message);
          router.push("/");
        }

        // toast.success(data?.data?.message);
        // router.push("/");
      } else {
        console.error("No token found in response!");
        router.push("/login");
      }
      reset();
    },
    onError: (error) => {
      console.error("Login Failed ", error.response?.data || error.message);
      toast.error(error.response?.data?.message);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <div className="bg-gray-500 min-h-screen flex justify-center items-center px-40">
        <div className="flex w-full max-w-6xl shadow-lg rounded overflow-hidden">
          <SideImage />
          <div className="w-1/2 flex items-center justify-center bg-white p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md space-y-4"
            >
              <div className="text-3xl text-black font-bold mb-4 text-center">
                <span className="border-b-2">Login</span>
              </div>
              <div>
                <label htmlFor="email" className="text-xm">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className={`border border-gray-400 rounded-md p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div>
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className={`border border-gray-400 rounded-md p-2 w-full ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <div className="-mt-3">
                  <h1 className="text-blue-500 hover:underline text-[13px] transition-all duration-500">
                    {" "}
                    <Link href="/forget-password">Forgot Password?</Link>{" "}
                  </h1>
                </div>
              </div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-500 cursor-pointer font-semibold disabled:opacity-50"
              >
                {loginMutation.isPending ? (
                  <ClipLoader color="#fff" size={25} />
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-center text-[15px] font-semibold">
                Don't have an account?{" "}
                <Link href="/registration">
                  <span className="underline text-blue-600 cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
