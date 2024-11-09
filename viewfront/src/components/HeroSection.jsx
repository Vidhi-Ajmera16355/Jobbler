import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className='px-4 pr-2 rounded-full bg-gray-200 text-[#0066FF] font-medium'>
                Step Into Your Future
            </span>
            <h1 className='text-5xl font-bold'>
                Discover Opportunities & <br /> Build Your <span className='text-[#285495]'>
                    Ideal Career
                </span>
            </h1>
            <p>
                Unlock potential, connect with top employers, and start your journey to a successful career.
                Explore endless opportunities and make your professional dreams come true.
            </p>
    
            <div className='flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto bg-white'>
                <input type="text"
                    placeholder='What job are you looking for?'
                    onChange={(e) => setQuery(e.target.value)}
                    className='outline-none border-none w-full text-gray-800'
                />
                <Button onClick={searchJobHandler} className="rounded-r-full bg-[#000000] hover:bg-[#FF4081]">
                    <Search className='h-5 w-5 text-white' />
                </Button>
            </div>
        </div>
    </div>
    
    )
}

export default HeroSection
