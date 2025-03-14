// app/create-article/page.tsx  
'use client'

import { useState } from 'react';  
import Editor from '../../components/editor'; // Adjust the path as necessary  
import axios from 'axios';  

const CreateArticle = () => {  
  const [title, setTitle] = useState('');  
  const [content, setContent] = useState('');  
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Specify the type for imageUrls  

  const handleSubmit = async () => {  
    try {  
      const res = await axios.post('/api/blogs', { title, content, imageUrls }); // Adjust the API endpoint if necessary  
      if (res.status === 201) {  
        alert('Article saved successfully!');  
        // Optionally reset the form or redirect  
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