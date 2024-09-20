"use server";

import axios from 'axios';
import { authOptions } from '../authOptions';
import { getServerSession } from 'next-auth';

export const payForTicket = async ({ ticketId }) => {
    const session = await getServerSession(authOptions);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticketId}/pay`, {}, {
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        // Return the payment response
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error initiating payment:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};
