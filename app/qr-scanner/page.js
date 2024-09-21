"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchTicket } from '@/utils/actions/fetchTicket';
import Ticket from '../components/Ticket';
import { fetchUserById } from '@/utils/actions/fetchUserById';
import { approveTicket } from '@/utils/actions/approveTicket'; // Import the approve function

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

const QRCodeScanner = () => {
    const [qrData, setQrData] = useState(null);
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [organizerName, setOrganizerName] = useState('');
    const [cameraOn, setCameraOn] = useState(true);

    const handleScan = async (data) => {
        if (data) {
            setQrData(data?.text || null);
            setCameraOn(false); // Turn off the camera after scanning
        }
    };

    const handleError = (err) => {
        setError(err);
        console.error(err);
    };

    const fetchTicketDetails = async (id) => {
        setLoading(true);
        const response = await fetchTicket({ id });

        if (response.success) {
            setTicketData(response.data);
            setError(null); 
        } else {
            setError(response.error);
        }

        const ticketUserId = response?.data?.userId;
        const userResult = await fetchUserById({ userId: ticketUserId });
        if (!userResult.success) {
            throw new Error('Failed to fetch the organizer.');
        }
        setOrganizerName(userResult.data.name);
        setLoading(false);
    };

    const handleApprove = async () => {
        if (!ticketData) return;

        setLoading(true);
        const response = await approveTicket(ticketData._id); // Call approve function
        if (response.success) {
            setTicketData((prevData) => ({
                ...prevData,
                status: 'approved',
            }));
            setError(null);
        } else {
            setError(response.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (qrData) {
            fetchTicketDetails(qrData);
        }
    }, [qrData]);

    const previewStyle = {
        height: 240,
        width: 320,
    };

    const formattedStartDateTime = new Date(ticketData?.startDateTime).toLocaleString();

    return (
        <div className='mt-8'>
            <div className="breadcrumbs text-sm text-gray-400">
                <ul>
                    <li><a>Home</a></li>
                    <li><a>Ticket Checking</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-center mt-8">
                <div className="mb-4">
                    {cameraOn && (
                        <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={previewStyle}
                        />
                    )}
                </div>

                {loading && <p className="text-gray-500">Loading ticket information...</p>}

                {ticketData ? (
                    <div className='w-96'>
                        <Ticket
                            ticketId={ticketData._id}
                            showName={ticketData?.eventName}
                            dateTime={formattedStartDateTime}
                            customerName={organizerName}
                            ticketPrice={ticketData?.price}
                            ticketStatus={ticketData?.status}
                        />
                        <div className='mt-4'>
                            <button
                                className='text-[16px] bg-[#E61D64] btn border-0 rounded-full text-white font-medium w-full h-12 hover:bg-[#ba4870]'
                                onClick={handleApprove} // Trigger the approve function
                                disabled={ticketData?.status === 'approved'} // Disable if already approved
                            >
                                {ticketData?.status === 'approved' ? 'Approved' : 'Approve'}
                            </button>
                        </div>
                    </div>
                ) : (
                    !loading && !error && <p className="text-gray-500">No QR code scanned yet.</p>
                )}

                {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
                        <p className="font-semibold text-red-500">Error:</p>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeScanner;
