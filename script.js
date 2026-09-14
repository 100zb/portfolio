// ===== Nav toggle (mobile) =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("is-open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("is-open"));
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Render project cards from projects-data.js =====
const track = document.getElementById("projectsGrid");
const cards = [];

PROJECTS.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.dataset.index = index;

  const stackHtml = project.stack
    .map((item) => `<span class="stack-pill">${item}</span>`)
    .join("");

  const highlightsHtml = project.highlights.length
    ? `<ul>${project.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
    : "";

  card.innerHTML = `
    <div class="project-top">
      <div>
        <h3>${project.title}</h3>
        <span class="project-tag">${project.tag}</span>
      </div>
      ${project.status ? `<span class="project-status">${project.status}</span>` : ""}
    </div>
    <p>${project.description}</p>
    <div class="project-details">
      ${highlightsHtml}
      ${stackHtml ? `<div class="project-stack">${stackHtml}</div>` : ""}
    </div>
    <span class="project-expand-cue">Cliquer pour détailler ↓</span>
  `;

  card.addEventListener("click", () => setActiveCard(index));
  track.appendChild(card);
  cards.push(card);
});

function setActiveCard(index) {
  cards.forEach((c, i) => c.classList.toggle("is-active", i === index));
  cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

// Mark the card closest to the track's center as active while scrolling
let scrollTimer = null;
track.addEventListener("scroll", () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    cards.forEach((c, i) => c.classList.toggle("is-active", i === closest));
  }, 90);
});

// Prev / next buttons
document.getElementById("prevBtn").addEventListener("click", () => {
  track.scrollBy({ left: -340, behavior: "smooth" });
});
document.getElementById("nextBtn").addEventListener("click", () => {
  track.scrollBy({ left: 340, behavior: "smooth" });
});

// Drag-to-scroll on desktop (mouse)
let isDown = false;
let startX = 0;
let scrollStart = 0;

track.addEventListener("mousedown", (e) => {
  isDown = true;
  track.classList.add("is-dragging");
  startX = e.pageX;
  scrollStart = track.scrollLeft;
});

window.addEventListener("mouseup", () => {
  isDown = false;
  track.classList.remove("is-dragging");
});

track.addEventListener("mouseleave", () => {
  isDown = false;
  track.classList.remove("is-dragging");
});

track.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  track.scrollLeft = scrollStart - (e.pageX - startX);
});

// Gentle 3D tilt on project cards (mouse-based, desktop only)
const canHover = window.matchMedia("(hover: hover)").matches;

if (canHover) {
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Kick off with the first card active
if (cards.length) setActiveCard(0);

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

// ===== Hero: mouse parallax tilt + click ripple/burst =====
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroInner = document.querySelector(".hero-inner");

if (hero && heroInner && canHover && !prefersReducedMotion) {
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    heroInner.style.transform = `rotateX(${-py * 5}deg) rotateY(${px * 5}deg)`;
  });
  hero.addEventListener("mouseleave", () => {
    heroInner.style.transform = "";
  });
}

// Click ripple, works everywhere (also triggers the WebGL burst below)
hero?.addEventListener("click", (e) => {
  if (e.target.closest(".hero-actions")) return; // don't ripple over the buttons
  const ripple = document.createElement("span");
  ripple.className = "click-ripple";
  ripple.style.left = `${e.clientX - hero.getBoundingClientRect().left}px`;
  ripple.style.top = `${e.clientY - hero.getBoundingClientRect().top}px`;
  hero.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
  if (window.heroBurst) window.heroBurst();
});

// ===== Hero WebGL particle background =====
// Fond de particules scintillantes, réagit légèrement au scroll et bien plus au clic (burst).
const canvas = document.getElementById("heroCanvas");

if (canvas && !prefersReducedMotion && window.THREE) {
  initHeroBackground(canvas);
} else if (canvas) {
  canvas.style.display = "none";
}

function initHeroBackground(canvas) {
  const heroEl = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 6;

  const particleCount = 320;
  const positions = new Float32Array(particleCount * 3);
  const basePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 12;
    const y = (Math.random() - 0.5) * 7;
    const z = (Math.random() - 0.5) * 4;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xb79dff,
    size: 0.045,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function resize() {
    const { clientWidth, clientHeight } = heroEl;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let burstStrength = 0;

  // Exposed so a click anywhere on the hero can trigger a burst
  window.heroBurst = () => {
    burstStrength = 1;
  };

  function animate() {
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.02;
    points.rotation.x = Math.sin(t * 0.05) * 0.05;

    material.size = 0.045 + Math.sin(t * 2) * 0.01 + burstStrength * 0.06;

    if (burstStrength > 0.001) {
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        const scale = 1 + burstStrength * 0.35;
        posAttr.array[i * 3] = bx * scale;
        posAttr.array[i * 3 + 1] = by * scale;
        posAttr.array[i * 3 + 2] = bz * scale;
      }
      posAttr.needsUpdate = true;
      burstStrength *= 0.92;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
