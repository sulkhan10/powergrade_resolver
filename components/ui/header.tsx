"use client"; // components/Header.js
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const paramsNavigator = usePathname(); // Get dynamic slug from URL params

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // To ensure we are in the client

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Effect to manage body overflow
  useEffect(() => {
    setIsMounted(true); // Mark that we are mounted
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    }
    return () => {
      if (isMounted) {
        document.body.style.overflow = "auto";
      }
    };
  }, [isMobileMenuOpen, isMounted]);

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
        <SocialLink
          href="https://www.youtube.com"
          icon={<IoLogoYoutube size={20} />}
        />
        <SocialLink
          href="https://www.instagram.com"
          icon={<IoLogoInstagram size={20} />}
        />
        <SocialLink
          href="https://www.tiktok.com"
          icon={<IoLogoTiktok size={20} />}
        />
      </div>
      <button onClick={toggleMobileMenu} className="md:hidden">
        {isMobileMenuOpen ? (
          <IoCloseOutline size={20} />
        ) : (
          <IoGridOutline size={20} />
        )}
      </button>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-md md:text-xl font-bold">Powergrade Resolver</h1>
        <nav className="hidden md:flex space-x-4 text-md mt-2">
          <div className={paramsNavigator.includes("/portfolio") ? "font-semibold border-b border-b-gray-700" : ""}>  
          <NavLink href="/portfolio">Portfolio</NavLink>
          </div>
        <div className={paramsNavigator.includes("/personal") ? "font-semibold border-b border-b-gray-700" : ""}>  
        {/* <div className={paramsNavigator === "/personal" ? "font-bold" : ""}> */}
            <NavLink href="/personal">Personal</NavLink>
          </div>
          <div className={paramsNavigator.includes("/store") ? "font-semibold border-b border-b-gray-700" : ""}>  
            <NavLink href="/store">Store</NavLink>
          </div>
          <div className={paramsNavigator.includes("/blog") ? "font-semibold border-b border-b-gray-700" : ""}>  
            <NavLink href="/blog">Blog</NavLink>
          </div>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <IoCartOutline size={20} />
          <span className="ml-1">0</span>
        </div>
      </div>
      <MobileNav
      paramsNavigator={paramsNavigator}
        toggleMobileMenu={toggleMobileMenu}
        isOpen={isMobileMenuOpen}
      />
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

const MobileNav = ({ isOpen, toggleMobileMenu,paramsNavigator }) => (
  <nav
    className={`flex-col items-center bg-white absolute top-[7vh] left-0 h-[93vh] w-screen justify-center ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    <div className={paramsNavigator.includes("/portfolio") ? "font-semibold border-b border-b-gray-700 text-lg mb-4 " : "text-lg mb-4 "} onClick={toggleMobileMenu}>
      <NavLink href="/portfolio">Portfolio</NavLink>
    </div>
    <div className={paramsNavigator.includes("/personal") ? "font-semibold border-b border-b-gray-700 text-lg mb-4 " : "text-lg mb-4 "} onClick={toggleMobileMenu}>
      <NavLink href="/personal">Personal</NavLink>
    </div>
    <div className={paramsNavigator.includes("/store") ? "font-semibold border-b border-b-gray-700 text-lg mb-4 " : "text-lg mb-4 "} onClick={toggleMobileMenu}>
      <NavLink href="/store">Store</NavLink>
    </div>
    <div className={paramsNavigator.includes("/blog") ? "font-semibold border-b border-b-gray-700 text-lg mb-4 " : "text-lg mb-4 "} onClick={toggleMobileMenu}>
      <NavLink href="/blog">Blog</NavLink>
    </div>
    <div className="flex space-x-4 mt-8">
      <SocialLink
        href="https://www.youtube.com"
        icon={<IoLogoYoutube size={20} />}
      />
      <SocialLink
        href="https://www.instagram.com"
        icon={<IoLogoInstagram size={20} />}
      />
      <SocialLink
        href="https://www.tiktok.com"
        icon={<IoLogoTiktok size={20} />}
      />
    </div>
  </nav>
);

export default Header;
