"use client"
import React, { useState } from 'react';
import TicketCard from "./components/TicketCard";
import SearchBar from "./components/SearchBar";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <TicketCard searchQuery={searchQuery} />
        </div>
    );
}
