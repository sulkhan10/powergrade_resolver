'use client';
import Link from 'next/link';
import { useState } from 'react';
import products from '../../data/products.json';
const categories = [
  
  {
    category : "All",
    categorySlug : "all"
  },
  {
    category : "Prints",
    categorySlug : "prints"
  },
  {
    category : "Lightroom Presets",
    categorySlug : "lightroom-presets"
  },
  {
    category : "PowerGrades",
    categorySlug : "powergrades"
  },
  {
    category : "LUTs",
    categorySlug : "luts"
  },
];

const StorePage = () => {
  const [productsFiltered, setProductsFiltered] = useState<any[]>(products);
  let [selectedCategory, setSelectedCategory] = useState<string>("all");

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('/api/store');
  //     const data = await response.json();
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh] overflow-y-scroll">
      {/* Flex container for categories and products */}
      <div className="flex flex-col md:flex-row">
        {/* Categories Section */}
        <div className="mb-6 lg:mb-0 md:w-1/4 md:pr-4 ">
          <ul className="space-y-2 flex md:flex-col space-x-1 md:space-x-0">
            {categories.map((category, index) => (
              <li 
              onClick={() => {

                setSelectedCategory(category.categorySlug);
                if (category.categorySlug === "all") {
                  setProductsFiltered(products);
                } else {
                  setProductsFiltered(products.filter((product) => product.categorySlug === category.categorySlug));
                }
              }
              }
              key={index}             className={`cursor-pointer  sm:text-left text-gray-800 hover:text-gray-950 hover:font-semibold text-sm sm:text-base ${selectedCategory === category.categorySlug ? 'font-bold' : ''}`}  
>
                {category.category}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div className="md:w-3/4">
        {
          productsFiltered.length === 0 ? (
            <div className="text-center flex items-center sm:items-start justify-center sm:justify-start   h-[30vh] sm:h-[40vh] md:h-[70vh]">
            <p className="uppercase tracking-widest text-xs text-gray-800">Coming Soon</p>
            </div>
           
          ) : (

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productsFiltered.map((product, index) => (
              <Link key={index} href={`/store/${product.slug}`} className="overflow-hidden flex flex-col">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full object-cover aspect-square"
                />
                <div className="py-4 flex-grow">
                  <h2 className="text-sm font-bold text-center  w-full">{product.name}</h2>
                  {product.originalPrice ? (
                    <div className="text-sm line-through text-gray-500 text-center">
                      {product.originalPrice}
                      <span className="text-xs text-gray-800 ml-1">{product.price}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-800 text-center">{product.price}</div>
                  )}
                </div>
                {/* <button className="mt-2 w-full bg-black text-white py-1.5 rounded-3xl">
                  Add To Cart
                </button> */}
              </Link>
            ))}
          </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default StorePage;
