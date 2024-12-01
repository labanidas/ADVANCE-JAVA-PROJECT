import React from 'react'
import Faq from '../components/faq';
import About from '../components/About';
import Review from '../components/Review';
import Hero from '../components/Hero';


const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100">
                <Hero/>
            </section>

            {/* Review Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 pt-6 pb-10">
                <Review/>
            </section>

            {/* About Us Section */}
            <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-[40vh] flex items-center pb-8 overflow-hidden">
                <About/>
            </section>

            {/* Faq Section */}
            <section className="bg-gradient-to-bl from-blue-200 via-blue-100 to-blue-50 py-12">
                <Faq />
            </section>

        </>
    )
}

export default Home
