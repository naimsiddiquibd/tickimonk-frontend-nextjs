import React from 'react';

const Copyright = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="bg-[#0f2a57] py-4">
            <p className="text-sm lg text-gray-300 text-center">
                Copyright © {currentYear} all rights reserved by Tickimonk
            </p>
        </div>
    );
};

export default Copyright;
