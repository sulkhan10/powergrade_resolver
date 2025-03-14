"use client"; // components/MosaicGallery.js
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

  // Define the number of rows for mobile and desktop  
  const mobileRows = 2;  
  const desktopRows = 5;  

  // Calculate how many images should be in each row for mobile and desktop  
  const imagesPerMobileRow = Math.ceil(totalImages / mobileRows);  
  const imagesPerDesktopRow = Math.ceil(totalImages / desktopRows);  

  // Fill mobile images (2 rows)  
  for (let i = 0; i < mobileRows; i++) {  
    mobileImages.push(  
      imagesArray.slice(i * imagesPerMobileRow, (i + 1) * imagesPerMobileRow)  
    );  
  }  

  // Fill desktop images (5 rows)  
  let remainingImages = totalImages;  
  for (let i = 0; i < desktopRows; i++) {  
    // Calculate how many images to put in the current row  
    const imagesInCurrentRow = Math.floor(remainingImages / (desktopRows - i));  
    desktopImages.push(imagesArray.slice(totalImages - remainingImages, totalImages - remainingImages + imagesInCurrentRow));  
    remainingImages -= imagesInCurrentRow;  
  }  

  return { mobileImages, desktopImages };  
}; 

const MosaicGallery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { mobileImages, desktopImages } = splitImages(images);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    console.log("MosaicGallery mounted mobileImages", mobileImages);
    console.log("MosaicGallery mounted desktopImages", desktopImages);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayedImages = isMobile ? mobileImages : desktopImages;

  return (
    <div>
      {/* <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} gap-4 p-4`}>   */}
      {isMobile && (
        <div className="flex">
          <div className="w-1/2">
            {mobileImages[0].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-1/2">
            {mobileImages[1].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="flex">
          <div className="w-1/5">
            {desktopImages[0].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-1/5">
            {desktopImages[1].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-1/5">
            {desktopImages[2].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-1/5">
            {desktopImages[3].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-1/5">
            {desktopImages[4].map((row, index) => (
              <div key={index} className="flex gap-4 p-2">
                <img
                  key={index}
                  src={row}
                  alt={`Image ${index}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MosaicGallery;
