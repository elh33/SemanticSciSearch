import { Article } from '../types';

export const MOCK_RESULTS: Article[] = [
  {
    id: "1",
    title: "Intelligence Artificielle pour la Cardiologie Prédictive",
    abstract: "Étude des modèles BERT pour l'analyse des signaux cardiaques...",
    score: 0.92,
    pdf_url: "/documents/ia-cardiologie.pdf" // Simule un lien d'accès
  },
  {
    id: "2",
    title: "Apprentissage Machine et Big Data en Médecine",
    abstract: "Revue des défis et des solutions pour l'indexation sémantique des données médicales...",
    score: 0.85,
    pdf_url: "/documents/ml-medecine.pdf"
  },
  // ... ajouter d'autres articles mockés ...
];