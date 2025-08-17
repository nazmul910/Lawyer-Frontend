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
            <p><strong>Name:</strong> {lawyer.name}</p>
            <p><strong>Email:</strong> {lawyer.email}</p>
            <p><strong>Status:</strong> {lawyer.status}</p>
            <p><strong>Verified:</strong> {lawyer.isVerified ? "Yes" : "No"}</p>

            {lawyer.license && (
              <div>
                <p><strong>License Number:</strong> {lawyer.license.licenseNumber}</p>
                <p><strong>State:</strong> {lawyer.license.state}</p>
                <p><strong>Acquired Date:</strong> {lawyer.license.acquiredDate}</p>
                <p><strong>Expiry Date:</strong> {lawyer.license.expiryDate}</p>
                <p><strong>License Status:</strong> {lawyer.license.status}</p>
              </div>
            )}

            {lawyer.practiceAreas.length > 0 && (
              <p><strong>Practice Areas:</strong> {lawyer.practiceAreas.join(", ")}</p>
            )}

            {lawyer.specializations.length > 0 && (
              <p><strong>Specializations:</strong> {lawyer.specializations.join(", ")}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminHome;
