"use client"
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
    return (
        <div>
            <ArrowRightStartOnRectangleIcon className="size-6 text-gray-500 cursor-pointer" onClick={() => signOut()} />
        </div>
    );
};

export default Logout;