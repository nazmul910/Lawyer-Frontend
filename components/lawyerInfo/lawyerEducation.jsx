"use client";
import api from "@/server/Api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { IoAdd } from "react-icons/io5";

const LawyerEducation = ({ education = [], refreshProfile }) => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/lawyers/education", data);
      toast.success("Education added");
      reset();
      refreshProfile();
    } catch (err) {
      toast.error("Failed to add education");
    }
  };

  const handleDelete = async (edu) => {
    try {
      const token = localStorage.getItem("token");
      await deleteLawyerEducation(
        { degree: edu.degree, institution: edu.institution },
        token
      );
      toast.success("Education deleted");
      refreshProfile();
    } catch (err) {
      toast.error("Failed to delete education");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-3">Education</h2>

      {education.length > 0 ? (
        education.map((edu, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            <p>
              {edu.degree} - {edu.institution} ({edu.startDate} -{" "}
              {edu.endDate || "Present"})
            </p>
            <button
              onClick={() => handleDelete(edu)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No education added yet.</p>
      )}

      <IoAdd className=" cursor-pointer text-2xl" onClick={() => setShow((prev) => !prev)} />

      <form onSubmit={handleSubmit(onSubmit)} className={`mt-4 space-y-2 ${show ? "block" :"hidden"}`}>
        <input
          {...register("degree", { required: "Degree is required" })}
          placeholder="Degree"
          className="border p-2 w-full"
        />
        {errors.degree && (
          <p className="text-red-500 text-sm">{errors.degree.message}</p>
        )}

        <input
          {...register("institution", { required: "Institution is required" })}
          placeholder="Institution"
          className="border p-2 w-full"
        />
        {errors.institution && (
          <p className="text-red-500 text-sm">{errors.institution.message}</p>
        )}

        <input
          type="date"
          {...register("startDate", { required: "Start Date is required" })}
          className="border p-2 w-full"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}

        <input
          type="date"
          {...register("endDate")}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default LawyerEducation;
