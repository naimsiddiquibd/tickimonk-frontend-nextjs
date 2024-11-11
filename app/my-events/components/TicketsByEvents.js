"use client";
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';
import { fetchUserById } from '@/utils/actions/fetchUserById';
import React, { useEffect, useState } from 'react';

const TicketsByEvents = ({ id, setTickets, tickets }) => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTickets = async () => {
            const response = await fetchTicketsByEvent({ id });
            if (response.success) {
                setTickets(response.data);  // Update tickets state in Page.js
                await fetchUsersForTickets(response.data);  // Fetch users for each ticket
            } else {
                setError(response.error);
            }
            setLoading(false);
        };

        const fetchUsersForTickets = async (tickets) => {
            const usersData = {};
            for (const ticket of tickets) {
                const userId = ticket?.userId;
                if (userId && !usersData[userId]) {
                    const userResponse = await fetchUserById({ userId });
                    if (userResponse.success) {
                        usersData[userId] = userResponse.data;
                    }
                }
            }
            setUsers(usersData);
        };

        loadTickets();
    }, [id, setTickets]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <p><span className="loading loading-dots loading-lg"></span></p>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching tickets: {error}</div>;
    }

    return (
        <div className=''>
            <div className='flex justify-start items-center gap-2'>
            <h3 className='font-bold text-gray-500 text-md'>Purchased users</h3>
            <div className="divider"></div>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead className='bg-[#eeeaea] text-gray-500'>
                        <tr className='border-0'>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket._id} className='border-0'>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs opacity-50 text-gray-500">{ticket?.userId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs opacity-50 text-gray-500">
                                                {users[ticket?.userId]?.name || 'Loading...'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs opacity-50 text-gray-500">
                                                {users[ticket?.userId]?.email || 'Loading...'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs opacity-50 text-gray-500">
                                                {users[ticket?.userId]?.phoneNumber || 'Loading...'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketsByEvents;
