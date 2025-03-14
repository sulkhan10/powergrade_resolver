"use client"; // components/Footer.js  
import React from "react";  
import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";  

const Footer = () => {  
  return (  
    <footer className="bg-white text-gray-900 py-6">  
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">  
        <div className="flex flex-col items-center md:items-start">  
          <h2 className="text-lg font-bold mb-2">Powergrade Resolver</h2>  
          <p className="text-sm">© 2025 All Rights Reserved</p>  
        </div>  
        <div className="flex space-x-4 mt-4 md:mt-0">  
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">  
            <IoLogoYoutube size={24} />  
          </a>  
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">  
            <IoLogoInstagram size={24} />  
          </a>  
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">  
            <IoLogoTiktok size={24} />  
          </a>  
        </div>  
      </div>  
    </footer>  
  );  
};  

export default Footer;  