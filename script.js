document.addEventListener('DOMContentLoaded', () => {

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('hidden'), 300);
  });

  /* ---------- Sticky Navbar ---------- */
  const nav = document.getElementById('mainNav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav);

  /* Collapse mobile menu on link click */
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* Active link on scroll */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const spy = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  };
  window.addEventListener('scroll', spy);

  /* ---------- Cursor Glow ---------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(min-width: 992px)').matches) {
    window.addEventListener('mousemove', e => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
  }

  /* ---------- Typing Animation ---------- */
  const typedEl = document.getElementById('typed-text');
  const phrases = ['Full Stack Web Developer', 'PHP & MySQL Specialist', 'JavaScript Enthusiast', 'UI-Focused Engineer'];
  let pIndex = 0, cIndex = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = phrases[pIndex];
    if (!deleting) {
      cIndex++;
      typedEl.textContent = current.slice(0, cIndex);
      if (cIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      cIndex--;
      typedEl.textContent = current.slice(0, cIndex);
      if (cIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- Skill Bars (animate on view) ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(el => skillObserver.observe(el));

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 1500;
      const stepTime = Math.max(Math.floor(duration / target), 20);
      const step = () => {
        current += 1;
        el.textContent = current;
        if (current < target) setTimeout(step, stepTime);
        else el.textContent = target;
      };
      step();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Portfolio Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const cats = item.dataset.cat.split(' ');
        const show = filter === 'all' || cats.includes(filter);
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Contact Form (front-end only) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";
      note.classList.add('success');
      form.reset();
    });
  }

  /* ---------- Download CV placeholder ---------- */
  document.querySelectorAll('#downloadCvBtn, a[href="#"].btn-accent').forEach(btn => {
    if (btn.textContent.includes('Download')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Add your CV file at assets/cv.pdf and update the button link to enable downloads.');
      });
    }
  });

  /* ---------- Back to Top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
