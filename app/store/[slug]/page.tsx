"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For App Router
import products from "../../../data/products.json";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";

const ProductDetail = () => {
  const params = useParams(); // Get dynamic slug from URL params
  const { slug } = params; // Get dynamic slug from URL params
  const [product, setProduct] = useState(null); // State to store product details
  // const [currentIndex, setCurrentIndex] = useState(0); // State for current image index
  const [touchStartX, setTouchStartX] = useState(0); // Touch start position
  const [touchEndX, setTouchEndX] = useState(0); // Touch end position

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  // Find the product based on the slug
  useEffect(() => {
    if (slug) {
      const foundProduct = products.find((item) => item.slug === slug);
      setProduct(foundProduct || null); // set product if found
    }
  }, [slug]); // Only run this effect if slug changes

  const openFullScreen = (index) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setCurrentIndex(null);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.gallery.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.gallery.length) % product.gallery.length
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

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="p-8">
      <nav className="mb-4 text-sm text-gray-600">
        <a href="/store" className="hover:underline">
          Store
        </a>{" "}
        &gt; <span className="font-medium">{product.name}</span>
      </nav>
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="w-full md:w-1/2 sm:h-[50vh] md:h-[50vh] lg:h-[60vh] h-[35vh] mb-4 sm:mb-0">
          <div className="w-full h-full ">
            <div className="relative h-full w-full">
              <img
                src={product.main_image} // Assuming product.images is the correct property
                alt={product.name}
                className="mb-4 rounded-lg h-full w-full object-cover sm:object-contain"
              />
            </div>
          </div>
          {/*
         <div className="w-full h-full sm:h-4/5">  
            <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="relative h-full w-full">  
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
          */}
          {/*
          <div className="w-full h-1/5 hidden gap-2 py-2 sm:flex">  
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
                    src={image}  
                    alt={image}  
                    className="rounded-lg h-full"  
                  />  
                </div>  
              ))  
            ) : (  
              <p>No Images found.</p>  
            )}  
          </div>  
              */}
        </div>
        <div className="flex-1 md:ml-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-md font-semibold mb-4">{product.price}</p>

          <a href={product.link} target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer block sm:hidden mt-6 bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 font-semibold transition-all duration-200">
              I Want This
            </button>
          </a>
          <p className="mt-4 text-base text-gray-800">
            {product.short_description}
          </p>
          <div
            className="mt-4 text-gray-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: product.description.replace(/\n/g, "<br>"),
            }}
          ></div>
          {product?.software_compatibility.length > 0 && (
            <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-8">
              {product?.software_compatibility?.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.name}
                  className="mb-4 rounded-lg h-10 w-10 object-cover sm:object-contain"
                />
              ))}
            </div>
          )}
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer hidden sm:block mt-6 bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 font-semibold">
              I Want This
            </button>
          </a>
        </div>
      </div>
      {product.three_cards.length > 2 && (
  <div className="flex flex-col sm:flex-row my-12 gap-4">
    {product.three_cards.map((item, index) => (
      <div key={index} className="w-full sm:w-1/3 flex">
        <div
          className="bg-white border-2 rounded-lg p-6 border-gray-800 transition-all duration-300 ease-in-out transform hover:scale-101 hover:bg-gray-100 flex flex-col h-full"
          style={{
            boxShadow: "5px 5px 0px 0px rgba(0, 0, 0, 1)", // Custom box-shadow
          }}
        >
        <div
  className="text-sm text-gray-600 flex-1"
  dangerouslySetInnerHTML={{
    __html: item.replace(/\n/g, "<div style='margin-top: 6px'></div>"),
  }}
></div>

        </div>
      </div>
    ))}
  </div>
)}

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1200: 3 }}
      >
        <Masonry>
          {product.gallery.map((image, i) => (
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
              src={product.gallery[currentIndex]}
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

export default ProductDetail;
