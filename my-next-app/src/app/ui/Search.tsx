'use client'; 

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface SearchProps {
  placeholder?: string;
  currentQuery: string;
  onInputChange: (term: string) => void;
}

export default function Search({ placeholder = "Search...", currentQuery, onInputChange }: SearchProps) {
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-l-md rounded-r-none border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 transition-colors focus:border-orange-500 focus:ring focus:ring-orange-500/20 focus:outline-none"
        placeholder={placeholder}
        value={currentQuery} // Controlled by parent state
        onChange={(e) => {
          onInputChange(e.target.value); // Report changes to parent
        }}
        
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-orange-500" />
    </div>
  );
}