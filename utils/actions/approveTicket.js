"use server";

import axios from 'axios';
import { authOptions } from '../authOptions';
import { getServerSession } from 'next-auth';

export const approveTicket = async (id) => {
    const session = await getServerSession(authOptions);

    try {
        const response = await axios.put(
            `http://localhost:5001/api/tickets/${id}`,
            { status: 'approved' }, // Payload to update status
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error approving ticket:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};
