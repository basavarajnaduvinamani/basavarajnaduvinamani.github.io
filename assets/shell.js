const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let portraitReaction;

document.addEventListener('click', event => {
  const portrait = event.target.closest('button.avatar-wrap');
  if (!portrait || reducedMotion.matches) return;

  portraitReaction?.cancel();
  portraitReaction = portrait.animate([
    { transform: 'scale(1) rotate(0)' },
    { transform: 'scale(.88) rotate(-5deg)', offset: .22 },
    { transform: 'scale(1.09) rotate(4deg)', offset: .58 },
    { transform: 'scale(1) rotate(0)' },
  ], {
    duration: 440,
    easing: 'ease-out',
  });
});
