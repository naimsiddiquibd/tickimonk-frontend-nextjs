import React from 'react';
import LogoForOtherBg from '../../public/logo-black.png';
import Link from 'next/link';
import Image from 'next/image';
import Facebook from '../../public/fb.svg';
import X from '../../public/x.svg';
import Linkedin from '../../public/in.svg';

const Footer = () => {
    return (
        <div className="mt-8 lg:my-16 lg:mx-28 mx-5 2xl:mx-96">
            <div className="">
                <div>
                    <Link href="/">
                        <Image
                            src={LogoForOtherBg}
                            width={150}
                            height={150}
                            alt="Logo"
                        />
                    </Link>
                    <p className="text-base text-gray-800 mt-3">
                        Tikimonk is your gateway to discovering and booking the best events, consultations, training sessions, travel experiences, workshops, and culinary adventures in your city. We curate experiences that are truly worth your time and money, giving you the opportunity to explore something new and exciting.
                    </p>
                    <p className="text-base text-gray-800 mt-4">
                       <span className="font-semibold"> For Event Organizers</span><br></br>
                        Tikimonk is built to help you craft unforgettable experiences. With our cutting-edge technology, powerful marketing tools, and dedicated customer support, we don’t just assist you in selling tickets—we help you build a lasting community of loyal fans and followers.
                    </p>
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-800 my-6 lg:flex lg:items-center gap-3">
                        <Link href="/privacy-policy">Privacey & Policy</Link>
                        <Link href="/terms-condition">Terms & Condition</Link>
                        <Link href="https://www.facebook.com/fatmonkhere">Live Chat</Link>
                    </div>
                    <div className="flex items-center gap-2 mt-1 lg:mt-3">
                        <Link href="https://www.facebook.com/fatmonkhere">
                            <Image
                                src={Facebook}
                                width={30}
                                height={30}
                                alt="Facebook"
                            />
                        </Link>
                        <Link href="https://x.com/FatmonkStudio">
                            <Image
                                src={X}
                                width={30}
                                height={30}
                                alt="X"
                            />
                        </Link>
                        <Link href="https://www.linkedin.com/company/fatmonk/mycompany/verification/">
                            <Image
                                src={Linkedin}
                                width={30}
                                height={30}
                                alt="LinkedIn"
                            />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;