

"use client";
import Ticket from '@/app/components/Ticket';
import { fetchEvent } from '@/utils/actions/fetchEvent';
import { fetchUserById } from '@/utils/actions/fetchUserById';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RocketLaunchIcon, MapPinIcon, ClockIcon, ExclamationCircleIcon, TagIcon, MapIcon, NoSymbolIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { purchaseTicket } from '@/utils/actions/purchaseTicket';
import { payForTicket } from '@/utils/actions/payForTicket';
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';

const Page = ({ params }) => {
    const { id } = params;
    const [event, setEvent] = useState(null);
    const [organizerName, setOrganizerName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]); 

    useEffect(() => {
        const getEvent = async () => {
            try {
                const result = await fetchEvent({ id });
                if (result.success) {
                    setEvent(result.data);
                    // Fetch Organizer Name
                    const organizer = result?.data?.organizer;
                    const userResult = await fetchUserById({ userId: organizer });
                    console.log("organizer fetching: " + userResult);
                    if (userResult.success) {
                        setOrganizerName(userResult.data.name);
                    } else {
                        setError('Failed to fetch the organizer.');
                    }

                    const response = await fetchTicketsByEvent({ id: result?.data?._id });
                    if (response.success) {
                        setTickets(response.data);  // Update tickets state in Page.js
                    } else {
                        setError(response.error);
                    }

                } else {
                    setError('Failed to fetch the event.');
                }
            } catch (err) {
                setError('An error occurred while fetching the event.');
            }
            setLoading(false);
        };

        if (id) {
            getEvent();
        }
    }, [id]);

    const handlePurchase = async () => {
        if (!event) {
            alert('Event not found');
            return;
        }
        try {
            const purchaseResult = await purchaseTicket({ eventId: id, price: event.price });

            if (purchaseResult.success) {
                const ticketId = purchaseResult.data._id;

                // After successful ticket creation, initiate payment
                const paymentResult = await payForTicket({ ticketId });

                if (paymentResult.success) {
                    // Redirect to bkash payment URL
                    const bkashURL = paymentResult.data.bkashURL;
                    window.location.href = bkashURL;
                } else {
                    alert('Failed to initiate payment.');
                }
            } else {
                alert('Failed to purchase the ticket.');
            }
        } catch (error) {
            console.error('Error purchasing ticket:', error);
            alert('An error occurred while purchasing the ticket.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <p>No event found.</p>;

    // Format the start and end times
    const formattedStartDateTime = new Date(event.startDateTime).toLocaleString();
    const formattedEndDateTime = new Date(event.endDateTime).toLocaleString();

    // const backendUrl = "http://localhost:5001";

    return (
        <div className='pt-12'>
            <div className='mb-10'>
                <div>
                    <div className='lg:col-span-2 w-full h-[250px] overflow-hidden rounded-lg'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.thumbnail}`}
                            width={500}
                            height={500}
                            alt="Event Image"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className='-mt-10 ml-6 flex justify-between items-center'>
                        <div className='flex justify-start items-end gap-3'>
                            <div className='lg:col-span-2 w-[120px] h-[120px] overflow-hidden rounded-lg'>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.eventLogo}`}
                                    width={500}
                                    height={500}
                                    alt="Event Image"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <h2 className='text-2xl font-semibold text-gray-600'>{event.eventName}</h2>
                                <p>By {organizerName}</p>
                            </div>
                        </div>
                        <div>
                            <div className='mt-12 ml-14'>
                                <div onClick={handlePurchase} className=' mr-2 text-[12px] bg-[#E61D64] btn border-0 rounded-full text-white font-medium px-6 h-1 min-h-10 hover:bg-[#ba4870]'>
                                    Purchase now
                                </div>
                                {/* <Link href="/create-event" className='text-[12px] bg-[#5f5e5f] btn border-0 rounded-full text-white font-medium px-6 h-1 min-h-10 hover:bg-[#838183]'>
                                    Contact support
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-5 rounded-lg'>
                <h3 className='font-bold text-gray-500 text-md'>Event details</h3>
                <div className="divider"></div>
                <div className='grid grid-cols-2 gap-3 '>

                    <div className=''>
                        <div className='flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                            <div className='bg-green-200 p-3 rounded-full'>
                                <RocketLaunchIcon className='w-7 h-7 text-gray-500' />
                            </div>
                            <div>
                                <h5 className='font-normal text-sm text-gray-700'>Number of people are going</h5>
                                <p className='font-semibold text-sm text-gray-700'>{tickets?.length} persons</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                            <div className='bg-sky-200 p-3 rounded-full'>
                                <MapPinIcon className='w-7 h-7 text-gray-500' />
                            </div>
                            <div>
                                <h5 className='font-normal text-sm text-gray-700'>Event location & venue</h5>
                                <p className='font-semibold text-sm text-gray-700'>{event.venue}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                            <div className='bg-pink-200 p-3 rounded-full'>
                                <ClockIcon className='w-7 h-7 text-gray-500' />
                            </div>
                            <div>
                                <h5 className='font-normal text-sm text-gray-700'>Event Start Time</h5>
                                <p className='font-semibold text-sm text-gray-700'>{formattedStartDateTime}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                            <div className='bg-red-200 p-3 rounded-full'>
                                <ExclamationCircleIcon className='w-7 h-7 text-gray-500' />
                            </div>
                            <div>
                                <h5 className='font-normal text-sm text-gray-700'>Event End Time</h5>
                                <p className='font-semibold text-sm text-gray-700'>{formattedEndDateTime}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-start items-start'>
                        {/* <div className="divider divider-horizontal ml-4 mr-4 "></div> */}
                        <div className='w-full'>

                            <div className='w-full flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                                <div className='bg-lime-200 p-3 rounded-full'>
                                    <TagIcon className='w-7 h-7 text-gray-500' />
                                </div>
                                <div>
                                    <h5 className='font-normal text-sm text-gray-700'>Event Category</h5>
                                    <p className='font-semibold text-sm text-gray-700'>{event.eventCategory}</p>
                                </div>
                            </div>
                            <div className='w-full flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                                <div className='bg-cyan-200 p-3 rounded-full'>
                                    <MapIcon className='w-7 h-7 text-gray-500' />
                                </div>
                                <div>
                                    <h5 className='font-normal text-sm text-gray-700'>Time Zone</h5>
                                    <p className='font-semibold text-sm text-gray-700'>{event.timezone}</p>
                                </div>
                            </div>
                            {/* <div className='w-full flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-2'>
                            <div className='bg-red-200 p-3 rounded-full'>
                                <ExclamationCircleIcon className='w-7 h-7 text-gray-500' />
                            </div>
                            <div>
                                <h5 className='font-normal text-sm text-gray-700'>Recurring Event</h5>
                                <p className='font-semibold text-gray-500 text-[10px]'>
                                    {event.recurringEvent ? "Yes" : "No"}
                                </p>
                            </div>
                        </div> */}
                            <div className='w-full flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                                <div className='bg-indigo-200 p-3 rounded-full'>
                                    <NoSymbolIcon className='w-7 h-7 text-gray-500' />
                                </div>
                                <div>
                                    <h5 className='font-normal text-sm text-gray-700'>Age Restrictions</h5>
                                    <p className='font-semibold text-sm text-gray-700'>{event.ageRestriction}</p>
                                </div>
                            </div>
                            <div className='w-full flex items-center gap-3 border-2 border-gray-200 p-3 rounded-lg mb-3'>
                                <div className='bg-purple-200 p-3 rounded-full'>
                                    <PuzzlePieceIcon className='w-7 h-7 text-gray-500' />
                                </div>
                                <div>
                                    <h5 className='font-normal text-sm text-gray-700'>Dress Code</h5>
                                    <p className='font-semibold text-sm text-gray-700'>{event.dressCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5 bg-white p-4 rounded-lg'>
                <h3 className='font-bold text-gray-500 text-md'>Other details</h3>
                <div className="divider"></div>
                <div>
                    <h5 className='font-bold text-gray-500 text-sm'>Event Description</h5>
                    <p className='font-normal text-gray-500 text-sm'>{event.description}</p>
                </div>

                <div className='mt-3'>
                    <h5 className='font-bold text-gray-500 text-sm'>Organizer Contact Information & Special Instructions</h5>
                    <p className='font-normal text-gray-500 text-sm'>{event.specialInstructions}</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
