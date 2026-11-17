(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('#motion-toggle');
  let paused = motion.matches;

  // Elementos que ganham entrada escalonada dentro de cada bloco.
  const STAGGER = [
    '.section-top', '.section-heading', '.event-intro > *', '.stats > *', '.modalities > *',
    '.journey-heading > *', '.journey-steps > *', '.festival-heading > *', '.festival-items > *',
    '.festival-note > *', '.runner-heading > *', '.runner-types > *', '.runner-note > *',
    '.audience-heading > *', '.audience-list > *', '.anniversary-content > *', '.anniversary-art > *',
    '.presence-heading > *', '.benefits > *', '.sponsorship-heading > *', '.plans > *',
    '.support-label > *', '.support-content > *', '.contact > *', '.gallery-heading > *',
    '.gallery-grid > *', '.hero-facts > *'
  ];

  function setMotion(value) {
    paused = value;
    document.body.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.innerHTML = paused
      ? 'Animações pausadas <span aria-hidden="true"><svg class="icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" style="width:1em;height:1em;vertical-align:-.12em"><path d="m8 3 13 9-13 9Z"/></svg></span>'
      : 'Pausar animações <span aria-hidden="true"><svg class="icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" style="width:1em;height:1em;vertical-align:-.12em"><path d="M8 3v18M16 3v18"/></svg></span>';
    if (paused) document.querySelectorAll('.reveal, [data-stagger]').forEach(el => {
      el.classList.remove('pending');
      el.classList.add('visible');
    });
  }
  setMotion(paused);
  toggle.addEventListener('click', () => setMotion(!paused));
  motion.addEventListener('change', e => setMotion(e.matches));

  // --- Entrada escalonada: cada filho anima separado dentro do bloco ---
  function markStagger() {
    document.querySelectorAll(STAGGER.join(',')).forEach(parent => {
      const kids = [...parent.children].filter(el => !el.classList.contains('reveal'));
      if (kids.length < 2) return;
      kids.forEach((el, i) => {
        el.setAttribute('data-stagger', '');
        el.style.setProperty('--i', i);
      });
    });
  }
  markStagger();

  const revealTargets = () => document.querySelectorAll('.reveal, [data-stagger]');

  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pending');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealTargets().forEach(el => {
      // Elemento sem area (display:none no breakpoint atual) nao entra na animacao;
      // assim nao fica invisivel quando o viewport muda de tamanho.
      if (!el.getBoundingClientRect().height) return;
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('pending');
      observer.observe(el);
    });
  }

  // Ao redimensionar, elementos que estavam escondidos (display:none) e apareceram
  // precisam entrar visiveis sem depender do observer.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      revealTargets().forEach(el => {
        if (!el.getBoundingClientRect().height) return;
        el.classList.remove('pending');
        el.classList.add('visible');
      });
    }, 120);
  });

  // --- Contador animado nos numeros da faixa do hero ---
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(v).toLocaleString('pt-BR') : v.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !motion.matches) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(c => { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
  }

  // --- Barra de progresso ---
  let queued = false;
  const progress = document.querySelector('.progress');
  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${total > 0 ? Math.min(100, window.scrollY / total * 100) : 0}%`;
    queued = false;
  }
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; window.requestAnimationFrame(updateProgress); }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
