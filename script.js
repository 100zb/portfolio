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
const grid = document.getElementById("projectsGrid");

PROJECTS.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card reveal";

  const stackHtml = project.stack
    .map((item) => `<span class="stack-pill">${item}</span>`)
    .join("");

  card.innerHTML = `
    <div class="project-top">
      <div>
        <h3>${project.title}</h3>
        <span class="project-tag">${project.tag}</span>
      </div>
      ${project.status ? `<span class="project-status">${project.status}</span>` : ""}
    </div>
    <p>${project.description}</p>
    ${stackHtml ? `<div class="project-stack">${stackHtml}</div>` : ""}
  `;

  grid.appendChild(card);
});

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

// ===== Hero WebGL glitter background =====
// Effet inspiré d'un shader de particules scintillantes, réécrit en vanilla JS + three.js.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.getElementById("heroCanvas");

if (canvas && !prefersReducedMotion && window.THREE) {
  initHeroBackground(canvas);
} else if (canvas) {
  // Fallback statique : pas d'animation, juste le dégradé CSS derrière le titre.
  canvas.style.display = "none";
}

function initHeroBackground(canvas) {
  const hero = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 6;

  const particleCount = 260;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
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
    const { clientWidth, clientHeight } = hero;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();

  function animate() {
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.02;
    points.rotation.x = Math.sin(t * 0.05) * 0.05;

    // scintillement : la taille des points oscille légèrement dans le temps
    material.size = 0.045 + Math.sin(t * 2) * 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
