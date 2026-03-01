**Purpose:** Spécifications techniques et guide de préparation des assets visuels du portfolio MBT
**Last Updated:** 2026-03-01
**Status:** Active

---

# Specs Visuels — Portfolio MBT

## Spécifications Techniques

### Format des images
- **Format préféré** : WebP
- **Fallback** : JPG (pour compatibilité)
- **PNG** : accepté pour les captures avec transparence
- **Ratio d'aspect** : 16:10 (optimal pour les placeholders actuels)
- **Résolution minimum** :
  - Desktop : 1200px de largeur
  - Mobile : 800px de largeur
- **Poids max** : 200KB par image (compresser avec TinyPNG ou Squoosh)
- **Naming** : `[projet]-[type]-[numero].webp`
  - Projets : `doctolib`, `orange`, `frello`, `ouigo`
  - Exemple : `doctolib-components-01.webp`, `ouigo-atomic-02.png`

### Exceptions au naming

| Fichier | Usage | Raison |
|---------|-------|--------|
| `photo-avatar.png` | Nav logo | Asset branding personnel |
| `photo-hero.jpg` | Section hero | Photo de présentation |

---

## Couverture attendue par projet

### Doctolib — Oxygen DS & Global UX (3 tabs)

**Tab 1 — Composants** (`doctolib-components-*`)
- Grid de composants Oxygen : Buttons, Inputs, Cards, Navigation avec states (default, hover, disabled)
- Zoom anatomie composant : annotations tokens (spacing, colors, typography)
- Composants en contexte réel : formulaire de prise de RDV

**Tab 2 — Architecture** (`doctolib-architecture-*`)
- Schéma tokens → composants → patterns → pages (flowchart)
- Token hierarchy : Core → Semantic → Component tokens

**Tab 3 — Impact** (`doctolib-impact-*`)
- Avant/Après : interface avant Oxygen vs avec Oxygen
- Annotations des améliorations (contraste, spacing, cohérence)

---

### Orange Pro — B2B Platform (2 tabs)

**Tab 1 — Parcours** (`orange-flow-*`)
- User flow abonnement complet (Entry → Search → Compare → Select → Configure → Payment → Confirmation)
- Screenshots miniatures à chaque étape du flow

**Tab 2 — Écrans** (`orange-screens-*`)
- Sélection de forfaits : interface comparative (tableau ou cards)
- Tunnel de paiement : étapes checkout avec validation inline

---

### Frello — EdTech Platform (2 tabs)

**Tab 1 — Avant/Après** (`frello-before-after-*`)
- Interface originale : problèmes de contraste, hiérarchie (annotés)
- Interface refontée : WCAG AA, contraste amélioré (badges score)

**Tab 2 — Design Tokens** (`frello-tokens-*`)
- Palette couleurs avec ratios de contraste
- Échelle typographique (font family, sizes, weights, line heights)
- Spacing scale (4px base system → 8, 16, 24, 32...)

---

### OUIGO — Cross-Brand Design System (2 tabs)

**Tab 1 — Atomic Design** (`ouigo-atomic-*`)
- Atoms : Buttons, Icons, Inputs (grid 6-8 éléments)
- Molecules : Search bar, Card, Form field
- Organisms : Header navigation, Train selection module

**Tab 2 — Booking Flow** (`ouigo-flow-*`)
- Journey map comparatif France vs Espagne
- Highlighting adaptations culturelles/linguistiques

---

## Workflow de préparation

### Étape 1 — Collecter
- [ ] Accéder aux fichiers Figma/Sketch originaux
- [ ] Rassembler screenshots d'anciennes versions si nécessaire
- [ ] Collecter documentation existante
- [ ] Demander accès aux repos/Storybook si besoin

### Étape 2 — Sélectionner
- [ ] Choisir les écrans les plus représentatifs (quality > quantity)
- [ ] Assurer diversité de contenu (avant/après, détail/vue d'ensemble)
- [ ] Masquer données sensibles (RGPD)

### Étape 3 — Préparer
- [ ] Créer mockups propres dans Figma si nécessaire
- [ ] Ajouter annotations si pertinent (pas systématique)
- [ ] Exporter en haute résolution (2x minimum)

### Étape 4 — Optimiser
- [ ] Convertir en WebP avec Squoosh.app
- [ ] Créer fallback JPG si nécessaire
- [ ] Compresser à 100-200KB max
- [ ] Nommer selon convention `[projet]-[type]-[numero].webp`

### Étape 5 — Intégrer dans l'HTML

Remplacer un `.visual-placeholder` par une vraie image :

```html
<!-- AVANT (placeholder) -->
<div class="visual-placeholder">
    <span class="placeholder-text">Button Component</span>
    <span class="placeholder-hint">Screenshot de composants</span>
</div>

<!-- APRÈS (image réelle) -->
<picture>
    <source srcset="images/doctolib-components-01.webp" type="image/webp">
    <img src="images/doctolib-components-01.jpg"
         alt="Oxygen Design System — Vue d'ensemble des composants avec states"
         loading="lazy">
</picture>
```

---

## Checklist finale

Avant de publier un visuel, vérifier :
- [ ] Résolution minimum : 1200px de largeur
- [ ] Poids optimisé : <200KB
- [ ] Format : WebP principal + JPG fallback si possible
- [ ] Alt text descriptif et précis (pas "image" ou "screenshot")
- [ ] Illustre un point précis (pas de screenshot générique)
- [ ] Aucune donnée sensible visible (noms de patients, données privées)
- [ ] Cohérent avec l'identité visuelle du portfolio
- [ ] Lisible sur mobile (testé en responsive)

---

## Bonnes pratiques

- **Consistency** : Même style d'annotations et callouts à travers tous les projets
- **Show, don't tell** : Un bon visuel se suffit à lui-même
- **Context** : Montrer les composants/screens en situation réelle
- **Quality > Quantity** : 3 visuels excellents > 10 moyens
- **Accessibilité** : Éviter rouge/vert seuls pour les daltoniens
- **Storytelling** : Ordonner les visuels pour raconter une progression

---

## Outils recommandés

### Capture
- **Figma** — Export natif haute qualité (2x/3x)
- **Cleanshot X** (Mac) — Screenshots pros avec annotations

### Optimisation
- **Squoosh.app** — Compression WebP/JPG en ligne
- **TinyPNG** — Compression PNG/JPG intelligente
- **ImageOptim** (Mac) — Batch compression

### Création de diagrammes
- **FigJam** — Flows et architecture dans Figma
- **Excalidraw** — Style hand-drawn
- **Whimsical** — Flowcharts propres

### Vérification accessibilité
- **Plugin Figma "Stark"** — Contraste couleurs
- **Chrome Lighthouse** — Audit accessibilité complet
- **Wave (webaim.org)** — Tests accessibilité live
