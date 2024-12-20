"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/utils/actions/resetPassword';


const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token'); // Use useSearchParams to get the token from the query

        if (!token) {
            setError('Invalid or missing token.');
        }
    }, [searchParams]); // Add searchParams to the dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const token = searchParams.get('token'); // Get the token again here

        if (token) {
            try {
                const result = await resetPassword(token, newPassword);
                if (result.success) {
                    setSuccessMessage(result.message);
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000); // Redirect after 3 seconds
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Something went wrong. Please try again later.');
            }
        } else {
            setError('Unable to reset password due to missing token.');
        }
    };

    return (
        <div className='h-full lg:h-screen lg:pt-28 pt-24 pb-10 mx-5'>
            <div className='flex justify-center items-center'>
                <div className='w-[500px] bg-white opacity-10 p-7 rounded-md'>
                    <p className='text-center font-bold text-gray-200'>Reset Password</p>
                    <p className='text-center text-xs font-semibold text-gray-400 mt-3 mb-4'>
                        Enter your new password below.
                    </p>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">New Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="input outline-none focus:no-underline w-full text-gray-200 max-w-xl bg-slate-100 opacity-15"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xl mt-2">
                            <div className="label">
                                <span className="label-text">Confirm Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input text-gray-200 outline-none focus:no-underline w-full max-w-xl bg-slate-100"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>

                        <div className='mt-4'>
                            <button
                                type="submit"
                                className='text-[16px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-12 w-full hover:bg-[#ba4870]'
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
