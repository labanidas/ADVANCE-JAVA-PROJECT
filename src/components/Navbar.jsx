// import React, { useState } from "react";
// import { NavLink } from 'react-router-dom'
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false)
//     const { isLoggedIn, logout } = useAuth();
//     return (
//         <nav className='flex justify-between items-center sticky top-0 w-full shadow-md p-4 px-5 z-50 backdrop-blur'>
//             <h1 className='text-2xl font-bold text-blue-600'>MedAccess</h1>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//                 <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
//                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         {isOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                         )}
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop Menu */}
//             <ul className='hidden md:flex gap-6 text-xl'>
//                 <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600 hover:text-blue-600 transition duration-300"} to="/">Home</NavLink>
//                 <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600 hover:text-blue-600 transition duration-300"} to="/products">Products</NavLink>
//                 <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600 hover:text-blue-600 transition duration-300"} to="/contact">Contact Us</NavLink>
//             </ul>

//             {/* Mobile Menu */}
//             <div className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white md:hidden`}>
//                 <ul className='flex flex-col items-center gap-4 py-4'>
//                     <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600"} to="/">Home</NavLink>
//                     <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600"} to="/products">Products</NavLink>
//                     <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600"} to="/contact">Contact Us</NavLink>
//                     {isLoggedIn ? (
//                     <button className='px-4 py-1 rounded-md bg-blue-500 text-white' onClick={logout}><NavLink to="/login">Log out</NavLink></button>
//                     ):(
//                     <button className='px-4 py-1 rounded-md bg-blue-500 text-white'><NavLink to="/login">Sign In</NavLink></button>
//                     )
//                 }
//                 </ul>
//             </div>
//             {isLoggedIn ? (
//                 <button className='hidden md:block bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-300' onClick={logout}>
//                     <NavLink to="/login">Log out</NavLink>
//                 </button>
//             ) : (
//                 <button className='hidden md:block bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-300'>
//                     <NavLink to="/login">Sign in</NavLink>
//                 </button>
//             )
//             }
//         </nav>
//     )
// }

// export default Navbar

import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

// Profile icon path
const profileIcon = "/profileIcon.jpeg"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className='flex justify-between items-center sticky top-0 w-full shadow-md p-4 px-5 z-50 backdrop-blur'>
            <h1 className='text-2xl font-bold text-blue-600'>MedAccess</h1>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Menu */}
            <ul className='hidden md:flex gap-6 text-xl'>
                <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600 hover:text-blue-600 transition duration-300"} to="/">Home</NavLink>
                <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600 hover:text-blue-600 transition duration-300"} to="/products">Products</NavLink>
                <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600 hover:text-blue-600 transition duration-300"} to="/contact">Contact Us</NavLink>
            </ul>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white md:hidden`}>
                <ul className='flex flex-col items-center gap-4 py-4'>
                    <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600"} to="/">Home</NavLink>
                    <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600"} to="/products">Products</NavLink>
                    <NavLink className={(e) => e.isActive ? "border-b-2 border-blue-600 text-blue-600 transition duration-300" : "text-gray-600"} to="/contact">Contact Us</NavLink>
                    {isLoggedIn ? (
                        <button className='px-4 py-1 rounded-md bg-blue-500 text-white' onClick={logout}><NavLink to="/login">Log out</NavLink></button>
                    ) : (
                        <button className='px-4 py-1 rounded-md bg-blue-500 text-white'><NavLink to="/login">Sign In</NavLink></button>
                    )}
                </ul>
            </div>

            {/* Right Side (Profile and Log out) */}
            <div className='flex items-center gap-4'>
                {/* Profile and My Profile Button */}
                {isLoggedIn && (
                    <div className='flex items-center gap-2'>
                        <span className='text-xl text-gray-600'>My Profile</span>
                        <NavLink to="/profile">
                            <img src={profileIcon} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        </NavLink>
                    </div>
                )}

                {/* Sign in / Log out Button */}
                {isLoggedIn ? (
                    <button className='bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-300' onClick={logout}>
                        <NavLink to="/login">Log out</NavLink>
                    </button>
                ) : (
                    <button className='bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition duration-300'>
                        <NavLink to="/login">Sign in</NavLink>
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
