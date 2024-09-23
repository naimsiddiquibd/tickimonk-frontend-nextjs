// utils/actions/changeUserRole.js
"use server";

import axios from "axios";
import { authOptions } from "../authOptions";
import { getServerSession } from "next-auth";

export const changeUserRole = async (role) => {
  // Get the current session to retrieve the access token
  const session = await getServerSession(authOptions);

  try {
    const response = await axios.patch(
      `${process.env.BACKEND_URL}/change-role`,
      { role }, // Sending the new role in the request body
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Use the access token from the session
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to change user role." };
    }
  } catch (error) {
    console.error("Error changing user role:", error);
    return {
      success: false,
      error: error.response?.data?.message || "An error occurred.",
    };
  }
};
