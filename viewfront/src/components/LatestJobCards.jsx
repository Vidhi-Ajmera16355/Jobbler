import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    if (!job) return null;
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>
                    {job?.company?.name || 'Unknown Company'}
                </h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg'>
                    {job?.title || 'No Title'}
                </h1>
                <p>{job?.description || 'No Description Available'}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position || '0'} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType || 'Unknown Type'}
                </Badge>
                <Badge className={'text-[#005c9a] font-bold'} variant="ghost">
                    {job?.salary || '0'} LPA
                </Badge>
            </div>
        </div>
    );
};


export default LatestJobCards
