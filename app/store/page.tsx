'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = [
  "All",
  "Prints",
  "Lightroom Presets",
  "Zines",
  "LUTs",
];

const StorePage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/store');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Flex container for categories and products */}
      <div className="flex flex-col md:flex-row">
        {/* Categories Section */}
        <div className="mb-6 lg:mb-0 md:w-1/4 md:pr-4 ">
          <ul className="space-y-2 flex md:flex-col space-x-2 md:space-x-0">
            {categories.map((category, index) => (
              <li key={index} className="cursor-pointer hover:text-blue-500">
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Link key={index} href={`/store/${product.title}`} className="overflow-hidden flex flex-col">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full object-cover aspect-square"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-sm font-bold text-center">{product.title}</h2>
                  {product.originalPrice ? (
                    <div className="text-sm line-through text-gray-500 text-center">
                      {product.originalPrice}
                      <span className="text-xs text-gray-800 ml-1">{product.price}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-800 text-center">{product.price}</div>
                  )}
                </div>
                <button className="mt-2 w-full bg-black text-white py-1.5 rounded-3xl">
                  Add To Cart
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
