"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/server/Api";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { IoIosArrowDropup } from "react-icons/io";
import { ClipLoader } from "react-spinners";

const LawyerLicenseInfo = ({ refreshProfile, license }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await api.post("/lawyers/license", data);
      toast.success("License added successfully!");
      reset();
      setIsLoading(false);
      refreshProfile();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Add License Info</h2>
        <button
          onClick={() => setShow((prev) => !prev)}
          className="flex transition-all ease-in-out duration-500 justify-start cursor-pointer bg-blue-500 text-white items-center px-2 py-1"
        >
          {show ? (
            <>
              <IoIosArrowDropup className="text-2xl" />
              <p>Hide</p>
            </>
          ) : (
            <>
              <IoAdd className="text-2xl" />
              <p>ADD</p>
            </>
          )}
        </button>
      </div>
      {license ? (
        <div className="text-md font-semibold">
          <p>
            State: <span className="text-gray-600">{license.state}</span>
          </p>
          <p>
            {" "}
            License Number:{" "}
            <span className="text-gray-600">{license.licenseNumber}</span>
          </p>
          <p>
            {" "}
            Acquired Date:{" "}
            <span className="text-gray-600">{license.acquiredDate}</span>
          </p>
          <p>
            {" "}
            Expiry Date:{" "}
            <span className="text-red-500">{license.expiryDate}</span>
          </p>
          <p>
            Status: <span className="text-gray-600">{license.status}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No education added yet.</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mt-4 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
          show ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* State */}
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            {...register("state", { required: "State is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        {/* License Number */}
        <div>
          <label className="block text-sm font-medium">License Number</label>
          <input
            type="text"
            {...register("licenseNumber")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Acquired Date */}
        <div>
          <label className="block text-sm font-medium">Acquired Date</label>
          <input
            type="date"
            {...register("acquiredDate", {
              required: "Acquired Date is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.acquiredDate && (
            <p className="text-red-500 text-sm">
              {errors.acquiredDate.message}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="revoked">Revoked</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          {isLoading ? <ClipLoader color="#fff" size={20} /> : "Save"}
        </button>
      </form>
    </div>
  );
};

export default LawyerLicenseInfo;
