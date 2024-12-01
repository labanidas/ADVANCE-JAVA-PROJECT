import React from 'react'
import 'aos/dist/aos.css';
import AOS from 'aos';


AOS.init({
    duration: 800, // Animation duration
    // once:true, // Animation happens only once
});
const Review = () => {
    return (
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">What Our Customers Say</h2>
            <div className="w-40 h-1 bg-blue-500 mx-auto rounded-full transform hover:scale-x-150 transition-transform duration-300 mb-12"></div>
            <div className="flex flex-wrap -mx-4">
                {/* <!-- Review 1 --> */}
                <div
                    className="w-full md:w-1/3 px-4 mb-8"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-200 flex justify-center items-center">
                                <span className="text-xl font-bold text-blue-500">A</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">Aarav Kumar</h3>
                                <p className="text-sm text-gray-500">Verified Customer</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            “The medicines are top quality and delivery was on time! Highly
                            recommend this service.”
                        </p>
                    </div>
                </div>

                {/* <!-- Review 2 --> */}
                <div
                    className="w-full md:w-1/3 px-4 mb-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-200 flex justify-center items-center">
                                <span className="text-xl font-bold text-blue-500">S</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">Sneha Patel</h3>
                                <p className="text-sm text-gray-500">Verified Customer</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            “Great customer support and reasonable pricing. Helped me find the
                            right medicine quickly.”
                        </p>
                    </div>
                </div>

                {/* <!-- Review 3 --> */}
                <div
                    className="w-full md:w-1/3 px-4 mb-8"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-200 flex justify-center items-center">
                                <span className="text-xl font-bold text-blue-500">R</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">Rahul Singh</h3>
                                <p className="text-sm text-gray-500">Verified Customer</p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                            “Quick service and the platform is very user-friendly. Excellent
                            experience!”
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review
