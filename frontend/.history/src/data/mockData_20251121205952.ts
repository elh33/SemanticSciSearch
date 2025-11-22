import { Article } from '../types';

export const MOCK_RESULTS: Article[] = [
  {
    id: '1',
    title: 'Deep Learning for Automated ECG Analysis: A Comprehensive Review',
    abstract: "This paper presents a systematic review of deep learning approaches for automated electrocardiogram (ECG) analysis, covering arrhythmia detection, myocardial infarction diagnosis, and heart rate variability assessment. We analyze over 150 studies published between 2015 and 2024.",
    authors: "Wang, J., Chen, L., Zhang, M.",
    year: 2024,
    url: 'https://arxiv.org/pdf/2301.04634'
  },
  {
    id: '2',
    title: 'Transformer-Based Models for Cardiovascular Disease Prediction Using Electronic Health Records',
    abstract: "We propose a novel transformer architecture for predicting cardiovascular events from longitudinal electronic health records. Our model achieves 94.2% AUC on a dataset of 500,000 patients.",
    authors: "Smith, A., Johnson, K., Patel, R.",
    year: 2023,
    url: 'https://arxiv.org/pdf/2305.12987'
  },
  {
    id: '3',
    title: 'Artificial Intelligence in Cardiac Imaging: Current Applications and Future Perspectives',
    abstract: "A comprehensive overview of AI applications in cardiac MRI, CT, and echocardiography. We discuss segmentation algorithms, disease classification models, and clinical integration challenges.",
    authors: "Garcia, M., Lee, S., Brown, T.",
    year: 2023,
    url: 'https://arxiv.org/pdf/2203.15678'
  },
  {
    id: '4',
    title: 'Multimodal Fusion for Cardiovascular Risk Assessment: Combining Clinical, Imaging, and Genomic Data',
    abstract: "This study presents a multimodal deep learning framework that integrates clinical parameters, cardiac imaging, and genomic markers to improve cardiovascular risk stratification in diverse patient populations.",
    authors: "Kumar, V., Williams, D., Anderson, P.",
    year: 2024,
    url: '/documents/multimodal-cardio-risk.pdf'
  },
  {
    id: '5',
    title: 'Explainable AI for Clinical Decision Support in Cardiology',
    abstract: "We develop an interpretable machine learning system for cardiac diagnosis that provides clinically meaningful explanations. Validated in a multi-center trial with 12 hospitals.",
    authors: "Martinez, E., Taylor, J., Davis, C.",
    year: 2023,
    url: 'https://arxiv.org/pdf/2511.13703.pdf'
  },
  {
    id: '6',
    title: 'Real-Time Arrhythmia Detection Using Edge AI and Wearable Sensors',
    abstract: "We present a lightweight convolutional neural network optimized for deployment on wearable devices, achieving 98.5% accuracy for atrial fibrillation detection with <100ms latency.",
    authors: "Li, X., Zhang, Y., Wilson, M.",
    year: 2024,
    url: '/documents/edge-ai-arrhythmia.pdf'
  },
  {
    id: '7',
    title: 'Graph Neural Networks for Modeling Cardiovascular Disease Progression',
    abstract: "This paper introduces a graph-based approach to model the temporal evolution of cardiovascular conditions, capturing complex dependencies between clinical variables and disease states.",
    authors: "Rodriguez, A., Kim, H., Thompson, R.",
    year: 2023,
    url: 'https://arxiv.org/pdf/2204.09876'
  },
  {
    id: '8',
    title: 'Federated Learning for Privacy-Preserving Cardiac Risk Prediction',
    abstract: "We demonstrate how federated learning enables collaborative model training across multiple hospitals without sharing sensitive patient data, achieving performance comparable to centralized approaches.",
    authors: "Chen, W., Moore, J., White, L.",
    year: 2022,
    url: '/documents/federated-cardiac.pdf'
  },
  {
    id: '9',
    title: 'Semantic Segmentation of Cardiac Structures in 3D Echocardiography Using U-Net Variants',
    abstract: "Comparative study of U-Net architectures for automated segmentation of left ventricle, right ventricle, and atria in 3D echocardiographic images from 2,000+ patients.",
    authors: "Nguyen, T., Jackson, K., Harris, B.",
    year: 2023,
    url: '/documents/3d-echo-segmentation.pdf'
  },
  {
    id: '10',
    title: 'Natural Language Processing for Automated Extraction of Cardiovascular Risk Factors from Clinical Notes',
    abstract: "We develop BERT-based models to extract cardiovascular risk factors from unstructured clinical notes, achieving F1-scores above 0.90 for key entities like hypertension, diabetes, and smoking status.",
    authors: "Park, S., Miller, D., Clark, E.",
    year: 2024,
    url: 'https://arxiv.org/pdf/2302.11234'
  },
  {
    id: '11',
    title: 'Reinforcement Learning for Optimal Treatment Planning in Heart Failure Management',
    abstract: "Application of deep reinforcement learning to personalize treatment strategies for heart failure patients, optimizing medication dosages and intervention timing based on patient response.",
    authors: "Ahmed, R., Lewis, G., Young, N.",
    year: 2022,
    url: '/documents/rl-heart-failure.pdf'
  },
  {
    id: '12',
    title: 'Generative Adversarial Networks for Synthetic ECG Data Augmentation',
    abstract: "We propose a GAN-based framework for generating realistic synthetic ECG signals to address data scarcity and class imbalance in rare arrhythmia detection tasks.",
    authors: "Hoffman, P., Scott, A., King, V.",
    year: 2023,
    url: '/documents/gan-ecg-augmentation.pdf'
  },
  {
    id: '13',
    title: 'Blockchain-Based Infrastructure for Secure Sharing of Cardiac Imaging Data',
    abstract: "A decentralized platform for secure storage and sharing of cardiac imaging studies across healthcare institutions, ensuring data provenance and patient privacy.",
    authors: "Green, T., Adams, F., Wright, M.",
    year: 2022,
    url: '/documents/blockchain-cardiac-imaging.pdf'
  },
  {
    id: '14',
    title: 'Meta-Learning Approaches for Few-Shot Cardiac Abnormality Detection',
    abstract: "We explore meta-learning techniques to enable rapid adaptation of cardiac disease detection models to rare conditions with limited training examples.",
    authors: "Baker, L., Turner, S., Phillips, O.",
    year: 2023,
    url: '/documents/meta-learning-cardiac.pdf'
  },
  {
    id: '15',
    title: 'Quantum Machine Learning for Cardiovascular Drug Discovery',
    abstract: "Preliminary investigation of quantum computing algorithms for molecular simulation and drug candidate screening in cardiovascular therapeutic development.",
    authors: "Collins, R., Morris, J., Cooper, W.",
    year: 2024,
    url: '/documents/quantum-ml-cardio.pdf'
  }
];