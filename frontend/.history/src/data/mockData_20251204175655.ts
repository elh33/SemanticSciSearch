import { Article } from '../types';

export const MOCK_RESULTS: Article[] = [
  {
    rank: 1,
    title: "Deep Learning for Medical Image Analysis in Cardiology",
    abstract: "Cardiovascular diseases remain the leading cause of mortality worldwide. Recent advances in deep learning have shown promising results in medical image analysis. In this study, we present a novel convolutional neural network architecture specifically designed for detecting cardiac abnormalities in echocardiography images. Our approach combines transfer learning with custom attention mechanisms to achieve 95% accuracy in identifying various cardiac conditions including valve diseases, chamber enlargement, and wall motion abnormalities. The model was trained on a dataset of 50,000 annotated echocardiography images from multiple centers.",
    best_sentence: "Our novel approach uses convolutional neural networks to detect cardiac abnormalities with 95% accuracy.",
    keywords: ["deep learning", "cardiology", "CNN", "medical imaging"],
    authors: "Smith J., Johnson A., Williams R.",
    year: 2023,
    score: 1.05,
    url: "https://example.com/paper1.pdf"
  },
  {
    rank: 2,
    title: "AI-Powered Cancer Detection Using Transfer Learning",
    abstract: "Early detection of cancer significantly improves patient outcomes and survival rates. This research explores the application of transfer learning techniques for automated cancer detection in mammography screening. We fine-tuned pre-trained deep learning models on a diverse dataset of 100,000 mammography images. Our system demonstrates superior performance in detecting early-stage breast cancer, reducing false positives by 40% compared to traditional computer-aided detection systems. The model shows particular promise in identifying subtle microcalcifications and architectural distortions.",
    best_sentence: "Transfer learning techniques significantly improve early cancer detection rates in mammography screening.",
    keywords: ["cancer detection", "transfer learning", "AI", "mammography"],
    authors: "Brown M., Davis L.",
    year: 2023,
    score: 1.08,
    url: "https://example.com/paper2.pdf"
  },
  {
    rank: 3,
    title: "Machine Learning Applications in Diabetes Prediction",
    abstract: "Type 2 diabetes mellitus is a growing global health concern affecting millions of people. This study investigates the application of machine learning algorithms for early prediction of diabetes onset. We developed and evaluated multiple models including random forests, gradient boosting, and neural networks using electronic health records from 200,000 patients. Our random forest model achieved the highest performance with 89% accuracy and 0.91 AUC, effectively identifying high-risk individuals up to 5 years before clinical diagnosis. Key predictive features included BMI, fasting glucose levels, age, and family history.",
    best_sentence: "Random forest algorithms demonstrate superior performance in predicting type 2 diabetes onset.",
    keywords: ["diabetes", "machine learning", "prediction", "random forest"],
    authors: "Garcia C., Martinez E., Lopez F.",
    year: 2022,
    score: 1.11,
    url: "https://example.com/paper3.pdf"
  },
  {
    rank: 4,
    title: "Respiratory Disease Classification with Neural Networks",
    abstract: "Respiratory diseases including pneumonia, tuberculosis, and COVID-19 pose significant diagnostic challenges. This research presents a deep neural network system for automated classification of respiratory diseases from chest X-ray images. Our architecture incorporates residual connections and dense blocks to effectively learn hierarchical features. Trained on a multi-institutional dataset of 80,000 chest radiographs, the model achieves state-of-the-art results with 94% accuracy across seven disease categories. The system provides explainable predictions through gradient-weighted class activation mapping.",
    best_sentence: "Deep neural networks achieve state-of-the-art results in classifying respiratory diseases from chest X-rays.",
    keywords: ["respiratory disease", "neural networks", "X-ray", "classification"],
    authors: "Wilson K., Anderson T.",
    year: 2023,
    score: 1.13,
    url: "https://example.com/paper4.pdf"
  },
  {
    rank: 5,
    title: "Cardiac Arrhythmia Detection Using LSTM Networks",
    abstract: "Cardiac arrhythmias are irregular heart rhythms that can lead to serious complications including stroke and sudden cardiac death. This work develops a long short-term memory (LSTM) network for real-time arrhythmia detection from electrocardiogram (ECG) signals. The model processes raw ECG data and classifies beats into normal and 16 different arrhythmia types. Evaluated on the MIT-BIH arrhythmia database and additional clinical datasets, our approach achieves 98% sensitivity and 97% specificity. The system is designed for deployment in wearable cardiac monitors.",
    best_sentence: "Long short-term memory networks effectively identify complex arrhythmia patterns in ECG data.",
    keywords: ["arrhythmia", "LSTM", "ECG", "cardiology"],
    authors: "Taylor P., Moore S., Clark H.",
    year: 2022,
    score: 1.15,
    url: "https://example.com/paper5.pdf"
  },
  {
    rank: 6,
    title: "AI in Oncology: Tumor Segmentation Advances",
    abstract: "Accurate tumor segmentation is crucial for cancer diagnosis, treatment planning, and monitoring. This study presents advanced U-Net architectures enhanced with attention gates and deep supervision for automated tumor segmentation in MRI scans. We evaluated our models on brain tumor, liver tumor, and prostate cancer datasets totaling 15,000 MRI volumes. The enhanced U-Net achieves superior Dice scores of 0.92-0.95 across different tumor types, improving boundary detection by 15% compared to standard U-Net. The system assists radiologists in treatment planning and surgical navigation.",
    best_sentence: "Advanced U-Net architectures improve tumor boundary detection in MRI scans.",
    keywords: ["oncology", "tumor segmentation", "U-Net", "MRI"],
    authors: "Lee D., Kim J.",
    year: 2023,
    score: 1.17,
    url: "https://example.com/paper6.pdf"
  },
  {
    rank: 7,
    title: "Diabetes Management with IoT and Machine Learning",
    abstract: "Continuous glucose monitoring is essential for effective diabetes management. This research combines Internet of Things (IoT) devices with machine learning algorithms to create an intelligent diabetes management system. The system integrates data from continuous glucose monitors, activity trackers, and dietary logs. Using ensemble learning methods, we predict glucose levels up to 60 minutes in advance with RMSE of 18 mg/dL. The system provides personalized insulin dosing recommendations and alerts for hypo/hyperglycemic events. Clinical trials with 500 patients showed 23% improvement in time-in-range.",
    best_sentence: "IoT devices combined with ML algorithms enable real-time glucose monitoring and prediction.",
    keywords: ["diabetes management", "IoT", "machine learning", "glucose monitoring"],
    authors: "Nguyen V., Patel R.",
    year: 2022,
    score: 1.19,
    url: "https://example.com/paper7.pdf"
  },
  {
    rank: 8,
    title: "COVID-19 Detection from Chest CT Scans",
    abstract: "The COVID-19 pandemic highlighted the need for rapid and accurate diagnostic tools. This work develops a 3D convolutional neural network for automated COVID-19 detection from chest CT scans. Our model analyzes volumetric CT data to identify characteristic COVID-19 patterns including ground-glass opacities and consolidations. Trained on 25,000 CT volumes from multiple countries, the system achieves 96% sensitivity and 94% specificity, matching radiologist-level performance. The model also distinguishes COVID-19 from other viral pneumonias and provides severity assessment. Inference time is under 10 seconds per scan.",
    best_sentence: "Automated COVID-19 detection using 3D CNNs achieves radiologist-level accuracy.",
    keywords: ["COVID-19", "CT scan", "3D CNN", "respiratory"],
    authors: "Chen X., Wang Y., Zhang L.",
    year: 2021,
    score: 1.21,
    url: "https://example.com/paper8.pdf"
  },
  {
    rank: 9,
    title: "Heart Failure Prediction Using Electronic Health Records",
    abstract: "Heart failure affects millions worldwide and requires early intervention to prevent hospitalizations. This study leverages electronic health records (EHR) data for predicting heart failure onset. We developed gradient boosting models that integrate structured data (lab results, vital signs, medications) and unstructured clinical notes using natural language processing. The model was validated on 300,000 patient records across 5 years. Our approach achieves 0.87 AUC in predicting heart failure within 12 months, with high precision of 0.83. Important predictive features include ejection fraction, BNP levels, and comorbidity burden.",
    best_sentence: "Gradient boosting models leverage EHR data to predict heart failure with high precision.",
    keywords: ["heart failure", "EHR", "gradient boosting", "prediction"],
    authors: "Rodriguez M., Hernandez A.",
    year: 2022,
    score: 1.24,
    url: "https://example.com/paper9.pdf"
  },
  {
    rank: 10,
    title: "Lung Cancer Screening with AI-Enhanced Radiology",
    abstract: "Lung cancer is the leading cause of cancer deaths worldwide. Early detection through low-dose CT screening can reduce mortality by 20%. However, high false positive rates limit screening effectiveness. This research presents an AI-enhanced radiology system that reduces false positives in lung nodule detection by 40%. Our deep learning ensemble analyzes CT scans to classify nodules as benign or malignant using shape, texture, and growth characteristics. Validated on the National Lung Screening Trial dataset and additional clinical data from 50,000 patients, the system achieves 92% sensitivity while maintaining 85% specificity. Integration with clinical workflows reduced radiologist reading time by 30%.",
    best_sentence: "AI-enhanced screening reduces false positives in lung cancer detection by 40%.",
    keywords: ["lung cancer", "screening", "AI", "radiology"],
    authors: "Thompson B., White C.",
    year: 2023,
    score: 1.26,
    url: "https://example.com/paper10.pdf"
  }
];