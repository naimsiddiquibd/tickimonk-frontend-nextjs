import Image from 'next/image';
import React from 'react';
import Navbar from './Navbar';
import Logout from './Logout';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Import Heroicon
import logo from '../../public/logo.png';
import Link from 'next/link';

const Sidebar = async ({ session }) => {
    return (
        <div className='lg:flex justify-between items-center h-screen py-12 w-full'>
            <div className='h-full grid grid-cols-1 gap-4 content-between w-full'>
                {/* Top Part - Logo */}
                <div>
                    <Link href="/">
                        <Image
                            src={logo}
                            width={120}
                            height={31}
                            alt="Logo"
                        />
                    </Link>
                </div>

                {/* Middle Part - Navigation */}
                <Navbar session={session}></Navbar>

                {/* Bottom Part - Profile */}
                {session?.user ? (
                    <div>
                        <div className='flex items-center justify-between gap-1'>
                            <Link href="/under-construction" className='flex justify-start items-center'>
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        width={45}
                                        height={45}
                                        alt="Profile"
                                        className='mx-auto rounded-full'
                                    />
                                ) : (
                                    <UserCircleIcon className='w-14 h-14 text-gray-500' /> // Display icon if image is missing
                                )}
                                <div>
                                    <p className='text-sm font-semibold text-gray-500'>{session.user.name}</p>
                                    <p className='text-xs font-semibold text-gray-500'>{session.user.email}</p>
                                </div>
                            </Link>
                            <div className='mr-4'>
                                <Logout></Logout>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="h-full w-2 bg-[#eeeaea] hidden lg:inline"></div>
        </div>
    );
};

export default Sidebar;
