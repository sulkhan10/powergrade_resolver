// pages/api/blogs/update/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    try {
      const blog = await prisma.blog.update({
        where: { id: parseInt(id) },
        data: {
          title,
          content,
        },
      });
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
