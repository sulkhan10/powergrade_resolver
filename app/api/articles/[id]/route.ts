import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the GET method for fetching a specific article by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the ID from the URL parameters

  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) }, // Find the article by ID
      include: { images: true }, // Include associated images
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
