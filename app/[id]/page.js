

"use client";
import Ticket from '@/app/components/Ticket';
import { fetchEvent } from '@/utils/actions/fetchEvent';
import { fetchUserById } from '@/utils/actions/fetchUserById';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RocketLaunchIcon, MapPinIcon, ClockIcon, ExclamationCircleIcon, TagIcon, MapIcon, NoSymbolIcon, PuzzlePieceIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { purchaseTicket } from '@/utils/actions/purchaseTicket';
import { payForTicket } from '@/utils/actions/payForTicket';
import { fetchTicketsByEvent } from '@/utils/actions/fetchTicketsByEvent';
import Head from 'next/head';
import { Inria_Sans } from "next/font/google";
const Inria = Inria_Sans({
    weight: ["300", "400", "700"],
    subsets: ["latin"]
});


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

        // Gather additional required data
        const paymentData = {
            amount: event.price,
            currency: "BDT",
            product_name: event.eventName,
            product_description: event.description,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "01712345678",
            address: "123 Test Street",
            city: "Dhaka",
            state: "Dhaka",
            zipcode: "1000",
            country: "BD",
            redirect_url: "https://tickimonk.vercel.app/mytickets",
            ipn_url: "https://tickimonk.vercel.app"
        };

        try {
            const purchaseResult = await purchaseTicket({ eventId: id, price: event.price });

            if (purchaseResult.success) {
                const ticketId = purchaseResult.data._id;

                // After successful ticket creation, initiate payment
                const paymentResult = await payForTicket({ ticketId, paymentData });
                console.log("reeeee:", paymentResult);
                if (paymentResult.success) {
                    // Redirect to the payment URL from the response if available
                    // const paymentUrl = paymentResult.data.data.action.url; 

                    // // Calculate the popup dimensions and position to center it
                    // const popupWidth = 400;
                    // const popupHeight = 618; // Taller for vertical layout
                    // const popupX = (window.screen.width - popupWidth) / 2;
                    // const popupY = (window.screen.height - popupHeight) / 2;

                    // // Open the centered popup
                    // window.open(
                    //     paymentUrl,
                    //     'PaymentPopup',
                    //     `width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY},resizable=yes,scrollbars=yes`
                    // );
                    const paymentUrl = paymentResult.data.data.action.url; // Adjust this line based on your API response
                    window.location.href = paymentUrl;
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




    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Error: {error}</p>
            </div>
        );
    }
    if (!event) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Event not found!</p>
            </div>
        );
    }

    // Format the start and end times
    const formattedStartDateTime = new Date(event.startDateTime).toLocaleString();
    const formattedEndDateTime = new Date(event.endDateTime).toLocaleString();


    // Function to generate the event URL
    const generateEventUrl = () => {
        return `https://tickimonk.vercel.app/${id}`;
    };

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
            <div className="lg:mx-28 mx-5x lg:min-h-screen min-h-screen h-full pt-2 lg:px-28 pb-16">
                <div className="lg:pt-10 pt-2  mx-5 lg:w-[780px] lg:mx-auto lg:pb-16 pb-0 lg:h-screen h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-7 gap-5">
                        {/* <div className="bg-[#261E62] p-4 rounded-md lg:col-span-2 max-h-80">
                        <div className="h-[180px] lg:h-[215px] w-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.thumbnail}`}
                                width={500}
                                height={500}
                                alt="Event Image"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex justify-start items-center gap-2 mt-5">
                            <div className="w-12 h-12">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${event.eventLogo}`}
                                    width={500}
                                    height={500}
                                    alt="Event Image"
                                    className="object-cover w-full h-full rounded-sm"
                                />
                            </div>
                            <p className={`text-white font-bold text-xl ${Inria.className} style={{ fontWeight: 700 }}`}>{event?.eventName}</p>
                        </div>
                    </div> */}
                        <div className="rounded-md lg:col-span-2 max-h-80">
                            <div className="h-full w-full">
                                <Image
                                    src={event?.thumbnail}
                                    width={500}
                                    height={500}
                                    alt="Event Image"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                        </div>
                        <div className="lg:col-span-3">
                            <div className="gap-0 rounded-b-md">
                                <h2 className={`text-gray-200 font-bold text-4xl uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>
                                    {event?.eventName}
                                </h2>
                                <p className="text-gray-200 text-lg mb-5">@ {organizerName}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <CalendarIcon className="size-6 stroke-2 text-gray-300" />
                                    <p className={`text-gray-200 font-bold text-lg ${Inria?.className} style={{ fontWeight: 700 }}`}>
                                        {event?.startDate} | {event?.startTime}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <MapPinIcon className="size-6 stroke-2 text-gray-300" />
                                    <p className="text-lg  text-gray-200">
                                        {event?.venue}
                                    </p>
                                </div>
                                <div className="card-actions justify-between items-center bg-gray-200 rounded-sm mt-5 py-[10px] px-[10px]">
                                    <p className={`text-gray-800 font-bold text-2xl ${Inria.className} style={{ fontWeight: 700 }}`}>
                                        BDT  {event?.price}
                                    </p>
                                    <button onClick={handlePurchase} className={`bg-gray-800 hover:bg-gray-950 text-white py-1 px-3 rounded-sm text-lg ${Inria.className}`}>
                                        BUY NOW
                                    </button>

                                </div>
                            </div>
                            <div className="mt-10">
                                <div>
                                    <h3 className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>CONTENT</h3>
                                </div>
                                <div>
                                    <p className="text-base mt-1 text-gray-300">{event?.description}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <h3 className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>SPECIAL INSTRUCTIONS</h3>
                                </div>
                                <div>
                                    <p className="text-base mt-1 text-gray-300">{event?.specialInstructions}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <h3 className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>AGE RESTRICTION</h3>
                                </div>
                                <div>
                                    <p className="text-base mt-1 text-gray-300">
                                        {event?.ageRestriction ? "Yes! Participants must be adult 18+" : "No age restriction"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div>
                                    <h3 className={`text-gray-200 font-bold text-lg uppercase ${Inria?.className} style={{ fontWeight: 700 }}`}>DRESS CODE</h3>
                                </div>
                                <div>
                                    <p className="text-base mt-1 text-gray-300">{event?.dressCode}</p>
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
