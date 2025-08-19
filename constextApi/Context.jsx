"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getSingleLawyer } from "@/server/lawyer";

export const Context = createContext();

const RootContextPovider = (props) => {

  const [token,setToken] = useState(null)
  const [role,setRole] = useState(null)
  const [singleLawyerData,setSingleLawyerData] = useState(null);

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token){
      const decode = jwtDecode(token);
      setRole(decode?.role)
      setToken(token);

      if(decode?.role === "lawyer" && decode?.lawyerId ){
        getSingleLawyer(decode.lawyerId)
          .then((res) => setSingleLawyerData(res))
          .catch((err) => console.log(err))
      }
    } 
 
  },[])
  

  const value = useMemo(() => ({ role,token,singleLawyerData,setSingleLawyerData }), [role,token,singleLawyerData]);

  return (
    <>
      <Context.Provider value={value}>{props.children}</Context.Provider>
    </>
  );
};

export default RootContextPovider;
