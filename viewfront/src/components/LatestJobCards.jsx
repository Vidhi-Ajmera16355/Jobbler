import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    if (!job) return null;
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-6 rounded-lg bg-gradient-to-r from-purple-100 via-blue-50 to-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
        >
            <div>
                <h1 className='font-semibold text-xl text-gray-800'>
                    {job?.company?.name || 'Unknown Company'}
                </h1>
                <p className='text-sm text-gray-500'>{job?.location || 'India'}</p>
            </div>
            <div className='mt-3'>
                <h1 className='font-bold text-lg text-gray-900'>
                    {job?.title || 'No Title'}
                </h1>
                <p className='text-sm text-gray-700'>
                    {job?.description || 'No Description Available'}
                </p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position || '0'} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType || 'Unknown Type'}
                </Badge>
                <Badge className='text-[#005c9a] font-bold' variant="ghost">
                    {job?.salary || '0'} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
