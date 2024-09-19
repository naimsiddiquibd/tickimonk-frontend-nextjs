import React from 'react';
import Image from 'next/image';
import { BookmarkIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, BellAlertIcon } from '@heroicons/react/24/outline';


const page = () => {
    return (
        <div className='mt-12'>
            <div>

                <div className='flex justify-start items-center gap-2'>
                    <div className="breadcrumbs text-sm text-gray-400">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>Bookmarks</a></li>
                        </ul>
                    </div> 

                </div>
            </div>
            <div >
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-4'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white shadow-sm p-4 rounded-xl mb-5 mt-3'>
                    <div className='grid lg:grid-cols-7'>
                        <div className='lg:col-span-2'>
                            <Image
                                src="/event.png"
                                width={250}
                                height={55}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='lg:col-span-4 lg:ml-4 lg:mr-4 lg:grid lg:content-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[#E61D64] font-medium'>Tue, Jul 01, 2024</p>
                                    <div className='flex items-center justify-center gap-3'>
                                        <BookmarkIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                        <ArrowTopRightOnSquareIcon className="size-6 text-[#615757] hover:text-[#E61D64]" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold text-lg'>
                                        Amazon AWS Event At Fatmonk Studio
                                    </p>
                                </div>
                            </div>

                            <div>

                                <div className='flex justify-between items-center'>
                                    <p className='max-w-xl w-80 text-gray-400 text-[16px] font-normal'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum it.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-1 grid content-between justify-items-end'>
                            <div className=''>
                                <p className='text-[12px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-3 min-h-9 h-9 hover:bg-[#ba4870]'>Get Ticket</p>
                            </div>
                            <div className='grid justify-items-end'>
                                <p className='text-[12px] font-semibold text-gray-400'>2 Days Left</p>
                                <p className='text-xl font-semibold text-[#E61D64]'>৳ 2000</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;