"use server"
import React from 'react';

export const resetPassword = async (token, newPassword) => {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/reset-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, newPassword }),
            cache: "no-store"
        });

        // Check if the response is successful
        if (!res.ok) {
            // If not, extract and return the error message
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to reset password.');
        }

        // If successful, return the user information
        const userInfo = await res.json();
        return { success: true, message: userInfo.message };

    } catch (error) {
        // Handle any errors that occur during the fetch
        return { success: false, message: error.message };
    }
};
