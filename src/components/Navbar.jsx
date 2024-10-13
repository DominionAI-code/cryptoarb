import { Link } from "react-router-dom";
import { LogoIcon } from "../icons/icons";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons for hamburger and close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu visibility

  // Toggle function to handle opening/closing of the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex fixed top-0 bg-gray-800 text-white h-14 items-center justify-between px-[15%] w-screen z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-1 cursor-pointer mr-[20%]"> {/* Increase margin-right */}
    <LogoIcon />
    <p>
      <Link to="/" className="font-semibold text-lg hover:text-yellow-500 transition duration-300">
        <span className="text-yellow-500">C</span>rypto
        <span className="text-yellow-500">U</span>pdate
      </Link>
    </p>
  </div>

      {/* Hamburger Icon (visible on smaller screens) */}
      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />} {/* Menu icon changes on click */}
      </div>

      {/* Nav Links Section (hidden on smaller screens, visible on larger screens) */}
      <ul className={`md:flex gap-8 font-semibold md:static absolute w-full bg-gray-800 md:bg-transparent top-14 left-0 md:left-auto md:top-auto transition-transform duration-300 ${isOpen ? "block" : "hidden"}`}>
        {/* Use Link component for navigation */}
        <li className="text-center p-4 md:p-0">
          <Link to="/cryptofilter" className="hover:text-yellow-500 transition duration-300" onClick={() => setIsOpen(false)}>
            Filter
          </Link>
        </li>
        <li className="text-center p-4 md:p-0">
          <Link to="/cryptoabout" className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
        </li>
        <li className="text-center p-4 md:p-0">
          <Link to="/cryptocontact" className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
