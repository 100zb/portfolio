// Contenu des cartes projets. Modifie ce fichier pour ajouter/retirer un projet
// sans toucher au HTML — chaque objet devient une carte dans #projectsGrid.

const PROJECTS = [
  {
    title: "Wall is You",
    tag: "Jeu — Python",
    status: null,
    description: "Dungeon-crawler où un aventurier explore des salles rotatives pour affronter des dragons. Moteur de jeu complet (salles, déplacements, combat) et interface graphique fltk faite maison.",
    stack: ["Python", "fltk", "Programmation orientée objet"],
    link: null
  },
  {
    title: "Conseil des Schtroumpfs",
    tag: "Jeu console — Java",
    status: null,
    description: "Simulation de gestion d'un village de Schtroumpfs en console, pensée pour défendre des choix d'architecture à l'oral : pattern MVC, polymorphisme, séparation claire des responsabilités.",
    stack: ["Java", "MVC", "POO"],
    link: null
  },
  {
    title: "Gestion des affaires patients",
    tag: "SAÉ 2.04 — Web",
    status: null,
    description: "Application web pour un centre médical, développée en binôme : authentification par rôle, trois types de transactions sur les affaires des patients, page d'audit complète.",
    stack: ["PHP", "PostgreSQL", "SQL"],
    link: null
  },
  {
    title: "Muraille de Chine — M.C.N.",
    tag: "Site web — Médiation culturelle",
    status: null,
    description: "Site bilingue FR/EN dédié à la Muraille de Chine, pensé comme une expérience numérique éditoriale : histoire, architecture, préservation, informations pratiques.",
    stack: ["HTML5", "CSS3", "JavaScript vanilla"],
    link: null
  },
  {
    title: "Boggle en ligne",
    tag: "SAÉ S3 — Plateforme multi-modules",
    status: "En cours (2026-2027)",
    description: "Plateforme de jeu de mots façon Boggle : génération de grille en C, dictionnaires pondérés en Java, base de données joueurs, serveur web PHP objet avec salons et parties en ligne.",
    stack: ["C", "Java", "PHP", "SQL"],
    link: null
  },
  {
    title: "Château Quest",
    tag: "Jeu",
    status: null,
    description: "Projet à détailler — dis-moi en une phrase de quoi il s'agit et je complète la carte.",
    stack: [],
    link: null
  }
];
