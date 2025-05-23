import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img src='../../src/assets/logo.png' alt="Logo" className='w-28 sm:w-36' />

        <h1 className="text-lg sm:text-xl font-bold">Enhanzer Book Store</h1>

        {/* menu for mobile */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/About" className="hover:underline">About</a>
          <a href="/Contact" className="hover:underline">Contact</a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/About" className="hover:underline">About</a></li>
            <li><a href="/Contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
