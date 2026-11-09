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
    company: 'Walmart Centre for Tech Excellence', role: 'AI Research Intern',
    location: 'IIT Madras', period: 'Jul 2026 to present', logo: 'walmart.svg', caseStudy: '#projects/visurex',
    description: 'Building VisureX, AI quality inspection for MSME manufacturers. Advised by Prof. Raghunathan Rengaswamy.',
    points: ['Benchmarked few-shot DINOv2 against the PatchCore pipeline the team already used.', 'Built a browser inspection prototype and the checks that confirm it matches the reference model.'],
      },
  {
    company: 'AI4Bharat', role: 'Research Intern', location: 'IIT Madras',
    period: 'Nov 2025 to Feb 2026', logo: 'ai4bharat.png', caseStudy: '#projects/counterprior',
    description: 'Studied where hallucinations start inside LLaVA-1.5-7B. Advised by Prof. Mitesh Khapra.',
    points: ['Probed hidden states layer by layer to find where false answers form.', 'Tested activation steering (PCA truth axes, norm-preserving SLERP) against matched controls.'],
      },
];

export const education = [
  { school: 'IIT Madras', degree: 'Master’s in Data Science and AI', period: '2025 to 2027', logo: 'iitm-emblem.png', url: 'https://www.iitm.ac.in/' },
  { school: 'University of Birmingham', degree: 'Master’s in Data Science and AI, exchange semester', period: '2026 to 2027', logo: 'birmingham.png', url: 'https://www.birmingham.ac.uk/' },
  { school: 'Dayananda Sagar University', degree: 'Bachelor’s in Computer Engineering', period: '2021 to 2025', logo: 'dsu.png', url: 'https://www.dsu.edu.in/' },
];

export const achievements = [
  { title: 'Maxwell Data Challenge', organization: 'Imperial College London', result: 'Winner', year: '2026', description: 'Transparent ESG Intelligence: ESG scores that show the evidence behind them.' },
  { title: 'UKFinnovator', organization: 'Imperial College London', result: 'National finalist', year: '2026', description: 'One of the top 100 students across the UK.' },
  { title: 'HealthTech AI Hackathon', organization: 'University of Birmingham', result: '1st place', year: '2026', description: 'SPIKES: finds glucose spikes and dips in CGM data so clinicians see who needs attention first.' },
  { title: 'HumanAuth', organization: 'ART-Park (IISc) and KSCST', result: 'Grant awardee', year: '2024 to 2025', description: 'Funding for an identity verification system that runs on the device.' },
];
