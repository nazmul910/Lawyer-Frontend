"use client";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { singUp } from "@/server/Api";
import { MdDeleteForever } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const LawyerRegistration = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: [{ degree: "", institution: "", year: "" }],
      experience: [{ title: "", organization: "", years: "" }],
      specializations: [{ specialization: "" }],
    },
  });

  // Education array
  const {
    fields: eduFields,
    append: eduAppend,
    remove: eduRemove,
  } = useFieldArray({
    control,
    name: "education",
  });

  // Experience array
  const {
    fields: expFields,
    append: expAppend,
    remove: expRemove,
  } = useFieldArray({
    control,
    name: "experience",
  });

  // Specialization array
  const {
    fields: specFields,
    append: specAppend,
    remove: specRemove,
  } = useFieldArray({
    control,
    name: "specializations",
  });

  const signUpMutation = useMutation({
    mutationFn: async (createLawyer) => {
      const res = await singUp(createLawyer);
      return res.data;
    },
    onSuccess:async (data) => {
      toast.success(data?.data?.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      reset()
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (data) => {
    signUpMutation.mutate({ ...data, role: "lawyer" });
  };

  return (
    <div className="bg-[url('/image/lawyer_reg.png')] bg-cover bg-center min-h-screen flex justify-center items-center ">
      <div className="flex items-center justify-center bg-white p-6 rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[400px] max-w-lg space-y-4"
        >
          <div className="text-3xl text-black font-bold mb-4 text-center">
            <span className="border-b-2">Sign Up</span>
          </div>

          {/* Basic Info */}
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="border border-gray-400 rounded-md p-2 w-full"
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
              placeholder="Email"
              className="border border-gray-400 rounded-md p-2 w-full"
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
              className="border border-gray-400 rounded-md p-2 w-full"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>

          {/* License */}
          {/* <div className="flex gap-3">
            <div>
              <label className="text-sm">License State</label>
              <input
                type="text"
                {...register("license.state", { required: true })}
                placeholder="License State"
                className="border border-gray-400 rounded-md p-2 w-full"
              />
              {errors.license?.state && (
                <span className="text-red-500">License State is required</span>
              )}
            </div>

            <div>
              <label className="text-sm">License Number</label>
              <input
                type="text"
                {...register("license.licenseNumber", { required: true })}
                placeholder="License Number"
                className="border border-gray-400 rounded-md p-2 w-full"
              />
              {errors.license?.licenseNumber && (
                <span className="text-red-500">License licenseNumber is required</span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div>
              <label className="text-sm">Acquired Date</label>
              <input
                type="date"
                {...register("license.acquiredDate", { required: true })}
                className="border border-gray-400 rounded-md p-2 w-full"
              />
              {errors.license?.acquiredDate && (
                <span className="text-red-500">License acquiredDate is required</span>
              )}
            </div>

            <div>
              <label className="text-sm">Expiry Date</label>
              <input
                type="date"
                {...register("license.expiryDate", { required: true })}
                className="border border-gray-400 rounded-md p-2 w-full"
              />
              {errors.license?.expiryDate && (
                <span className="text-red-500">License expiryDate is required</span>
              )}
            </div>
          </div> */}

          {/* Education */}
          {/* <div>
            <h3 className="font-semibold">Education</h3>
            {eduFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input
                  {...register(`education.${index}.degree`, { required: true })}
                  placeholder="Degree"
                  className="border p-2 w-1/3 rounded"
                />
                <input
                  {...register(`education.${index}.institution`, {
                    required: true,
                  })}
                  placeholder="Institution"
                  className="border p-2 w-1/3 rounded"
                />
                <input
                  {...register(`education.${index}.year`, { required: true })}
                  placeholder="Year"
                  className="border p-2 w-1/3 rounded"
                />
                <button
                  type="button"
                  onClick={() => eduRemove(index)}
                  className="text-red-500 cursor-pointer"
                >
                  <MdDeleteForever className="text-2xl" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                eduAppend({ degree: "", institution: "", year: "" })
              }
              className="text-blue-500 text-sm cursor-pointer"
            >
              + Add Education
            </button>
          </div> */}

          {/* Experience */}
          {/* <div>
            <h3 className="font-semibold">Experience</h3>
            {expFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input
                  {...register(`experience.${index}.title`, { required: true })}
                  placeholder="Title"
                  className="border p-2 w-1/3 rounded"
                />
                <input
                  {...register(`experience.${index}.organization`, {
                    required: true,
                  })}
                  placeholder="Organization"
                  className="border p-2 w-1/3 rounded"
                />
                <input
                  {...register(`experience.${index}.years`, { required: true })}
                  placeholder="Years"
                  className="border p-2 w-1/3 rounded"
                />
                <button
                  type="button"
                  onClick={() => expRemove(index)}
                  className="text-red-500 cursor-pointer"
                >
                  <MdDeleteForever className="text-2xl" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                expAppend({ title: "", organization: "", years: "" })
              }
              className="text-blue-500 text-sm cursor-pointer"
            >
              + Add Experience
            </button>
          </div> */}

          {/* Specializations */}
          {/* <div>
            <h3 className="font-semibold">Specializations</h3>
            {specFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input
                  {...register(`specializations.${index}.specialization`, {
                    required: true,
                  })}
                  placeholder="Specialization"
                  className="border p-2 w-full rounded"
                />
                <button
                  type="button"
                  onClick={() => specRemove(index)}
                  className="text-red-500 cursor-pointer"
                >
                  <MdDeleteForever className="text-2xl" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => specAppend({ specialization: "" })}
              className="text-blue-500 text-sm cursor-pointer"
            >
              + Add Specialization
            </button>
          </div> */}

          <button
            type="submit"
            disabled={signUpMutation.isPending}
            className="w-full bg-gray-800 py-3 hover:bg-gray-700 text-white cursor-pointer font-bold rounded-md disabled:opacity-50"
          >
            {signUpMutation.isPending ? (
              <ClipLoader color="#fff" size={25} />
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-[16px] font-semibold">
            Already have an account?{" "}
            <Link
              className="underline text-blue-500 hover:text-black"
              href="/login"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LawyerRegistration;
