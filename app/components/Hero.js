import React from 'react';
import Herobg from '../../public/herobg.jpg';

const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${Herobg.src})`, // Using Herobg here
            }}>
            <div className=""></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-3xl">
                    <h1 className="mb-5 text-6xl font-bold text-white">Do More With Less With TikiMonk</h1>
                    <p className="mb-5 text-white">
                    Create, Manage, and Sell Tickets for Your Events – All in One Place!
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Hero;
