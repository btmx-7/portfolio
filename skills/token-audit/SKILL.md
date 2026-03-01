---
name: token-audit
description: Vérifie la cohérence entre les tokens CSS (styles.css) et les fichiers JSON DTCG (export/*.json). Trigger sur /token-audit ou quand l'utilisateur demande de vérifier la cohérence des tokens.
version: 1.0.0
author: Portfolio MBT
triggers:
  - /token-audit
  - token audit
  - vérifier tokens
  - check tokens
category: design-system
tags:
  - tokens
  - css
  - penpot
  - audit
allowed-tools:
  - Read
  - Grep
  - Glob
---

**Purpose:** Auditer la cohérence entre les custom properties CSS et les tokens JSON DTCG du portfolio.
**Last Updated:** 2026-03-01
**Status:** Active

---

## Objectif

Vérifier que les fichiers `export/*.json` (tokens Penpot) correspondent exactement aux valeurs définies dans `styles.css` (source de vérité).

## Source de vérité

**`styles.css`** est TOUJOURS la source de vérité. Les JSON reflètent le CSS, jamais l'inverse.

## Mapping CSS → JSON

| CSS Variable | Set JSON | Token JSON |
|-------------|---------|-----------|
| `--primitive-bg` | 00-primitives | `primitive.color.cream` |
| `--primitive-ink` | 00-primitives | `primitive.color.ink` |
| `--primitive-accent-rgb` | 00-primitives | `primitive.color.green` (RGB) |
| `--color-background` | 01-light / 02-dark | `color.background` |
| `--color-surface` | 01-light / 02-dark | `color.surface` |
| `--color-surface-elevated` | 01-light / 02-dark | `color.surface-elevated` |
| `--color-text` | 01-light / 02-dark | `color.text` |
| `--color-text-secondary` | 01-light / 02-dark | `color.text-secondary` |
| `--color-text-muted` | 01-light / 02-dark | `color.text-muted` |
| `--color-border` | 01-light / 02-dark | `color.border` |
| `--color-accent` | 01-light / 02-dark | `color.accent` |
| `--work-l1-bg` | 03-work | `work.l1.bg` |
| `--work-l1-text` | 03-work | `work.l1.text` |
| `--work-l2-bg` | 03-work | `work.l2.bg` |
| `--work-l2-border` | 03-work | `work.l2.border` |
| `--work-l2-text` | 03-work | `work.l2.text` |
| `--work-l2-text-2` | 03-work | `work.l2.text-2` |
| `--work-l2-text-3` | 03-work | `work.l2.text-3` |
| `--work-l2-meta-bg` | 03-work | `work.l2.meta-bg` |
| `--work-l2-type-color` | 03-work | `work.l2.type-color` |
| `--work-l3-bg` | 03-work | `work.l3.bg` |
| `--work-accent` | 03-work | `work.accent` |

## Procédure d'audit

### Étape 1 — Extraire les CSS vars

Lire `styles.css`, extraire toutes les custom properties du bloc `:root` et du bloc `html[data-theme="dark"]`.

### Étape 2 — Lire les JSON

Lire `export/00-primitives.json`, `export/01-light.json`, `export/02-dark.json`, `export/03-work.json`.

### Étape 3 — Résoudre les aliases

Pour chaque token JSON avec `$value` contenant `{primitive.color.*}`, résoudre la valeur réelle depuis `00-primitives.json`.

### Étape 4 — Comparer

Pour chaque CSS var dans le mapping :
1. Extraire la valeur CSS (ex: `#F2EDE4`)
2. Trouver le token JSON correspondant
3. Résoudre sa valeur (alias → valeur réelle)
4. Comparer (case-insensitive, normaliser `#f2ede4` = `#F2EDE4`)

### Étape 5 — Rapport

Produire un rapport structuré :

```
## Rapport token-audit — [date]

### ✅ Cohérents (N tokens)
- --color-background → color.background → #F2EDE4 ✓
...

### ❌ Désalignés (N tokens)
- --work-accent (CSS: #C46828) ≠ work.accent (JSON: #c46820) → écart détecté
...

### ⚠️ Manquants dans JSON (CSS var sans token)
- --color-nav-bg : rgba(242, 237, 228, 0.95) → pas de token DTCG (opacity composée, attendu)
...

### ⚠️ Orphelins dans JSON (token sans CSS var)
- work.l1.border → aucune CSS var correspondante trouvée
...

### Résumé
✅ X cohérents · ❌ Y désalignés · ⚠️ Z manquants · ⚠️ W orphelins
→ Action recommandée : exécuter /token-fix pour corriger les désalignements.
```

## Notes

- Les tokens à opacité variable (ex: `--work-l1-text-2: rgba(221,211,196,0.60)`) n'ont pas d'équivalent exact en DTCG. Ce sont des ⚠️ attendus, pas des ❌. Les documenter mais ne pas les signaler comme erreurs.
- Les tokens shadow (`--shadow-*`, `--work-l2-shadow`) ne sont pas dans les JSON (format DTCG shadow non utilisé). Attendus manquants.
- Les tokens spacing/radius/typography ne sont PAS des couleurs — les traiter séparément (vérifier `00-primitives.json` section `primitive.space.*`, `primitive.radius.*`).
