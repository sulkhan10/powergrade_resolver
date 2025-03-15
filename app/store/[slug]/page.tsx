"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation"; // For App Router
import products from "../../../data/products.json";

const ProductDetail = () => {
  const params = useParams(); // Get dynamic slug from URL params
  const { slug } = useParams(); // Get dynamic slug from URL params
  // const [product, setProduct] = useState<any>(null);
  // State to manage the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  // References to track swipe start and end positions
  // const touchStartX = useRef(0);
  // const touchEndX = useRef(0);
  const [touchStartX, setTouchStartX] = useState(0); // Reference for touch start position  
  const [touchEndX, setTouchEndX] = useState(0); // Reference for touch end position  


  const product = products.find((item) => item.slug === slug);

  {
    /*
    useEffect(() => {
      console.log("Params",params)
      if (slug) {
        const fetchedProduct = productDetails[slug];
        setProduct(fetchedProduct || null); // If product exists, set it
      }
    }, [slug]); // Only run this effect if slug changes
    */
  }

  if (!slug) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.image.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.image.length) % product.image.length
    );
  };


  // Touch event handlers  
  const handleTouchStart = (e) => {  
    setTouchStartX(e.changedTouches[0].clientX);  
  };  

  const handleTouchEnd = (e) => {  
    setTouchEndX(e.changedTouches[0].clientX);  
    handleSwipe();  
  };  

  const handleSwipe = () => {  
    if (touchStartX > touchEndX + 50) {  
      // Swipe left  
      nextImage();  
    } else if (touchStartX < touchEndX - 50) {  
      // Swipe right  
      prevImage();  
    }  
  };  

  // Effect to automatically change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []); // Empty dependency array to run effect only on mount and unmount

  return (
    <div className="p-8">
      <nav className="mb-4 text-sm text-gray-600">
        <a href="/store" className="hover:underline">
          Store
        </a>{" "}
        &gt; <span className="font-medium">{product.name}</span>
      </nav>
      <div className="flex flex-col md:flex-row items-center ">
        <div className="w-full md:w-1/2 sm:h-[50vh] md:h-[50vh] lg:h-[60vh]  h-[35vh]  mb-4 sm:mb-0">
          {/* <img
            src={product.image[currentIndex]}
            alt={product.name}
            className="mb-4 rounded-lg w-full h-3/4"
          /> */}
          <div className="w-full h-full sm:h-4/5   ">
            <div   onTouchStart={handleTouchStart} // Handle touch start  
        onTouchEnd={handleTouchEnd} // Handle touch end  
       className="relative  h-full w-full ">
              <img
                src={product.image[currentIndex]} // Assuming product.images is the correct property
                alt={product.name}
                className="mb-4 rounded-lg h-full w-full object-cover sm:object-contain"
              />
              <button
                className="hidden sm:block absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2 bg-white opacity-45 p-2 h-10 w-10 rounded-full shadow-md hover:bg-gray-200 hover:opacity-80 transition hover:scale-120"
                onClick={prevImage}
              >
                &lt;
              </button>
              <button
                className="hidden sm:block absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 bg-white opacity-45 p-2 h-10 w-10 rounded-full shadow-md hover:bg-gray-200 hover:opacity-80 transition hover:scale-120"
                onClick={nextImage}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="w-full h-1/5 hidden gap-2  py-2 sm:flex">
            {product.image.length > 0 ? (
              product.image.map((image, index) => (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                >
                  <img
                    src={image} // Assuming product.images is the correct property
                    alt={image}
                    className=" rounded-lg  h-full  "
                  />
                </div>
              ))
            ) : (
              <p>No Images found.</p>
            )}
          </div>
        </div>
        <div className="flex-1 md:ml-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-md font-semibold mb-4">{product.price}</p>
          
            <a href={product.link}
            target="_blank">
          <button className="cursor-pointer block sm:hidden mt-6 bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200">
            Add To Cart
          </button>
            </a>
          <p className="mt-4 text-base text-gray-800">
            {product.short_description}
          </p>
          <div className="mt-4 text-gray-700">{product.description}</div>
          <a href={product.link}
            target="_blank">

          <button  className="cursor-pointer hidden sm:block mt-6 bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200">
            Add To Cart
          </button>
            </a>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
