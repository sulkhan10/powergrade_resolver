'use client'
import { notFound } from 'next/navigation';  
import { useEffect } from 'react';

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

const PostDetail = ({ params }) => {  
  const { id } = params;  

  const post = posts[Number(id)]; // Get the post based on the id  

  if (!post) {  
    notFound(); // Redirect to 404 page if post not found  
  }  

useEffect(()=>{
  console.log(params)
},[])

  return (  
    <div className="container mx-auto px-4">  
      <h1 className="text-3xl font-bold my-4">{post.title}</h1>  
      <div className="text-sm text-gray-500">{post.category} • {post.date}</div>  
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover my-4" />  
      <p className="text-gray-600">{post.description}</p>  
      {/* Add more details about the post here */}  
    </div>  
  );  
};  

export default PostDetail;  