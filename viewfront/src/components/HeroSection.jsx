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
                <span className='px-4 pr-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    Grab Your Job
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#9c1468]'>
                        Dream Jobs
                    </span>
                </h1>
                <p>
                    Connecting Talent with Opportunity.
                    Explore top jobs, connect with employers,
                    and take the next step in your career journey today.
                </p>

                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text"
                        placeholder='Find your dream jobs..'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#53055e]">
                        <Search className='h-5 w-5' />
                    </Button>

                </div>
            </div>


        </div>
    )
}

export default HeroSection
