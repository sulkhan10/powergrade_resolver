'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For App Router

const productDetails = {
  "v2-presets": {
    title: "v2 Presets",
    price: "$39.00",
    description: `A collection of 11 carefully designed PREMIUM Presets I use on a daily basis to edit my photos in ADOBE LIGHTROOM.  
    - Adapted to all genres of Photography (Street, Travel, Portrait...)  
    - The pack includes 8 color presets (+3 alternatives) and 3 B&W presets  
    - Tutorial videos about the use cases of each preset included  
    - Written instructions in the form of PDF included  
    - Contains Efficiency Tools to boost your editing productivity. Change exposure, WB, add or remove grain, lens correction in One Click  
    - Works with Lightroom Classic, Lightroom, Lightroom Mobile and Photoshop  
    - Great results with photos from any camera (Sony, Fuji and Ricoh files in the examples below)`,
    image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
  },
  // Add other products here...
};

const ProductDetail = () => {
  const params = useParams(); // Get dynamic slug from URL params
  const { slug } = useParams(); // Get dynamic slug from URL params
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    console.log("Params",params)
    if (slug) {
      const fetchedProduct = productDetails[slug];
      setProduct(fetchedProduct || null); // If product exists, set it
    }
  }, [slug]); // Only run this effect if slug changes

  if (!slug) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
      <div className="text-xl font-bold mb-2">{product.price}</div>
      <p className="mb-4">{product.description}</p>
      <button className="mt-2 w-full bg-black text-white py-2 rounded-3xl">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetail;
