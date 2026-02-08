Plan to implement │
│ │
│ Plan : Refonte de la homepage en landing page style SaaS │
│ │
│ Contexte │
│ │
│ La homepage actuelle (app/page.tsx) est un simple formulaire d'inscription. L'utilisateur veut une landing page complète présentant Code in the Dark comme un produit, avec 7 │
│ sections, tout en conservant le formulaire existant et l'esthétique rétro arcade (fond noir, "Press Start 2P", accents verts). │
│ │
│ Sections de la page │
│ │
│ 1. Hero — Logo, titre, tagline, bouton CTA vers le formulaire │
│ 2. What is Code in the Dark? — Explication du concept avec highlights en grille │
│ 3. Galerie photos — Grille de 6 photos d'événements LyonJS (placeholders à remplacer par l'utilisateur) │
│ 4. Vidéo YouTube — Embed iframe https://www.youtube.com/embed/4sDZ8nArSqM │
│ 5. Règles du jeu — Liste ordonnée des règles de la compétition │
│ 6. Formulaire d'inscription — Le formulaire actuel, extrait en composant │
│ 7. Footer — Logo LyonJS + mention "Maintained by LyonJS" │
│ │
│ Fichiers modifiés / créés │
│ ┌───────────────────────────────────────────────────┬─────────────────────────────────────────────────────┐ │
│ │ Fichier │ Action │ │
│ ├───────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤ │
│ │ components/registration-form/RegistrationForm.tsx │ Créer — extraction du formulaire actuel │ │
│ ├───────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤ │
│ │ styles/landing.module.scss │ Créer — styles de toutes les sections │ │
│ ├───────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤ │
│ │ app/page.tsx │ Réécrire — landing page complète avec 7 sections │ │
│ ├───────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤ │
│ │ style.scss │ Modifier — ajouter scroll-behavior: smooth sur html │ │
│ ├───────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤ │
│ │ public/gallery/event-photo-{1..6}.jpg │ Créer — 6 placeholders │ │
│ ├───────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤ │
│ │ public/lyonjs-logo.svg │ Créer — placeholder logo LyonJS │ │
│ └───────────────────────────────────────────────────┴─────────────────────────────────────────────────────┘ │
│ Étapes d'implémentation │
│ │
│ 1. Extraire le formulaire dans RegistrationForm.tsx │
│ │
│ - Copier toute la logique (hooks, state, onSubmit, useEffect redirect) depuis app/page.tsx │
│ - Retirer le <h1>Welcome to Code in the dark!</h1> (le heading sera dans la section parente) │
│ - Ajuster les chemins d'import (../../hooks/..., ../../config/..., ../../styles/...) │
│ - Export nommé : export function RegistrationForm() │
│ │
│ 2. Créer les assets placeholder │
│ │
│ - public/gallery/ — 6 images placeholder (copies de codeinthedark.png ou images colorées) │
│ - public/lyonjs-logo.svg — SVG simple avec texte "LyonJS" │
│ │
│ 3. Créer styles/landing.module.scss │
│ │
│ - Variables : $accent: #3a9364, max-width 900px, padding sections 4rem 2rem │
│ - Hero : plein écran, codeinthedark.png en background avec overlay sombre, titre vert avec text-shadow │
│ - Sections : centrées, max-width, titres verts │
│ - Galerie : grille responsive auto-fill, minmax(280px, 1fr), bordure verte, images désaturées avec hover couleur │
│ - Vidéo : wrapper 16:9 avec padding-bottom: 56.25%, iframe absolute │
│ - Règles : liste ordonnée, markers verts, strong en vert │
│ - Footer : bordure top verte, logo + texte centré │
│ │
│ 4. Réécrire app/page.tsx │
│ │
│ - Import RegistrationForm, Image de next/image, styles de landing.module.scss │
│ - JSX : wrapper .landing contenant les 7 sections avec IDs pour navigation par ancre │
│ - Hero CTA : <a href="#register"> pour scroll vers le formulaire │
│ │
│ 5. Ajouter smooth scroll dans style.scss │
│ │
│ - html { scroll-behavior: smooth; } │
│ │
│ 6. Vérifier │
│ │
│ - pnpm dev — vérifier visuellement les 7 sections │
│ - Tester le formulaire (inscription, redirect vers /editor) │
│ - Vérifier que /editor, /preview, /admin-view ne sont pas impactés │
│ - pnpm format:fix && pnpm lint:fix && pnpm build │
│ │
│ Points d'attention │
│ │
│ - Le style global iframe { width: 80vw; background-color: white } est overridé par la class .videoIframe (spécificité plus élevée) │
│ - Le style global form > \* { max-width: 600px } reste bénéfique pour le formulaire dans sa section │
│ - Le useEffect de redirect auto si entry?.id existe est conservé dans RegistrationForm
