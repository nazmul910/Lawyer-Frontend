"use client";

import { useState, useEffect, useMemo, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { getLaywerData } from "@/server/admin";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [lawyerData, setLawyerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }else{
      setToken(token)
    }

    try {
      const decode = jwtDecode(token);
      setRole(decode?.role);
    } catch (err) {
      console.error("Invalid token", err);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getLaywerData();
        setLawyerData(res?.data?.data);
      } catch (err) {
        console.error(
          "Failed to fetch lawyers:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = useMemo(
    () => ({
      role,
      lawyerData,
      loading,
      token
    }),
    [lawyerData,token]
  );

  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};
