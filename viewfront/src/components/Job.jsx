import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div className='p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 via-white to-gray-100 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 w-full sm:w-auto'>
            {/* Date and Bookmark */}
            <div className="flex items-center justify-between mb-3">
                <p className='text-xs text-gray-500 italic'>
                    {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                </p>
                <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-100" size="icon">
                    <Bookmark className="text-gray-500" />
                </Button>
            </div>

            {/* Company Logo and Info */}
            <div className="flex items-center gap-3 my-4">
                <Avatar className="w-12 h-12 shadow-md">
                    <AvatarImage
                        src={job?.company?.logo}
                        alt="Company Logo"
                        className="rounded-full"
                    />
                    <AvatarFallback className="bg-gray-300 text-gray-700">CL</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <h1 className="text-lg font-semibold text-gray-800">
                        {job?.company?.name || 'Company Name'}
                    </h1>
                    <p className="text-sm text-gray-500">{job?.company?.location || 'Location'}</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div className="mb-4">
                <h1 className='text-xl font-bold text-gray-900'>
                    {job?.title || 'Job Title'}
                </h1>
                <p className='text-sm text-gray-600 mt-2 line-clamp-3'>
                    {job?.description || 'Job Description'}
                </p>
            </div>

            {/* Job Details Badges */}
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className={'text-blue-600 font-semibold bg-blue-50'} variant="ghost">
                    {job?.position || '0'} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-semibold bg-red-50'} variant="ghost">
                    {job?.jobType || 'Full-Time'}
                </Badge>
                <Badge className={'text-[#005c9a] font-semibold bg-blue-50'} variant="ghost">
                    {job?.salary || '0'} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap items-center gap-4 mt-6'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700 w-full sm:w-auto"
                >
                    Details
                </Button>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg w-full sm:w-auto">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
