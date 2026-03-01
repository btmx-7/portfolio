---
name: token-fix
description: Corrige les désalignements entre styles.css et export/*.json. Exécute d'abord token-audit, puis met à jour les JSON pour aligner sur le CSS. CSS = source de vérité absolue. Trigger sur /token-fix.
version: 1.0.0
author: Portfolio MBT
triggers:
  - /token-fix
  - corriger tokens
  - fix tokens
  - sync tokens
category: design-system
tags:
  - tokens
  - css
  - penpot
  - fix
  - sync
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

**Purpose:** Corriger automatiquement les fichiers JSON DTCG pour les aligner sur styles.css.
**Last Updated:** 2026-03-01
**Status:** Active

---

## Règle absolue

**`styles.css` est la source de vérité.** Ne jamais modifier `styles.css`, `index.html`, ou `script.js` pour corriger un désalignement token. Toujours corriger les JSON.

## Procédure

### Phase 1 — Audit

Exécuter le skill `token-audit` (lire SKILL.md dans `skills/token-audit/`) pour obtenir la liste des désalignements.

Si 0 désalignements → reporter "✅ Aucun écart détecté. JSON synchronisés avec CSS." et arrêter.

### Phase 2 — Correction par type de désalignement

#### Cas A : Valeur JSON en dur ≠ valeur CSS

```
CSS : --work-accent = #C46828
JSON (03-work.json) : work.accent.$value = "#c46820"  ← typo
```

Action : Mettre à jour la valeur dans le JSON correspondant.

#### Cas B : Alias résolu ≠ valeur CSS

```
CSS : --color-background = #F2EDE4
JSON : color.background.$value = "{primitive.color.cream}"
       primitive.color.cream.$value = "#F2EDF4"  ← valeur primitive incorrecte
```

Action : Corriger la valeur primitive dans `export/00-primitives.json`.
Ne pas casser les autres alias qui pointent vers le même primitif.

#### Cas C : CSS var sans token JSON

```
CSS : --color-error = #C0392B
JSON : aucun token correspondant
```

Action : Créer le token dans le set approprié (`01-light.json` pour les couleurs sémantiques).

#### Cas D : Token JSON orphelin (sans CSS var)

Signaler dans le rapport, ne pas supprimer automatiquement (peut être intentionnel).

### Phase 3 — Écriture des corrections

Modifier uniquement les fichiers JSON dans `export/`. Utiliser l'outil Edit pour les modifications chirurgicales (ne pas réécrire les fichiers entiers sauf si plusieurs corrections dans un même fichier).

### Phase 4 — Vérification

Re-exécuter token-audit après les corrections. Reporter le résultat final.

```
## Rapport token-fix — [date]

### Corrections appliquées
- work.accent : #c46820 → #C46828 (typo corrigée)
- primitive.color.cream : #F2EDF4 → #F2EDE4 (valeur incorrecte)

### Résultat final
✅ 0 désalignements restants après correction.
JSON synchronisés avec styles.css.
```

## Cas particuliers — Ne PAS corriger automatiquement

| Situation | Pourquoi |
|-----------|---------|
| Tokens à opacité variable (`rgba(x,x,x,0.6)`) | Opacité gérée dans Penpot, pas dans DTCG |
| Tokens shadow (`--shadow-*`, `--work-l2-shadow`) | Non représentables en DTCG color |
| Tokens non-couleur sans correspondance JSON | Les spacing/radius/font sont dans 00-primitives |
| Token orphelin dans JSON | Peut être intentionnel (future use) — signaler seulement |

## Mode `--full`

Si invoqué avec `--full` (`/token-fix --full`) :
1. Audit initial → rapport
2. Corrections → appliquer toutes les corrections automatiques
3. Audit de vérification → confirmer 0 écart
4. Rapport final consolidé
