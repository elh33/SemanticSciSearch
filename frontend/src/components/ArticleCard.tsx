import React from 'react';

interface ArticleCardProps {
    title: string;
    abstract: string;
    similarityScore: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, abstract, similarityScore }) => {
    return (
        <div className="article-card">
            <h2>{title}</h2>
            <p>{abstract}</p>
            <p>Similarity Score: {similarityScore.toFixed(2)}</p>
        </div>
    );
};

export default ArticleCard;