import React from 'react';
import { ChefHat } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#4F2683] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChefHat size={28} className="text-white" />
          <h1 className="text-xl md:text-2xl font-bold">College Foodie Assistant</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-purple-200 transition-colors duration-200">How It Works</a>
          <a href="#" className="hover:text-purple-200 transition-colors duration-200">Tips</a>
          <a href="#" className="hover:text-purple-200 transition-colors duration-200">About</a>
        </nav>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header