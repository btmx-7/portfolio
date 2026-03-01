**Purpose:** Instructions d'import des design tokens dans Penpot
**Last Updated:** 2026-03-01
**Status:** Active

---

# Import des Design Tokens dans Penpot

## Fichier à importer : `tokens.json`

Un seul fichier combine tous les sets. C'est le seul fichier à importer dans Penpot.

> Les fichiers `00-primitives.json`, `01-light.json`, `02-dark.json`, `03-work.json` sont des **références documentaires** — ne pas les importer directement (chaque import écrase tout).

---

## Architecture des sets

Le fichier `tokens.json` contient 4 sets (clés de premier niveau) :

| Clé (set name) | Contenu |
|----------------|---------|
| `primitives`   | Palette brute, espacements, radius, typographie |
| `light`        | Tokens sémantiques — mode Midi en Occitanie |
| `dark`         | Tokens sémantiques — mode Crépuscule |
| `work`         | Sous-système section Work (L1/L2/L3) |

---

## Import step-by-step

### 1. Ouvrir l'onglet Tokens

Dans Penpot, ouvre le fichier de design portfolio.
Clique sur l'onglet **TOKENS** (icône `{ }` dans la sidebar droite).

### 2. Importer `tokens.json`

1. Clique sur le menu → **Import tokens**
2. Sélectionne `export/tokens.json`
3. Clique **IMPORT SINGLE JSON FILE**
4. Confirme (l'import écrase les tokens existants)

→ Les 4 sets apparaissent dans le panneau TOKENS : `primitives`, `light`, `dark`, `work`

### 3. Créer les Themes

Dans l'onglet TOKENS → **Themes** :

**Theme Light (Midi en Occitanie) :**
- Activer : `primitives` ✓
- Activer : `light` ✓
- Activer : `work` ✓
- Désactiver : `dark`

**Theme Dark (Crépuscule) :**
- Activer : `primitives` ✓
- Activer : `dark` ✓
- Activer : `work` ✓
- Désactiver : `light`

### 4. Vérifier le switch de thème

Teste le switch Light ↔ Dark :
- `light.color.accent` → `#3A7A5A` (chêne vert)
- `dark.color.accent` → `#C46828` (soleil couchant)
- `work.*` reste identique dans les deux thèmes

---

## Tokens à opacité variable

Couleur solide dans le JSON, opacité appliquée manuellement sur le shape Penpot :

| Token | Couleur hex | Opacité shape |
|-------|------------|---------------|
| `work.l1.text-2` | `#DDD3C4` | **60%** |
| `work.l1.text-3` | `#DDD3C4` | **35%** |
| `work.l1.border` | `#FFFFFF` | **8%** |
| `work.l2.type-border` | `#3A7A5A` | **30%** |
| `work.l2.type-bg` | `#3A7A5A` | **6%** |
| `work.l3.bg` | `#FDFAF6` | **55%** |
| `work.l3.border` | `#FFFFFF` | **55%** |
| `work.l3.tabs-bg` | `#FFFFFF` | **28%** |
| `work.l3.tabs-border` | `#1C1E26` | **8%** |
| `work.l3.ph-bg` | `#FFFFFF` | **50%** |
| `work.l3.ph-border` | `#1C1E26` | **12%** |

---

## Mise à jour des tokens

**Source de vérité : `styles.css`**

Workflow :
1. Modifier `styles.css`
2. Lancer `/token-audit` → identifier les écarts
3. Lancer `/token-fix` → corriger `tokens.json` automatiquement
4. Réimporter `tokens.json` dans Penpot

---

## Références CSS ↔ Tokens

| CSS var | Token path dans `tokens.json` |
|---------|-------------------------------|
| `--color-background` | `light.color.background` / `dark.color.background` |
| `--color-accent` | `light.color.accent` / `dark.color.accent` |
| `--color-text` | `light.color.text` / `dark.color.text` |
| `--color-border` | `light.color.border` / `dark.color.border` |
| `--work-l1-bg` | `work.l1.bg` |
| `--work-l2-bg` | `work.l2.bg` |
| `--work-l2-type-color` | `work.l2.type-color` |
| `--work-l3-bg` | `work.l3.bg` |
| `--work-accent` | `work.accent` |
