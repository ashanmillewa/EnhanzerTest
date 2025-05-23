import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 py-6 text-center mt-4">
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Copyright  Enhanzer (Pvt) Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
