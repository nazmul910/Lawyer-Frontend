"use client";

import { ClipLoader } from "react-spinners";
import SideImage from "@/components/SideImage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "@/server/Api";
import { toast } from "react-toastify";
import { FaKey } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      toast.success(res.data.message || "Password changed successfully!");
      reset();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-500 min-h-screen flex justify-center items-center px-40">
        <div className="flex w-full max-w-6xl shadow-lg rounded overflow-hidden">
          <SideImage />
          <div className="w-1/2 flex items-center justify-center bg-white p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <div className="flex flex-col justify-center items-center">
                <FaKey className="bg-black text-white text-6xl p-3 rounded-full " />
                <p className="text-2xl font-bold">Change Password</p>
              </div>
              {/* Old Password */}
              <div>
                <label className="text-sm">Old Password</label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    placeholder="Old Password"
                    {...register("oldPassword", {
                      required: "Old password is required",
                    })}
                    className="border p-2 rounded w-full pr-10"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowOld(!showOld)}
                  >
                    {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                  {errors.oldPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="New Password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="border p-2 rounded w-full pr-10"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    className="border p-2 rounded w-full pr-10"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {loading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
