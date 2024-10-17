import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;

    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();

    // Initialize isApplied state
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to apply');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.error('Failed to fetch job details:', error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Render a loading state until singleJob is available
    if (!singleJob) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>
                        {singleJob.title}
                    </h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">
                            {singleJob.position} Positions
                        </Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                            {singleJob.jobType}
                        </Badge>
                        <Badge className={'text-[#005c9a] font-bold'} variant="ghost">
                            {singleJob.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={!isApplied ? applyJobHandler : null}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6206a0] hover:bg-[#6306dd]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>
                Job Description
            </h1>

            <div className='my-4'>
                <h1 className='font-bold my-1'>Role:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.title}</span>
                </h1>
                <h1 className='font-bold my-1'>Location:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.location}</span>
                </h1>
                <h1 className='font-bold my-1'>Description:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.description}</span>
                </h1>
                <h1 className='font-bold my-1'>Experience:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.experience} year</span>
                </h1>
                <h1 className='font-bold my-1'>Salary:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.salary} LPA</span>
                </h1>
                <h1 className='font-bold my-1'>Total Applicants:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.applications?.length}</span>
                </h1>
                <h1 className='font-bold my-1'>Posted Date:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob.createdAt.split("T")[0]}</span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
