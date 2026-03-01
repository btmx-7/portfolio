---
name: visual-audit
description: Vérifie les assets visuels du portfolio (images/) contre les specs techniques définies dans docs/visual-specs.md. Rapport de conformité par projet et par tab. Trigger sur /visual-audit.
version: 1.0.0
author: Portfolio MBT
triggers:
  - /visual-audit
  - audit visuels
  - vérifier images
  - check images
category: portfolio
tags:
  - images
  - assets
  - audit
  - visual
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

**Purpose:** Auditer les assets visuels du portfolio contre les specs de docs/visual-specs.md.
**Last Updated:** 2026-03-01
**Status:** Active

---

## Objectif

Vérifier que les images dans `images/` sont conformes aux specs et que chaque tab visuel de chaque projet a ses assets.

## Sources de référence

- **Specs techniques** : `docs/visual-specs.md`
- **HTML source** : `index.html` (pour identifier les placeholders vs vraies images)
- **Assets** : `images/` directory

## Procédure d'audit

### Phase 1 — Inventaire des assets

Lister tous les fichiers dans `images/` (Glob `images/**/*`).
Pour chaque fichier, noter :
- Nom de fichier
- Extension (webp/png/jpg/jpeg)
- Taille (Bash: `du -sh images/fichier`)

### Phase 2 — Vérification du naming

Convention attendue : `[projet]-[type]-[numero].[ext]`
Projets valides : `doctolib`, `orange`, `frello`, `ouigo`
Extensions valides : `.webp` (préféré), `.png`, `.jpg`

Signaler tout fichier qui ne respecte pas cette convention.

### Phase 3 — Vérification de la couverture

Pour chaque projet × tab, vérifier si une image existe dans `images/` :

| Projet | Tab | Pattern attendu |
|--------|-----|----------------|
| Doctolib | Composants | `doctolib-components-*` |
| Doctolib | Architecture | `doctolib-architecture-*` |
| Doctolib | Impact | `doctolib-impact-*` |
| Orange Pro | Parcours | `orange-flow-*` |
| Orange Pro | Écrans | `orange-screens-*` |
| Frello | Avant/Après | `frello-before-after-*` |
| Frello | Tokens | `frello-tokens-*` |
| OUIGO | Atomic Design | `ouigo-atomic-*` |
| OUIGO | Booking Flow | `ouigo-flow-*` |

### Phase 4 — Vérification des alt texts

Lire `index.html`, identifier les balises `<img>` dans les sections `.visual-grid` ou `.visual-item`.
Vérifier que chaque `<img>` a un attribut `alt` non vide.

### Phase 5 — Rapport

```
## Rapport visual-audit — [date]

### Inventaire
Total : N fichiers dans images/
  - N WebP · N PNG · N JPG

### Naming (conformité)
✅ Conformes : N fichiers
❌ Non conformes :
  - photo-avatar.png → ok (asset nav, exception acceptée)
  - hero-photo.jpg → ok (asset hero, exception acceptée)

### Couverture par projet

| Projet | Tab | Status | Fichiers |
|--------|-----|--------|---------|
| Doctolib | Composants | ✅/❌/⚠️ | fichiers trouvés |
| ... | ... | ... | ... |

✅ = au moins 1 image trouvée
❌ = aucune image (placeholder HTML actif)
⚠️ = image présente mais naming non conforme

### Alt texts
✅ N images avec alt text valide
❌ N images sans alt text

### Résumé
- Coverage : X/9 tabs visuels couverts (X%)
- Naming conformes : X/N (%)
- Alt texts : X/N (%)

→ Actions prioritaires :
  1. Préparer assets pour : [tabs manquants]
  2. Corriger naming : [fichiers non conformes]
  3. Ajouter alt texts : [images concernées]
```

## Notes

- `images/photo-avatar.png` et `images/photo-hero.jpg` sont des assets nav/hero, pas des visuels projet. Exclure du rapport de couverture projet.
- Les placeholders HTML (`.visual-placeholder`) sont des ❌ attendus — indiquer quel contenu préparer selon `docs/visual-specs.md`.
- Ne pas signaler l'absence d'image si le tab HTML n'est pas encore implémenté.
