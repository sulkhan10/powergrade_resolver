// app/api/blogs/route.ts  
import { NextResponse } from 'next/server';  
import { PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient();  

// Define the GET method  
export async function GET() {  
  try {  
    const blogs = await prisma.blog.findMany();  
    return NextResponse.json(blogs);  
  } catch (error) {  
    console.error(error); // Log the error for debugging  
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });  
  }  
}  

// Define the POST method  
export async function POST(req: Request) {  
  try {  
    const { title, content, imageUrls } = await req.json(); // Parse the JSON body  

    // Create article in the database  
    const blog = await prisma.blog.create({  
      data: {  
        title,  
        content,  
        images: { // Assuming you have a relation for images in your Prisma schema  
          create: imageUrls.map(url => ({ url })), // Create image entries  
        },  
      },  
    });  

    return NextResponse.json(blog, { status: 201 });  
  } catch (error) {  
    console.error(error); // Log the error for debugging  
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });  
  }  
}  