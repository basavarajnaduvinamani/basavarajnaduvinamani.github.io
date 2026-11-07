export const profile = {
  name: 'Basavaraj Naduvinamani',
  birthDate: '2004-03-21',
  github: 'https://github.com/basavarajnaduvinamani',
  linkedin: 'https://www.linkedin.com/in/basavarajnaduvinamani/',
  email: 'da25c005@smail.iitm.ac.in',
  roles: ['AI Researcher', 'ML Engineer', 'Builder'],
  skills: [
    ['Python', 'python', '#3776ab'], ['PyTorch', 'pytorch', '#ee4c2c'],
    ['Hugging Face', 'huggingface', '#d4a418'], ['TypeScript', 'typescript', '#3178c6'],
    ['React', 'react', '#149eca'], ['FastAPI', 'fastapi', '#009688'],
    ['Docker', 'docker', '#2496ed'], ['Git', 'git', '#f05032'],
    ['GitHub', 'github', '#414141'], ['Linux', 'linux', '#b89600'],
    ['SQLite', 'sqlite', '#003b57'],
  ],
};

export const experience = [
  {
    company: 'Walmart Center for Tech Excellence', role: 'AI Research Intern',
    location: 'IIT Madras', period: 'Jul 2026 — Present', logo: 'walmart.svg',
    description: 'Building VisureX, an industrial defect-detection system for MSME manufacturing, advised by Prof. Raghunathan Rengaswamy.',
    points: ['Developed a hardware-agnostic PatchCore workflow from camera ingestion through anomaly scoring.', 'Compressed memory-bank embeddings to a 5% coreset.', 'Benchmarked InceptionV4, VGG19, and WideResNet101 for cross-MSME domain-drift evaluation.'],
    tools: ['Python', 'PatchCore', 'Computer Vision', 'PyTorch'],
  },
  {
    company: 'AI4Bharat', role: 'Research Intern', location: 'IIT Madras',
    period: 'Nov 2025 — Feb 2026', logo: 'ai4bharat.png',
    description: 'Investigated where hallucinations emerge inside LLaVA-1.5-7B, advised by Prof. Mitesh Khapra.',
    points: ['Used layer-wise probing and terminal-state representations to study hallucination-emergence windows.', 'Explored PCA truth axes and norm-preserving SLERP activation steering.'],
    tools: ['LLaVA', 'Hugging Face', 'PCA', 'Model Evaluation'],
  },
];

export const education = [
  { school: 'IIT Madras', degree: 'Masters in Data Science and AI', period: '2025 — 2027', logo: 'iitm-emblem.png', url: 'https://www.iitm.ac.in/' },
  { school: 'University of Birmingham', degree: 'Masters in Data Science and AI (exchange semester)', period: '2026 — 2027', logo: 'birmingham.png', url: 'https://www.birmingham.ac.uk/' },
  { school: 'Dayananda Sagar University', degree: 'Bachelors in Computer Engineering', period: '2021 — 2025', logo: 'dsu.png', url: 'https://www.dsu.edu.in/' },
];

export const achievements = [
  { title: 'Maxwell Data Challenge', organization: 'Imperial College London', result: 'Winner', year: '2026', description: 'Transparent ESG intelligence with traceable, evidence-grounded analysis.' },
  { title: 'UKFinnovator', organization: 'United Kingdom', result: 'National Finalist', year: '2026', description: 'Selected among the top 100 students across the UK.' },
  { title: 'HealthTech AI Hackathon', organization: 'University of Birmingham', result: 'Winner', year: '2026', description: 'SPIKES, a clinical AI system for CGM and wearable-data analysis.' },
  { title: 'HUMANAUTH', organization: 'IISc (ART-Park) & KSCST', result: 'State Grant Awardee', year: '2024–2025', description: 'Grant support for an AI identity-security system.' },
];

export const projects = [
  {
    id: 'humanauth', title: 'HumanAuth', category: 'Identity Security', date: '2024–2025',
    description: 'A browser-based research prototype that runs face liveness, a document authenticity check, and enrolled voice matching on the device.',
    tags: ['Biometrics', 'ONNX Runtime', 'Browser Workers'],
    url: 'https://github.com/basavarajnaduvinamani/HumanAuth',
    demo: 'https://humanauth-id.vercel.app',
    steps: ['Face liveness', 'Document signal', 'Voice match'], accent: '#2563eb',
  },
  {
    id: 'esg', title: 'Transparent ESG Intelligence', category: 'Grounded LLM Systems', date: 'June 2026',
    description: 'Traceable ESG analysis with deterministic TypeScript calculations and Gemini responses grounded in precomputed evidence. Winner of the Maxwell Data Challenge at Imperial College London.',
    tags: ['TypeScript', 'Gemini', 'Evidence Grounding'],
    url: 'https://github.com/basavarajnaduvinamani/Transparent_ESG_Intelligence',
    steps: ['Company data', 'Benchmark', 'Evidence-led insight'], accent: '#0369a1',
  },
  {
    id: 'spikes', title: 'SPIKES', category: 'HealthTech & Analytics', date: 'March 2026',
    description: 'A clinician dashboard that turns CGM and wearable streams into glycemic-event and anomaly indicators, with conversational exploration of patient metrics. HealthTech AI Hackathon winner at Birmingham.',
    tags: ['Time Series', 'Conversational AI', 'Analytics'],
    url: 'https://github.com/basavarajnaduvinamani/SPIKES-AI',
    steps: ['CGM & wearables', 'Event detection', 'Clinical dashboard'], accent: '#3b82f6',
  },
  {
    id: 'assessment', title: 'Second Read', category: 'Agentic Evaluation', date: 'IIT Madras · DA7016',
    description: 'A FastAPI pipeline combining handwriting OCR, rubric grading, and an adversarial critic. Criterion-level traces connect model decisions with human-reference errors.',
    tags: ['FastAPI', 'OpenRouter', 'Multi-Agent Evaluation'],
    url: 'https://github.com/basavarajnaduvinamani/DA7016_Auto_Assessment_System',
    demo: 'https://secondread-grader.onrender.com',
    steps: ['Handwriting OCR', 'Rubric grader', 'Adversarial critic'], accent: '#4f46e5',
  },
];

export const research = [
  {
    id: 'counterprior', title: 'Multimodal Hallucinations', subtitle: 'CounterPrior · AI4Bharat',
    label: 'Multimodal Models', color: '#bfdbfe',
    description: 'Studying hallucination emergence in LLaVA-1.5-7B through layer-wise linear probes, PCA truth-axis analysis, and activation steering.',
    details: ['Used terminal-state representations and leave-one-out linear probes to study hallucination-emergence windows.', 'Explored PCA truth-axis analysis and norm-preserving SLERP steering.'],
    advisor: 'Prof. Mitesh Khapra', period: 'Nov 2025 — Feb 2026',
    url: 'https://github.com/basavarajnaduvinamani/DA5410-Winter-Project/tree/v2.0-final',
    demo: 'https://counterprior.vercel.app',
    tags: ['LLaVA', 'Layer-wise Probing', 'Activation Steering'],
  },
  {
    id: 'visurex', title: 'Industrial Anomaly Detection', subtitle: 'VisureX · Walmart Center for Tech Excellence',
    label: 'Computer Vision', color: '#c7d2fe',
    description: 'A hardware-agnostic PatchCore pipeline for reproducible industrial defect detection across MSME manufacturing environments.',
    details: ['Connected IoT-camera ingestion, filtering, feature extraction, memory-bank construction, and anomaly scoring.', 'Compressed embeddings to a 5% coreset to reduce the memory-bank footprint.', 'Benchmarked multiple visual backbones for scalable domain-drift evaluation.'],
    advisor: 'Prof. Raghunathan Rengaswamy', period: 'Jul 2026 — Present',
    url: 'https://github.com/basavarajnaduvinamani/vizurex-edge-ai',
    demo: 'https://visurex-demo.vercel.app',
    tags: ['PatchCore', 'Anomaly Detection', 'Domain Drift'],
  },
];
