const notes = [
  {
    id: 'counterprior-controls',
    category: 'Evaluation',
    title: 'A probe needs a confidence baseline',
    description: 'What CounterPrior’s image and audio-video evaluations can tell us about grounding.',
    sections: [
      ['The question', 'A correct answer can come from the input or from a prior. CounterPrior uses object questions, input swaps, and probes of model states to separate some of those possibilities.'],
      ['What the controls showed', 'In the verified image evaluation, the probe did not outperform the model’s confidence baseline, and steering did not beat the controls. The audio and video follow-ups were independent work, with limited samples in several conditions.'],
      ['What to look for', 'Read the split, baseline, and uncertainty together. A probe that separates some correct and incorrect answers does not by itself establish that a model used the right input.'],
    ],
    source: 'https://github.com/basavarajnaduvinamani/DA5410-Winter-Project/tree/v2.0-final',
    project: 'counterprior',
  },
  {
    id: 'humanauth-browser',
    category: 'Engineering',
    title: 'What HumanAuth keeps in the browser',
    description: 'How the browser prototype separates model downloads from camera, document, and audio inputs.',
    sections: [
      ['The worker boundary', 'The browser app sends inputs to a local worker for decoding and inference. Model files are downloaded and cached separately. The app keeps input media and results in session memory.'],
      ['What the evidence covers', 'The public evidence records the tested sample flows and parity checks. Those checks describe the prototype in the evaluated setup. They do not establish fraud-detection accuracy for real-world identity documents.'],
    ],
    source: 'https://humanauth-id.vercel.app/evidence',
    project: 'humanauth',
  },
  {
    id: 'second-read-review',
    category: 'Evaluation',
    title: 'Why Second Read keeps a teacher in the loop',
    description: 'How a rubric-based grader handles evidence, review, and release.',
    sections: [
      ['Make the mark inspectable', 'Second Read associates each rubric judgement with evidence from the student’s answer. The review view puts the rubric decision and the marked answer sheet next to each other.'],
      ['Keep the review queue', 'Uncertain answers go to the teacher, who can review the evidence, change a mark, and countersign release. The public evaluation reports lower agreement on handwritten sheets than on the typed benchmark, which makes that review step important.'],
    ],
    source: 'https://github.com/basavarajnaduvinamani/DA7016_Auto_Assessment_System/blob/main/docs/evaluation.md',
    project: 'assessment',
  },
];

const filters = ['All', 'Evaluation', 'Engineering'];
const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const external = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>';
let selectedFilter = 'All';

function noteCards() {
  return notes.filter(note => selectedFilter === 'All' || note.category === selectedFilter).map(note => `
    <a class="note-row" href="#notes/${note.id}">
      <span class="note-category">${note.category}</span>
      <h2>${note.title}</h2>
      <p>${note.description}</p>
      <span class="note-read">Read note ${arrow}</span>
    </a>`).join('');
}

function notesIndex() {
  return `<section class="notes-shell">
    <h1>Notes</h1>
    <p class="extras-intro">Short notes on how the projects work and what their evaluations show.</p>
    <div class="note-filters" role="group" aria-label="Filter notes">
      ${filters.map(filter => `<button type="button" data-note-filter="${filter}" aria-pressed="${filter === selectedFilter}">${filter} <span>${filter === 'All' ? notes.length : notes.filter(note => note.category === filter).length}</span></button>`).join('')}
    </div>
    <div class="notes-list" aria-live="polite">${noteCards()}</div>
  </section>`;
}

export function renderNotes(route) {
  if (route === 'notes') return notesIndex();
  const note = notes.find(item => route === `notes/${item.id}`);
  if (!note) return null;

  return `<article class="notes-shell note-article">
    <a class="note-back" href="#notes">${arrow} All notes</a>
    <p class="note-category">${note.category}</p>
    <h1>${note.title}</h1>
    <p class="extras-intro">${note.description}</p>
    ${note.sections.map(([title, body]) => `<section><h2>${title}</h2><p>${body}</p></section>`).join('')}
    <div class="note-links">
      <a class="pill primary" href="${note.source}" target="_blank" rel="noopener noreferrer">Read the source ${external}</a>
      <a class="pill light" href="#projects/${note.project}">View case study ${arrow}</a>
    </div>
  </article>`;
}

export function bindNotes(main) {
  const list = main.querySelector('.notes-list');
  if (!list) return;

  const buttons = [...main.querySelectorAll('[data-note-filter]')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      selectedFilter = button.dataset.noteFilter;
      for (const filter of buttons) {
        filter.setAttribute('aria-pressed', String(filter === button));
      }
      list.innerHTML = noteCards();
    });
  }
}
