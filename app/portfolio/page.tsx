"use client";

import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";

const images = [
  // "/assets/Still-2024-10-27-221111_1.1.1.jpg",
  // "/assets/Still-2024-10-27-221316_1.2.1.jpg",
  // "/assets/Still-2024-10-27-221540_1.3.1_1.3.2.jpg",
  // "/assets/Still-2024-10-27-221946_1.4.1.jpg",
  // "/assets/Still-2024-10-27-222117_1.5.1.jpg",
  // "/assets/Still-2024-10-27-222306_1.6.1.jpg",
  // "/assets/Still-2024-10-27-222407_1.7.1.jpg",
  // "/assets/Still-2024-10-27-222532_1.8.1.jpg",
  // "/assets/Still-2024-10-27-222911_1.9.1.jpg",
  // "/assets/Still-2024-10-27-223257_1.10.1.jpg",
  "/assets/DSCF0912.jpg",
  "/assets/DSCF0921.jpg",
  "/assets/DSCF0976.jpg",
  "/assets/DSCF1006.jpg",
  "/assets/DSCF0918.jpg",
  "/assets/DSCF0926.jpg",
  "/assets/DSCF1017.jpg",
  "/assets/DSCF1018.jpg",
  "/assets/DSCF0972.jpg",
  "/assets/DSCF1036.jpg",
  "/assets/DSCF1047.jpg",
  "/assets/DSCF1048.jpg",
  "/assets/DSCF1086.jpg",
  "/assets/DSCF1061.jpg",
  "/assets/DSCF1147.jpg",
  "/assets/DSCF1153.jpg",
  "/assets/DSCF1163.jpg",
  "/assets/DSCF1154.jpg",
  "/assets/DSCF1173.jpg",
  "/assets/DSCF1183.jpg",
  "/assets/DSCF1195.jpg",
  "/assets/DSCF1196.jpg",
  "/assets/DSCF1197.jpg",
  "/assets/DSCF1198.jpg",
 
];

const ImageGallery = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [startX, setStartX] = useState(null); // For swipe detection

  const openFullScreen = (index) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setCurrentIndex(null);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isFullScreen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeFullScreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  // Handle swipe navigation
  const handleTouchStart = (e) => setStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!startX) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) nextImage(); // Swipe left
    if (diff < -50) prevImage(); // Swipe right

    setStartX(null);
  };

  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5 }}
      >
        <Masonry>
          {images.map((image, i) => (
            <Image
              key={i}
              src={image}
              alt=""
              layout="responsive"
              width={500}
              height={500}
              loading="lazy"
              style={{ cursor: "pointer" }}
              onClick={() => openFullScreen(i)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {isFullScreen && currentIndex !== null && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-white/70 flex items-center justify-center z-500"
          // onClick={closeFullScreen}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Display full-screen image */}
          <div className="relative w-[85%] h-[80%]">
            <Image
              src={images[currentIndex]}
              alt="Full screen"
              fill
              className="object-contain"
            />
          </div>

          {/* Right navigation  */}
          <button
            className="absolute left-0   flex items-center justify-center text-md lg:text-3xl  bg-opacity-50  w-10 h-10 lg:h-20 lg:w-20 rounded-full lg:opacity-45 hover:opacity-75"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="absolute right-0   flex items-center justify-center text-md lg:text-3xl  bg-opacity-50  h-10 w-10 lg:h-20 lg:w-20 rounded-full  lg:opacity-45 hover:opacity-75"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <IoIosArrowForward />
          </button>

          {/* Close button */}
          <button
            className="absolute top-4   right-4  text-gray text-2xl  bg-opacity-50  bg-opacity-50  h-10 w-10 lg:h-20 lg:w-20 rounded-full  lg:opacity-45 hover:opacity-95"
            onClick={closeFullScreen}
          >
            <RiCloseLargeLine />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
