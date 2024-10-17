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
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className="flex items-center justify-between">
                <p className='text-sm text-gray-500'>
                    {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Avatar>
                    <AvatarImage
                        src={job?.company?.logo} // Placeholder image for testing
                        alt="Company Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <AvatarFallback className="bg-gray-200 text-gray-600">CL</AvatarFallback>
                </Avatar>
                <div>
                    <h1>{job?.company?.name || 'Company Name'}</h1>
                    <p>{job?.company?.location || 'Location'}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-3'>
                    {job?.title || 'Job Title'}
                </h1>
                <p className='text-sm text-gray-600'>
                    {job?.description || 'Job Description'}
                </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position || '0'} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType || 'Full-Time'}
                </Badge>
                <Badge className={'text-[#005c9a] font-bold'} variant="ghost">
                    {job?.salary || '0'} LPA
                </Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#5502c2]">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
