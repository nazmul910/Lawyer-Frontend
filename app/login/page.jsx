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
          <div className="w-1/2 flex items-center flex-col justify-center bg-white p-10">
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
              <div className="mt-4 w-full flex justify-center flex-col space-y-3">
                <button
                 onClick={() => signIn("google")}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white py-3 font-medium shadow-sm transition-all dark:bg-white/10"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95h146.9c-6.3 34-25.1 62.8-53.6 82v68h86.7c50.9-46.9 80.5-115.9 80.5-194.7z"
                      fill="#4285F4"
                    />
                    <path
                      d="M272 544.3c72.6 0 133.5-24 178-65.1l-86.7-68c-24 16-54.7 25.5-91.3 25.5-70.1 0-129.5-47.2-150.7-110.6H33.7v69.4C78.1 487 168.4 544.3 272 544.3z"
                      fill="#34A853"
                    />
                    <path
                      d="M121.3 341.1c-8.6-25.7-8.6-53.6 0-79.3V192.4H33.7c-31.7 62.8-31.7 137.2 0 200l87.6-50.3z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M272 107.7c39.6 0 75.2 13.6 103.3 40.5l77.6-77.6C401.5 24.7 340.6 0 272 0 168.4 0 78.1 57.3 33.7 144.1l87.6 50.3C142.5 155 201.9 107.7 272 107.7z"
                      fill="#EA4335"
                    />
                  </svg>

                  <span >Sign up with Google</span>
                </button>
                {/* <button
                onClick={() => signIn("facebook")}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#1877F2] py-3 font-medium text-white shadow-sm transition-all"
                >
                <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                  fill="white"
                 />
               </svg>
               <span>Sign in with Facebook</span>
              </button> */}
              </div>              

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
