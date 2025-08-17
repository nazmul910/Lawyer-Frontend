"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { singUp } from "@/server/Api";
import { ClipLoader } from "react-spinners";
import SideImage from "@/components/SideImage";

const Registration = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUpMutation = useMutation({
    mutationFn: async (createUser) => {
      const res = await singUp(createUser);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (data) => {
    signUpMutation.mutate({ ...data, role:'client' });
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
              <div className="text-3xl text-black font-bold mb-4 text-center">
                <span className="border-b-2">Sign Up</span>
              </div>

              <div>
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className={`border border-gray-400 rounded-md p-2 w-full ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>


              <div>
                <label className="text-sm">Email</label>
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
                <label className="text-sm">Password</label>
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

              <button
                type="submit"
                disabled={signUpMutation.isPending}
                className="w-full bg-gray-800 py-3 cursor-pointer hover:bg-gray-700 transition-all duration-500 text-white font-bold rounded-md disabled:opacity-50"
              >
                {signUpMutation.isPending ? (
                  <ClipLoader color="#fff" size={25} />
                ) : (
                  `Sign Up`
                )}
              </button>

              <p className="text-center text-[16px] font-semibold">
                Already have an account?{" "}
                <Link
                  className="underline text-blue-500 hover:text-black transition-all duration-300"
                  href="/login"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
