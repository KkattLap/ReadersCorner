"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
async function getData() {
  const res = await fetch("http://localhost:3000/user", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const handleUser = () => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setUser(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };
  const exitUser = () => {
    setUser(false);
  };
  return (
    <AuthContext.Provider value={{ user, handleUser, exitUser }}>
      {children}
    </AuthContext.Provider>
  );
};
