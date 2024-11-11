
 "use client";
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Loading state for the button

    const onSubmit = async (data) => {
        setIsLoading(true);  // Set loading state to true when submitting
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        console.log("eita result from login page:", result);
        setIsLoading(false);  // Set loading state to false after submission completes

        if (result?.ok) {
            window.location.href = '/';
        } else if (result?.error) {
            setLoginError("Email or password is incorrect!");
        } else {
            setLoginError(result?.error || "Something went wrong! Please contact support.");
        }
    };

    return (
        <div className='h-full lg:h-screen pt-2 mx-5'>
            <div className='flex justify-center items-center'>
                <div className='w-[500px] bg-white bg-opacity-10 p-7 rounded-lg'>
                    <p className='text-center font-bold text-gray-200'>Login</p>
                    <p className='text-center text-xs font-semibold text-gray-200 mt-3 mb-4'>
                        Welcome to the Ticketing System! Log in to purchase tickets or create and manage events with ease. Sign in to get started!
                    </p>

                    {loginError && <p className="text-center text-red-500 mb-4">{loginError}</p>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text text-gray-200">Email</span>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                className="input outline-none focus:no-underline w-full text-gray-200 max-w-xl bg-slate-100 bg-opacity-10" 
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </label>

                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text text-gray-200">Password</span>
                            </div>
                            <input 
                                type="password" 
                                placeholder="Type here" 
                                className="input outline-none focus:no-underline text-gray-200 w-full max-w-xl bg-slate-100 bg-opacity-10" 
                                {...register('password', { required: true })}
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </label>

                        <div>
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input type="checkbox" defaultChecked className="checkbox text-gray-200 border-gray-200" />
                                    <p className="label-text text-sm text-gray-200">Agree to the <Link href="terms-condition" className='text-[#E61D64]'>Terms and Conditions</Link></p>
                                </label>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <button type="submit" className='text-[16px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-12 w-full hover:bg-[#ba4870]' disabled={isLoading}>
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </form>

                    <Link href="forget-password">
                        <p className='text-center text-xs font-semibold text-gray-200 mt-4 hover:text-[#E61D64]'>Forgot Password?</p>
                    </Link>

                    <p className='text-center text-xs font-semibold text-gray-200 mt-8'>
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

  