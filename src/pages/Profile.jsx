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
            <div className="w-[10vw] h-full mx-auto">
                <img className="h-[20vh]" src="/Spinner.svg" alt="" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                {userData ? (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
                            My Profile
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">Name:</span> {userData.uname}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">Email:</span> {userData.email}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">Mobile:</span> {userData.mobile_no}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">Address:</span> {userData.address}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">Pincode:</span> {userData.pincode}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">City:</span> {userData.city}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="font-bold">Country:</span> {userData.country}
                                </p>
                            </div>

                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
