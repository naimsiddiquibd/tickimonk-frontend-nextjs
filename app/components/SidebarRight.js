"use client";
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SidebarRight = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch events data
                const { data: eventsData } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                setEvents(eventsData);

                // Fetch tickets data for the first event (or modify as needed)
                if (eventsData.length > 0) {
                    const ticketsByEvent = await fetchTicketsByEvent({ id: eventsData[0]._id });
                    if (ticketsByEvent.success) {
                        setTickets(ticketsByEvent.data);
                    } else {
                        setError(ticketsByEvent.error || 'Failed to fetch tickets.');
                    }
                }
            } catch (err) {
                setError('Failed to fetch events.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const backendUrl = "http://localhost:5001";

    return (
        <div className='lg:flex justify-between items-center h-screen py-12'>
            <div className="h-full w-2 bg-[#eeeaea] mr-7 hidden lg:inline"></div>
            <div className='h-full grid grid-cols-1 gap-4 content-between'>
                {/* Top Part - Logo */}
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-gray-500'>Popular Events</p>
                        <Link className='text-sm font-bold text-[#E61D64]' href="/">See all</Link>
                    </div>

                    {/* Dynamically render the last 3 events */}
                    {events.length > 0 ? (
                        events.slice(-3).map((event) => (
                            <Link href={`/${event._id}`} key={event._id}>
                                <div className='flex justify-start gap-2 mt-4'>
                                    <div className='lg:col-span-2 w-[70px] h-[50px] overflow-hidden rounded-lg'>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.thumbnail}`}
                                            width={60}
                                            height={4}
                                            alt={event.eventName}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-gray-500'>{event.eventName}</p>
                                        <p className='text-xs font-semibold text-gray-500'>{`${tickets.length} People are Going`}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No popular events available.</p>
                    )}
                </div>

                {/* Middle Part - Navigation */}
                <div className='my-5'>
                    <div>
                        <div className='flex items-center justify-between'>
                            <p className='text-lg font-bold text-gray-500'>Top Organizers</p>
                            <p className='text-sm font-bold text-[#E61D64]'>See all</p>
                        </div>

                        {['/waythin.png', '/waythin.png', '/waythin.png'].map((src, index) => (
                            <div className='flex justify-start items-center gap-2 mt-5' key={index}>
                                <Image
                                    src={src}
                                    width={50}
                                    height={50}
                                    alt="Picture of the author"
                                />
                                <div>
                                    <p className='text-sm font-semibold text-gray-500'>Waythin Sean</p>
                                    <p className='text-xs font-semibold text-gray-500'>CEO & Founder at Artisan</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Part - Special Offers */}
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-gray-500'>Special Offers</p>
                        <p className='text-sm font-bold text-[#E61D64]'>See all</p>
                    </div>
                    <div className='flex items-center gap-3 mt-4'>
                        <Image
                            src="/offer.png"
                            width={300}
                            height={138}
                            alt="Special Offer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
