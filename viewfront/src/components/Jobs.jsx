import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilteredJobs(filteredJobs);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-100 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto mt-8 px-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Section */}
                    <div className="lg:w-1/4 w-full bg-white rounded-lg shadow-md p-5 border border-gray-200">
                        <FilterCard />
                    </div>

                    {/* Job Cards Section */}
                    <div className="lg:flex-1 w-full h-auto">
                        {
                            filteredJobs && filteredJobs.length > 0 ? (
                                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        filteredJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                                key={job?._id}
                                                className="transform transition-all duration-300 hover:scale-105"
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="text-center text-gray-600">No jobs found</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
