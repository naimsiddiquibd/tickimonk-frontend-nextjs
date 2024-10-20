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
            <Hero></Hero>
            <div className="lg:mx-28 mx-5 2xl:mx-96">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <TicketCard searchQuery={searchQuery} />
                <GetStarted></GetStarted>
                <Footer></Footer>
            </div>
            <Copyright></Copyright>
        </div>
    );
}
