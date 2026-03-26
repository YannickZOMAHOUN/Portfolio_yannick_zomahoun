# 🚀 Portfolio — Yannick Zomahoun

Portfolio personnel moderne et entièrement fonctionnel pour **Yannick Zomahoun**, développeur web Laravel et enseignant en informatique au Bénin.

---

## ✅ Fonctionnalités Implémentées

### 🎨 Design & UX
- **Thème sombre moderne** avec palette rouge/orange (#FF2D20)
- **Curseur personnalisé** animé avec effet de suivi fluide
- **Loader de démarrage** avec barre de progression
- **Animations d'entrée** personnalisées (fade-up, fade-right, zoom-in)
- **Design responsive** — Mobile, Tablette et Desktop
- **Effets parallax** sur les orbes de fond
- **Effet 3D tilt** sur les cartes projets au survol

### 🧭 Navigation
- **Navbar sticky** avec transparence et effet blur au scroll
- **Scroll spy** — liens actifs selon la section visible
- **Navigation fluide** (smooth scroll) entre sections
- **Menu hamburger** pour mobile avec animation
- **Bouton "Retour en haut"** apparaissant au scroll

### 📄 Sections
1. **Hero** — Présentation, rôles animés en carousel, stats comptées dynamiquement, icônes tech flottantes
2. **À propos** — Profil, détails, hobbies, barres de langues animées
3. **Compétences** — Cartes filtrables (Backend/Frontend/Outils) avec barres de progression
4. **Expérience & Formation** — Timeline avec onglets interactifs
5. **Projets** — 4 projets avec maquettes UI visuelles
6. **Références** — Cartes témoignages avec contact
7. **Contact** — Formulaire fonctionnel + coordonnées + réseaux sociaux

### 💾 Données
- **Formulaire de contact** sauvegardé en base via l'API Table
- **Table `contact_messages`** : nom, email, sujet, message, date

---

## 📁 Structure des Fichiers

```
/
├── index.html              # SPA principale — toutes sections
├── css/
│   └── style.css           # Styles complets (thème sombre, animations, responsive)
├── js/
│   └── main.js             # JavaScript : interactions, animations, formulaire
└── README.md
```

---

## 🔗 Sections & Ancres

| Section | URL | Description |
|---------|-----|-------------|
| Accueil | `#accueil` | Hero avec présentation |
| À propos | `#apropos` | Profil personnel |
| Compétences | `#competences` | Stack technique |
| Expérience | `#experience` | Parcours pro & formation |
| Projets | `#projets` | Portfolio de réalisations |
| Contact | `#contact` | Formulaire et coordonnées |

---

## 🗃️ Modèle de Données

### Table : `contact_messages`
| Champ | Type | Description |
|-------|------|-------------|
| id | text | Identifiant unique |
| name | text | Nom de l'expéditeur |
| email | text | Email de contact |
| subject | text | Sujet du message |
| message | rich_text | Contenu du message |
| sent_at | datetime | Date/heure d'envoi |

---

## 🛠️ Technologies Utilisées

- **HTML5** sémantique
- **CSS3** custom properties, animations, Grid/Flexbox
- **JavaScript** vanilla ES6+
- **Font Awesome 6** pour les icônes
- **Google Fonts** : Space Grotesk + Inter
- **RESTful Table API** pour la persistance du formulaire

---

## 🔮 Améliorations Suggérées

- [ ] Ajouter une vraie photo de profil de Yannick
- [ ] Intégrer un système de téléchargement du CV (PDF)
- [ ] Ajouter un blog ou section articles
- [ ] Connecter les liens GitHub/LinkedIn réels
- [ ] Ajouter une animation de fond canvas/WebGL
- [ ] Intégrer un CMS headless pour les projets
- [ ] Ajouter des captures d'écran réelles des projets
- [ ] Page de confirmation après envoi du formulaire (email)

---

## 👤 Informations Contact

- **Nom** : Yannick Zomahoun
- **Email** : yannickzomahoun75@gmail.com
- **Téléphone** : +229 68 374 902
- **Localisation** : Abomey, Bénin 🇧🇯
- **GitHub** : github.com/yannickzomahoun
- **LinkedIn** : linkedin.com/in/yannickzomahoun
- **Linktree** : linktr.ee/yannickzomahoun

---

*Portfolio créé avec ❤️ au Bénin*
