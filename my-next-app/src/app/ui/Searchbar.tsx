'use client'

import Button from "./Button";
import Search from "./Search";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('query')?.toString() || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop the default form reload behavior
    const trimmedTerm = searchQuery.trim();
    
    if (!trimmedTerm) return; // Prevent navigation on empty search

    const params = new URLSearchParams();
    params.set('page', '1'); // Always reset pagination on a new search
    params.set('query', trimmedTerm);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto mb-16">
      <Search 
        placeholder="Search for handcrafted items..." 
        currentQuery={searchQuery} // State value passed down
        onInputChange={setSearchQuery} // State setter passed down
      />
      <Button 
        className="rounded-l-none h-auto py-[9px] px-6 text-base"
        type="submit" // Key change: type="submit" fires the form's onSubmit handler
        disabled={!searchQuery.trim()} // Disable if the input is empty
      >
        Explore
      </Button>
    </form>
  );
}