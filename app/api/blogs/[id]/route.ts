// pages/api/blogs/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
      });
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
