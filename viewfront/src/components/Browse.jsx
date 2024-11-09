import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();

    // Filter jobs based on searchedQuery
    const filteredJobs = allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase())
    );

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 my-12">
                <h1 className="font-bold text-2xl text-gray-800 mb-8 text-center">
                    Search Results ({filteredJobs.length})
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        filteredJobs.map((job) => {
                            return (
                                <div key={job._id} className="flex justify-center">
                                    <Job job={job} />
                                </div>
                            );
                        })
                    }
                </div>
                
                {filteredJobs.length === 0 && (
                    <div className="text-center text-xl text-gray-600 mt-8">
                        No jobs found. Please try again with different keywords.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
