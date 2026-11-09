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
    location: 'IIT Madras', period: 'Jul 2026 to Present', logo: 'walmart.svg', caseStudy: '#projects/visurex',
    description: 'Working on industrial visual inspection for MSME manufacturing, advised by Prof. Raghunathan Rengaswamy.',
    points: ['Benchmarked few-shot DINOv2 against the inherited WCTE PatchCore implementation.', 'Built the export and parity workflow and a browser inspection prototype.'],
      },
  {
    company: 'AI4Bharat', role: 'Research Intern', location: 'IIT Madras',
    period: 'Nov 2025 to Feb 2026', logo: 'ai4bharat.png', caseStudy: '#projects/counterprior',
    description: 'Investigated where hallucinations emerge inside LLaVA-1.5-7B, advised by Prof. Mitesh Khapra.',
    points: ['Used layer-wise probing and terminal-state representations to study hallucination-emergence windows.', 'Explored PCA truth axes and norm-preserving SLERP activation steering.'],
      },
];

export const education = [
  { school: 'IIT Madras', degree: 'Masters in Data Science and AI', period: '2025 to 2027', logo: 'iitm-emblem.png', url: 'https://www.iitm.ac.in/' },
  { school: 'University of Birmingham', degree: 'Masters in Data Science and AI (exchange semester)', period: '2026 to 2027', logo: 'birmingham.png', url: 'https://www.birmingham.ac.uk/' },
  { school: 'Dayananda Sagar University', degree: 'Bachelors in Computer Engineering', period: '2021 to 2025', logo: 'dsu.png', url: 'https://www.dsu.edu.in/' },
];

export const achievements = [
  { title: 'Maxwell Data Challenge', organization: 'Imperial College London', result: 'Winner', year: '2026', description: 'Transparent ESG intelligence with traceable, evidence-grounded analysis.' },
  { title: 'UKFinnovator', organization: 'United Kingdom', result: 'National Finalist', year: '2026', description: 'Selected among the top 100 students across the UK.' },
  { title: 'HealthTech AI Hackathon', organization: 'University of Birmingham', result: 'Winner', year: '2026', description: 'SPIKES, a clinical AI system for CGM and wearable-data analysis.' },
  { title: 'HUMANAUTH', organization: 'IISc (ART-Park) & KSCST', result: 'State Grant Awardee', year: '2024 to 2025', description: 'Grant support for an AI identity-security system.' },
];
