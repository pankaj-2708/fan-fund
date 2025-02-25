import Link from "next/link";
import React from "react";



export default function About() {
    return (
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">About FanFund</h1>
          <p className="text-xl mb-8">
            FanFund is a platform where creators can register, showcase their talents, and get funded by their fans. Whether
            you're an artist, musician, writer, or any kind of creator, FanFund helps you turn your passion into a
            profession.
          </p>
          <Link href="/login">
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
            Join Now
          </button>
              </Link>
        </div>
        <div className="w-full h-1 mt-1 opacity-10 bg-white"></div>
        {/* Features Section */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FanFund?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Easy Registration</h3>
              <p>Sign up in minutes and start showcasing your work to a global audience.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Fan Support</h3>
              <p>Get funded directly by your fans who believe in your talent and vision.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
              <p>We ensure secure and transparent transactions for both creators and fans.</p>
            </div>
          </div>
        </div>
        <div className="w-full h-1 mt-10 opacity-10 bg-white"></div>
  
        {/* Team Section */}
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src="https://static.vecteezy.com/system/resources/previews/031/553/534/large_2x/a-professional-portrait-of-a-ceo-in-their-office-exuding-authority-and-confidence-generative-ai-photo.jpeg"
                alt="Team Member"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-400">CEO & Founder</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src="https://www.shutterstock.com/image-photo/confident-smiling-latin-professional-mid-600nw-2350002267.jpg"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
              <p className="text-gray-400">CTO</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE5aFFt_7k4rVH73yJsK66SE8gAnjqK8AkKA&s"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Mike Johnson</h3>
              <p className="text-gray-400">Head of Marketing</p>
            </div>
          </div>
        </div>
        <div className="w-full h-1 mt-10 opacity-10 bg-white"></div>
        {/* Testimonials Section */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-400 mb-4">
                "FanFund has been a game-changer for me. I can now focus on my art while my fans support me financially."
              </p>
              <p className="font-bold">- Sarah, Artist</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-400 mb-4">
                "The platform is easy to use, and the support from fans has been incredible. Highly recommend it!"
              </p>
              <p className="font-bold">- Alex, Musician</p>
            </div>
          </div>
        </div>
        <div className="w-full h-1 mt-10 opacity-10 bg-white"></div>
        {/* Call-to-Action Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join FanFund today and start turning your passion into a profession. Your fans are waiting to support you!
          </p>
          <Link href="/login">
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
            Sign Up Now
          </button>
              </Link>
        </div>
      </div>
    );
  }