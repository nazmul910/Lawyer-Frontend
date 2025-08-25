import api from "@/server/Api";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { IoAdd } from "react-icons/io5";
import { IoIosArrowDropup } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const LawyerBasicInfo = ({ refreshProfile, basicInfo }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      specializations: [""],
      practiceAreas: [""],
      availability: { days: [""], timeSlot: [""] },
    },
  });

  // field arrays
  const {
    fields: specializationFields,
    append: addSpecialization,
    remove: removeSpecialization,
  } = useFieldArray({ control, name: "specializations" });

  const {
    fields: practiceFields,
    append: addPractice,
    remove: removePractice,
  } = useFieldArray({ control, name: "practiceAreas" });

  const {
    fields: daysFields,
    append: addDay,
    remove: removeDay,
  } = useFieldArray({ control, name: "availability.days" });

  const {
    fields: slotFields,
    append: addSlot,
    remove: removeSlot,
  } = useFieldArray({ control, name: "availability.timeSlot" });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await api.post("/lawyers/basic", data);
      toast.success("Personal information added");
      reset();
      setIsLoading(false);
      refreshProfile();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add personal information");
      setIsLoading(false); 
    }
  };

  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg shadow mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
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

        <div className="border-b p-3 font-semibold text-xl">
          <p>
            Name: <span className="text-gray-500">{basicInfo.name}</span>
          </p>
          <p>
            Email: <span className="text-gray-500">{basicInfo.email}</span>
          </p>
          <p>
            Number:{" "}
            <span className="text-gray-500">
              {basicInfo.contactNumber || "Add your Number"}
            </span>
          </p>
          <p>
            Address:{" "}
            <span className="text-gray-500">
              {basicInfo.location || "Add your address"}
            </span>
          </p>
          <p>
            Work Area:{" "}
            <span className="text-gray-500">
              {basicInfo.workArea || "Add your work area"}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`mt-4 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
            show ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <input
            type="text"
            
            {...register("name",{ required: true })}
            placeholder="Name"
            className="border p-2 w-full border-gray-400 rounded-md"
          />
          <input
            type="text"
            className="border p-2 w-full border-gray-400 rounded-md"
            {...register("about",{ required: true })}
            placeholder="Write about yourself"
          />
          <input
            type="number"
            className="border p-2 w-full border-gray-400 rounded-md"
            {...register("contactNumber",{ required: true })}
            placeholder="Enter your number"
          />
          <input
            type="text"
            {...register("location",{ required: true })}
            placeholder="Address"
            className="border p-2 w-full border-gray-400 rounded-md"
          />
          <input
            type="text"
            className="border p-2 w-full border-gray-400 rounded-md"
            {...register("workArea",{ required: true })}
            placeholder="Enter your work area"
          />

          {/* specialization array */}
          <div className="flex justify-between mt-3">
            <h3 className="">Specializations</h3>
            <button
              type="button"
              onClick={() => addSpecialization("")}
              className="bg-blue-500 text-white cursor-pointer"
            >
              <IoAdd className="text-2xl" />
            </button>
          </div>
          {specializationFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`specializations.${index}`)}
                placeholder="Specialization"
                className="border p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => removeSpecialization(index)}
                className="bg-red-500 text-white px-2"
              >
                <MdDelete className="text-2xl cursor-pointer" />
              </button>
            </div>
          ))}

          {/* practice areas array */}
          <div className="flex justify-between">
            <h3>Practice Areas</h3>
            <button
              type="button"
              onClick={() => addPractice("")}
              className="bg-blue-500 text-white cursor-pointer"
            >
              <IoAdd className="text-2xl" />
            </button>
          </div>
          {practiceFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`practiceAreas.${index}`)}
                placeholder="Practice Area"
                className="border p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => removePractice(index)}
                className="bg-red-500 text-white px-2"
              >
                <MdDelete className="text-2xl cursor-pointer" />
              </button>
            </div>
          ))}

          {/* availability days */}
          <div className="flex justify-between">
            <h3>Availability Days</h3>
            <button
              type="button"
              onClick={() => addDay("")}
              className="bg-blue-500 text-white cursor-pointer"
            >
              <IoAdd className="text-2xl" />
            </button>
          </div>
          {daysFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`availability.days.${index}`)}
                placeholder="Day (e.g. Monday)"
                className="border p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => removeDay(index)}
                className="bg-red-500 text-white px-2"
              >
                <MdDelete className="text-2xl cursor-pointer" />
              </button>
            </div>
          ))}

          {/* availability timeslot */}
          <div className="flex justify-between">
            <h3>Time Slots</h3>
            <button
              type="button"
              onClick={() => addSlot("")}
              className="bg-blue-500 text-white cursor-pointer"
            >
              <IoAdd className="text-2xl" />
            </button>
          </div>
          {slotFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`availability.timeSlot.${index}`)}
                placeholder="Time Slot (e.g. 10AM-12PM)"
                className="border p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="bg-red-500 text-white px-2"
              >
                <MdDelete className="text-2xl cursor-pointer" />
              </button>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
          >
            {isLoading ? <ClipLoader color="#fff" size={20} /> : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default LawyerBasicInfo;
