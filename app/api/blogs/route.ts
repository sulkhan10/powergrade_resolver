// app/api/upload/route.ts  
import formidable from 'formidable';  
import path from 'path';  
import fs from 'fs';  
import { NextResponse } from 'next/server';  
import { PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient();  

export const config = {  
  api: {  
    bodyParser: false,  
  },  
};  

async function parseFormData(req: Request): Promise<{ fields: formidable.Fields; files: formidable.Files }> {  
  return new Promise((resolve, reject) => {  
    const form = new formidable.IncomingForm();  
    form.parse(req, (err, fields, files) => {  
      if (err) {  
        reject(err);  
      } else {  
        resolve({ fields, files });  
      }  
    });  
  });  
}  

export async function POST(req: Request) {  
  try {  
    const { files } = await parseFormData(req);  
    
    const file = files.file as formidable.File;  

    if (!file) {  
      return NextResponse.json({ error: 'No file received' }, { status: 400 });  
    }  

    const filename = Date.now() + path.extname(file.originalFilename || 'unknown');  
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');  

    if (!fs.existsSync(uploadDir)) {  
      fs.mkdirSync(uploadDir, { recursive: true });  
    }  

    const filePath = path.join(uploadDir, filename);  

    // Move the file  
    fs.renameSync(file.filepath, filePath);  

    const imageUrl = `/uploads/${filename}`;  

    // Optionally store the image URL in the database  
    // const image = await prisma.image.create({  
    //   data: { url: imageUrl },  
    // });  

    return NextResponse.json({ url: imageUrl }, { status: 200 });  
  } catch (error) {  
    console.error('File upload error:', error);  
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });  
  }  
}  