"use client";
import { registerUser } from "@/utils/actions/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const { confirmPassword, ...userData } = data; // Exclude confirmPassword
        try {
            const res = await registerUser(userData);
            console.log(res);
            // Check if response contains user data and handle success
            if (res.email) {
                console.log(`Registration successful! Welcome, ${res.name}.`);
                router.push("/login");
            } else {
                setErrorMessage(res?.message || "Rxxegistration failed. Please try again.");
                console.error("Registration failed:");
            }
        } catch (error) {
            // Extract the error message and set it to the state
            setErrorMessage(error?.message || "Registration failed. Please try again.");
            console.error("Registration failed:");
        }
    };

    return (
        <div className="h-full lg:h-screen  pt-2  mx-5">
            <div className="flex justify-center items-center">
                <div className="w-[500px] bg-white bg-opacity-10 p-7 rounded-lg">
                    <p className="text-center font-bold text-gray-200">Signup</p>
                    <p className="text-center text-xs font-semibold text-gray-200 mt-3 mb-4">
                        Welcome to the Ticketing System! Log in to purchase tickets or
                        create and manage events with ease. Sign in to get started!
                    </p>
                    {/* Display error message if loginError state is set */}
                    {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="lg:flex grid grid-cols-1 items-center gap-2 mt-1">
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text text-gray-200">Name</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-xs outline-none focus:no-underline w-full text-gray-200  max-w-xl bg-slate-100 bg-opacity-10"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">Name is required</p>
                                )}
                            </label>
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text text-gray-200">Email</span>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Type here"
                                    className="input text-xs outline-none focus:no-underline text-gray-200 w-full max-w-xl bg-slate-100 bg-opacity-10"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">Email is required</p>
                                )}
                            </label>
                        </div>
                        <div className="lg:flex grid grid-cols-1 items-center gap-2 mt-1">
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text text-gray-200">Phone Number</span>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Type here"
                                    className="input text-xs outline-none focus:no-underline text-gray-200 w-full max-w-xl bg-slate-100 bg-opacity-10"
                                    {...register("phoneNumber", { required: true })}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-xs mt-1">Phone number is required</p>
                                )}
                            </label>
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text text-gray-200">NID</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-xs outline-none focus:no-underline text-gray-200 w-full max-w-xl bg-slate-100 bg-opacity-10"
                                    {...register("nid", { required: true })}
                                />
                                {errors.nid && (
                                    <p className="text-red-500 text-xs mt-1">NID is required</p>
                                )}
                            </label>
                        </div>
                        <div className="lg:flex grid grid-cols-1 items-center gap-2 mt-1">
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text text-gray-200">Password</span>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="input text-xs outline-none focus:no-underline text-gray-200 w-full max-w-xl bg-slate-100 bg-opacity-10"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">Password is required</p>
                                )}
                            </label>
                            <label className="form-control w-full max-w-xl">
                                <div className="label">
                                    <span className="label-text text-gray-200">Confirm Password</span>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="input text-xs outline-none focus:no-underline text-gray-200 w-full max-w-xl bg-slate-100 bg-opacity-10"
                                    {...register("confirmPassword", { required: true })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">Please confirm your password</p>
                                )}
                            </label>
                        </div>
                        <div className="mt-2">
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input
                                        type="checkbox"
                                        className="checkbox border-gray-200"
                                        {...register("terms", { required: true })}
                                    />
                                    <p className="label-text text-sm text-gray-200">
                                        Agree to the{" "}
                                        <Link href="terms-condition" className="text-[#E61D64]">Terms and Conditions</Link>
                                    </p>
                                </label>
                                {/* Show the error message from API in this spot */}
                                {errors.terms && (
                                    <p className="text-red-500 text-xs mt-1">
                                        You must agree to the terms
                                    </p>
                                )}

                            </div>
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="text-[16px] bg-[#E61D64] btn border-0 rounded-md text-white font-medium px-12 w-full hover:bg-[#ba4870]"
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-xs font-semibold text-gray-200 mt-8">
                        Don’t have an account yet? Please
                        <Link href="login">
                            <span className="text-[#E61D64]"> Login</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
