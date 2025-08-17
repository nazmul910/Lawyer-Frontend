"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Context = createContext();

const RootContextPovider = (props) => {

  const [token,setToken] = useState(null)
  const [role,setRole] = useState(null)

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token){
      const decode = jwtDecode(token);
      setRole(decode?.role)
      setToken(token);
    }
 
  },[])
  

  const value = useMemo(() => ({ role,token }), [role,token]);

  return (
    <>
      <Context.Provider value={value}>{props.children}</Context.Provider>
    </>
  );
};

export default RootContextPovider;
