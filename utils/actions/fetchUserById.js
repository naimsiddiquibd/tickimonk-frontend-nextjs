"use server";

import axios from 'axios';
import { authOptions } from '../authOptions';
import { getServerSession } from 'next-auth';

export const fetchUserById = async ({ userId }) => {
    const session = await getServerSession(authOptions);

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${session?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
};
