// Contenu des cartes projets. Modifie ce fichier pour ajouter/retirer un projet
// sans toucher au HTML — chaque objet devient une carte dans le carrousel.
// "description" = teaser toujours visible. "highlights" = détails qui apparaissent
// quand la carte devient active (clic ou centrée dans le carrousel).
// "image" = chemin de la capture (ex. "assets/projects/wall-is-you.png"), null = placeholder.

const PROJECTS = [
  {
    title: "Wall is You",
    tag: "Jeu — Python",
    status: null,
    description: "Dungeon-crawler où un aventurier explore des salles rotatives pour affronter des dragons.",
    highlights: [
      "Moteur de jeu complet : salles rotatives, déplacements, combat",
      "Interface graphique fltk faite maison (menus, affichage du donjon)",
      "Variantes : dragons mobiles, trésors, sauvegarde de partie"
    ],
    stack: ["Python", "fltk", "POO"],
    image: "assets/projects/wall-is-you.webp",
    link: null
  },
  {
    title: "Conseil des Schtroumpfs",
    tag: "Jeu console — Java",
    status: null,
    description: "Simulation de gestion d'un village de Schtroumpfs en console, pensée pour une soutenance orale.",
    highlights: [
      "Architecture MVC défendue à l'oral face à un jury",
      "Polymorphisme pour modéliser les rôles et actions",
      "Interface 100% console, aucune dépendance externe"
    ],
    stack: ["Java", "MVC", "POO"],
    image: "assets/projects/schtroumpfs.webp",
    link: null
  },
  {
    title: "Gestion des affaires patients",
    tag: "SAÉ 2.04 — Web",
    status: null,
    description: "Application web pour un centre médical, développée en binôme avec Djibril Oubouzid.",
    highlights: [
      "Authentification par rôle (soignant, administratif...)",
      "Trois types de transactions sur les affaires des patients",
      "Page d'audit complète pour tracer les opérations"
    ],
    stack: ["PHP", "PostgreSQL", "SQL"],
    image: "assets/projects/gestion-patients.webp",
    link: null
  },
  {
    title: "Muraille de Chine — M.C.N.",
    tag: "Site web — Médiation culturelle",
    status: null,
    description: "Site bilingue FR/EN sur la Muraille de Chine, pensé comme une expérience éditoriale.",
    highlights: [
      "Bascule de langue FR/EN sur tout le site",
      "Sections histoire, architecture, préservation, infos pratiques",
      "Frise chronologique interactive des dynasties"
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    image: "assets/projects/muraille-de-chine.webp",
    link: null
  },
  {
    title: "Boggle en ligne",
    tag: "SAÉ S3 — Plateforme multi-modules",
    status: "En cours (2026-2027)",
    description: "Plateforme de jeu de mots façon Boggle, avec un module par cours du semestre.",
    highlights: [
      "Génération de grille et recherche de mots en C",
      "Dictionnaires pondérés générés depuis un corpus, en Java",
      "Serveur web PHP objet : comptes, salons, parties, historique"
    ],
    stack: ["C", "Java", "PHP", "SQL"],
    image: "assets/projects/boggle.webp",
    link: null
  }
];

// Projet phare, affiché en grand au-dessus de la liste.
const FEATURED_PROJECT = {
  title: "Nova",
  tag: "Projet phare — Plateforme web full-stack",
  pitch: "Une plateforme communautaire de blogging complète : on y écrit des articles en Markdown, on échange en commentaires, on suit des auteurs et on discute en messages privés.",
  details: [
    "Nova est une application web full-stack que j'ai conçue et mise en ligne de bout en bout : base de données, authentification, interface, déploiement.",
    "Chaque membre a son profil public et son tableau de bord pour rédiger, publier, dépublier ou supprimer ses articles. Un espace d'administration permet de gérer les utilisateurs (suspension, rôles) et d'ouvrir ou fermer les inscriptions."
  ],
  features: [
    "Éditeur Markdown avec aperçu en direct et coloration du code",
    "Commentaires imbriqués, likes, abonnements entre auteurs",
    "Messagerie privée et notifications",
    "Recherche, filtres par catégorie et tag, pagination",
    "Connexion email / mot de passe, rôles et panneau admin",
    "Thème clair / sombre, animations, SEO (sitemap, flux RSS, Open Graph)"
  ],
  stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Tailwind CSS", "Vercel", "Neon"],
  images: [
    { src: "assets/projects/nova-home.webp", caption: "Page d'accueil" },
    { src: "assets/projects/nova-blog.webp", caption: "Liste des articles, recherche et filtres" },
    { src: "assets/projects/nova-post.webp", caption: "Lecture d'un article avec code coloré" },
    { src: "assets/projects/nova-dashboard.webp", caption: "Tableau de bord auteur" },
    { src: "assets/projects/nova-editor.webp", caption: "Éditeur Markdown" }
  ],
  link: "https://nova-gamma-indol.vercel.app",
  repo: "https://github.com/100zb/Nova"
};
