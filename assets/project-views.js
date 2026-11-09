import { projectContent } from './project-content.js';

const iconPaths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  external: '<path d="M13 5h6v6m0-6-8 8"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  expand: '<path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/>',
};

const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
const archive = projectContent.filter(project => project.research);
const projectById = new Map(projectContent.map(project => [project.id, project]));
const filtersFor = project => project.filters?.length ? project.filters : [project.category];
const filters = ['Applied AI', 'Evaluation'];
let selectedFilter = '';
const tileOrder = { visurex: 0, counterprior: 1, assessment: 2, humanauth: 3, esg: 4, spikes: 5 };
projectContent.sort((a, b) => (tileOrder[a.id] ?? 6) - (tileOrder[b.id] ?? 6));
const projectTiles = projectContent;

function workTags(tags) {
  return `<ul class="work-tags" aria-label="Project topics">${tags.map(tag => `<li>${escapeHTML(tag)}</li>`).join('')}</ul>`;
}

function workLink(href, label, { symbol = null, external = false, primary = false } = {}) {
  if (!href) return '';
  return `<a class="work-link${primary ? ' work-link-primary' : ''}" href="${escapeHTML(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${primary ? '<span class="work-live-dot" aria-hidden="true"></span>' : ''}${label}${symbol ? icon(symbol) : ''}</a>`;
}

function card(project) {
  const href = `#projects/${project.id}`;
  const tile = project.tile ?? {};
  const preview = tile.preview ?? project.preview;
  const media = preview
    ? `<img src="${escapeHTML(preview.src)}" alt="${escapeHTML(preview.alt ?? '')}" loading="lazy" decoding="async">`
    : `<span class="work-preview-label"><span>${escapeHTML(project.category)}</span><strong>${escapeHTML(project.title)}</strong></span>`;
  return `<article class="work-card" data-work-card="${escapeHTML(project.id)}"${selectedFilter && !filtersFor(project).includes(selectedFilter) ? ' hidden' : ''}>
    <a class="work-card-media" href="${href}" aria-label="Open ${escapeHTML(project.title)} case study">${media}</a>
    <div class="work-card-body">
      <h2>${escapeHTML(tile.title ?? project.title)}</h2>
      ${tile.tagline ? `<p><strong>${escapeHTML(tile.tagline)}</strong></p>` : ''}
      ${tile.context ? `<p><small>${escapeHTML(tile.context)}</small></p>` : ''}
      <p>${escapeHTML(tile.description ?? project.description)}</p>
      ${tile.update ? `<p>${escapeHTML(tile.update)}</p>` : ''}
      ${tile.note ? `<p><small>${escapeHTML(tile.note)}</small></p>` : ''}
      ${workTags(project.tags)}
      <div class="work-actions">
        ${workLink(project.liveUrl, 'Live demo', { external: true, primary: true })}
        ${workLink(tile.codeUrl, 'Code', { external: true, symbol: null })}
        ${workLink(href, 'Case study')}
      </div>
    </div>
  </article>`;
}

function filterCount(filter) {
  return filter ? projectContent.filter(project => filtersFor(project).includes(filter)).length : projectContent.length;
}

function filterStatus(filter) {
  const count = filterCount(filter);
  return `${count} ${count === 1 ? 'project' : 'projects'} shown`;
}

function projectIndex() {
  const pills = ['', ...filters].map(filter => `<button class="work-filter" type="button" data-work-filter="${escapeHTML(filter)}" aria-pressed="${filter === selectedFilter}" aria-controls="work-project-list">${escapeHTML(filter || 'All')} <span>${filterCount(filter)}</span></button>`);
  return `<div class="work-view work-index">
    <header class="work-heading">
      <h1>Projects</h1>
      <p>Working tools and research in quality inspection, model evaluation, identity checks, grading, health and ESG.</p>
    </header>
    <div class="work-filters" role="group" aria-label="Filter projects">${pills.join('')}</div>
    <p class="work-status" data-work-status role="status">${filterStatus(selectedFilter)}</p>
    <div class="work-list" id="work-project-list">${projectTiles.map(card).join('')}</div>
  </div>`;
}

function detailSection(title, text) {
  if (!text?.length) return '';
  const body = Array.isArray(text)
    ? `<ul>${text.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`
    : `<p>${escapeHTML(text)}</p>`;
  return `<section class="work-detail-section"><h2>${title}</h2><div>${body}</div></section>`;
}

function studyBody(study) {
  const sources = study.sources?.length
    ? `<section class="work-detail-section"><h2>Sources</h2><ul class="work-sources">${study.sources.map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.label)}${icon('external')}</a></li>`).join('')}</ul></section>`
    : '';
  return [
    detailSection('Overview', study.overview),
    detailSection('The problem', study.problem),
    detailSection('Approach', study.approach),
    detailSection('Key decisions', study.decisions),
    detailSection('Outcome', study.outcome),
    detailSection('Technical details', study.technical),
    detailSection('Limitations', study.limitations),
    sources,
  ].join('');
}

function projectLinks(project) {
  return `<div class="work-actions">
    ${workLink(project.liveUrl, 'Live demo', { external: true, primary: true })}
    ${workLink(project.repoUrl, 'Code', { external: true })}
  </div>`;
}

function projectDetail(project) {
  const index = projectContent.indexOf(project);
  const previous = projectContent[index - 1];
  const next = projectContent[index + 1];
  const media = project.preview
    ? `<figure class="work-study-preview"><img src="${escapeHTML(project.preview.src)}" alt="${escapeHTML(project.preview.alt)}" decoding="async"></figure>`
    : '';
  return `<article class="work-view work-study">
    <a class="work-back" href="#projects">${icon('back')} All projects</a>
    <header class="work-heading">
      <div class="work-kicker"><span>Case study</span>${workTags(project.tags)}</div>
      <h1>${escapeHTML(project.title)}</h1>
      ${project.tile?.tagline ? `<p class="work-result"><strong>${escapeHTML(project.tile.tagline)}</strong></p>` : ''}
      <p>${escapeHTML(project.description)}</p>
      ${projectLinks(project)}
    </header>
    ${media}
    <div class="work-study-body">${studyBody(project.caseStudy)}</div>
    <div class="work-sequence" role="navigation" aria-label="Other case studies">
      ${previous ? `<a href="#projects/${previous.id}"><span>${icon('back')} Previous case study</span><strong>${escapeHTML(previous.title)}</strong></a>` : ''}
      ${next ? `<a href="#projects/${next.id}"><span>Next case study ${icon('arrow')}</span><strong>${escapeHTML(next.title)}</strong></a>` : ''}
    </div>
  </article>`;
}

function researchFigures(project) {
  if (project.research.figures?.length) return project.research.figures;
  return project.preview ? [project.preview] : [];
}

function researchIndex() {
  return `<div class="work-view work-archive">
    <header class="work-heading">
      <h1>Research</h1>
      <p>Figures, screenshots and evaluation notes from the projects.</p>
    </header>
    <div class="work-folder-grid">${archive.map(project => {
      const figures = researchFigures(project);
      const sheets = [figures[1], figures[0]].map(figure => `<span class="work-folder-sheet">${figure
        ? `<img src="${escapeHTML(figure.src)}" alt="" loading="lazy" decoding="async">`
        : `<span>${escapeHTML(project.title)}</span>`
      }</span>`).join('');
      return `<a class="work-folder" href="#research/${project.id}" aria-label="Open ${escapeHTML(project.research.title)} folder">
        <span class="work-folder-sheets" aria-hidden="true">${sheets}</span>
        <span class="work-folder-front">
          <strong>${escapeHTML(project.research.category)}</strong>
          <span>${escapeHTML(project.title)}</span>
          <span class="work-folder-icons" aria-hidden="true">${icon('folder')}${icon('arrow')}</span>
        </span>
      </a>`;
    }).join('')}</div>
  </div>`;
}

function researchDetail(project) {
  const figures = researchFigures(project);
  const gallery = figures.length ? `<section class="work-gallery-section">
    <h2>Figures and screenshots</h2>
    <div class="work-gallery">${figures.map(figure => `<figure>
      <button type="button" data-work-image aria-label="Enlarge image: ${escapeHTML(figure.alt)}">
        <img src="${escapeHTML(figure.src)}" alt="${escapeHTML(figure.alt)}" loading="lazy" decoding="async">${icon('expand')}
      </button>
      ${figure.caption ? `<figcaption>${escapeHTML(figure.caption)}</figcaption>` : ''}
    </figure>`).join('')}</div>
    <dialog class="work-lightbox" aria-label="Research image preview">
      <form method="dialog"><button type="submit" aria-label="Close image preview">${icon('close')}</button></form>
      <img alt="">
    </dialog>
  </section>` : '';
  return `<article class="work-view work-gallery-page">
    <a class="work-back" href="#research">${icon('back')} All research</a>
    <header class="work-heading">
      <div class="work-kicker"><span>${escapeHTML(project.research.category)}</span></div>
      <h1>${escapeHTML(project.research.title)}</h1>
      <p>${escapeHTML(project.research.summary)}</p>
      ${projectLinks(project)}
    </header>
    ${gallery}
    <div class="work-study-body">${studyBody(project.caseStudy)}</div>
  </article>`;
}

export function renderWorkView(route) {
  if (route === 'projects') return projectIndex();
  if (route === 'research') return researchIndex();
  const [view, id, extra] = route.split('/');
  if (extra !== undefined) return null;
  const project = projectById.get(id);
  if (view === 'projects' && project) return projectDetail(project);
  if (view === 'research' && project?.research) return researchDetail(project);
  return null;
}

export function bindWorkView(main) {
  const buttons = [...main.querySelectorAll('[data-work-filter]')];
  const cards = [...main.querySelectorAll('[data-work-card]')];
  const status = main.querySelector('[data-work-status]');
  for (const button of buttons) {
    button.addEventListener('click', () => {
      selectedFilter = button.dataset.workFilter;
      for (const filter of buttons) filter.setAttribute('aria-pressed', String(filter === button));
      for (const card of cards) {
        const project = projectById.get(card.dataset.workCard);
        card.hidden = Boolean(selectedFilter && !filtersFor(project).includes(selectedFilter));
      }
      status.textContent = filterStatus(selectedFilter);
    });
  }

  const dialog = main.querySelector('.work-lightbox');
  if (!dialog) return;
  const preview = dialog.querySelector('img');
  for (const trigger of main.querySelectorAll('[data-work-image]')) {
    trigger.addEventListener('click', () => {
      const image = trigger.querySelector('img');
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt;
      dialog.showModal();
    });
  }
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}
