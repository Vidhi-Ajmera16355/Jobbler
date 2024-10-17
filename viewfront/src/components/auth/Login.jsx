import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    });

    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Form submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        // Check if any field is missing
        if (!input.email || !input.password || !input.role) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            dispatch(setLoading(true));
            // Make the API request
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true // Ensure cookies are sent
            });

            // Check the response
            if (res.data.success) {
                dispatch(setUser(res.data.user)); // Store user in Redux
                navigate('/'); // Redirect to homepage
                toast.success(res.data.message); // Show success toast
            } else {
                throw new Error('Login failed. Check your credentials and try again.');
            }
        } catch (error) {
            // Log and show error toast
            console.error('Error during login:', error.message);
            toast.error(error.message || 'An error occurred. Please try again later.');
        } finally {
            dispatch(setLoading(false)); // Stop loading spinner
        }
    };

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Login Form Container */}
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                        Log In to Your Account
                    </h1>

                    {/* Email Input */}
                    <div className='mb-4'>
                        <Label className='text-sm font-semibold text-gray-600'>Email</Label>
                        <Input
                            type='email'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder='Enter your email'
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3702f8] focus:border-transparent'
                        />
                    </div>

                    {/* Password Input */}
                    <div className='mb-4'>
                        <Label className='text-sm font-semibold text-gray-600'>Password</Label>
                        <Input
                            type='password'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder='Enter your password'
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3702f8] focus:border-transparent'
                        />
                    </div>

                    {/* Role Selection */}
                    <div className='mb-6'>
                        <Label className='text-sm font-semibold text-gray-600'>Select Your Role</Label>
                        <RadioGroup className='flex items-center gap-6 mt-2'>
                            <div className='flex items-center'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='student'
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    id='student'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor='student' className='ml-2 text-sm text-gray-600'>
                                    Student
                                </Label>
                            </div>
                            <div className='flex items-center'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    id='recruiter'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor='recruiter' className='ml-2 text-sm text-gray-600'>
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Loading State Button */}
                    {loading ? (
                        <Button
                            className='w-full my-4 bg-gray-400 text-white rounded-md font-semibold transition duration-300 shadow-md'
                            disabled
                        >
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please Wait
                        </Button>
                    ) : (
                        <Button
                            type='submit'
                            className='w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg'
                        >
                            Log In
                        </Button>
                    )}

                    {/* Signup Link */}
                    <div className='text-center mt-4'>
                        <span className='text-sm text-gray-600'>Don't have an account?</span>
                        <Link to='/signup' className='text-blue-600 font-medium ml-1 hover:underline'>
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
