"use server";

import axios from 'axios';
import { authOptions } from '../authOptions';
import { getServerSession } from 'next-auth';

export const purchaseTicket = async ({ eventId, price }) => {
    const session = await getServerSession(authOptions);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
            eventId,
            status: "available",  // Hardcoded status
            price  // Pass the actual price
        }, {
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        // Return the created ticket response
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};
