"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoForWhiteBg from '../../public/logo-white.png';
import LogoForOtherBg from '../../public/logo-black.png';
import Image from 'next/image';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/mytickets', label: 'My Tickets' },
    { href: '/my-events', label: 'My Events', requiresOrganizer: true },
    { href: '/create-event', label: 'Create Event', requiresOrganizer: true },
    { href: '/qr-scanner', label: 'Scanner', requiresOrganizer: true },
];

const guestNavItems = [
    { href: '/', label: 'Home' },
    { href: '/signup', label: 'Join Now' }
];

import { Inria_Sans } from "next/font/google";
import { signOut } from 'next-auth/react';
const Inria = Inria_Sans({
    weight: ["300", "400", "700"],
    subsets: ["latin"]
});

const NewNavBarForTop = ({ session }) => {
    const pathname = usePathname();

    const logo = pathname === '/' ? LogoForWhiteBg : LogoForOtherBg;

    const filteredNavItems = session?.user
        ? navItems.filter(item => !item.requiresOrganizer || session.user.role === 'organizer')
        : guestNavItems;

    // Dynamic color based on pathname
    const userNameColor = pathname === '/' ? 'text-white font-semibold' : 'text-gray-600 font-semibold';

    return (
        <div className="absolute z-[999999] drawer mb-4 pt-5 lg:px-14 px-5">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col lg:mx-16">
                <div className="navbar bg-slate-50 bg-opacity-5 mx-auto w-full rounded-md shadow-sm">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current text-slate-700">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="ml-2 navbar-start">
                        <Link href="/">
                            <Image
                                src={logo}
                                width={150}
                                height={150}
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="hidden flex-none lg:block navbar-center">
                    <ul className="menu menu-horizontal">
                            {/* Dynamic Navbar content */}
                            {filteredNavItems.map(item => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={`${pathname === item.href
                                            ? pathname === '/' 
                                                ? 'text-white font-bold' 
                                                : 'text-red-600 font-bold'
                                            : pathname === '/'
                                                ? 'text-white'
                                                : 'text-gray-600'} text-base ${Inria.className} style={{ fontWeight: 700 }}`}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="navbar-end mr-2">
                        {session?.user ? (
                            <div className="flex items-center gap-2">
                                <div className="hidden lg:block">
                                    <p className={userNameColor}>{session?.user?.name}</p>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="User Avatar"
                                                className="bg-white p-0.5"
                                                src="https://cdn1.iconfinder.com/data/icons/fruit-cartoon-flat-cute-fruity/512/mango-512.png" />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">Upcoming!</span>
                                            </a>
                                        </li>
                                        <li><Link href="create-event">Create Event</Link></li>
                                        <li><a onClick={() => signOut()} >Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login">
                                <div
                                    className={`px-6 py-2 rounded-sm shadow-sm font-bold ${pathname === '/'
                                        ? 'bg-white text-[#DE135A]'
                                        : 'bg-[#DE135A] text-white'} ${Inria.className} style={{ fontWeight: 700 }}`}>
                                    Login
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {filteredNavItems.map(item => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={pathname === item.href ? 'active' : ''}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NewNavBarForTop;
