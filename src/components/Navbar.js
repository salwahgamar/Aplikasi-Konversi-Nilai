import React from 'react';

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Aplikasi Konversi Nilai IPK</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm md:text-base">Halo, <span className="font-semibold">{username}</span></span>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;