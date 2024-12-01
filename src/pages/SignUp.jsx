import React, { useState } from "react";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    city: '',
    country: '',
    mobile_no: '',
    email: '',
    userId: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const apiUrl = "https://your-backend-url/api/signup";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sign-up successful!");
      } else {
        alert("Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-lg mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium text-sm sm:text-base">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-gray-700 font-medium text-sm sm:text-base">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter pincode"
                required
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-gray-700 font-medium text-sm sm:text-base">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-gray-700 font-medium text-sm sm:text-base">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter country"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Mobile No */}
            <div>
              <label htmlFor="mobile" className="block text-gray-700 font-medium text-sm sm:text-base">
                Mobile No
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter mobile"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium text-sm sm:text-base">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          {/* User ID */}
          <div>
            <label htmlFor="userId" className="block text-gray-700 font-medium text-sm sm:text-base">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter user ID"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium text-sm sm:text-base">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-8 right-3 text-gray-600 focus:outline-none"
            >
              {passwordVisible ?  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" className="sm:w-6 sm:h-6">
                            <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none" className="sm:w-6 sm:h-6">
                            <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors">
                Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;