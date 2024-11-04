import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <div>
            <div className='bg-[#0f2a57] h-full lg:h-full lg:min-h-screen lg:pb-20 mb-16  pt-5 lg:w-[780px] lg:mx-auto mx-5'>
                {/* <UnderConstruction></UnderConstruction> */}
                <div className='flex justify-between items-center '>
                    <div className='flex justify-start gap-3 items-center'>
                        <div>
                            <img
                                alt="User Avatar"
                                className="bg-white p-0.5 rounded-full h-20 w-20"
                                src="https://cdn1.iconfinder.com/data/icons/fruit-cartoon-flat-cute-fruity/512/mango-512.png" />
                        </div>
                        <div>
                            <h5 className='font-medium tetx-sm text-gray-200'>Naim Siddiqui</h5>
                            <p className='font-normal text-xs text-gray-200'>naimsiddiquibd@gmail.com</p>
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
                                <span className="label-text text-gray-200">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100 bg-opacity-10 text-gray-200"
                            />
                        </label>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text text-gray-200">Email</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100 bg-opacity-10 text-gray-200"
                            />
                        </label>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text text-gray-200">Phone number</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100 bg-opacity-10 text-gray-200"
                            />
                        </label>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text text-gray-200">NID</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100 bg-opacity-10 text-gray-200"
                            />
                        </label>
                    </div>
                    <div className='flex justify-between items-center gap-5'>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text text-gray-200">Phone number</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100 bg-opacity-10 text-gray-200"
                            />
                        </label>
                        <label className="form-control w-full max-w-xl mt-3">
                            <div className="label">
                                <span className="label-text text-gray-200">Company</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100 bg-opacity-10 text-gray-200"
                            />
                        </label>
                    </div>
                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text text-gray-200">Profile image</span>
                        </div>
                        <input
                            type="file"
                            placeholder="Type here"
                            className="input outline-none focus:no-underline w-full bg-slate-100 bg-opacity-10  pt-2 text-gray-200"
                        />
                    </label>
                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text text-gray-200">BIO</span>
                        </div>
                        <textarea
                            type="textarea"
                            placeholder="Type here"
                            className="input outline-none focus:no-underline w-full h-32 pt-3 bg-slate-100 bg-opacity-10 text-gray-200"
                        />
                    </label>
                </form>
            </div>
        </div>
    );
};

export default page;