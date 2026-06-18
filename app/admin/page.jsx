"use client";

import { useContext, useEffect } from "react";
import { AdminContext } from "./AdminContext";
import { useRouter } from "next/navigation";

const AdminHome = () => {
  const { lawyerData, loading, role,token } = useContext(AdminContext);
  const router = useRouter()
  console.log(lawyerData, role);

    

  if (loading) return <p>Loading..</p>;

  return (
    <>
      <h1>Hellow {role}</h1>

      <ul>
        {lawyerData?.map((lawyer) => (
          <li className="border my-3 p-5" key={lawyer._id}>
            <p className="font-playfair text-[20px]"><strong>Name:</strong> {lawyer.name}</p>
            <p className="font-playfair text-[14px]"><strong>Email:</strong> {lawyer.email}</p>
            <p className="font-playfair text-[14px]"><strong>Status:</strong> {lawyer.status}</p>
            <p className="font-playfair text-[14px]"><strong>Verified:</strong> {lawyer.isVerified ? "Yes" : "No"}</p>

            {lawyer.license && (
              <div>
                <p className="font-playfair text-[14px]"><strong>License Number:</strong> {lawyer.license.licenseNumber}</p>
                <p className="font-playfair text-[14px]"><strong>State:</strong> {lawyer.license.state}</p>
                <p className="font-playfair text-[14px]"><strong>Acquired Date:</strong> {lawyer.license.acquiredDate}</p>
                <p className="font-playfair text-[14px]"><strong>Expiry Date:</strong> {lawyer.license.expiryDate}</p>
                <p className="font-playfair text-[14px]"><strong>License Status:</strong> {lawyer.license.status}</p>
              </div>
            )}

            {lawyer.practiceAreas.length > 0 && (
              <p className="font-playfair text-[14px]"><strong>Practice Areas:</strong> {lawyer.practiceAreas.join(", ")}</p>
            )}

            {lawyer.specializations.length > 0 && (
              <p className="font-playfair text-[14px]"><strong>Specializations:</strong> {lawyer.specializations.join(", ")}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminHome;
