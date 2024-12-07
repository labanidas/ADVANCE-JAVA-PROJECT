import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()
    const { login } = useAuth();

    const handleLogin = () => {
        // Perform your authentication logic here
        login(); // Update login state
        navigate("/");
      };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = e.target.userId.value;
        const password = e.target.password.value;

        // Backend API URL (replace with your endpoint)
        const apiUrl = `${BASE_URL}/LoginServlet`;   
        //const requestData = JSON.stringify(formData);

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
                alert("Sign-in successful!"); // Handle successful response
                navigate("/");
            } else {
                alert("Sign-in failed. Please try again."); // Handle errors
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-[70vh] flex items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-[90%] sm:max-w-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            Join with Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* userId Input */}
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
                    className="absolute top-8 right-3 text-gray-600 focus:outline-none"
                >
                    {passwordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" className="sm:w-6 sm:h-6">
                            <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" className="sm:w-6 sm:h-6">
                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleLogin}>
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
