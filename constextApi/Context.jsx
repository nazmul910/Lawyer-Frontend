"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getlawyerProfile } from "@/server/lawyer";

export const Context = createContext();

const RootContextPovider = (props) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [singleLawyerData, setSingleLawyerData] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await getlawyerProfile();
      setSingleLawyerData(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setRole(decode?.role);
      setToken(token);

      if (decode?.role === "lawyer") {
        fetchProfile(); 
      }
    }
  }, []);


  const value = useMemo(
    () => ({ role, token, singleLawyerData, setSingleLawyerData, refreshProfile: fetchProfile }),
    [role, token, singleLawyerData]
  );

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
};

export default RootContextPovider;
