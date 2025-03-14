"use client"; // Ensures this component runs on the client side

import { useState } from 'react';
// import Editor from '../../components/editor'; // Adjust the path as necessary
import axios from 'axios';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../../components/editor'), {
  ssr: false, // Ensure it's only loaded on the client-side
});
const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/blogs', { title, content, imageUrls });
      if (res.status === 201) {
        alert('Article saved successfully!');
        setTitle('');
        setContent('');
        setImageUrls([]);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Article</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor onChange={setContent} value={content} />
      <button onClick={handleSubmit}>Save Article</button>
    </div>
  );
};

export default CreateArticle;
