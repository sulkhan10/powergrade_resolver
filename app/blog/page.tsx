'use client'
import Link from 'next/link';  
import React, { useEffect, useState } from 'react';
const posts = [  
  {  
    title: "The Only Time I Use Shutter Priority Mode",  
    date: "1/19/25",  
    category: "Settings",  
    image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D", // Update with actual image path  
    description: "A deep dive into when and why to use shutter priority mode in photography.",  
  },  
  {  
    title: "Vibrance or Saturation, Which One to Use?",  
    date: "1/12/25",  
    category: "Editing",  
    image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D", // Update with actual image path  
    description: "Understanding the differences between vibrance and saturation in photo editing.",  
  },  
  {  
    title: "Why Raising Blacks Is Better Than Lifting Shadows",  
    date: "1/3/25",  
    category: "Editing",  
    image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D", // Update with actual image path  
    description: "Exploring the benefits of adjusting blacks over shadows in your images.",  
  },  
  {  
    title: "Camera Gear I am Excited to use in 2025",  
    date: "12/30/24",  
    category: "Gear",  
    image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D", // Update with actual image path  
    description: "A look at the camera gear that I am looking forward to using in the new year.",  
  },  
  // Add more posts as needed  
];  

const BlogPage = () => {  
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      console.log(data, "DATA BLOG")
      console.log(res, "DATA BLOG")
      setBlogs(data);
    };
    fetchBlogs();
  }, []);
  return (  
    <div className="container mx-auto px-4">  
      <h1 className="text-md  my-12 text-center self-center">Photography - Gear - Editing</h1>  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">  
        {posts.map((post, index) => (  
          <Link key={index} href={`/blog/${index}`} passHref>  
            <div className="  overflow-hidden  cursor-pointer flex flex-col h-full">  
              {/* Uncomment to show image */}  
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />  
              <div className="p-4 flex-grow">  
                <div className="text-sm text-gray-500">{post.category} • {post.date}</div>  
                <h2 className="text-lg font-semibold mt-1 line-clamp-1">{post.title}</h2>  
                {/* <p className="text-gray-600 mt-2 line-clamp-2">{post.description}</p>   */}
              </div>  
            </div>  
          </Link>  
        ))}  
      </div>  
    </div>  
  );  
};  

export default BlogPage;  