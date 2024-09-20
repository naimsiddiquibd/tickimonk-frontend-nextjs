"use client";
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';  // Import useState
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');  // State for handling login error

    const onSubmit = async (data) => {
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });
console.log("eita result from login page:", result);
        if (result?.ok) {
            // Navigate and reload using window.location.href
            window.location.href = '/';
        } else if (result?.error) {
            setLoginError("Email or password is incorrect!");
        } else {
            // Update the error state with the error message from the API
            setLoginError(result?.error || "Something went wrong! Please contact support.");
        }
    };

    return (
        <div className='mt-12'>
            <div className='flex justify-center items-center'>
                <div className='w-[500px] bg-white p-7 rounded-lg'>
                    <p className='text-center font-bold text-gray-500'>Login</p>
                    <p className='text-center text-xs font-semibold text-gray-400 mt-3 mb-4'>
                        Welcome to the Ticketing System! Log in to purchase tickets or create and manage events with ease. Sign in to get started!
                    </p>

                    {/* Display error message if loginError state is set */}
                    {loginError && <p className="text-center text-red-500 mb-4">{loginError}</p>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]" 
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </label>

                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input 
                                type="password" 
                                placeholder="Type here" 
                                className="input outline-none focus:no-underline w-full max-w-xl bg-[#eeeaea]" 
                                {...register('password', { required: true })}
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </label>

                        <div>
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input type="checkbox" defaultChecked className="checkbox" />
                                    <p className="label-text text-sm">Agree to the <span className='text-[#E61D64]'>Terms and Conditions</span></p>
                                </label>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <button type="submit" className='text-[16px] bg-[#E61D64] btn border-0 rounded-full text-white font-medium px-12 w-full hover:bg-[#ba4870]'>
                                Login
                            </button>
                        </div>
                    </form>

                    {/* <button className='mt-3' onClick={()=> signIn("github", { callbackUrl: "/" })}>
                        <p className='text-[16px] bg-[#dfbf3e] btn border-0 rounded-full text-white font-medium px-12 w-full hover:bg-[#ba4870]'>
                            GitHub for Test
                        </p>
                    </button>

                    <button className='mt-3' onClick={()=> signIn("google", { callbackUrl: "/" })}>
                        <p className='text-[16px] bg-[#dfbf3e] btn border-0 rounded-full text-white font-medium px-12 w-full hover:bg-[#ba4870]'>
                            Google for Test
                        </p>
                    </button> */}

                    <Link href="forget-password">
                        <p className='text-center text-xs font-semibold text-gray-500 mt-4 hover:text-[#E61D64]'>Forgot Password?</p>
                    </Link>

                    <p className='text-center text-xs font-semibold text-gray-500 mt-8'>
                        Don’t have an account yet? Please
                        <Link href="signup">
                            <span className='text-[#E61D64]'> Signup</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;