"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BookmarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const TicketCard = ({ searchQuery }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    console.log("events data:", events);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Filter events based on search query
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort events in descending order by startDateTime
    const sortedEvents = filteredEvents.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));

    return (
        <div>
            {sortedEvents.map(event => (
                <Link key={event._id} href={`/${event._id}`}>
                    <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3 cursor-pointer'>
                        <div className='grid lg:flex lg:justify-between lg:items-center'>
                            <div className='lg:flex justify-start gap-5'>
                                <div className='lg:col-span-2 w-[200px] h-[135px] overflow-hidden rounded-lg'>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.thumbnail}`}
                                        width={500}
                                        height={500}
                                        alt="Event Image"
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className='lg:col-span-5 lg:grid lg:content-between'>
                                    <div>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-[#E61D64] font-medium'>{new Date(event.startDateTime).toDateString()}</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-500 font-semibold text-lg'>
                                                {event.eventName}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex justify-between items-center'>
                                            <p className='max-w-xl w-[310px] text-gray-400 text-[16px] font-normal'>
                                                {event.description.length > 90 ? `${event.description.substring(0, 87)}...` : event.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid lg:grid lg:h-32 lg:content-between'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                    <div className=''>
                                        <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870] '>Get Ticket</p>
                                    </div>
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
