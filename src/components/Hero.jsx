import React from 'react'
import { Link } from 'react-router-dom';
import { FaHeadset } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
const Hero = () => {
    return (
        <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between">
                {/* <!-- Left Content --> */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Your Health, Our Priority
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Get your medicines delivered at your doorstep. Easy ordering, fast delivery, and best prices guaranteed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                            Order Now
                        </button>
                        <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition duration-300">
                            <Link to="/products">View Products</Link>
                        </button>
                    </div>
                </div>

                {/* <!-- Right Image --> */}
                <div className="lg:w-1/2">
                    <div className="relative">

                        <img src="/medicine.png" alt="Medicine Delivery" className="relative z-10 rounded-lg shadow-xl w-full max-w-lg mx-auto" />
                    </div>
                </div>
            </div>

            {/* <!-- Features --> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105" data-aos="flip-left"
                    data-aos-delay="100">
                    <div className="text-blue-600 text-3xl mb-4">
                        <FaShippingFast />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                    <p className="text-gray-600">Same day delivery for your medical needs</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 duration-150"
                    data-aos="flip-left"
                    data-aos-delay="200">
                    <div className="text-blue-600 text-3xl mb-4">
                        <PiCertificate />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Genuine Products</h3>
                    <p className="text-gray-600">100% authentic medicines guaranteed</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 duration-150"
                    data-aos="flip-left"
                    data-aos-delay="300">
                    <div className="text-blue-600 text-3xl mb-4">
                        <FaHeadset />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Round the clock customer assistance</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
