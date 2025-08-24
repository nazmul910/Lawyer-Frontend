"use client";
import api from "@/server/Api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoAdd } from "react-icons/io5";
import { IoIosArrowDropup } from "react-icons/io";
import { MdDelete } from "react-icons/md";

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
      const res = await api.post("/lawyers/education", data);
      toast.success("Education added");
      reset();
      refreshProfile();
      setShow(false)
    } catch (err) {
      toast.error("Failed to add education");
    }
  };

  const handleDelete = async (edu) => {
    alert("Are you sure!!")
    try {
      const res = await api.delete("/lawyers/delete-education",{
        data:{
          degree:edu.degree,
          institution:edu.institution
        }
      })
      toast.success("Education deleted");
      refreshProfile();
    } catch (err) {
      toast.error("Failed to delete education");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-3">Education</h2>
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
              <MdDelete className="text-2xl cursor-pointer" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No education added yet.</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mt-4 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
          show ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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
          placeholder="Enter academic start date"
          className="border p-2 w-full"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}

        <input
          type="date"
          {...register("endDate")}
          placeholder="Enter academic end date"
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default LawyerEducation;
