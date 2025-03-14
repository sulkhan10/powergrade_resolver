'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticlePage = ({ id }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(`/api/articles/${id}`);
      setArticle(res.data);
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default ArticlePage;
