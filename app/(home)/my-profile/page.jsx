"use client";
import { useContext, useState } from "react";
import { Context } from "@/constextApi/Context";
import { uploadLawyerImage } from "@/server/lawyer";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { singleLawyerData, setSingleLawyerData } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", selectedFile);

      const token = localStorage.getItem("token");

      const res = await uploadLawyerImage(formData, token);

      // setSingleLawyerData();
      setSingleLawyerData({
        ...singleLawyerData,
        profileImage: res.data.profileImage,
      });

      toast.success("Image uploaded successfully!");
      setSelectedFile();
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
          <img
            src={
              singleLawyerData.profileImage ||
              "https://sites.une.edu/wp-content/uploads/2019/05/avatar-placeholder-368x472.gif"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto object-cover"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4 border cursor-pointer border-gray-400 px-4 py-1 mr-1.5"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome, {singleLawyerData.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {singleLawyerData.email}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {singleLawyerData.status}
          </p>
          <p>
            <span className="font-semibold">Practice Areas:</span>{" "}
            {singleLawyerData.practiceAreas.length > 0
              ? singleLawyerData.practiceAreas.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Specializations:</span>{" "}
            {singleLawyerData.specializations.length > 0
              ? singleLawyerData.specializations.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Education:</span>{" "}
            {singleLawyerData.education.length > 0
              ? singleLawyerData.education.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {singleLawyerData.experience.length > 0
              ? singleLawyerData.experience.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Documents:</span>{" "}
            {singleLawyerData.documents.length > 0
              ? singleLawyerData.documents.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Reviews:</span>{" "}
            {singleLawyerData.reviews.length > 0
              ? singleLawyerData.reviews.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Verified:</span>{" "}
            {singleLawyerData.isVerified ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(singleLawyerData.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(singleLawyerData.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Nested User Info Card */}
        {singleLawyerData.user && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              User Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p>
                <span className="font-medium">User Name:</span>{" "}
                {singleLawyerData.user.name}
              </p>
              <p>
                <span className="font-medium">User Email:</span>{" "}
                {singleLawyerData.user.email}
              </p>
              <p>
                <span className="font-medium">User Role:</span>{" "}
                {singleLawyerData.user.role}
              </p>
              <p>
                <span className="font-medium">User Status:</span>{" "}
                {singleLawyerData.user.status}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
