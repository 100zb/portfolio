// Contenu des cartes projets. Modifie ce fichier pour ajouter/retirer un projet
// sans toucher au HTML — chaque objet devient une carte dans le carrousel.
// "description" = teaser toujours visible. "highlights" = détails qui apparaissent
// quand la carte devient active (clic ou centrée dans le carrousel).

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
    link: null
  }
];
