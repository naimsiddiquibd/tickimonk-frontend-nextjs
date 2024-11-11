"use client";
import { Inria_Sans } from "next/font/google";
const Inria = Inria_Sans({
    weight: ["300", "400", "700"],
    subsets: ["latin"]
});

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BookmarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    XIcon,
    TelegramIcon,
} from "react-share";
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    if (error) return <p>{error}</p>;

    // Filter events based on search query
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort events in descending order by startDateTime
    const sortedEvents = filteredEvents.sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));

    const formatDateTime = (startDateTime) => {
        const date = new Date(startDateTime);

        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

        const startTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
        });

        return `${formattedDate} | ${startTime}`;
    };

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto z-10">
            {sortedEvents.map(event => {
                const shareUrl = `https://tickimonk.vercel.app/${event._id}`; // Construct the share URL dynamically

                return (
                    <div className="card card-compact 0 w-full shadow-sm rounded-md z-10">
                        <figure className="relative">
                            <Image
                                src={event?.thumbnail}
                                width={500}
                                height={500}
                                alt="Event Image"
                                className="object-cover w-full h-[210px]"
                            />
                            {/* Button at top left */}
                            <button className="absolute top-4 left-4 bg-red-600 text-white py-1 px-3 rounded-sm">
                                {event.eventCategory}
                            </button>
                        </figure>
                        <div className="card-body bg-white bg-opacity-10 gap-0 rounded-b-md">
                            <Link href={`/${event._id}`} className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>
                                {event.eventName}
                            </Link>
                            <div className="flex items-center gap-1 mt-2">
                                <CalendarIcon className="size-5 stroke-2 text-gray-200" />
                                <p className={`text-gray-200 font-bold text-[11.3px] ${Inria?.className} style={{ fontWeight: 700 }}`}>
                                    {event?.startDate} | {event?.startTime}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <MapPinIcon className="size-5 stroke-2 text-gray-200" />
                                <p className="text-[11.3px] font-semibold text-gray-200">
                                    {event.venue}
                                </p>
                            </div>
                            <div className="card-actions justify-end items-center bg-gray-200 rounded-md mt-5 py-[10px] px-[10px]">
                                <p className={`text-gray-800 font-bold text-[16px] ${Inria.className} style={{ fontWeight: 700 }}`}>
                                    {event.price} BDT
                                </p>
                                <Link href={`/${event._id}`} className={`bg-gray-800 hover:bg-gray-950 text-white py-1 px-3 rounded-md text-sm ${Inria.className}`}>
                                    DEATILS
                                </Link>

                            </div>
                        </div>
                    </div>

                );
            })}
        </div>
        </div>
    );
};

export default TicketCard;
