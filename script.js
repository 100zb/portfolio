// ===== Fond animé : particules flottantes =====
const particleHost = document.getElementById("bgParticles");
const PARTICLE_COLORS = ["rgba(235,228,255,0.9)", "rgba(183,156,255,0.9)", "rgba(232,95,160,0.85)"];

for (let i = 0; i < 22; i++) {
  const p = document.createElement("div");
  p.className = "bg-particle";
  const size = 2 + Math.round(Math.random());
  const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.background = color;
  p.style.boxShadow = `0 0 6px ${color}`;
  p.style.animationDuration = 8 + Math.random() * 6 + "s";
  p.style.animationDelay = Math.random() * 6 + "s";
  particleHost.appendChild(p);
}

// ===== Fond animé : lumière qui suit le curseur =====
const bgCursor = document.getElementById("bgCursor");
window.addEventListener("mousemove", (e) => {
  bgCursor.style.left = e.clientX + "px";
  bgCursor.style.top = e.clientY + "px";
});

// ===== Nav toggle (mobile) =====
const navToggle = document.getElementById("navToggle");
const sidebarNav = document.getElementById("sidebarNav");
navToggle.addEventListener("click", () => sidebarNav.classList.toggle("is-open"));
sidebarNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => sidebarNav.classList.remove("is-open"));
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Projet phare (Nova) : galerie + détails =====
const featuredEl = document.getElementById("featuredProject");
if (featuredEl && typeof FEATURED_PROJECT !== "undefined") {
  const f = FEATURED_PROJECT;
  featuredEl.innerHTML = `
    <div class="featured-head">
      <span class="featured-tag">${f.tag}</span>
      <h3 class="serif">${f.title}</h3>
      <p class="featured-pitch">${f.pitch}</p>
      <div class="featured-actions">
        ${f.link ? `<a class="btn-primary" href="${f.link}" target="_blank" rel="noopener">Voir le site ↗</a>` : ""}
        ${f.repo ? `<a class="btn-ghost" href="${f.repo}" target="_blank" rel="noopener">Code source</a>` : ""}
      </div>
    </div>
    <figure class="featured-main">
      <img id="featuredMainImg" src="${f.images[0].src}" alt="${f.title} — ${f.images[0].caption}">
      <figcaption id="featuredCaption">${f.images[0].caption}</figcaption>
    </figure>
    <div class="featured-thumbs" role="list">
      ${f.images.map((img, i) => `
        <button type="button" class="featured-thumb${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="${img.caption}">
          <img src="${img.src}" alt="" loading="lazy">
        </button>`).join("")}
    </div>
    <div class="featured-body">
      <div class="featured-text">${f.details.map((d) => `<p>${d}</p>`).join("")}</div>
      <div>
        <h4>Fonctionnalités</h4>
        <ul class="featured-features">${f.features.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
    </div>
    <ul class="skill-tags featured-stack">${f.stack.map((x) => `<li>${x}</li>`).join("")}</ul>
  `;

  const mainImg = document.getElementById("featuredMainImg");
  const caption = document.getElementById("featuredCaption");
  featuredEl.querySelectorAll(".featured-thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = f.images[Number(btn.dataset.index)];
      mainImg.src = img.src;
      mainImg.alt = `${f.title} — ${img.caption}`;
      caption.textContent = img.caption;
      featuredEl.querySelectorAll(".featured-thumb").forEach((b) => b.classList.toggle("is-active", b === btn));
    });
  });
}

// ===== Rendu des projets (depuis projects-data.js) en liste "spread" =====
const list = document.getElementById("projectsList");

PROJECTS.forEach((project, index) => {
  const row = document.createElement("article");
  row.className = "project-row" + (index % 2 === 1 ? " rev" : "");

  const metaParts = project.stack.join(" · ");

  row.innerHTML = `
    <div class="project-ghost">${String(index + 1).padStart(2, "0")}</div>
    <div class="project-text">
      <div class="title-row">
        <h3 class="serif">${project.title}</h3>
        ${project.status ? `<span class="project-status">${project.status}</span>` : ""}
      </div>
      <p>${project.description}</p>
      <div class="project-meta">${metaParts.toUpperCase()}</div>
    </div>
    <div class="project-thumb" data-thumb>${project.image
      ? `<img src="${project.image}" alt="Capture du projet ${project.title}" loading="lazy">`
      : "[ CAPTURE ]"}</div>
  `;

  list.appendChild(row);
});

// ===== Effet de bascule 3D sur les captures projet =====
document.querySelectorAll("[data-thumb]").forEach((thumb) => {
  thumb.addEventListener("mousemove", (e) => {
    const r = thumb.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    thumb.style.transform = `perspective(700px) rotateX(${py * -14}deg) rotateY(${px * 14}deg)`;
  });
  thumb.addEventListener("mouseleave", () => {
    thumb.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
  });
});

// ===== Nav active au scroll =====
const sections = ["about", "skills", "projects", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinksByTarget = {};
sidebarNav.querySelectorAll("a[data-target]").forEach((a) => {
  navLinksByTarget[a.dataset.target] = a;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = navLinksByTarget[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.values(navLinksByTarget).forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);
sections.forEach((s) => observer.observe(s));
