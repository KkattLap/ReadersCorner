"use client";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
export const AuthContext = createContext();
async function getData() {
  const res = await fetch("https://localhost:3000/user", {
    cache: "no-store",
  });
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
async function getUserDictionary() {
  const res = await fetch("https://localhost:3000/userDictionary", {
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
  const [dictionary, setDictionary] = useState(false);

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
  const handleUserDictionary = () => {
    const fetchDictionary = async () => {
      try {
        const response = await getUserDictionary();
        setDictionary(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDictionary();
  };
  const exitUser = () => {
    setUser(false);
  };
  return (
    <AuthContext.Provider
      value={{ user, dictionary, handleUser, handleUserDictionary, exitUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
