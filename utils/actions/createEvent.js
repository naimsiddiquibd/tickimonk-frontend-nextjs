"use server";

// createEvent.js

import axios from 'axios';
import { authOptions } from '../authOptions';
import { getServerSession } from 'next-auth';

export const createEvent = async (formData) => {
    const session = await getServerSession(authOptions);
    try {
        const response = await axios.post('http://localhost:5001/api/events/', formData, {
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};

            
