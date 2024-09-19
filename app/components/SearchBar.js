"use client"
import React from 'react';
import { MagnifyingGlassIcon, BellAlertIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className='mt-12 mb-5'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center justify-start gap-3 bg-gray-200 p-4 rounded-full w-full'>
                    <MagnifyingGlassIcon className="size-6 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Type here"
                        className="bg-transparent flex-1 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <BellAlertIcon className="size-10 text-gray-500" />
            </div>
        </div>
    );
};

export default SearchBar;
