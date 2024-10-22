"use client"
import { forgetPassword } from '@/utils/actions/forgetPassword';
import Link from 'next/link';
import React, { useState } from 'react';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const result = await forgetPassword(email);

        if (result.success) {
            setSuccessMessage(result.message);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className='h-full lg:h-screen lg:pt-28 pt-24 pb-10 mx-5'>
            <div className='flex justify-center items-center'>
                <div className='w-[500px] bg-white p-7 rounded-md'>
                    <p className='text-center font-bold text-gray-800'>Forgot password?</p>
                    <p className='text-center text-xs font-semibold text-gray-700 mt-3 mb-4'>
                        No worries! Enter your email to reset your password and regain access to your account.
                    </p>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="email"
                                placeholder="Type here"
                                className="input outline-none focus:no-underline w-full max-w-xl bg-slate-100"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <div className='mt-2'>
                            <button
                                type="submit"
                                className='text-[16px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-12 w-full hover:bg-[#ba4870]'
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    <p className='text-center text-xs font-semibold text-gray-500 mt-8'>
                        Go back to the
                        <Link href="/login">
                            <span className='text-[#E61D64]'> Login </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;
