"use server";

import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions';

export const verifyPayment = async ({ invoice, amount }) => {
    const session = await getServerSession(authOptions);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-transaction`, { 
            invoice, 
            amount 
        }, {
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        // Return the verification response
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error verifying payment:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};
