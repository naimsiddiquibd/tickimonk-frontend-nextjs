"use server";
import React from 'react';

export const forgetPassword = async (email) => {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/forget-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email }),
            cache: "no-store" 
        });

        if (!res.ok) {
            // Handle error response
            const errorData = await res.json(); // Attempt to parse error details
            throw new Error(errorData.message || 'Failed to send reset password request.');
        }

        // Parse the successful response
        const userInfo = await res.json();
        return {
            success: true,
            message: 'Reset password email sent! Please check your inbox.',
            data: userInfo
        };

    } catch (error) {
        // Return a structured error response
        return {
            success: false,
            message: error.message || 'An error occurred while processing your request.'
        };
    }
};
