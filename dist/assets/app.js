import { profile, experience, education, achievements } from './data.js';
import { renderWorkView, bindWorkView } from './project-views.js';
import { renderNotes, bindNotes } from './notes.js';

const paths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  external: '<path d="M7 17 17 7M7 7h10v10"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/>',
  github: '<path d="M9 19c-4.3 1.3-4.3-2.2-6-2.6M15 22v-3.7a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.9A5.4 5.4 0 0 0 18.7 5a5 5 0 0 0-.1-3.8s-1.2-.4-4 1.5a13.7 13.7 0 0 0-7.2 0c-2.8-1.9-4-1.5-4-1.5A5 5 0 0 0 3.3 5a5.4 5.4 0 0 0-1.5 3.9c0 5.4 3.1 6.6 6.1 6.9a3.2 3.2 0 0 0-.9 2.5V22" transform="translate(1 0) scale(.95)"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/>',
  verified: '<path d="m12 2 3 2 3.5.5.7 3.5 1.8 3-1.8 3-.7 3.5L15 18l-3 2-3-2-3.5-.5-.7-3.5L3 11l1.8-3 .7-3.5L9 4Z" fill="currentColor" fill-opacity=".12"/><path d="m8 11 2.5 2.5L16 8"/>',
};
const icon = name => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tagList = tags => `<div class="tags">${tags.map(x => `<span class="tag">${escapeHTML(x)}</span>`).join('')}</div>`;
const main = document.querySelector('main');
const themeToggle = document.querySelector('.theme-toggle');
const themeThumb = themeToggle.querySelector('.theme-thumb');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let typingTimer;
let renderGeneration = 0;
let activityPromise;

function socialLinks() {
  return `<div class="social-links"><a href="${profile.github}" target="_blank" rel="noopener noreferrer">${icon('github')} GitHub</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')} LinkedIn</a></div>`;
}

function experienceCards() {
  return `<div class="dashed-card experience-list">${experience.map(item => `<details><summary><div class="experience-main"><img class="institution-logo" src="/assets/institutions/${item.logo}" alt="${escapeHTML(item.company)} logo"><div><h3>${escapeHTML(item.company)}</h3><p>${escapeHTML(item.role)} · ${escapeHTML(item.location)}</p></div></div><div class="experience-period">${item.period}${icon('chevron')}</div></summary><div class="experience-body"><p>${escapeHTML(item.description)}</p><ul>${item.points.map(point => `<li>${escapeHTML(point)}</li>`).join('')}</ul>${tagList(item.tools)}</div></details>`).join('')}</div>`;
}

function educationCards() {
  return `<div class="dashed-card">${education.map(item => `<a class="education-row" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.logo === 'birmingham.png' ? `<span class="institution-logo-frame"><img src="/assets/institutions/${item.logo}" alt="${escapeHTML(item.school)} logo"></span>` : `<img class="institution-logo ${item.logo === 'dsu.png' ? 'dsu' : ''}" src="/assets/institutions/${item.logo}" alt="${escapeHTML(item.school)} logo">`}<div class="education-info"><h3>${item.school}</h3><p>${item.degree}</p></div><span class="education-period">${item.period}</span></a>`).join('')}</div>`;
}

function techStrip() {
  const pills = profile.skills.map(([name, slug, color]) => `<span class="tech-pill"><span class="tech-mark" style="color:${color}"><img src="/assets/tech/${slug}.svg" alt="" loading="lazy"></span>${name}</span>`).join('');
  return `<div class="marquee-viewport"><div class="marquee-track"><div style="display:flex;gap:24px">${pills}</div><div class="duplicate" aria-hidden="true" style="display:flex;gap:24px">${pills}</div></div></div>`;
}

function achievementCards() {
  return `<div class="dashed-card achievements-list">${achievements.map(item => `<article class="achievement-row"><div class="achievement-heading"><span class="achievement-result">${escapeHTML(item.result)}</span><span class="achievement-year">${item.year}</span></div><h3>${escapeHTML(item.title)}</h3><p class="achievement-organization">${escapeHTML(item.organization)}</p><p class="achievement-description">${escapeHTML(item.description)}</p></article>`).join('')}</div>`;
}

function currentAge() {
  const today = new Date(), birth = new Date(profile.birthDate + 'T00:00:00+05:30');
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
  return age;
}

function homePage() {
  return `<div class="home-shell"><div class="home-frame">
    <div class="hero reveal"><div class="banner"><video class="video-light" data-src="/assets/winter-light.mp4" poster="/assets/winter-light-poster.jpg" preload="metadata" loop muted playsinline aria-label="Winter landscape with falling snow"></video><video class="video-dark" data-src="/assets/winter-dark.mp4" poster="/assets/winter-dark-poster.jpg" preload="metadata" loop muted playsinline aria-label="Winter landscape at night"></video></div><button class="avatar-wrap" type="button" aria-label="Animate portrait"><img src="/assets/profile.png" alt="Basavaraj's abstract profile artwork" width="112" height="112"></button><div class="hero-actions"><a class="pill primary" href="#projects">View Projects ${icon('arrow')}</a><a class="pill light" href="#research">View Research ${icon('arrow')}</a></div></div>
    <section class="identity reveal"><div class="name-line"><h1>${profile.name}</h1><span class="verified" title="Personal profile">${icon('verified')}</span></div><div class="role-line"><span id="typed-role">AI Researcher</span><span class="typing-caret" aria-hidden="true"></span></div><p class="location">${currentAge()}, India</p></section>
    <section class="home-section"><h2>Winter Arc</h2><p class="calendar-context">Public GitHub activity · 90-day snapshot</p><div class="dashed-card activity-card" id="winter-calendar"><p class="load-error">Loading GitHub activity…</p></div></section>
    <section class="home-section"><h2>Who is Basavaraj?</h2><div class="body-copy"><p>TL;DR learned by hacking around on the internet.</p><p>I work on <strong>computer vision, multimodal language models, and reliable AI systems</strong>. From probing where a model starts to hallucinate to building a defect-detection pipeline, I like work that connects <strong>understanding how things work with making them useful</strong>.</p><p>I'm an <strong>AI Research Intern at the Walmart Center for Tech Excellence</strong> and a Master's student in <strong>Data Science and AI at IIT Madras</strong>, with an exchange semester at the University of Birmingham. Previously, I worked on multimodal hallucinations at <strong>AI4Bharat</strong>.</p><p class="quote">“The best way to predict the future is to invent it.” — Alan Kay</p></div></section>
    <section class="home-section"><h2>Tech Stack</h2>${techStrip()}</section>
    <section class="home-section"><h2>Research & Engineering</h2><div class="dashed-card callout"><p>My work spans model evaluation, computer vision, grounded LLM systems, and AI agents. I build pipelines and evaluations that make model behaviour easier to inspect and understand.</p><a class="pill light" href="#projects">View Projects ${icon('arrow')}</a></div></section>
    <section class="home-section"><h2>Experience</h2>${experienceCards()}</section>
    <section class="home-section"><h2>Education</h2>${educationCards()}</section>
    <section class="home-section" id="achievements"><h2>Achievements</h2>${achievementCards()}</section>
    <section class="home-section"><h2>GitHub Activity</h2><div class="dashed-card activity-card" id="github-calendar"><p class="load-error">Loading GitHub activity…</p></div></section>
    <section class="home-section" aria-label="Social profiles">${socialLinks()}</section>
  </div></div>`;
}

function contactPage() {
  return `<section class="contact-view">
    <div class="contact-form-card">
      <h1>Send a Message</h1>
      <p class="extras-intro">For research conversations, engineering opportunities, or questions about a project, write a note and open it in your email app.</p>
      <form class="contact-form">
        <label>Name <input name="name" autocomplete="name" required maxlength="80"></label>
        <label>Email <input name="email" type="email" autocomplete="email" required maxlength="120"></label>
        <label>Message <textarea name="message" required maxlength="1000" rows="5"></textarea></label>
        <button class="pill light" type="submit">Open email draft ${icon('arrow')}</button>
        <p class="contact-status" role="status"></p>
      </form>
    </div>
    <div class="contact-socials">
      <p>Or reach me directly</p>
      ${socialLinks()}
      <a class="contact-email" href="mailto:${profile.email}">${profile.email}</a>
    </div>
  </section>`;
}

function bindContact() {
  const form = main.querySelector('.contact-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${fields.get('name')}`);
    const body = encodeURIComponent(`${fields.get('message')}\n\nFrom ${fields.get('name')} (${fields.get('email')})`);
    form.querySelector('.contact-status').textContent = 'Finish and send the draft in your email app.';
    location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  });
}

function setTheme(theme, remember = false) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark', dark);
  if (remember) {
    try { localStorage.setItem('basavaraj-palak-theme', theme); } catch {}
  }
  themeThumb.innerHTML = icon(dark ? 'moon' : 'sun');
  themeToggle.setAttribute('aria-pressed', String(dark));
  main.querySelectorAll('.banner video').forEach(video => {
    const visible = video.classList.contains(dark ? 'video-dark' : 'video-light');
    if (visible && !video.hasAttribute('src')) video.src = video.dataset.src;
    if (reduceMotion.matches || !visible) video.pause();
    else video.play().catch(() => {});
  });
}

function typeRoles() {
  clearTimeout(typingTimer);
  if (reduceMotion.matches) return;
  let roleIndex = 0, length = profile.roles[0].length, deleting = true;
  const tick = () => {
    const target = document.querySelector('#typed-role');
    if (!target) return;
    const word = profile.roles[roleIndex];
    length += deleting ? -1 : 1;
    target.textContent = word.slice(0, Math.max(length, 0));
    let delay = deleting ? 45 : 95;
    if (length <= 0) { deleting = false; roleIndex = (roleIndex + 1) % profile.roles.length; delay = 300; }
    else if (length === word.length && !deleting) { deleting = true; delay = 1800; }
    typingTimer = setTimeout(tick, delay);
  };
  typingTimer = setTimeout(tick, 1800);
}

function loadActivity() {
  activityPromise ||= fetch('/assets/github-activity.json').then(response => {
    if (!response.ok) throw new Error('Activity unavailable');
    return response.json();
  }).then(data => data.data.user.contributionsCollection.contributionCalendar);
  return activityPromise;
}

async function renderCalendars(generation) {
  try {
    const calendar = await loadActivity();
    if (generation !== renderGeneration) return;
    const days = calendar.weeks.flatMap(week => week.contributionDays);
    const latest = days.slice(-90);
    const level = count => count > 12 ? 4 : count > 6 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0;
    const cell = (day, winter = false) => `<span class="heat-cell ${winter ? (day.contributionCount ? 'active' : '') : 'l' + level(day.contributionCount)}" data-tooltip="${day.contributionCount} contributions on ${day.date}" title="${day.contributionCount} contributions on ${day.date}"></span>`;
    const legend = '<span class="legend">Less <i></i><i></i> More</span>';
    document.querySelector('#winter-calendar').innerHTML = `<div class="calendar-overflow"><div class="winter-grid">${latest.map(day => cell(day, true)).join('')}</div></div><div class="calendar-footer"><span>${latest.filter(day => day.contributionCount > 0).length} / ${latest.length} days building</span>${legend}</div>`;
    const winterScroll = document.querySelector('#winter-calendar .calendar-overflow');
    winterScroll.scrollLeft = winterScroll.scrollWidth;
    const months = [];
    for (const day of days) { const label = new Date(day.date + 'T12:00:00Z').toLocaleString('en', { month: 'short', timeZone: 'UTC' }); if (months.at(-1) !== label) months.push(label); }
    document.querySelector('#github-calendar').innerHTML = `<div class="calendar-overflow"><div class="month-labels">${months.map(month => `<span>${month}</span>`).join('')}</div><div class="github-grid">${days.map(day => cell(day)).join('')}</div></div><div class="calendar-footer"><a href="${profile.github}" target="_blank" rel="noopener noreferrer">${calendar.totalContributions.toLocaleString()} contributions in the last year</a>${legend}</div><p style="color:var(--muted);font-size:10px;margin-top:10px">Snapshot through ${days.at(-1).date}</p>`;
  } catch {
    if (generation !== renderGeneration) return;
    for (const id of ['winter-calendar', 'github-calendar']) document.querySelector('#' + id).innerHTML = `<p class="load-error">Activity is unavailable. <a href="${profile.github}" target="_blank" rel="noopener noreferrer">View my GitHub profile instead.</a></p>`;
  }
}

function render(event) {
  clearTimeout(typingTimer);
  const route = location.hash.slice(1);
  const workView = renderWorkView(route);
  const notesView = renderNotes(route);
  const section = workView || notesView ? route.split('/')[0] : route === 'contact' ? 'contact' : 'home';
  const generation = ++renderGeneration;

  main.innerHTML = workView ?? notesView ?? (section === 'contact' ? contactPage() : homePage());
  const heading = main.querySelector('h1');
  document.title = section === 'home' || !heading ? profile.name : `${heading.textContent} | ${profile.name}`;
  for (const link of document.querySelectorAll('[data-route]')) {
    const active = link.dataset.route === section;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  if (workView) bindWorkView(main);
  if (notesView) bindNotes(main);
  if (section === 'contact') bindContact();
  if (section === 'home') {
    typeRoles();
    renderCalendars(generation);
    setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');
    const rows = main.querySelectorAll('.experience-list details');
    for (const row of rows) {
      row.addEventListener('toggle', () => {
        if (row.open) for (const other of rows) if (other !== row) other.open = false;
      });
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (event && heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus({ preventScroll: true });
  main.scrollIntoView({ behavior: 'instant' });
});
themeToggle.addEventListener('click', () => {
  setTheme(document.body.classList.contains('dark') ? 'light' : 'dark', true);
});
reduceMotion.addEventListener('change', () => {
  const typedRole = main.querySelector('#typed-role');
  if (typedRole) {
    clearTimeout(typingTimer);
    typedRole.textContent = profile.roles[0];
    typeRoles();
  }
  setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');
});
let initialTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try {
  const saved = localStorage.getItem('basavaraj-palak-theme');
  if (saved === 'dark' || saved === 'light') initialTheme = saved;
} catch {}
setTheme(initialTheme);
window.addEventListener('hashchange', render);
render();
