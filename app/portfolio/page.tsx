'use client';

import React, { useEffect, useState } from "react";
const images = [
  "https://plus.unsplash.com/premium_photo-1738105946749-320f638ed0be?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1727466928916-9789f30de10b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1740672426138-6646e5bf9e0b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1740516367213-f2028a72b097?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1663837827305-a3491793e162?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1737961755792-4175df6444b2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740124659051-71da6ea354e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1663837827344-42a77bf88422?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740508905577-5fb7fea583df?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740487093135-a1280497b901?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740471230631-3275f3c8add1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740504713072-2b634befcf6a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740564014446-f07ea2da269c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740418953117-73dc083f23d2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740522620382-f91c18a2cb28?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1730828573993-0b2215b151cd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675714692786-22ad175c9a76?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740393076705-69922a4cce76?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1739831741061-b0e923c99e73?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0OXx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
];


const splitImages = (imagesArray) => {  
  const mobileImages = [];  
  const desktopImages = [];  

  const totalImages = imagesArray.length;  

  const mobileRows = 2;  
  const desktopRows = 5;  

  const imagesPerMobileRow = Math.ceil(totalImages / mobileRows);  
  const imagesPerDesktopRow = Math.ceil(totalImages / desktopRows);  

  for (let i = 0; i < mobileRows; i++) {  
    mobileImages.push(  
      imagesArray.slice(i * imagesPerMobileRow, (i + 1) * imagesPerMobileRow)  
    );  
  }  

  let remainingImages = totalImages;  
  for (let i = 0; i < desktopRows; i++) {  
    const imagesInCurrentRow = Math.floor(remainingImages / (desktopRows - i));  
    desktopImages.push(imagesArray.slice(totalImages - remainingImages, totalImages - remainingImages + imagesInCurrentRow));  
    remainingImages -= imagesInCurrentRow;  
  }  

  return { mobileImages, desktopImages };  
}; 


const Portfolio = () => {  
  const [isMobile, setIsMobile] = useState(false);  
  const [isFullScreen, setIsFullScreen] = useState(false);  
  const [currentImage, setCurrentImage] = useState(null);  
  
  const { mobileImages, desktopImages } = splitImages(images);  

  useEffect(() => {  
    const handleResize = () => {  
      setIsMobile(window.innerWidth < 768);  
    };  

    handleResize();  
    
    window.addEventListener("resize", handleResize);  
    return () => {  
      window.removeEventListener("resize", handleResize);  
    };  
  }, []);  

  const displayedImages = isMobile ? mobileImages : desktopImages;  

  const openFullScreen = (image) => {  
      setCurrentImage(image);  
      setIsFullScreen(true);  
  };  

  const closeFullScreen = () => {  
      setIsFullScreen(false);  
      setCurrentImage(null);  
  };  

  return (  
    <div className="relative">  
      {isFullScreen && (  
        <div   
          className="fixed top-0 left-0 w-full h-full z-999 bg-black flex items-center justify-center"   
          onClick={closeFullScreen}  
        >  
          <img  
            src={currentImage}  
            alt="Full screen"  
            className="max-w-full max-h-full"  
          />  
          <button   
            className="absolute top-4 right-4 text-white text-2xl"  
            onClick={closeFullScreen}  
          >  
            &times; {/* X icon to close */}  
          </button>  
        </div>  
      )}  
      {isMobile ? (  
        <div className="flex">  
          <div className="w-1/2">  
            {mobileImages[0].map((row, index) => (  
              <div key={index} className="flex gap-4 p-2">  
                <img  
                  src={row}  
                  alt={`Image ${index}`}  
                  className="w-full cursor-pointer"  
                  onClick={() => openFullScreen(row)} // Open full-screen on click  
                />  
              </div>  
            ))}  
          </div>  
          <div className="w-1/2">  
            {mobileImages[1].map((row, index) => (  
              <div key={index} className="flex gap-4 p-2">  
                <img  
                  src={row}  
                  alt={`Image ${index}`}  
                  className="w-full cursor-pointer"  
                  onClick={() => openFullScreen(row)} // Open full-screen on click  
                />  
              </div>  
            ))}  
          </div>  
        </div>  
      ) : (  
        <div className="flex">  
          {desktopImages.map((desktopRow, rowIndex) => (  
            <div key={rowIndex} className="w-1/5">  
              {desktopRow.map((image, index) => (  
                <div key={index} className="flex gap-4 p-2">  
                  <img  
                    src={image}  
                    alt={`Image ${index}`}  
                    className="w-full cursor-pointer"  
                    onClick={() => openFullScreen(image)} // Open full-screen on click  
                  />  
                </div>  
              ))}  
            </div>  
          ))}  
        </div>  
      )}  
    </div>  
  );  
};  

export default Portfolio;  

