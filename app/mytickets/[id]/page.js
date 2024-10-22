"use client";
import Ticket from '@/app/components/Ticket';
import { fecthTicketEvent } from '@/utils/actions/fecthTicketEvent';
import { fetchTicket } from '@/utils/actions/fetchTicket';
import { fetchUserById } from '@/utils/actions/fetchUserById';
import { toPng } from 'html-to-image'; // import html-to-image
import { saveAs } from 'file-saver'; // import file-saver
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const Page = ({ params }) => {
    const { id } = params;
    const [ticket, setTicket] = useState(null);
    const [event, setEvent] = useState(null);
    const [organizerName, setOrganizerName] = useState('');
    const [ticketUserName, setTicketUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ticketRef = useRef(null); // useRef to capture the ticket element

    useEffect(() => {
        const getTicket = async () => {
            try {
                setLoading(true);
                console.log('Fetching ticket...');

                const ticketResult = await fetchTicket({ id });
                console.log('Ticket result:', ticketResult);
                if (!ticketResult.success) {
                    throw new Error('Failed to fetch the ticket.');
                }
                setTicket(ticketResult.data);

                const organizer = ticketResult?.data?.organizer;
                console.log("ticket event organizer id:", organizer);
                const ticketUserId = ticketResult?.data?.userId;
                console.log("ticket user Id:", ticketUserId);


                const userResult = await fetchUserById({ userId: organizer });
                console.log('User result:', userResult);
                if (!userResult.success) {
                    throw new Error('Failed to fetch the organizer.');
                }
                setOrganizerName(userResult.data.name);




                const ticketUserResult = await fetchUserById({ userId: ticketUserId });
                console.log('User result:', ticketUserResult);
                if (!ticketUserResult.success) {
                    throw new Error('Failed to fetch the organizer.');
                }
                setTicketUserName(ticketUserResult.data.name);



                const eventId = ticketResult?.data?.eventId;
                console.log('Fetching event with eventId:', eventId);
                const eventResult = await fecthTicketEvent({ eventId });
                console.log('Event result:', eventResult);
                if (!eventResult.success) {
                    throw new Error('Failed to fetch the event.');
                }
                setEvent(eventResult.data);

            } catch (err) {
                console.error('Error:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getTicket();
        }
    }, [id]);

    const handleDownload = async () => {
        if (ticketRef.current) {
            try {
                const dataUrl = await toPng(ticketRef.current);
                saveAs(dataUrl, 'ticket.png'); // Trigger image download
            } catch (err) {
                console.error('Error generating image:', err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <p>No event found!</p>
            </div>
        );
    }

    const formattedStartDateTime = new Date(event?.startDateTime).toLocaleString();
    const formattedEndDateTime = new Date(event?.endDateTime).toLocaleString();

    return (
        <div className="w-full flex justify-center">
            <div className='pt-28 pb-16 lg:mx-28 mx-5 2xl:mx-96'>
                <div className='flex justify-start items-center gap-2 mb-5'>
                    <div className="breadcrumbs text-sm text-gray-400">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>My Tickets</a></li>
                            <li><a>{event?.eventName}</a></li>
                        </ul>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-3xl lg:min-h-screen h-full'>
                    <div>
                        <div ref={ticketRef}>
                            <Ticket
                                ticketId={id}
                                showName={event?.eventName}
                                dateTime={formattedStartDateTime}
                                customerName={ticketUserName}
                                ticketPrice={event?.price}
                                ticketStatus={ticket?.status}
                            />
                        </div>
                        <div className='mt-5'>
                            <div onClick={handleDownload} className='text-[16px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-12 w-full lg:w-96 hover:bg-[#ba4870]'>
                                Download Now
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-start items-start gap-4'>
                        <div className="divider divider-horizontal ml-3 mr-3 hidden lg:block"></div>
                        <div className="mt-3">
                            <div>
                                <h5 className='font-semibold text-gray-500 text-sm'>Event Name</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{event?.eventName}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Location</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{event?.venue}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Organizer</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{organizerName}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Event Category</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{event?.eventCategory}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Start Date & Time</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{formattedStartDateTime}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>End Date & Time</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{formattedEndDateTime}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Time Zone</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{event?.timezone}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Recurring Event</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>
                                    {event?.recurringEvent ? "Yes" : "No"}
                                </p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Age Restrictions</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{event?.ageRestriction}</p>
                            </div>
                            <div className='mt-2'>
                                <h5 className='font-semibold text-gray-500 text-sm'>Dress Code</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>{event?.dressCode}</p>
                            </div>
                            <div className='mt-5'>
                                <div>
                                    <h5 className='font-semibold text-gray-500 text-sm'>Event Description</h5>
                                    <p className='font-semibold text-gray-500 text-[12px]'>{event?.description}</p>
                                </div>
                                <div className='mt-2'>
                                    <h5 className='font-semibold text-gray-500 text-sm'>Organizer Contact Information & Special Instructions</h5>
                                    <p className='font-semibold text-gray-500 text-[12px]'>{event?.specialInstructions}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;
