import React from 'react'

const About = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Animated Header */}
                <div className="text-center mb-12 animate-fade-in-down">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">About Us</h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full transform hover:scale-x-150 transition-transform duration-300"></div>
                </div>

                {/* Content Cards */}
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Mission Card */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl 
                    hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                    animate-fade-in-left">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We are dedicated to providing high-quality medicines and healthcare
                            solutions to our customers. With years of experience in the field, we
                            strive to make healthcare accessible and affordable for everyone.
                        </p>
                    </div>

                    {/* Values Card */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl 
                    hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                    animate-fade-in-right">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Values</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our platform is built on trust, reliability, and exceptional customer
                            service. Your health is our priority, and we are here to assist you at
                            every step of your healthcare journey.
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12 animate-fade-in-up">
                    <a
                        href="#"
                        className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 
                        text-white py-3 px-8 rounded-full shadow-lg 
                        hover:shadow-xl hover:scale-105 
                        transition-all duration-300 
                        text-lg font-medium
                        animate-pulse hover:animate-none"
                        aria-label="Learn more about our services"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About
