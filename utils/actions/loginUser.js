// not using this component
"use server"
import React from 'react';

export const loginUser = async (data) => {
    const res = await fetch(`${process.env.BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        cache: "no-store" 
    });
    const userInfo = await res.json();
    console.log("Eita user info from nextjs: ",userInfo);
  
    return userInfo;
};