import React from 'react';
import { ChefHat, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#333333] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ChefHat size={24} className="text-[#4F2683] mr-2" />
            <span className="text-lg font-semibold">College Foodie Assistant</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
            <a href="#" className="hover:text-purple-300 mb-2 md:mb-0">About</a>
            <a href="#" className="hover:text-purple-300 mb-2 md:mb-0">Privacy</a>
            <a href="#" className="hover:text-purple-300 mb-2 md:mb-0">Terms</a>
            <a href="#" className="hover:text-purple-300 flex items-center justify-center md:justify-start">
              <Github size={18} className="mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} College Foodie Assistant. All rights reserved.</p>
          <p className="mt-2">Made with 💜 for hungry students everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer