"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BookmarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { fetchEvents } from '@/utils/actions/fetchEvents';
import Link from 'next/link';

const TicketCard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            const result = await fetchEvents(); // Use the server-side function to fetch events
            if (result.success) {
                setEvents(result.data);
            } else {
                setError('Failed to fetch events.');
            }
            setLoading(false);
        };

        getEvents();
    }, []);

    console.log("events data:", events);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const backendUrl = "http://localhost:5001";

    return (
        <div className='mt-12'>
            <div className='flex justify-start items-center gap-2'>
                <div className="breadcrumbs text-sm text-gray-400">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>My Events</a></li>
                    </ul>
                </div>

            </div>
            {events.map(event => (
                <Link href={`/my-events/${event._id}`}>
                    <div key={event._id} className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3 cursor-pointer'>
                        <div className='grid lg:grid-cols-7'>
                            <div className='lg:col-span-2 w-[200px] h-[135px] overflow-hidden rounded-lg'>
                                <Image
                                    src={`${backendUrl}/${event.thumbnail}`}
                                    width={500}
                                    height={500}
                                    alt="Event Image"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                                <div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[#E61D64] font-medium'>{new Date(event.startDateTime).toDateString()}</p>
                                        <div className='flex items-center justify-center gap-3'>
                                            <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                            <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-gray-500 font-semibold text-lg'>
                                            {event.eventName}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex justify-between items-center'>
                                        <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                            {event.description.length > 90 ? `${event.description.substring(0, 87)}...` : event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:col-span-1 grid content-between justify-items-end'>
                                <div className=''>
                                    <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                                </div>
                                <div className='grid justify-items-end'>
                                    <p className='text-[12px] font-semibold text-gray-400'>{Math.ceil((new Date(event.startDateTime) - new Date()) / (1000 * 60 * 60 * 24))} Days Left</p>
                                    <p className='text-xl font-semibold text-[#E61D64]'>৳ {event.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TicketCard;
