"use client";
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PopularEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ticketsCount, setTicketsCount] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch events data
                const { data: eventsData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                setEvents(eventsData);

                // Fetch tickets for each event and store count
                const ticketsCountMap = {};
                await Promise.all(
                    eventsData.map(async (event) => {
                        const ticketsByEvent = await fetchTicketsByEvent({ id: event._id });
                        if (ticketsByEvent.success) {
                            ticketsCountMap[event._id] = ticketsByEvent.data.length;
                        } else {
                            ticketsCountMap[event._id] = 0;
                        }
                    })
                );
                setTicketsCount(ticketsCountMap);
            } catch (err) {
                setError('Failed to fetch events.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {events.length > 0 ? (
                events.slice(-3).map((event) => (
                    <Link href={`/${event._id}`} key={event._id}>
                        <div className='flex justify-start gap-2 mt-4'>
                            <div className='lg:col-span-2 w-[70px] h-[50px] overflow-hidden rounded-lg'>
                                <Image
                                    src={event?.thumbnail}
                                    width={60}
                                    height={4}
                                    alt={event.eventName}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-gray-500'>{event.eventName}</p>
                                <p className='text-xs font-semibold text-gray-500'>{`${ticketsCount[event._id] || 0} People are Going`}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No popular events available.</p>
            )}
        </div>
    );
};

export default PopularEvents;
