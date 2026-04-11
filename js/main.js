/* =============================================
   FAHAD PORTFOLIO — main.js
   Full GSAP + ScrollTrigger animations
   ============================================= */


document.addEventListener('DOMContentLoaded', () => {

  // ── GSAP REGISTRATION ────────────────────────
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // ── PRELOADER ────────────────────────────────
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.querySelector('.preloader-bar');
  const preloaderCount = document.querySelector('.preloader-count');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      preloaderCount.textContent = '100%';
      if (preloaderBar) preloaderBar.style.width = '100%';
      setTimeout(() => {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            initHeroAnimations();
          }
        });
      }, 300);
    } else {
      if (preloaderCount) preloaderCount.textContent = Math.floor(progress) + '%';
      if (preloaderBar) preloaderBar.style.width = progress + '%';
    }
  }, 60);

  if (window.innerWidth < 768) {
  gsap.globalTimeline.timeScale(0.6);
}

  // ── CUSTOM CURSOR ─────────────────────────────
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursorDot && cursorRing && window.matchMedia('(pointer:fine)').matches) {
    document.body.style.cursor = 'none';
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
    });

    (function animRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(cursorRing, { x: ringX, y: ringY });
      requestAnimationFrame(animRing);
    })();

    // Hover state on interactive elements
    document.querySelectorAll('a, button, .project-card, .ach-card, .cert-card, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
  }

  // ── SCROLL PROGRESS ───────────────────────────
  const progress_bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (progress_bar) progress_bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });

  // ── NAVBAR ────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Active nav links on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  // ── MOBILE MENU ───────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── BACK TO TOP ───────────────────────────────
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── FLOATING PARTICLES ────────────────────────
  function spawnParticle() {
    const p = document.createElement('div');
    p.className = 'fp';
    const size = Math.random() * 4 + 2;
    const dur = Math.random() * 18 + 14;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.2 + 0.04;
    p.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;background:rgba(255,107,0,${opacity});animation-duration:${dur}s;animation-delay:${Math.random() * 4}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), (dur + 6) * 1000);
  }
  for (let i = 0; i < 12; i++) spawnParticle();
  setInterval(spawnParticle, 3500);

  // ── SMOOTH SCROLL ─────────────────────────────
 const isMobile = window.innerWidth < 768;

document.querySelectorAll('.project-card').forEach(card => {

  if (!isMobile) {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = (e.clientY - cy) / rect.height * -12;
      const ry = (e.clientX - cx) / rect.width * 12;

      gsap.to(card, {
        rotationX: rx,
        rotationY: ry,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'elastic.out(1,0.6)',
        transformPerspective: 800
      });
    });
  }

});

  // ── MAGNETIC BUTTONS ─────────────────────────
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      gsap.to(el, { x: dx * 0.35, y: dy * 0.35, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    });
  });

  // ── CV DIALOG ─────────────────────────────────
  const cvBtn = document.getElementById('download-cv-btn');
  const cvDialog = document.getElementById('cv-dialog');
  const cvClose = document.getElementById('cv-dialog-close');
  const cvSubmit = document.getElementById('cv-dialog-submit');
  const cvEmail = document.getElementById('cv-email');
  if (cvBtn && cvDialog) {
    cvBtn.addEventListener('click', e => {
      e.preventDefault();
      cvDialog.style.display = 'flex';
      gsap.fromTo('.cv-dialog-box', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' });
    });
    const closeDialog = () => {
      gsap.to('.cv-dialog-box', { scale: 0.85, opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => { cvDialog.style.display = 'none'; }
      });
    };
    if (cvClose) cvClose.addEventListener('click', closeDialog);
    cvDialog.addEventListener('click', e => { if (e.target === cvDialog) closeDialog(); });
    if (cvSubmit && cvEmail) {
      cvSubmit.addEventListener('click', () => {
        const email = cvEmail.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          gsap.to(cvEmail, { x: [-8, 8, -6, 6, 0], duration: 0.4 });
          cvEmail.style.borderColor = '#ef4444';
          return;
        }
        cvEmail.style.borderColor = '';
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#16a34a;color:#fff;padding:14px 24px;border-radius:8px;font-size:.9rem;font-weight:600;z-index:9999;';
        toast.textContent = '✓ Thank you! CV will be sent shortly.';
        document.body.appendChild(toast);
        gsap.fromTo(toast, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
        setTimeout(() => gsap.to(toast, { y: 20, opacity: 0, duration: 0.4, onComplete: () => toast.remove() }), 3500);
        closeDialog();
        cvEmail.value = '';
      });
    }
  }

  // ── HERO ANIMATIONS ───────────────────────────
  function initHeroAnimations() {
    const tl = gsap.timeline();

    // Char split animation for heading
    const h1 = document.querySelector('.hero-h1');
    if (h1) {
      tl.fromTo(
        '.char',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.02
        },
        0.1
      );
    }

    tl.to('.hero-desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.9)
      .to('.hero-btns', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.05)
      .to('.hero-stats', { opacity: 1, duration: 0.7, ease: 'power2.out' }, 1.2)
      .to('.hero-image-wrap', { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, 0.5)
      .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, 1.6);

    // Counter animation for stats
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      tl.to({ val: 0 }, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val) + '+'; }
      }, 1.2);
    });
  }

  // ── SCROLL ANIMATIONS ─────────────────────────

  // Section headers
  document.querySelectorAll('.section-label, .section-title, .section-sub').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // About text paragraphs
  document.querySelectorAll('.about-text p').forEach((p, i) => {
    gsap.fromTo(p,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: p, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Skill bars
  const skillSection = document.getElementById('about');
  if (skillSection) {
    ScrollTrigger.create({
      trigger: skillSection,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.skill-fill').forEach((bar, i) => {
          const target = bar.getAttribute('data-width');
          gsap.fromTo(bar,
            { width: '0%' },
            { width: target, duration: 1.6, delay: i * 0.1, ease: 'power3.out' }
          );
          // Number counter
          const pctEl = bar.closest('.skill-item').querySelector('.skill-pct');
          if (pctEl) {
            const end = parseInt(target);
            gsap.to({ n: 0 }, {
              n: end,
              duration: 1.6,
              delay: i * 0.1,
              ease: 'power3.out',
              onUpdate: function() { pctEl.textContent = Math.floor(this.targets()[0].n) + '%'; }
            });
          }
        });
      }
    });
  }

  // Timeline items — stagger from left
  document.querySelectorAll('.tl-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Cert cards — stagger
  gsap.fromTo('.cert-card',
    { opacity: 0, y: 40, scale: 0.94 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cert-grid', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  // Project cards — stagger with slight rotation
  gsap.fromTo('.project-card',
    { opacity: 0, y: 60, rotationX: 8 },
    {
      opacity: 1, y: 0, rotationX: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.projects-grid', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  // Achievement cards — fan in
  gsap.fromTo('.ach-card',
    { opacity: 0, y: 50, scale: 0.92 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.65,
      stagger: 0.08,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: '.achievements-grid', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  // Contact items slide in
  gsap.fromTo('.contact-item',
    { opacity: 0, x: -40 },
    {
      opacity: 1, x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-info', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  gsap.fromTo('.contact-form',
    { opacity: 0, x: 50 },
    {
      opacity: 1, x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  // ── PARALLAX ──────────────────────────────────
  gsap.to('.hero-orb-1', {
    y: -120,
    ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
  gsap.to('.hero-orb-2', {
    y: -80,
    ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 2 }
  });
  gsap.to('.hero-grid-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // ── SECTION BG PARALLAX ORBS ─────────────────
  document.querySelectorAll('.section-orb').forEach(orb => {
    gsap.to(orb, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: orb.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  // ── PROJECT CARD 3D TILT ─────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = (e.clientY - cy) / rect.height * -12;
      const ry = (e.clientX - cx) / rect.width * 12;
      gsap.to(card, { rotationX: rx, rotationY: ry, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1,0.6)', transformPerspective: 800 });
    });
  });

  // ── ACHIEVEMENT CARD HOVER ───────────────────
  document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.ach-icon'), { rotation: -10, scale: 1.1, duration: 0.35, ease: 'back.out(2)' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.ach-icon'), { rotation: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.6)' });
    });
  });

  // ── HORIZONTAL SCROLL MARQUEE (optional) ─────
  const marquee = document.querySelector('.marquee-inner');
  if (marquee) {
    gsap.to(marquee, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    });
  }

  // ── FOOTER REVEAL ─────────────────────────────
  gsap.fromTo('footer',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      scrollTrigger: { trigger: 'footer', start: 'top 95%', toggleActions: 'play none none none' }
    }
  );

});





// end DOMContentLoaded
