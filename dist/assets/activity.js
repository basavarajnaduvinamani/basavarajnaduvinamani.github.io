const publicCalendar = 'https://github-contributions-api.jogruber.de/v4/basavarajnaduvinamani?y=last';
const savedCalendar = '/assets/github-activity.json';
const dayMs = 86_400_000;
const dayFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' });
const winterStart = Date.UTC(2026, 9, 1);
const winterLength = 90;
export const winterPeriod = dayFormat.formatRange(winterStart, winterStart + (winterLength - 1) * dayMs);
let calendarRequest;

async function readCalendar(url) {
  const response = await fetch(url, { cache: 'no-cache', signal: AbortSignal.timeout(4500) });
  if (!response.ok) throw new Error('Contribution calendar unavailable');
  const { contributions } = await response.json();
  if (!Array.isArray(contributions) || ![365, 366].includes(contributions.length)) {
    throw new Error('Incomplete contribution calendar');
  }

  const first = Date.parse(contributions[0]?.date);
  const complete = Number.isFinite(first) && contributions.every((day, index) =>
    day?.date === new Date(first + index * dayMs).toISOString().slice(0, 10) &&
    Number.isSafeInteger(day.count) && day.count >= 0 &&
    Number.isInteger(day.level) && day.level >= 0 && day.level <= 4
  );
  if (!complete) throw new Error('Invalid contribution days');
  return contributions;
}

async function loadCalendar() {
  const [publicResult, savedResult] = await Promise.allSettled([
    readCalendar(publicCalendar),
    readCalendar(savedCalendar),
  ]);
  const current = publicResult.status === 'fulfilled' ? publicResult.value : null;
  const saved = savedResult.status === 'fulfilled' ? savedResult.value : null;

  if (current && (!saved || current.at(-1).date >= saved.at(-1).date)) {
    return { days: current, source: 'public' };
  }
  return saved ? { days: saved, source: 'saved' } : null;
}

function cell(day, selected, winter = false) {
  const level = winter ? (day.count > 0 ? 4 : 0) : day.level;
  const count = day.count === null ? 'No GitHub data' : `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`;
  const label = `${dayFormat.format(new Date(day.date))} · ${count}`;
  return `<button type="button" class="heat-cell l${level}${day.count === null ? ' activity-unrecorded' : ''}" tabindex="${selected ? 0 : -1}" aria-label="${label}"></button>`;
}

function legend(levels) {
  return `<span class="calendar-legend" aria-hidden="true">Less ${levels.map(level => `<i class="l${level}"></i>`).join('')} More</span>`;
}

function footer(summary, levels, latest, source) {
  const provenance = source === 'saved' ? 'Saved snapshot through' : 'GitHub calendar through';
  return `<div class="calendar-footer"><span>${summary}</span>${legend(levels)}</div>
    <p class="calendar-date">${provenance} ${dayFormat.format(new Date(latest))}</p>
    <p class="calendar-day-detail" role="status"></p>`;
}

function renderWinter(card, days, source) {
  const byDate = new Map(days.map(day => [day.date, day]));
  const windowDays = Array.from({ length: winterLength }, (_, index) => {
    const date = new Date(winterStart + index * dayMs).toISOString().slice(0, 10);
    return byDate.get(date) ?? { date, count: null };
  });
  const active = windowDays.filter(day => day.count > 0).length;
  const selected = Math.max(0, windowDays.findLastIndex(day => day.count !== null));
  card.innerHTML = `<div class="calendar-overflow">
    <div class="winter-grid" role="group" aria-label="Winter Arc, ${winterPeriod}">${windowDays.map((day, index) => cell(day, index === selected, true)).join('')}</div>
    </div>${footer(`${active} / ${winterLength} active days`, [0, 4], days.at(-1).date, source)}`;
}

function renderYear(card, days, source, profileUrl) {
  const offset = new Date(days[0].date).getUTCDay();
  const columns = Math.ceil((offset + days.length) / 7);
  const months = days.flatMap((day, index) => {
    if (!day.date.endsWith('-01')) return [];
    const column = Math.floor((index + offset) / 7) + 1;
    return `<span style="grid-column:${column}">${monthFormat.format(new Date(day.date))}</span>`;
  });
  const leading = '<span aria-hidden="true"></span>'.repeat(offset);
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const summary = `<a href="${profileUrl}" target="_blank" rel="noopener noreferrer">${total.toLocaleString('en')} contributions in the last year</a>`;
  card.innerHTML = `<div class="calendar-overflow">
    <div class="calendar-year" style="--calendar-columns:${columns}">
      <div class="month-labels" aria-hidden="true">${months.join('')}</div>
      <div class="github-grid" role="group" aria-label="Last year of GitHub activity">${leading}${days.map((day, index) => cell(day, index === days.length - 1)).join('')}</div>
    </div>
    </div>${footer(summary, [0, 1, 2, 3, 4], days.at(-1).date, source)}`;
}

function bindCalendar(card) {
  const scroll = card.querySelector('.calendar-overflow');
  const grid = scroll.querySelector('[role="group"]');
  const cells = [...grid.querySelectorAll('.heat-cell')];
  const detail = card.querySelector('.calendar-day-detail');
  let current = grid.querySelector('[tabindex="0"]');
  scroll.scrollLeft = current.getBoundingClientRect().right - scroll.getBoundingClientRect().right;

  function select(button) {
    if (!button.matches('.heat-cell')) return;
    current.tabIndex = -1;
    current = button;
    current.tabIndex = 0;
    detail.textContent = current.getAttribute('aria-label');
  }

  grid.addEventListener('focusin', event => select(event.target));
  grid.addEventListener('click', event => select(event.target));
  grid.addEventListener('pointerover', event => {
    if (event.pointerType === 'mouse' && event.target.matches('.heat-cell')) {
      detail.textContent = event.target.getAttribute('aria-label');
    }
  });
  grid.addEventListener('keydown', event => {
    const rows = getComputedStyle(grid).gridTemplateRows.split(' ').length;
    const moves = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -rows, ArrowRight: rows };
    if (!Object.hasOwn(moves, event.key)) return;
    event.preventDefault();
    const next = cells.indexOf(current) + moves[event.key];
    cells[Math.max(0, Math.min(next, cells.length - 1))].focus();
  });
}

export async function renderActivity(main, profileUrl) {
  const winter = main.querySelector('#winter-calendar');
  const year = main.querySelector('#github-calendar');
  calendarRequest ??= loadCalendar();
  const result = await calendarRequest;
  if (!winter.isConnected) return;

  if (result) {
    renderWinter(winter, result.days, result.source);
    renderYear(year, result.days, result.source, profileUrl);
    for (const card of [winter, year]) bindCalendar(card);
  } else {
    for (const card of [winter, year]) {
      card.innerHTML = `<p class="load-error">Activity is unavailable. <a href="${profileUrl}" target="_blank" rel="noopener noreferrer">View the GitHub profile.</a></p>`;
    }
  }
  for (const card of [winter, year]) card.removeAttribute('aria-busy');
}
