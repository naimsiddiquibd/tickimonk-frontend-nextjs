"use client";
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';
import { fetchUserById } from '@/utils/actions/fetchUserById';
import React, { useEffect, useState } from 'react';
import { Inria_Sans } from "next/font/google";

const Inria = Inria_Sans({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
});

const TicketsByEvents = ({ id }) => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTickets = async () => {
            const response = await fetchTicketsByEvent({ id });
            if (response.success) {
                setUsers(response.data);  // Update tickets state in Page.js
            } else {
                setError(response.error);
            }
            setLoading(false);
        };


        loadTickets();
    }, [id]);

    console.log("User Id from TicketsByEvent page:", users);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p><span className="loading loading-dots loading-lg"></span></p>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching tickets: {error}</div>;
    }

    return (
        <div className='mt-7'>
            <div className='flex justify-start items-center gap-2'>
                <h3 className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>Purchased users</h3>
                <div className="divider"></div>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead className='bg-slate-100 bg-opacity-10 rounded-md text-gray-200'>
                        <tr className='border-0'>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className='border-0'>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs  text-gray-200">
                                                {user?.userId}

                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs  text-gray-200">
                                                {user?.userName || 'Loading...'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs  text-gray-200">
                                                {user?.userEmail || 'Loading...'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-xs  text-gray-200">
                                                {user?.userPhone || 'Loading...'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div
                                                className={`text-xs px-2 py-0.5 rounded-sm ${user?.status === "available"
                                                    ? "text-green-100 bg-green-600"
                                                    : user?.status === "approved"
                                                        ? "text-blue-100 bg-blue-600"
                                                        : user?.status === "purchased"
                                                            ? "text-yellow-100 bg-yellow-600"
                                                            : user?.status === "checked-in"
                                                                ? "text-purple-100 bg-purple-600"
                                                                : "text-gray-200 bg-gray-600"
                                                    }`}
                                            >
                                                {user?.status === "available"
                                                    ? "Available"
                                                    : user?.status === "approved"
                                                        ? "Approved"
                                                        : user?.status === "purchased"
                                                            ? "Purchased"
                                                            : user?.status === "checked-in"
                                                                ? "Checked-in"
                                                                : "Loading..."}
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
