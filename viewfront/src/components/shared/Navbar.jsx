import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    // const user = true; // Change this to true to simulate a logged-in user

    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                {/* Logo Section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Job <span className="text-[#3702f8]">Portal</span>
                    </h1>
                </div>

                {/* Navigation and User Profile Section */}
                <div className="flex items-center gap-12">

                    {/* Navigation Links */}
                    <ul className="flex font-medium items-center gap-6 text-gray-600">

                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className="hover:text-[#3702f8] cursor-pointer">
                                        <Link to="/admin/companies">Companies
                                        </Link>
                                    </li>
                                    <li className="hover:text-[#3702f8] cursor-pointer">
                                        <Link to="/admin/jobs">Jobs
                                        </Link>
                                    </li>
                                </>
                            ) :
                                <>
                                    <li className="hover:text-[#3702f8] cursor-pointer">
                                        <Link to="/">Home
                                        </Link>
                                    </li>
                                    <li className="hover:text-[#3702f8] cursor-pointer">
                                        <Link to="/jobs">Jobs
                                        </Link>
                                    </li>
                                    <li className="hover:text-[#3702f8] cursor-pointer">
                                        <Link to="/browse">Browse
                                        </Link>
                                    </li>
                                </>

                        }


                    </ul>

                    {/* Conditional Rendering for Login/Signup or User Profile */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        /* User Profile with Popover */
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4 shadow-lg border border-gray-200 rounded-lg bg-white">
                                {/* User Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                {/* Action Links */}
                                <div className="flex flex-col my-2 gap-2 text-gray-600">
                                    {
                                        user && user.role === 'student' && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <User2 size={18} />
                                                <Button variant="link" className="text-[#021bf8] hover:underline">
                                                    <Link to="/profile">
                                                        View Profile
                                                    </Link>
                                                </Button>
                                            </div>
                                        )
                                    }

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <LogOut size={18} />
                                        <Button onClick={logoutHandler} variant="link" className="text-[#f80202] hover:underline">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
