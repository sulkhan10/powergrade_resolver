'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ArticlesPage = () => {
  const [articles, setArticles] = useState<any[]>([]);

  // Fetch articles from the backend when the component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="article-item">
              <h2>{article.title}</h2>
              <p>{article.content.slice(0, 100)}...</p>
              <Link href={`/articles/${article.id}`}>
                <div>Read more</div>
              </Link>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
