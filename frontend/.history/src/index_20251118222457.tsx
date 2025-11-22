import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export interface Article {
  id: string;
  title: string;
  abstract: string;
  score: number;
  pdf_url: string; // Lien pour le lecteur PDF interne
}