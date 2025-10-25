"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import { resetPassword } from "@/server/Api";
import { ClipLoader } from "react-spinners";
import SideImage from "@/components/SideImage";

function ResetPasswordContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const resstPasswordMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await resetPassword(
        {
          id,
          newPassword: formData.password,
        },
        token
      );
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    if (!id || !token) {
      toast.error("Invalid reset link");
      return;
    }
    resstPasswordMutation.mutate(data);
  };

  useEffect(() => {
    if (!id || !token) {
      router.push("/login");
    }
  }, [id, token, router]);

  return (
    <div className="bg-gray-500 min-h-screen flex justify-center items-center px-40">
      <div className="flex w-full max-w-6xl shadow-lg rounded overflow-hidden">
        <SideImage />
        <div className="w-1/2 flex items-center justify-center bg-white p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <div className="flex flex-col justify-center items-center">
              <FaKey className="bg-black text-white text-6xl p-3 rounded-full" />
              <p className="text-2xl font-bold">Reset Password</p>
              <p className="font-semibold">
                Enter your new password below
              </p>
            </div>

            <div>
              <label htmlFor="email" className="text-sm">
                New Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter new password"
                className={`border border-gray-400 rounded-md p-2 w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={resstPasswordMutation.isPending}
              className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-500 cursor-pointer font-semibold disabled:opacity-50"
            >
              {resstPasswordMutation.isPending ? (
                <ClipLoader color="#fff" size={25} />
              ) : (
                "Update Password"
              )}
            </button>

            <Link href="/login">
              <p className="text-center text-[15px] font-semibold">
                Back to{" "}
                <span className="text-blue-600 cursor-pointer">Login</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}








// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { FaKey } from "react-icons/fa6";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { resetPassword } from "@/server/Api";
// import { useEffect } from "react";
// import { ClipLoader } from "react-spinners";
// import SideImage from "@/components/SideImage";

// const ResetPassword = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const id = searchParams.get("id");
//   const token = searchParams.get("token");
//   console.log("id:", id);
//   console.log("token: ", token);
//   const resstPasswordMutation = useMutation({
//     mutationFn: async (formData) => {
//       console.log("formtDAta: ", formData.password);
//       const res = await resetPassword(
//         {
//           id,
//           newPassword: formData.password,
//         },
//         token
//       );

//       return res.data;
//     },
//     onSuccess: async (data) => {
//       toast.success(data?.message);
//       await new Promise((resolve) => setTimeout(resolve, 3000)); //for wait 3 seconds in this page then redirect login page
//       router.push("/login");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Form data:", data);
//     if (!id || !token) {
//       toast.error("Invalid reset link");
//     }
//     resstPasswordMutation.mutate(data);
//   };

//   useEffect(() => {
//     if (!id || !token) {
//       router.push("/login");
//     }
//   }, [router]);

//   return (
//     <>
//       <div className="bg-gray-500 min-h-screen flex justify-center items-center px-40">
//         <div className="flex w-full max-w-6xl shadow-lg rounded overflow-hidden">
//           <SideImage />
//           <div className="w-1/2 flex items-center justify-center bg-white p-10">
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="w-full max-w-md space-y-4"
//             >
//               <div className="flex flex-col justify-center items-center">
//                 <FaKey className="bg-black text-white text-6xl p-3 rounded-full " />
//                 <p className="text-2xl font-bold">Reset Password</p>
//                 <p className="font-semibold">
//                   Enter your email to receive a reset link
//                 </p>
//               </div>

//               <div>
//                 <label htmlFor="email" className="text-sm">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                   placeholder="Enter new password"
//                   className={`border border-gray-400 rounded-md p-2 w-full ${
//                     errors.password ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.password && (
//                   <span className="text-red-500">
//                     {errors.password.message}
//                   </span>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 disabled={resstPasswordMutation.isPending}
//                 className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-500 cursor-pointer font-semibold disabled:opacity-50"
//               >
//                 {resstPasswordMutation.isPending ? (
//                   <ClipLoader color="#fff" size={25} />
//                 ) : (
//                   "Update Password"
//                 )}
//               </button>
//               <Link href="/login">
//                 <p className="text-center text-[15px] font-semibold">
//                   Back to{" "}
//                   <span className="text-blue-600 cursor-pointer"> Login </span>
//                 </p>
//               </Link>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;
