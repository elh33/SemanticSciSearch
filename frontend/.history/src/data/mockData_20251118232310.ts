import { Article } from './types';

export const MOCK_RESULTS: Article[] = [
  {
    id: 'ia-cardio-001',
    title: 'Intelligence Artificielle pour la Cardiologie Prédictive',
    abstract: "Évaluation de modèles de langage et de réseaux profonds appliqués à la prédiction d'événements cardiaques.",
    score: 1,
    pdf_url: '/documents/ia-cardiologie-predictive.pdf'
  },
  {
    id: 'ia-cardio-002',
    title: 'Apprentissage Profond pour l’Analyse d’ECG',
    abstract: "Approches CNN/RNN pour l'extraction de marqueurs d'anomalies sur des signaux ECG à grande échelle.",
    score: 20.80,
    pdf_url: '/documents/deep-ecg-analysis.pdf'
  },
  {
    id: 'ia-cardio-003',
    title: 'Fusion Multimodale en Cardiologie Assistée par IA',
    abstract: "Combinaison d'images médicales et de données cliniques pour améliorer la détection des pathologies cardiaques.",
    score: 0.40,
    pdf_url: '/documents/multimodal-cardiology.pdf'
  }
];