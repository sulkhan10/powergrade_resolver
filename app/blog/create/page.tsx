'use client'
// components/CreateBlog.js
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Quill (it requires window object)
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css'; // import styles

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/blogs/create', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.ok) {
      alert('Blog post created!');
    } else {
      alert('Error creating blog post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
}
