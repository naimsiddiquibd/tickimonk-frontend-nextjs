"use client"
import React, { useState } from 'react';
import TicketCard from "./components/TicketCard";
import SearchBar from "./components/SearchBar";
import Hero from './components/Hero';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import Copyright from './components/Copyright';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            {/* <Hero></Hero> */}
            <div className="lg:w-full lg:max-w-[1220px] lg:mx-auto  pt-1 pb-10">
                {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
                <TicketCard searchQuery={searchQuery} />
                <GetStarted></GetStarted>
            <Footer></Footer>
            </div>
        </div>
    );
}
