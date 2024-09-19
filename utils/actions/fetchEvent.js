"use server";

import axios from 'axios';
import { authOptions } from '../authOptions';
import { getServerSession } from 'next-auth';

export const fetchEvent = async ({ id }) => {
    const session = await getServerSession(authOptions);

    try {
        const response = await axios.get(`http://localhost:5001/api/events/my-events/${id}`, {
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching event:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};
