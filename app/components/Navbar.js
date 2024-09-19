"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, BookmarkIcon, TicketIcon, UserIcon, CalendarDaysIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

// Default navigation items for authenticated users
const navItems = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/bookmarks', icon: BookmarkIcon, label: 'Bookmarks' },
    { href: '/mytickets', icon: TicketIcon, label: 'My Tickets' },
    { href: '/my-events', icon: CalendarDaysIcon, label: 'My Events', requiresOrganizer: true }, // requiresOrganizer added
    { href: '/qr-scanner', icon: MagnifyingGlassPlusIcon, label: 'Scanner', requiresOrganizer: true }, // requiresOrganizer added
    { href: '/profile', icon: UserIcon, label: 'Profile' }
];

// Navigation items for unauthenticated users
const guestNavItems = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/login', icon: UserIcon, label: 'Login' },
    { href: '/signup', icon: UserIcon, label: 'Sign Up' }
];

const Navbar = ({ session }) => {
    const pathname = usePathname();

    // Filter out "My Events" and "QR Scanner" if the user is not an organizer
    const filteredNavItems = session?.user 
        ? navItems.filter(item => !item.requiresOrganizer || session.user.role === 'organizer') 
        : guestNavItems;

    return (
        <div>
            {filteredNavItems.map((item, index) => {
                const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
                return (
                    <Link key={index} href={item.href}>
                        <div className={`flex items-center gap-4 w-48 ${isActive ? 'bg-[#ede9e9] justify-center py-3 text-gray-500 rounded-full' : 'hover:bg-[#ede9e9] text-gray-500 hover:rounded-full hover:justify-center hover:py-3'} cursor-pointer duration-300 group mt-7`}>
                            {item.icon && <item.icon className={`size-6 ${isActive ? 'text-[#E61D64]' : 'text-gray-500 group-hover:text-[#E61D64]'}`} />}
                            <p className={`text-xl ${isActive ? 'text-[#E61D64]' : 'text-gray-500'}`}>
                                {item.label}
                            </p>
                        </div>
                    </Link>
                );
            })}

            <div className='mt-10'>
                <Link href="/create-event" className='text-[16px] bg-[#E61D64] btn border-0 rounded-full text-white font-medium px-12 hover:bg-[#ba4870]'>
                    Create Event
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
