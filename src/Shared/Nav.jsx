import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import avatarImg from '../assets/placeholder.jpg'
import { AiOutlineMenu } from 'react-icons/ai'
const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        console.log(localTheme)
        document.querySelector('html').setAttribute('data-theme', localTheme || theme)
    }, [theme]);




    const navlinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-spots">AllTourists Spot </NavLink></li>
        <li><NavLink to="/addTour">Add Tourists Spots</NavLink></li>
        <li><NavLink to="/mySpot">My Listings</NavLink></li>


    </>
    return (


        <div className=' w-full  z-10 bg-white  shadow-sm container mx-auto'>
            <div className='py-4 border-b-[1px]'>
                <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
                    {/* Logo */}
                    <Link to='/'>
                        <a to='/' className=" text-4xl font-extrabold">Tour <span className="text-orange-600 ">XPro</span></a>
                    </Link>
                    {/* Dropdown Menu */}
                    <div className='relative z-10'>
                        <div className='flex flex-row items-center gap-3'>
                            <Link to='/' className='block rounded-xl  px-4 py-2 hover:bg-neutral-100 transition font-semibold'>Home</Link>

                            <Link to='/all-spots' className='block rounded-xl   px-4 py-2 hover:bg-neutral-100 transition font-semibold' >      All Spots
                            </Link>
                            {/* Dropdown btn */}
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <AiOutlineMenu />
                                <div className='hidden md:block'>
                                    {/* Avatar */}
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='30'
                                        width='30'
                                    />
                                </div>
                            </div>
                        </div>
                        {isOpen && (
                            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                                <div className='flex flex-col cursor-pointer'>


                                    {user ? (
                                        <>
                                          <Link
                                                to='/mySpot'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                My Lists
                                            </Link>
                                            <Link
                                                to='/addTour'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Add Spot
                                            </Link>
                                          
                                            <div
                                                onClick={logOut}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to='/login'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Login
                                            </Link>

                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Nav;