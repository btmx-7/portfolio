**Purpose:** Instructions d'import des design tokens dans Penpot
**Last Updated:** 2026-03-01
**Status:** Active

---

# Import des Design Tokens dans Penpot

Les 4 fichiers JSON de ce dossier suivent le format W3C DTCG (Design Token Community Group).
Ils correspondent aux tokens CSS de `styles.css`, organisés en sets hiérarchiques.

## Architecture des sets

| Fichier | Set Penpot | Contenu |
|---------|-----------|---------|
| `00-primitives.json` | `primitives` | Palette brute, espacements, typographie |
| `01-light.json` | `light` | Tokens sémantiques — mode Midi en Occitanie |
| `02-dark.json` | `dark` | Tokens sémantiques — mode Crépuscule |
| `03-work.json` | `work` | Sous-système section Work (L1/L2/L3) |

## Import step-by-step

### 1. Ouvrir l'onglet Tokens

Dans Penpot, ouvre le fichier de design portfolio.
Clique sur l'onglet **TOKENS** (icône `{ }` dans la sidebar droite).

### 2. Importer les 4 sets

Pour chaque fichier (dans cet ordre) :

1. Clique sur **+** → **Import tokens**
2. Sélectionne le fichier JSON
3. Donne le nom du set :
   - `00-primitives.json` → nom : `primitives`
   - `01-light.json` → nom : `light`
   - `02-dark.json` → nom : `dark`
   - `03-work.json` → nom : `work`

**Ordre recommandé :** primitives → light → dark → work
(Les sets `light`, `dark` et `work` contiennent des aliases vers `primitives` — importer les primitives en premier garantit la résolution correcte.)

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
- `color.accent` doit passer de `#3A7A5A` (chêne vert) à `#C46828` (soleil couchant)
- `color.background` doit passer de `#F2EDE4` (calcaire) à `#0C0E1A` (nuit indigo)
- `work.*` reste identique dans les deux thèmes (section Work a son propre système inversé)

---

## Tokens à opacité variable

Certains tokens sont définis avec une couleur solide dans le JSON, mais doivent être appliqués avec une opacité spécifique sur le shape Penpot.

| Token JSON | Couleur | Opacité shape |
|-----------|---------|---------------|
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

> **Pourquoi ?** Le format DTCG standard ne supporte pas les couleurs avec opacité variable encodée dans le token. L'opacité est une propriété du shape Penpot, pas de la couleur.

---

## Mise à jour des tokens

**Source de vérité : `styles.css`**

Ne jamais éditer les JSON directement. Workflow :
1. Modifier `styles.css`
2. Lancer `/token-audit` → identifier les écarts
3. Lancer `/token-fix` → corriger les JSON automatiquement
4. Réimporter les JSON modifiés dans Penpot

---

## Références CSS ↔ Tokens

| CSS var (`styles.css`) | Token JSON | Set |
|------------------------|-----------|-----|
| `--color-background` | `color.background` | `light` / `dark` |
| `--color-surface` | `color.surface` | `light` / `dark` |
| `--color-text` | `color.text` | `light` / `dark` |
| `--color-accent` | `color.accent` | `light` / `dark` |
| `--color-border` | `color.border` | `light` / `dark` |
| `--work-l1-bg` | `work.l1.bg` | `work` |
| `--work-l2-bg` | `work.l2.bg` | `work` |
| `--work-l2-type-color` | `work.l2.type-color` | `work` |
| `--work-l3-bg` | `work.l3.bg` | `work` |
| `--work-accent` | `work.accent` | `work` |
