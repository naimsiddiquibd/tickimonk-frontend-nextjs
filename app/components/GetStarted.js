import React from 'react';

const GetStarted = () => {
    return (
        <div>
            <div className=" bg-[#E2185F] p-6 lg:p-20 rounded-md mt-5 lg:mt-12">
                <div className="col-span-3">
                    <div className="lg:flex lg:items-center lg:justify-between ">
                        <h2 className="text-white text-[40px] leading-snug font-semibold">
                        Get Started with TikiMonk Today!
                        </h2>
                        <button className="text-white border-2 px-12 py-4 rounded-md hover:bg-white hover:text-black mt-4">
                            Get Started
                        </button>
                    </div>
                    <p className="text-base text-white mt-4">
                        Whether you're an event creator looking to sell tickets, a conference organizer managing speakers and schedules, a webinar host seeking seamless engagement, or simply an attendee wanting to stay in the loop, TikiMonk has you covered. Sign up now to create and manage events effortlessly, or subscribe to our newsletter for the latest updates on events, workshops, and webinars. Whatever your role, TikiMonk makes it easy to connect, create, and celebrate!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
