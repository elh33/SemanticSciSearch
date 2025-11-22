import React from 'react';
// Importe le composant de recherche principal
import SearchResults from './components/SearchResults'; 

// Le composant App.tsx est le conteneur principal de l'application.
function App() {
  return (
    // Utilisation d'un fragment React (<>...</>) ou d'un <div> si tu as des styles globaux
    <>
      {/* Le composant SearchResults contient maintenant : 
        - Le titre et le sous-titre de l'application.
        - La barre de recherche.
        - L'orchestration de la logique (appels à api.ts).
        - L'affichage de la liste des ArticleCard.
      */}
      <SearchResults />
    </>
  );
}

export default App;