import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-display font-bold text-primary mb-4">Skill Shelf</h3>
            <p className="text-gray-400">
              Learning made simple, for everyone.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semi-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <NavLink to="/courses" className="hover:text-white transition-colors">Courses</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="hover:text-white transition-colors">Become an Instructor</NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-white transition-colors">About Skill Shelf</NavLink>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semi-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Skill Shelf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer