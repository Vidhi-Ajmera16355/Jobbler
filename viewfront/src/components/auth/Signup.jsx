import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'; // Import Loader2

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: null,
    });

    const [loading, setLoading] = useState(false); // Define loading state
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true); // Set loading to true
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
            console.log(res.data); // Success response
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Signup Form Container */}
            <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-10">
                <form
                    onSubmit={submitHandler}
                    className="w-full md:w-1/2 lg:w-1/3 bg-white border border-gray-200 shadow-lg rounded-lg p-8"
                >
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Create an Account
                    </h1>

                    {/* Full Name Input */}
                    <div className="mb-4">
                        <Label className="text-sm font-semibold text-gray-600">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3702f8] focus:border-transparent"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <Label className="text-sm font-semibold text-gray-600">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3702f8] focus:border-transparent"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <Label className="text-sm font-semibold text-gray-600">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3702f8] focus:border-transparent"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <Label className="text-sm font-semibold text-gray-600">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3702f8] focus:border-transparent"
                        />
                    </div>

                    {/* Role Selection and Profile Upload */}
                    <div className="mb-6">
                        {/* Radio Buttons for Role */}
                        <div className="mb-4">
                            <Label className="text-sm font-semibold text-gray-600">Select Your Role</Label>
                            <RadioGroup className="flex items-center gap-6 mt-2">
                                <div className="flex items-center">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        id="student"
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="student" className="ml-2 text-sm text-gray-600">
                                        Student
                                    </Label>
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        id="recruiter"
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="recruiter" className="ml-2 text-sm text-gray-600">
                                        Recruiter
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Profile Picture Upload */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold text-gray-600">Profile Picture</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer bg-white border border-gray-300 rounded-md p-2 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Loading State Button */}
                    {loading ? (
                        <Button className="w-full my-4 bg-gray-400 text-white rounded-md font-semibold transition duration-300 shadow-md" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please Wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full py-3 bg-[#3702f8] text-white rounded-md font-semibold hover:bg-[#2c01cc] transition duration-300"
                        >
                            Sign Up
                        </Button>
                    )}

                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">Already have an account?</span>
                        <Link to="/login" className="text-blue-600 font-medium ml-1 hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
