import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    city: "",
    country: "",
    mobile_no: "",
    email: "",
    userId: "",
    password: "",
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

    const apiUrl = "http://localhost:9080/Medicine/SignupServlet";

    // Sending data as JSON (stringified formData)
    const requestData = JSON.stringify(formData);
    console.log("Sending JSON data:", requestData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure content type is application/json
        },
        body: requestData, // Sending JSON body
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Sign-up successful!");
        navigate("/login") // Redirect to login page
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Sign-up failed. Please try again.");
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
          {[ 
            { id: "name", type: "text", label: "Name", placeholder: "Enter your name" },
            { id: "address", type: "text", label: "Address", placeholder: "Enter your address" },
            { id: "pincode", type: "text", label: "Pincode", placeholder: "Enter pincode" },
            { id: "city", type: "text", label: "City", placeholder: "Enter city" },
            { id: "country", type: "text", label: "Country", placeholder: "Enter country" },
            { id: "mobile_no", type: "tel", label: "Mobile No", placeholder: "Enter mobile" },
            { id: "email", type: "email", label: "Email", placeholder: "Enter email" },
            { id: "userId", type: "text", label: "User ID", placeholder: "Enter user ID" },
          ].map(({ id, type, label, placeholder }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-gray-700 font-medium text-sm sm:text-base"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-sm sm:text-base"
            >
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
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


