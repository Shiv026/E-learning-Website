import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 flex items-center justify-between shadow bg-secondary text-text">
        {/* Logo */}
        <div onClick={() => navigate('/')} className="cursor-pointer text-2xl font-bold flex items-center gap-2 text-primary font-display">
          <GiBookshelf className="w-7 h-7" />
          <span>Skill Shelf</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 mx-20 font-medium text-base lg:text-lg xl:text-xl items-center">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? 'font-semibold text-primary'
                  : 'text-muted hover:text-accent hover:scale-105'
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? 'font-semibold text-primary'
                  : 'text-muted hover:text-accent hover:scale-105'
              }`
            }
          >
            dashboard
          </NavLink>
          
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-primary" onClick={() => setSidebarOpen((prev) => !prev)}>
          <FaBars size={24} />
        </button>
      </nav>

      {/* Translucent Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 z-60 h-full w-64 transform transition-transform duration-300 ease-linear shadow-lg bg-secondary text-text ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <span className="text-xl font-display font-bold text-primary ">
            Menu
          </span>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} className="text-muted" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="md:hidden flex flex-col px-6 py-4 gap-6">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? 'font-semibold text-primary'
                  : 'text-muted hover:text-primary'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Courses
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? 'font-semibold text-primary'
                  : 'text-muted hover:text-primary'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            dashboard
          </NavLink>
        
         
        </div>
      </div>
    </>
  );
};

export default Header;
