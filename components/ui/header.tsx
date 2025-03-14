"use client"; // components/Header.js  
import React, { useState, useEffect } from "react";  
import Link from "next/link";  
import {  
  IoLogoInstagram,  
  IoLogoTiktok,  
  IoLogoYoutube,  
  IoCartOutline,  
  IoCloseOutline,  
  IoGridOutline,  
} from "react-icons/io5";  

const Header = () => {  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  

  const toggleMobileMenu = () => {  
    setIsMobileMenuOpen((prev) => !prev);  
  };  

  // Effect to manage body overflow  
  useEffect(() => {  
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";  

    return () => {  
      document.body.style.overflow = "auto";  
    };  
  }, [isMobileMenuOpen]);  

  // Effect to close mobile menu on resize  
  useEffect(() => {  
    const handleResize = () => {  
      if (window.innerWidth >= 768) {  
        setIsMobileMenuOpen(false);  
      }  
    };  

    window.addEventListener("resize", handleResize);  
    return () => {  
      window.removeEventListener("resize", handleResize);  
    };  
  }, []);  

  return (  
    <header className="flex justify-between items-center p-4 bg-white z-99">  
      <div className="hidden md:flex items-center space-x-4">  
        <SocialLink href="https://www.youtube.com" icon={<IoLogoYoutube size={20} />} />  
        <SocialLink href="https://www.instagram.com" icon={<IoLogoInstagram size={20} />} />  
        <SocialLink href="https://www.tiktok.com" icon={<IoLogoTiktok size={20} />} />  
      </div>  
      <button onClick={toggleMobileMenu} className="md:hidden">  
        {isMobileMenuOpen ? <IoCloseOutline size={20} /> : <IoGridOutline size={20} />}  
      </button>  
      <div className="flex flex-col items-center justify-center">  
        <h1 className="text-md md:text-xl font-bold">Powergrade Resolver</h1>  
        <nav className="hidden md:flex space-x-4 text-md mt-2">  
          <NavLink href="/personal">Personal</NavLink>  
          <NavLink href="/portfolio">Portfolio</NavLink>  
          <NavLink href="/store">Store</NavLink>  
          <NavLink href="/blog">Blog</NavLink>  
        </nav>  
      </div>  
      <div className="flex items-center space-x-4">  
        <div className="flex items-center">  
          <IoCartOutline size={20} />  
          <span className="ml-1">0</span>  
        </div>  
      </div>  
      <MobileNav isOpen={isMobileMenuOpen} />  
    </header>  
  );  
};  

const SocialLink = ({ href, icon }) => (  
  <Link href={href} target="_blank" rel="noopener noreferrer">  
    {icon}  
  </Link>  
);  

const NavLink = ({ href, children }) => (  
  <Link href={href} className="text-gray-700">  
    {children}  
  </Link>  
);  

const MobileNav = ({ isOpen }) => (  
  <nav  
    className={`flex-col items-center bg-white absolute top-[8vh] left-0 h-[93vh] w-screen justify-center ${  
      isOpen ? "flex" : "hidden"  
    }`}  
  >  
    <NavLink href="/personal" className="text-lg mb-4">Personal</NavLink>  
    <NavLink href="/portfolio" className="text-lg mb-4">Portfolio</NavLink>  
    <NavLink href="/store" className="text-lg font-bold mb-4">Store</NavLink>  
    <NavLink href="/blog" className="text-lg mb-4">Blog</NavLink>  
    <div className="flex space-x-4 mt-8">  
      <SocialLink href="https://www.youtube.com" icon={<IoLogoYoutube size={20} />} />  
      <SocialLink href="https://www.instagram.com" icon={<IoLogoInstagram size={20} />} />  
      <SocialLink href="https://www.tiktok.com" icon={<IoLogoTiktok size={20} />} />  
    </div>  
  </nav>  
);  

export default Header;  