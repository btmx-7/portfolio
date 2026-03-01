---
name: token-audit
description: Vérifie la cohérence entre les tokens CSS (styles.css) et le fichier JSON DTCG (export/tokens.json). Trigger sur /token-audit ou quand l'utilisateur demande de vérifier la cohérence des tokens.
version: 1.1.0
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

Vérifier que `export/tokens.json` correspond exactement aux valeurs définies dans `styles.css` (source de vérité).

## Source de vérité

**`styles.css`** est TOUJOURS la source de vérité. Le JSON reflète le CSS, jamais l'inverse.

## Structure de `tokens.json`

Fichier unique avec 4 sets (clés de premier niveau) :
- `primitives` — palette brute, espacements, radius, typographie
- `light` — tokens sémantiques mode clair (aliases vers `{primitives.color.*}`)
- `dark` — tokens sémantiques mode sombre
- `work` — sous-système Work section (L1/L2/L3)

## Mapping CSS → JSON

| CSS Variable | Set | Chemin token |
|-------------|-----|-------------|
| `--color-background` | `light` / `dark` | `light.color.background` / `dark.color.background` |
| `--color-surface` | `light` / `dark` | `light.color.surface` / `dark.color.surface` |
| `--color-surface-elevated` | `light` / `dark` | `light.color.surface-elevated` |
| `--color-text` | `light` / `dark` | `light.color.text` / `dark.color.text` |
| `--color-text-secondary` | `light` / `dark` | `light.color.text-secondary` |
| `--color-text-muted` | `light` / `dark` | `light.color.text-muted` |
| `--color-border` | `light` / `dark` | `light.color.border` / `dark.color.border` |
| `--color-accent` | `light` / `dark` | `light.color.accent` / `dark.color.accent` |
| `--work-l1-bg` | `work` | `work.l1.bg` |
| `--work-l1-text` | `work` | `work.l1.text` |
| `--work-l2-bg` | `work` | `work.l2.bg` |
| `--work-l2-border` | `work` | `work.l2.border` |
| `--work-l2-text` | `work` | `work.l2.text` |
| `--work-l2-text-2` | `work` | `work.l2.text-2` |
| `--work-l2-text-3` | `work` | `work.l2.text-3` |
| `--work-l2-meta-bg` | `work` | `work.l2.meta-bg` |
| `--work-l2-type-color` | `work` | `work.l2.type-color` |
| `--work-l3-bg` | `work` | `work.l3.bg` |
| `--work-accent` | `work` | `work.accent` |

## Procédure d'audit

### Étape 1 — Extraire les CSS vars

Lire `styles.css`, extraire toutes les custom properties du bloc `:root` et du bloc `html[data-theme="dark"]`.

### Étape 2 — Lire le JSON

Lire `export/tokens.json`. Identifier les 4 sets de premier niveau.

### Étape 3 — Résoudre les aliases

Pour chaque token avec `$value` contenant `{primitives.color.*}`, résoudre depuis la section `primitives.color` du même fichier.

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
- --color-background → light.color.background → #F2EDE4 ✓
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
- Les tokens shadow (`--shadow-*`) ne sont pas dans le JSON. Attendus manquants.
- Les tokens spacing/radius/typography sont dans `primitives.*` — les vérifier séparément si demandé.
