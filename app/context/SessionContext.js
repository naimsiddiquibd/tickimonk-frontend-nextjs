"use client";
import { createContext, useContext } from "react";

export const SessionContext = createContext(null);

export const useSession = () => {
  return useContext(SessionContext);
};
