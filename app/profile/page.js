import Image from 'next/image';
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import UnderConstruction from '../components/UnderConstruction';

const page = () => {
    return (
        <div>
            <div className='bg-white p-4 h-[720px] rounded-lg mt-12'>
                <UnderConstruction></UnderConstruction>
                {/* <div className='flex justify-between items-center'>
                    <div className='flex justify-start gap-3 items-center'>
                        <div>
                            <UserCircleIcon className='w-20 h-20 text-gray-500' />
                        </div>
                        <div>
                            <h5 className='font-medium tetx-sm text-gray-700'>Naim Siddiqui</h5>
                            <p className='font-normal text-xs text-gray-700'>naimsiddiquibd@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <div className=' py-3 bg-[#E61D64] w-20 items-center text-center text-white rounded-md text-xs cursor-pointer hover:bg-red-600'>Save</div>
                    </div>
                </div>
                <div className="divider"></div>
                <form>
                    <div className='flex justify-between items-center gap-5 mt-4'>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]"
                            />
                        </label>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]"
                            />
                        </label>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text">Phone number</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]"
                            />
                        </label>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text">NID</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]"
                            />
                        </label>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text">Phone number</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]"
                            />
                        </label>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text">Company</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]"
                            />
                        </label>
                    </div>
                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text">Profile image</span>
                        </div>
                        <input
                                type="file"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full bg-[#eeeaea]  pt-2"
                            />
                    </label>
                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text">BIO</span>
                        </div>
                        <textarea
                            type="textarea"
                            placeholder="Type here"
                            className="input outline-none focus:no-underline w-full h-32 pt-3 bg-[#eeeaea]"
                        />
                    </label>
                </form> */}
            </div>
        </div>
    );
};

export default page;