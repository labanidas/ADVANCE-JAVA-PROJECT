
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = e.target.userId.value;
        const password = e.target.password.value;

        const apiUrl = `${BASE_URL}/LoginServlet`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Sign-in successful!"); 
                login(); 
                sessionStorage.setItem("user_id", userId);
                console.log("User ID saved to sessionStorage:", userId);
                navigate("/");
            } else {
                toast.error("Sign-in failed. Please check your credentials."); // Error toast
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again later."); // Error toast
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-[70vh] flex items-center justify-center p-4">
{/* Same as */}
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-[90%] sm:max-w-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                    Join with Us
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* UserId Input */}
                    <div>
                        <label
                            htmlFor="userId"
                            className="block text-gray-700 text-sm sm:text-base font-medium"
                        >
                            User Id
                        </label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your user id"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm sm:text-base font-medium"
                        >
                            Password
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-[26px] md:top-8 right-3 text-gray-600 focus:outline-none"
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                {/* Additional Links */}
                <p className="text-center text-gray-600 text-xs sm:text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
