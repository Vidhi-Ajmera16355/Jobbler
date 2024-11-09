import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
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
        <div className="bg-gray-700 text-white shadow-lg sticky top-0 z-50">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                {/* Logo Section */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        <span className="text-[#cec8db]">Skillix</span>
                    </h1>
                </div>

                {/* Navigation and User Profile Section */}
                <div className="flex items-center gap-12">
                    {/* Navigation Links */}
                    <ul className="flex font-medium items-center gap-8 text-white-700">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className="hover:text-[#49dfc8] cursor-pointer transition duration-200">
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li className="hover:text-[#49d4c2] cursor-pointer transition duration-200">
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="hover:text-[#44e2d2] cursor-pointer transition duration-200">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="hover:text-[#44e2d2] cursor-pointer transition duration-200">
                                    <Link to="/jobs">Jobs</Link>
                                </li>
                                <li className="hover:text-[#44e2d2] cursor-pointer transition duration-200">
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Conditional Rendering for Login/Signup or User Profile */}
                    {!user ? (
                        <div className='flex items-center gap-4'>
                            <Link to="/login">
                                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        /* User Profile with Popover */
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-gray-200 hover:border-[#4a00e0] transition duration-300">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 shadow-lg border border-gray-200 rounded-xl bg-white">
                                {/* User Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar className="border-2 border-gray-200">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                {/* Action Links */}
                                <div className="flex flex-col my-2 gap-3 text-gray-700">
                                    {user && user.role === 'student' && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <User2 size={18} />
                                            <Button variant="link" className="text-[#021bf8] hover:underline">
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <LogOut size={18} />
                                        <Button onClick={logoutHandler} variant="link" className="text-[#e60000] hover:underline">
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
