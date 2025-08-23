"use client";
import { useContext, useState, useRef } from "react";
import { Context } from "@/constextApi/Context";
import { uploadLawyerImage } from "@/server/lawyer";
import { toast } from "react-toastify";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { GoUnverified } from "react-icons/go";
import { Edit } from "lucide-react";
import LawyerEducation from "@/components/lawyerInfo/lawyerEducation";

const MyProfile = () => {
  const { singleLawyerData, setSingleLawyerData, role,refreshProfile } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditImage, setIsEditImage] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log("LawyerDetailes: ",singleLawyerData)
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsEditImage(true); 
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first!");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const token = localStorage.getItem("token");
      const res = await uploadLawyerImage(formData, token);

      setSingleLawyerData({
        ...singleLawyerData,
        profileImage: res.data.profileImage,
      });

      toast.success("Image uploaded successfully!");
      setSelectedFile(null);
      setIsEditImage(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (!singleLawyerData)
    return <p className="mt-32 text-center text-gray-500">Loading...</p>;

  return (
    <div className="pt-32 px-4 md:px-20">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={
                singleLawyerData.profileImage ||
                "https://sites.une.edu/wp-content/uploads/2019/05/avatar-placeholder-368x472.gif"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto object-cover"
            />
            {
              singleLawyerData?.isVerified ? <GoVerified className=" absolute top-2 -right-2 cursor-pointer text-white bg-blue-600 rounded-full hover:text-black" /> : <GoUnverified  className=" absolute bottom-2 right-0 bg-red-600 rounded-full text-white cursor-pointer  hover:text-black" />
            }
            {!isEditImage && (
              <Edit
                onClick={() => fileInputRef.current.click()}
                className="absolute top-0 -right-2 cursor-pointer text-gray-600 hover:text-black"
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {isEditImage && (
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEditImage(false);
                  setSelectedFile(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome, {singleLawyerData.name}
        </h1>
        <div>
          <LawyerEducation education={singleLawyerData?.education} refreshProfile={refreshProfile} />
          
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

