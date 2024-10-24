"use client";
import { fetchTickets } from '@/utils/actions/fetchTickets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTickets = async () => {
            const response = await fetchTickets();
            if (response.success) {
                setTickets(response.data);
            } else {
                setError(response.error);
            }
            setLoading(false);
        };

        loadTickets();
    }, []);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString(); // format the date
        const formattedTime = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // 12-hour format with AM/PM
        });
        return (
            <>
                <div>{formattedDate}</div>
                <div>{formattedTime}</div>
            </>
        );
    };

    // Function to determine the status based on the end date and time
    const getStatus = (endDateTime) => {
        const now = new Date();
        const endDate = new Date(endDateTime);
        return endDate > now ? "Active" : "Ended"; // Adjust "Ended" to any other status like "Expired" if needed
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching tickets: {error}</div>;
    }

    // const backendUrl = "http://localhost:5001";

    return (
        <div className='pt-28 lg:mx-28 mx-5 2xl:mx-96 pb-16 min-h-screen h-full'>
            <div className='flex justify-start items-center gap-2'>
                <div className="breadcrumbs text-sm text-gray-400">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>My Tickets</a></li>
                    </ul>
                </div>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead className='bg-[#eeeaea] text-gray-500'>
                        <tr className='border-0'>
                            <th>Event</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket._id} className='border-0'>
                                <td>

                                    <Link href={`/${ticket.eventId}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <Image
                                                        src={ticket?.thumbnail}
                                                        width={500}
                                                        height={500}
                                                        alt="Event Image"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-xs text-gray-500">{ticket?.eventName}</div>
                                                <div className="text-xs opacity-50 text-gray-500">{ticket?.organizer}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className='font-semibold text-xs text-gray-500'>
                                    {getStatus(ticket?.endDateTime)}
                                </td>
                                <td className='font-semibold text-xs text-gray-500'>
                                    {formatDateTime(ticket?.startDateTime)}
                                </td>
                                <td className='font-semibold text-xs text-gray-500'>
                                    {formatDateTime(ticket?.endDateTime)}
                                </td>
                                <td className='font-semibold text-xs text-gray-500'>
                                    <Link href={`/mytickets/${ticket._id}`}>
                                        <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>
                                            View Ticket
                                        </p>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTickets;
