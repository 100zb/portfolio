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

  card.addEventListener("click", () => setActiveCard(index, true));
  track.appendChild(card);
  cards.push(card);
});

function setActiveCard(index, scrollTo) {
  cards.forEach((c, i) => c.classList.toggle("is-active", i === index));
  if (scrollTo) {
    // scrollIntoView here only ever needs to move the horizontal carousel track,
    // never the page itself — scroll the track's scrollLeft directly instead.
    const card = cards[index];
    const target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  }
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
// Note : le portfolio est un choix esthétique voulu (animations, fond WebGL),
// donc on ne coupe pas ces effets même si le système a "réduire les animations"
// activé (ex: certains PC Windows l'ont par défaut sans que l'utilisateur le sache).
const hero = document.querySelector(".hero");
const heroInner = document.querySelector(".hero-inner");

if (hero && heroInner && canHover) {
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

// ===== Site-wide WebGL glitter background =====
// Shader plein écran, fixe derrière tout le site (pas juste le hero) : une texture de bruit
// filtrée en puissance 12 pour ne garder que des points scintillants sur un fond sombre.
// Un clic sur le hero envoie un "burst" qui accélère momentanément le scintillement.
const canvas = document.getElementById("bgCanvas");

if (canvas && window.THREE) {
  initSiteBackground(canvas);
} else if (canvas) {
  canvas.style.display = "none";
}

function initSiteBackground(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  function generateNoiseTexture(size) {
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const s = i * 4;
      data[s] = Math.random() * 255;
      data[s + 1] = Math.random() * 255;
      data[s + 2] = Math.random() * 255;
      data[s + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform vec3 uTint;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      float result = 0.0;
      result += texture2D(iChannel0, uv * 1.4 + vec2(iTime * -0.006, iTime * 0.003)).r;
      result *= texture2D(iChannel0, uv * 1.1 + vec2(iTime * 0.006, iTime * -0.004)).g;
      result = pow(result, 12.0);
      vec3 base = vec3(0.02, 0.02, 0.035);
      gl_FragColor = vec4(base + uTint * result * 6.0, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iChannel0: { value: generateNoiseTexture(512) },
      uTint: { value: new THREE.Vector3(0.49, 0.42, 1.0) },
    },
    vertexShader,
    fragmentShader,
  });

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let virtualTime = 0;
  let burst = 0;

  // Exposed so a click on the hero speeds up the shimmer for a moment
  window.heroBurst = () => {
    burst = 1;
  };

  function animate() {
    const delta = clock.getDelta();
    const speed = 0.55 + burst * 2.4;
    virtualTime += delta * speed;
    burst *= 0.93;

    material.uniforms.iTime.value = virtualTime;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
