"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoForWhiteBg from '../../public/logo-white.png';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast(
    <span className="pr-4 font-medium"><span className='text-red-400'>You’re out! </span>We will miss you.</span>, 
    {
        icon: <img src="https://res.cloudinary.com/deyd102hk/image/upload/v1731303931/Sign_Out.gif" alt="Farewell"  className="w-16 h-16 bg-white/50 p-0 border-none object-contain rounded"        />,
    }
);

const handleLogout = async () => {
    try {
        await signOut({ redirect: false }); // Prevent immediate redirect
        notify();
        setTimeout(() => {
            window.location.href = '/'; // Redirect after a short delay
        }, 2000); // Adjust timing as needed
    } catch (error) {
        toast.error("Logout failed. Please try again.");
    }
};


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

    // Always use the white logo and white styles.
    const logo = LogoForWhiteBg;
    const userNameColor = 'text-white font-semibold';

    const filteredNavItems = session?.user
        ? navItems.filter(item => !item.requiresOrganizer || session.user.role === 'organizer')
        : guestNavItems;

    return (
        <div className=" z-50 lg:w-full lg:max-w-[1220px] lg:mx-auto">
            <div className="drawer mb-4 pt-5 px-5 lg:px-0">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    <div className="navbar bg-white bg-opacity-10 mx-auto w-full rounded-md shadow-sm">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current text-gray-200">
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
                                                ? 'text-pink-600 font-bold'
                                                : 'text-gray-200'} text-base ${Inria.className} style={{ fontWeight: 700 }}`}
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
                                    <div className="dropdown dropdown-end z-50">
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
                                                <Link href="profile" className="justify-between">
                                                    Profile
                                                    <span className="badge">Upcoming!</span>
                                                </Link>
                                            </li>
                                            <li><Link href="create-event">Create Event</Link></li>
                                            <li><a onClick={handleLogout} >Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <div
                                        className="px-6 py-2 rounded-md shadow-sm font-bold bg-[#DE135A] text-white">
                                        Login
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="drawer-side z-50">
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
            <Toaster />
        </div>
    );
};

export default NewNavBarForTop;
