"use client";
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';
import React, { useEffect, useState } from 'react';
import { Inria_Sans } from "next/font/google";

const Inria = Inria_Sans({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
});

const TicketSalesAndRevenue = ({ eventId }) => {
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTickets = async () => {
            const response = await fetchTicketsByEvent({ id: eventId });
            if (response.success) {
                setTicketData(response.data);
            } else {
                setError(response.error);
            }
            setLoading(false);
        };

        loadTickets();
    }, [eventId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p><span className="loading loading-dots loading-lg"></span></p>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching ticket data: {error}</div>;
    }

    // Calculate overall ticket analytics
    const totalTickets = ticketData.length;
    const totalRevenue = ticketData.reduce((sum, ticket) => {
        return ticket.paymentStatus === "completed" ? sum + ticket.price : sum;
    }, 0);
    const pendingPayments = ticketData.filter(ticket => ticket.paymentStatus === "pending").length;

    // Today's Date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate today's ticket sales and revenue
    const todaysTickets = ticketData.filter(ticket => {
        const ticketDate = new Date(ticket.createdAt);
        ticketDate.setHours(0, 0, 0, 0);
        return ticketDate.getTime() === today.getTime();
    });
    const todaysTicketsSold = todaysTickets.length;
    const todaysRevenue = todaysTickets.reduce((sum, ticket) => {
        return ticket.paymentStatus === "completed" ? sum + ticket.price : sum;
    }, 0);

    return (
        <div className='mt-7'>
            <div className='flex justify-start items-center '>
                <h3 className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>Ticket Sales & Revenue</h3>
                <div className="divider"></div>
            </div>
            <div className='grid grid-cols-1 gap-2 lg:grid-cols-4 text-gray-200'>
                <div className='mt-2 p-4 bg-slate-100 bg-opacity-10 text-center rounded-md'>
                    <h3 className='text-2xl font-semibold text-gray-200'>{totalTickets}</h3>
                    <p>Total Tickets Sold</p>
                </div>
                <div className='mt-2 p-4 bg-slate-100 bg-opacity-10 text-center rounded-md'>
                    <h3 className='text-2xl font-semibold text-gray-200'>${totalRevenue}</h3>
                    <p>Total Revenue</p>
                </div>
                {/* <div className='mt-2 p-4 bg-slate-100 bg-opacity-10 text-center rounded-md'>
                    <h3 className='text-2xl font-semibold text-gray-200'>{pendingPayments}</h3>
                    <p>Pending Payments</p>
                </div> */}
                <div className='mt-2 p-4 bg-slate-100 bg-opacity-10 text-center rounded-md'>
                    <h3 className='text-2xl font-semibold text-gray-200'>{todaysTicketsSold}</h3>
                    <p>Tickets Sold Today</p>
                </div>
                <div className='mt-2 p-4 bg-slate-100 bg-opacity-10 text-center rounded-md'>
                    <h3 className='text-2xl font-semibold text-gray-200'>${todaysRevenue}</h3>
                    <p>Today's Revenue</p>
                </div>
            </div>
        </div>
    );
};

export default TicketSalesAndRevenue;
