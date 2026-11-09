const owner = 'https://github.com/basavarajnaduvinamani';
const visurexRepo = `${owner}/vizurex-edge-ai`;
const counterpriorRepo = `${owner}/DA5410-Winter-Project`;
const humanAuthRepo = `${owner}/HumanAuth`;
const secondReadRepo = `${owner}/DA7016_Auto_Assessment_System`;
const spikesRepo = `${owner}/SPIKES-AI`;
const esgRepo = `${owner}/Transparent_ESG_Intelligence`;
const previews = '/assets/project-previews';

export const projectContent = [
  {
    id: 'visurex',
    title: 'VisureX',
    category: 'Industrial inspection',
    filters: ['Computer vision', 'Applied AI'],
    tags: ['DINOv2', 'PatchCore', 'Browser inference'],
    description: 'A browser prototype for teaching a new part from normal examples and inspecting another photo with a score, threshold, and heatmap.',
    repoUrl: visurexRepo,
    liveUrl: 'https://visurex-demo.vercel.app',
    tile: {
      title: 'VisureX: Smart-glasses shop-floor inspection',
      context: 'WCTE (Walmart Centre for Tech Excellence), IIT Madras, Oct 2026 to present',
      description: 'Training-free DINOv2 k-NN beat PatchCore, 0.956 vs 0.924 macro AUROC on 15 MVTec AD categories (k=8, 3 seeds). The check runs in the browser.',
      codeUrl: visurexRepo,
      preview: { src: `${previews}/tile-visurex.webp`, alt: 'VisureX shop-floor inspection page with a generated washer and browser inspection controls.' },
    },
    preview: {
      src: `${previews}/visurex-inspection.png`,
      alt: 'VisureX inspection interface showing a GOOD result, score, and threshold for a generated normal washer.',
    },
    caseStudy: {
      overview: 'VisureX started with an inherited inspection pipeline at the Walmart Centre for Tech Excellence at IIT Madras. My work covered the benchmark harness, few-shot comparison, browser export and parity, capture checks, and prototype engineering.',
      problem: 'An inspector may have a handful of normal part photos and few labeled defects. An inspection workflow also needs to show where an anomaly appears and ask for a retake when a photo is unusable.',
      approach: [
        'Compared an established DINOv2 patch-neighbor baseline with the inherited PatchCore implementation under the same reference-image budgets.',
        'Built a browser flow for creating a reference bank, calibrating on separate normal photos, and inspecting a new photo.',
        'Extended the prototype to capture audit findings and track follow-up actions on one device.',
      ],
      decisions: [
        'Keep reference photos and threshold calibration separate to avoid tuning a threshold on the memory bank.',
        'Show the operating threshold beside the feature-distance score and heatmap so an inspector can see what drove the result.',
        'Use explicitly labeled generated examples in the public demo.',
      ],
      outcome: 'With eight references on the MVTec AD benchmark, DINOv2 reached macro AUROC* 0.956 (95% CI 0.927–0.981) versus 0.924 (0.868–0.968) for PatchCore, across 15 categories and three seeds. The paired difference was 0.032 (0.001–0.071). The full-reference comparison was inconclusive. *AUROC measures how well scores rank anomalous images above normal images.',
      limitations: 'The intervals summarize this fixed benchmark. The public prototype uses generated examples and browser-local records. Factory qualification, owned-part capture, and field adoption are pending.',
      sources: [
        { label: 'Comparison results and intervals', url: `${visurexRepo}/blob/main/docs/sprint/S2_RESULTS.md` },
        { label: 'Browser parity record', url: `${visurexRepo}/blob/main/docs/step1/browser_parity.json` },
        { label: 'Prototype workflow contracts', url: `${visurexRepo}/blob/main/docs/PLATFORM_CONTRACTS.md` },
      ],
    },
    research: {
      category: 'Computer vision',
      title: 'Industrial anomaly detection',
      summary: 'Few-shot baselines, reference bank calibration, and capture checks for browser-based visual inspection.',
      figures: [
        {
          src: `${previews}/visurex-inspection.png`,
          alt: 'The VisureX browser prototype returns GOOD for a generated normal washer.',
          caption: 'Browser inference on a generated normal washer. This single example illustrates the interface.',
        },
        {
          src: `${previews}/visurex-benchmark.png`,
          alt: 'Image-level AUROC curves for bottle, grid, and transistor as the reference bank size increases.',
          caption: 'Earlier three-category few-shot comparison. Error bars show standard deviation over seeds.',
        },
        {
          src: `${previews}/visurex-audit-walk.png`,
          alt: 'Mobile VisureX audit report for a fictional plant, with findings and follow-up actions.',
          caption: 'The current platform prototype also records audit findings on a fictional plant.',
        },
      ],
    },
  },
  {
    id: 'counterprior',
    title: 'CounterPrior',
    category: 'Multimodal evaluation',
    filters: ['Evaluation', 'Research'],
    tags: ['LLaVA', 'Input swaps', 'Model probes'],
    description: 'An investigation of what small multimodal models rely on when they answer questions about images, audio, and video.',
    repoUrl: `${counterpriorRepo}/tree/v2.0-final`,
    liveUrl: 'https://counterprior.vercel.app',
    tile: {
      title: 'CounterPrior: Do multimodal models know when they are guessing?',
      context: 'Project ongoing since Nov 2025. Began at AI4Bharat, IIT Madras (Prof. Mitesh Khapra), with independent follow-up.',
      description: 'On Qwen2.5-Omni-3B audio, adding a layer-wise probe improved AUROC by +0.101 (95% CI +0.008 to +0.188) over a baseline built from the model’s own Yes/No scores. On LLaVA, the probe did not beat confidence, reported as a negative result.',
      codeUrl: counterpriorRepo,
      preview: { src: `${previews}/tile-counterprior.webp`, alt: 'CounterPrior research homepage introducing its evaluation of confidence and hidden-state probes.' },
    },
    preview: {
      src: `${previews}/counterprior-research.png`,
      alt: 'CounterPrior research site showing the study sections and held-out sound findings.',
    },
    caseStudy: {
      overview: 'The LLaVA image work began during my AI4Bharat internship from November 2025 to February 2026. The verified image rerun and the Gemma and Qwen audio-video experiments were independent follow-up work in November 2026.',
      problem: 'A plausible answer can come from language patterns even when the image, audio, or video provides contrary evidence. A useful evaluation has to test what changes when the input changes.',
      approach: [
        'Used absent-object questions on POPE, an object hallucination benchmark, to compare hidden-state probes with model confidence.',
        'Swapped or removed modalities in audio-video questions to test which signals influenced the answer.',
        'Compared activation steering with random-direction and shuffled-label controls, tracking recognition recall alongside false Yes answers.',
      ],
      decisions: [
        'Set the validation rules before the held-out run and separate image, audio, and video claims.',
        'Keep examples where the intervention hurts alongside examples where it helps.',
        'Release the report, controls, and example explorer with links back to evidence.',
      ],
      outcome: 'On held-out image questions, the LLaVA probe trailed model confidence and steering did not beat the controls. A Qwen sound probe added ranking signal, but the filter exceeded its preset recall-loss cap and was not shipped.',
      limitations: 'The Gemma sound and video comparisons and the Qwen video comparison were underpowered. They contained 15, 24, and 26 false Yes cases respectively, below the preregistered minimum of 40 per comparison.',
      sources: [
        { label: 'Verified release results and intervals', url: `${counterpriorRepo}/tree/v2.0-final#counterprior` },
        { label: 'Release records and scoring receipts', url: `${counterpriorRepo}/tree/v2.0-final/results/v2` },
        { label: 'Preregistered test rules', url: `${counterpriorRepo}/blob/v2.0-final/docs/PREREGISTRATION_KAGGLE.md` },
        { label: 'Matched steering controls', url: 'https://counterprior.vercel.app/ablations' },
      ],
    },
    research: {
      category: 'Model evaluation',
      title: 'Multimodal grounding',
      summary: 'Image object traps, audio-video swaps, and the controls that changed how the findings were interpreted.',
      figures: [
        {
          src: `${previews}/counterprior-research.png`,
          alt: 'CounterPrior research site with image, audio, and video sections.',
          caption: 'Research overview with findings separated by experiment.',
        },
        {
          src: `${previews}/counterprior-ablations.png`,
          alt: 'CounterPrior ablation page comparing steering with random and shuffled controls.',
          caption: 'The ablation view puts false Yes rates and recognition recall beside matched controls.',
        },
      ],
    },
  },
  {
    id: 'humanauth',
    title: 'HumanAuth',
    category: 'Identity security',
    filters: ['Computer vision', 'Applied AI'],
    tags: ['ONNX Runtime', 'Browser workers', 'Biometrics'],
    description: 'A browser prototype for face liveness, a document authenticity signal, and an enrolled-voice match, with a receipt that explains the decision.',
    repoUrl: humanAuthRepo,
    liveUrl: 'https://humanauth-id.vercel.app',
    tile: {
      preview: { src: `${previews}/tile-humanauth.webp`, alt: 'HumanAuth homepage showing on-device identity checks and a bundled sample verification receipt.' },
    },
    preview: {
      src: `${previews}/humanauth-rejection.png`,
      alt: 'HumanAuth sample session with a rejected synthetic specimen and an explanation of the document check.',
    },
    caseStudy: {
      overview: 'HumanAuth grew out of a team undergraduate project. The browser implementation runs its checks locally and shows the individual signals behind a decision.',
      problem: 'An identity flow can collect sensitive inputs and still leave a user with only a pass or fail. This prototype explores a local flow with an explanation someone can inspect.',
      approach: [
        'Run face liveness, a document check, and enrolled-speaker matching in a browser worker.',
        'Check the browser implementation against Python fixture decisions and inspect the sample flow’s network requests.',
        'Offer a fictional sample so the flow can be tried without providing personal media.',
      ],
      decisions: [
        'Keep captured media in session memory and cache model downloads separately.',
        'Include scores, decisions, timings, and model identifiers in the receipt. Exclude images and audio.',
        'Show rejection and its cause in the public sample.',
      ],
      outcome: 'The browser reproduced the Python fixture decisions. The fictional sample is rejected because the document check fails, and the receipt records the reason.',
      limitations: 'Fixture agreement checks implementation parity. The document model transferred poorly in held-out testing, the voice sample is an enrolled-speaker comparison, and the fusion threshold has not been calibrated on held-out data.',
      sources: [
        { label: 'Evidence and limits', url: 'https://humanauth-id.vercel.app/evidence' },
        { label: 'Browser worker and privacy design', url: `${humanAuthRepo}/blob/main/docs/web.md` },
        { label: 'Synthetic sample provenance', url: `${humanAuthRepo}/blob/main/bench/fixtures/synthetic-fixture-provenance.json` },
      ],
    },
  },
  {
    id: 'assessment',
    title: 'Second Read',
    category: 'Education',
    filters: ['Evaluation', 'Applied AI'],
    tags: ['FastAPI', 'OCR', 'Rubric grading'],
    description: 'A teacher-facing review tool that grades short answers against a rubric, quotes the student’s evidence, and defers uncertain marks.',
    repoUrl: secondReadRepo,
    liveUrl: 'https://secondread-grader.onrender.com',
    preview: {
      src: `${previews}/second-read-review.png`,
      alt: 'Second Read teacher review screen with a synthetic marked answer beside rubric criteria. The dry-run banner identifies scripted grading.',
    },
    caseStudy: {
      overview: 'I built Second Read for IIT Madras’s DA7016 course. The app lets a teacher review a proposed mark and its evidence next to the marked page before releasing it.',
      problem: 'Teachers need to grade short answers consistently while recognizing valid reasoning that differs from the reference answer. A useful assistant has to expose its evidence and show when it is unsure.',
      approach: [
        'Read handwritten answers with optical character recognition and score individual rubric criteria.',
        'Verify that each evidence quote appears in the answer. Use an advocate pass to look for valid missed credit.',
        'Put flagged answers first in the review queue and let the teacher change marks with a reason.',
      ],
      decisions: [
        'Require a verified answer quote before granting credit.',
        'Route low-confidence answers to the teacher and require teacher sign-off before release.',
        'Keep the public dry-run example visibly labeled as scripted grading.',
      ],
      outcome: 'On 455 held-out typed short answers from SPRAG, the final configuration reached quadratic weighted kappa* 0.723 (95% CI 0.667–0.773), versus 0.375 for the lexical baseline. *Quadratic weighted kappa measures agreement and penalizes larger differences in marks more heavily.',
      limitations: 'Agreement was lower on the small handwritten classroom set, which used one teacher as reference. Demo screenshots show a synthetic answer and scripted dry-run marks.',
      sources: [
        { label: 'Evaluation numbers and limitations', url: `${secondReadRepo}/blob/main/docs/report/numbers.md` },
        { label: 'Robustness and failure cases', url: `${secondReadRepo}/tree/main/results/robustness` },
        { label: 'Review screen from the synthetic demo', url: `${secondReadRepo}/blob/main/docs/images/review.png` },
      ],
    },
  },
  {
    id: 'spikes',
    title: 'SPIKES',
    category: 'Health technology',
    filters: ['Applied AI'],
    tags: ['Time series', 'CGM', 'FastAPI'],
    description: 'A clinician-dashboard prototype that flags glucose events in continuous monitoring data and puts them alongside lifestyle logs.',
    repoUrl: spikesRepo,
    tile: {
      context: '1st place, HealthTech AI Hackathon, University of Birmingham, Mar 2026',
      description: 'A clinician tool that finds glucose spikes and dips over 14 days of CGM data and links them to six lifestyle pillars.',
      update: 'Now being tested with [HEALTH PARTNER] on 800+ patients, with the aim of contributing to [REGIONAL HEALTH BODY].',
      note: 'Interface not shown. Built on the organisers’ synthetic data.',
      codeUrl: spikesRepo,
      preview: { src: `${previews}/spikes-cover.webp`, alt: 'SPIKES project cover for the HealthTech AI Hackathon at the University of Birmingham.' },
    },
    caseStudy: {
      overview: 'Our team built SPIKES for the University of Birmingham HealthTech AI Hackathon. The prototype turns a continuous glucose monitor trace and lifestyle logs into a dashboard someone can review.',
      problem: 'A long glucose trace is hard to scan for recurring spikes or dips. A review tool needs to point to the underlying measurements so an analyst can investigate a flagged event.',
      approach: [
        'Smooth noisy glucose traces and label spikes and dips using event thresholds.',
        'Plot events against daily glucose patterns and self-reported lifestyle measures.',
        'Provide a React dashboard and FastAPI service for reviewing the underlying traces.',
      ],
      decisions: [
        'Keep detected events tied to their time windows and source values.',
        'Show lifestyle correlations as leads for review. Establishing causality would require separate evidence.',
      ],
      outcome: 'The project won the University of Birmingham HealthTech AI Hackathon. The repository contains the dashboard and local run instructions.',
      limitations: 'The public materials document a hackathon prototype. Clinical validation and use in patient care are outside the published evidence.',
      sources: [
        { label: 'Hackathon project and architecture', url: spikesRepo },
      ],
    },
  },
  {
    id: 'esg',
    title: 'Transparent ESG Intelligence',
    category: 'Sustainability analytics',
    filters: ['Applied AI'],
    tags: ['TypeScript', 'Gemini', 'Evidence grounding'],
    description: 'An analyst prototype that compares sustainability claims with peer benchmarks and financial evidence, then shows the sources behind each finding.',
    repoUrl: esgRepo,
    tile: {
      context: 'Winner, Maxwell Data Challenge, Imperial College London, Jun 2026',
      description: 'An ESG analyst copilot that compares company materiality scores against peer and FTSE 100 benchmarks and sends missing evidence to human review.',
      update: 'Maxwell is now building versions of it for its clients, including [CLIENT NAMES].',
      note: 'Interface not shown. Built on the organisers’ synthetic data.',
      codeUrl: esgRepo,
      preview: { src: `${previews}/esg-cover.webp`, alt: 'Transparent ESG Intelligence project cover for the Maxwell Data Challenge at Imperial College London.' },
    },
    caseStudy: {
      overview: 'The project was developed for the Maxwell Data Challenge at Imperial College London. It connects company sustainability disclosures to peer benchmarks and financial measures in an analyst-facing dashboard.',
      problem: 'Company reports, sector expectations, and investment figures may tell different stories. Analysts need to see those differences and trace them to the underlying evidence.',
      approach: [
        'Compare reported commitments with sector baselines and observed financial measures.',
        'Compute the comparison in TypeScript and use Gemini to explain the available evidence.',
        'Surface provenance and flag ambiguous claims for human review.',
      ],
      decisions: [
        'Separate metric calculations from generated explanations so the source of a number stays inspectable.',
        'Expose the public architecture while keeping proprietary competition inputs out of the portfolio.',
      ],
      outcome: 'The project won the Maxwell Data Challenge. The public repository documents the architecture and local interface.',
      limitations: 'The public materials omit or sanitize proprietary weights, institutional benchmarks, and private datasets. The portfolio presents only the public description and code.',
      sources: [
        { label: 'Public architecture and confidentiality note', url: esgRepo },
      ],
    },
  },
];
