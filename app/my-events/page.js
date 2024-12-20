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
import { fetchEvents } from '@/utils/actions/fetchEvents';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p><span className="loading loading-dots loading-lg"></span></p>
            </div>
        );
    }
    if (error) return <p>{error}</p>;

    // const backendUrl = "http://localhost:5001";

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
        <div className='lg:pt-4 pt-2 pb-16 h-full min-h-screen mx-5 lg:w-full lg:max-w-[1220px] lg:mx-auto'>
            <div className='flex justify-start items-center gap-2'>
                <div className="breadcrumbs text-sm text-gray-400">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>My Events</a></li>
                    </ul>
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto">
                {events.map(event => {
                    const shareUrl = `https://tickimonk.vercel.app/${event._id}`;
                    return (
                        // <div key={event._id} className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3 cursor-pointer'>
                        //     <div className='grid lg:flex lg:justify-between lg:items-center'>
                        //         <Link href={`my-events/${event._id}`}>
                        //             <div className='lg:flex justify-start gap-5'>
                        //                 <div className='lg:col-span-2 w-[200px] h-[135px] overflow-hidden rounded-lg'>
                        //                     <Image
                        //                         src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.thumbnail}`}
                        //                         width={500}
                        //                         height={500}
                        //                         alt="Event Image"
                        //                         className="object-cover w-full h-full"
                        //                     />
                        //                 </div>

                        //                 <div className='lg:col-span-5 lg:grid lg:content-between'>
                        //                     <div>
                        //                         <div className='flex justify-between items-center'>
                        //                             <p className='text-[#E61D64] font-medium'>{new Date(event.startDateTime).toDateString()}</p>
                        //                         </div>
                        //                         <div>
                        //                             <p className='text-gray-500 font-semibold text-lg'>
                        //                                 {event.eventName}
                        //                             </p>
                        //                         </div>
                        //                     </div>

                        //                     <div>
                        //                         <div className='flex justify-between items-center'>
                        //                             <p className='max-w-xl w-[310px] text-gray-400 text-[16px] font-normal'>
                        //                                 {event.description.length > 90 ? `${event.description.substring(0, 87)}...` : event.description}
                        //                             </p>
                        //                         </div>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </Link>
                        //         <div className='grid lg:grid lg:h-32 lg:content-between'>
                        //             <div className='flex items-center gap-4'>
                        //                 <div className='flex items-center justify-center gap-3'>
                        //                     <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />

                        //                     <div className="dropdown dropdown-end">
                        //                         <div tabIndex={0} role="button" className="">
                        //                             <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                        //                         </div>
                        //                         <ul
                        //                             tabIndex={0}
                        //                             className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        //                             <li className='text-md font-semibold text-gray-500 mb-2'>Share this event!</li>
                        //                             <div className='flex items-center gap-2'>
                        //                                 <div>
                        //                                     <FacebookShareButton url={shareUrl}>
                        //                                         <FacebookIcon size={32} round={true} />
                        //                                     </FacebookShareButton>
                        //                                 </div>
                        //                                 {/* Add other share buttons similarly using the shareUrl */}
                        //                                 <div>
                        //                                     <TwitterShareButton url={shareUrl}>
                        //                                         <XIcon size={32} round={true} />
                        //                                     </TwitterShareButton>
                        //                                 </div>
                        //                                 <div>
                        //                                     <LinkedinShareButton url={shareUrl}>
                        //                                         <LinkedinIcon size={32} round={true} />
                        //                                     </LinkedinShareButton>
                        //                                 </div>
                        //                                 <div>
                        //                                     <WhatsappShareButton url={shareUrl}>
                        //                                         <WhatsappIcon size={32} round={true} />
                        //                                     </WhatsappShareButton>
                        //                                 </div>
                        //                                 <div>
                        //                                     <TelegramShareButton url={shareUrl}>
                        //                                         <TelegramIcon size={32} round={true} />
                        //                                     </TelegramShareButton>
                        //                                 </div>
                        //                             </div>
                        //                         </ul>
                        //                     </div>
                        //                 </div>
                        //                 <Link href={`my-events/${event._id}`}>
                        //                     <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870] '>View Event</p>
                        //                 </Link>
                        //             </div>
                        //             <div className='grid justify-items-end'>
                        //                 <p className='text-[12px] font-semibold text-gray-400'>{Math.ceil((new Date(event.startDateTime) - new Date()) / (1000 * 60 * 60 * 24))} Days Left</p>
                        //                 <p className='text-xl font-semibold text-[#E61D64]'>৳ {event.price}</p>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                        <div className="card card-compact w-full shadow-sm rounded-md">
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
                                <Link href={`my-events/${event._id}`} className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>
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
                                <div className="card-actions justify-end items-center bg-gray-200 rounded-sm mt-5 py-[10px] px-[10px]">
                                    <p className={`text-gray-800 font-bold text-[16px] ${Inria.className} style={{ fontWeight: 700 }}`}>
                                        {event.price} BDT
                                    </p>
                                    <Link href={`my-events/${event._id}`} className={`bg-gray-800 hover:bg-gray-950 text-white py-1 px-3 rounded-sm text-sm ${Inria.className}`}>
                                        DEATILS
                                    </Link>

                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
            {/* <TicketsByEvents></TicketsByEvents> */}
        </div>
    );
};

export default TicketCard;
