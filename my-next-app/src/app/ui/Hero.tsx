'use client'; 

import Button from '@/app/ui/Button';
import Search from '@/app/ui/Search';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Hero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state with the current query from the URL, if any
  const initialQuery = searchParams.get('query')?.toString() || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  /**
   * Handles the form submission (when the button is clicked or Enter is pressed).
   * This is the ONLY place navigation should occur.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop the default form reload behavior
    const trimmedTerm = searchQuery.trim();
    
    if (!trimmedTerm) return; // Prevent navigation on empty search

    const params = new URLSearchParams();
    params.set('page', '1'); // Always reset pagination on a new search
    params.set('query', trimmedTerm);
    
    // Navigate to the dedicated /search route
    router.push(`/search?${params.toString()}`);
  };

  // --- Component Render ---
  
  return (
    <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-br from-white via-orange-100 to-red-50 text-gray-900">
      <Image
        src= "/hero-pc.jpg"
        width={1500}
        height={500}
        alt='Picture of handcrafted ceramics'
        className="absolute inset-0 w-full h-[42rem] object-cover object-top z-0 opacity-35 hidden md:block"
      />
      <Image 
        src="/hero-mobile.jpg"
        width={560}
        height={620}
        alt='Picture of handcrafts'
        className="absolute inset-0 w-full h-[48rem] object-cover object-top z-0 opacity-35 block md:hidden"
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Discover Unique{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
            Handcrafted Treasures
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Sample text
        </p>

        {/* Search bar with button */}
        <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto mb-16">
          
          {/* Search is now a controlled component. onInputChange updates the state, 
              but does NOT trigger navigation.
          */}
          <Search 
            placeholder="Search for handcrafted items..." 
            currentQuery={searchQuery} // State value passed down
            onInputChange={setSearchQuery} // State setter passed down
          />
          
          {/* Button submits the form */}
          <Button 
            className="rounded-l-none h-auto py-[9px] px-6 text-base"
            type="submit" // Key change: type="submit" fires the form's onSubmit handler
            disabled={!searchQuery.trim()} // Disable if the input is empty
          >
            Explore
          </Button>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Active Artisans */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#FB923C]/10 text-[#FB923C]">
              <i className="fa-solid fa-user"></i>
            </div>
            <h3 className="text-2xl font-bold">200+</h3>
            <p className="text-gray-600">Active Artisans</p>
          </div>
          {/* Handcrafted Items */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#F97316]/10 text-[#F97316]">
              <i className="fa-solid fa-hands-holding-circle"></i>
            </div>
            <h3 className="text-2xl font-bold">1,200+</h3>
            <p className="text-gray-600">Handcrafted Items</p>
          </div>
          {/* Sustainable Materials */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#EA580C]/10 text-[#EA580C]">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-gray-600">Sustainable Materials</p>
          </div>
          {/* Customer Satisfaction */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#EF4444]/10 text-[#EF4444]">
              <i className="fa-solid fa-hand-sparkles"></i>
            </div>
            <h3 className="text-2xl font-bold">4.9★</h3>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
