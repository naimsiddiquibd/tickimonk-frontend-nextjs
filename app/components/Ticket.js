// import Image from 'next/image';
// import React from 'react';
// import QRCode from 'react-qr-code';

// const Ticket = ({ ticketId, showName, dateTime, customerName, ticketPrice }) => {
//     // Function to extract the last two digits of ticketId, ignoring non-numeric characters
//     const getLastTwoDigits = (id) => {
//         // Extract numbers from the ticketId
//         const numbers = id.match(/\d+/g)?.join('') || '';
//         // Get the last two digits; if less than two digits, return all available digits
//         return numbers.slice(-2) || '00';
//     };

//     return (
//         <div className='bg-white px-5 pt-5 pb-2 rounded-lg shadow-sm'>
//             <div>
//                 <div className='flex justify-between items-center'>
//                     <div className='w-20 h-full'>
//                         <Image
//                             src="/logo.png"
//                             width={120}
//                             height={31}
//                             alt="Logo"
//                         />
//                     </div>
//                     <div className="flex flex-col items-end">
//                         <p className="text-[8px] text-gray-700">TICKET ID</p>
//                         <h5 className="text-[12px] text-gray-700 font-semibold">{ticketId}</h5>
//                     </div>
//                 </div>
//                 <div className='flex flex-col items-center mt-3'>
//                     <div style={{ height: "auto", margin: "0 auto", maxWidth: 250, width: "100%" }}>
//                         <QRCode
//                             size={256}
//                             style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//                             value={ticketId}
//                             viewBox={`0 0 256 256`}
//                         />
//                     </div>
//                 </div>
//                 <div className='mt-3'>
//                     <div>
//                         <p className="text-[8px] text-gray-700">EVENT NAME</p>
//                         <h5 className="text-[14px] text-gray-700 font-semibold uppercase tracking-widest">{showName}</h5>
//                     </div>
//                     <div className='mt-1'>
//                         <p className="text-[8px] text-gray-700">DATE & TIME</p>
//                         <h6 className="text-[11px] text-gray-700 font-semibold tracking-widest">{dateTime}</h6>
//                     </div>
//                 </div>
//                 <div className='flex justify-between items-center -mx-5 mt-2'>
//                     <Image
//                         src="/half-circle-right.png"
//                         width={10}
//                         height={10}
//                         alt="Decoration"
//                     />
//                     <div className='flex-1'>
//                         <Image
//                             src="/line.png"
//                             width={500}
//                             height={0}
//                             alt="Line"
//                         />
//                     </div>
//                     <Image
//                         src="/half-circle-left.png"
//                         width={10}
//                         height={10}
//                         alt="Decoration"
//                     />
//                 </div>
//                 <div className='mt-1 flex justify-between items-center'>
//                     <div>
//                         <div>
//                             <p className="text-[8px] text-gray-700">CUSTOMER NAME</p>
//                             <h5 className="text-[14px] text-gray-700 font-semibold uppercase tracking-widest">{customerName}</h5>
//                         </div>
//                         <div className='mt-1'>
//                             <p className="text-[8px] text-gray-700">TICKET PRICE</p>
//                             <h6 className="text-[11px] text-gray-700 font-semibold">{ticketPrice}</h6>
//                         </div>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-3xl text-[#E61D64]'>{getLastTwoDigits(ticketId)}</h1>
//                     </div>
//                 </div>
//                 <div className='flex flex-col items-center mt-1'>
//                     <p className="text-[10px] text-gray-700 font-semibold tracking-widest">WWW.TICKIMONK.COM</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Ticket;


import Image from 'next/image';
import React from 'react';
import QRCode from 'react-qr-code';
import ApprovedImage from '../../public/approved.png';

const Ticket = ({ ticketId, showName, dateTime, customerName, ticketPrice, ticketStatus }) => {
    // Function to extract the last two digits of ticketId, ignoring non-numeric characters
    const getLastTwoDigits = (id) => {
        // Extract numbers from the ticketId
        const numbers = id.match(/\d+/g)?.join('') || '';
        // Get the last two digits; if less than two digits, return all available digits
        return numbers.slice(-2) || '00';
    };

    return (
        <div className='bg-white px-5 pt-5 pb-2 rounded-lg shadow-sm relative'>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='w-20 h-full'>
                        <Image
                            src="/logo.png"
                            width={120}
                            height={31}
                            alt="Logo"
                        />
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-[8px] text-gray-700">TICKET ID</p>
                        <h5 className="text-[12px] text-gray-700 font-semibold">{ticketId}</h5>
                    </div>
                </div>
                <div className='flex flex-col items-center mt-3'>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 250, width: "100%" }}>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={ticketId}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    <div>
                        <p className="text-[8px] text-gray-700">EVENT NAME</p>
                        <h5 className="text-[14px] text-gray-700 font-semibold uppercase tracking-widest">{showName}</h5>
                    </div>
                    <div className='mt-1'>
                        <p className="text-[8px] text-gray-700">DATE & TIME</p>
                        <h6 className="text-[11px] text-gray-700 font-semibold tracking-widest">{dateTime}</h6>
                    </div>
                </div>
                <div className='flex justify-between items-center -mx-5 mt-2'>
                    <Image
                        src="/half-circle-right.png"
                        width={10}
                        height={10}
                        alt="Decoration"
                    />
                    <div className='flex-1'>
                        <Image
                            src="/line.png"
                            width={500}
                            height={0}
                            alt="Line"
                        />
                    </div>
                    <Image
                        src="/half-circle-left.png"
                        width={10}
                        height={10}
                        alt="Decoration"
                    />
                </div>
                <div className='mt-1 flex justify-between items-center'>
                    <div>
                        <div>
                            <p className="text-[8px] text-gray-700">CUSTOMER NAME</p>
                            <h5 className="text-[14px] text-gray-700 font-semibold uppercase tracking-widest">{customerName}</h5>
                        </div>
                        <div className='mt-1'>
                            <p className="text-[8px] text-gray-700">TICKET PRICE</p>
                            <h6 className="text-[11px] text-gray-700 font-semibold">{ticketPrice}</h6>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-3xl text-[#E61D64]'>{getLastTwoDigits(ticketId)}</h1>
                    </div>
                </div>
                <div className='flex flex-col items-center mt-1'>
                    <p className="text-[10px] text-gray-700 font-semibold tracking-widest">WWW.TICKIMONK.COM</p>
                </div>
                {/* Show ApprovedImage if ticketStatus is "approved" */}
                {ticketStatus === 'approved' && (
                    <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2'>
                        <div className='h-44 w-44'>
                            <Image
                                src={ApprovedImage}
                                width={500} // Adjust size as needed
                                height={500}
                                alt="Approved"
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Ticket;
