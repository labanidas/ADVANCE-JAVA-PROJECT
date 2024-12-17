import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = sessionStorage.getItem("user_id");
                console.log("user_id:", userId);

                const response = await fetch(`${BASE_URL}/ProfileUpdate?user_id=${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-4 rounded-md bg-red-50 border border-red-200">
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {userData ? (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                            <h1 className="text-3xl font-bold text-white text-center">
                                My Profile
                            </h1>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 text-sm font-medium">Name</p>
                                        <p className="text-gray-900 font-semibold">{userData.uname}</p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 text-sm font-medium">Email</p>
                                        <p className="text-gray-900 font-semibold">{userData.email}</p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 text-sm font-medium">Mobile</p>
                                        <p className="text-gray-900 font-semibold">{userData.mobile_no}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 text-sm font-medium">Address</p>
                                        <p className="text-gray-900 font-semibold">{userData.address}</p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 text-sm font-medium">City & Pincode</p>
                                        <p className="text-gray-900 font-semibold">
                                            {userData.city} - {userData.pincode}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 text-sm font-medium">Country</p>
                                        <p className="text-gray-900 font-semibold">{userData.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
