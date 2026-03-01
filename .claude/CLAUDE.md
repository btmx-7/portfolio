# Portfolio Michaël Blancon Tardi — Instructions Claude Code

**Last Updated:** 2026-03-01
**Status:** Active

---

## Qui suis-je

**Michaël Blancon Tardi (MBT)** — Senior Product Designer, spécialisé Design Systems.

**Expertise principale :**
- Architecture de design systems (token-driven, accessibility-first, scalable)
- Figma craft avancé — recrafting de composants, documentation, gouvernance
- Accessibilité WCAG AA — conformité EU Accessibility Act
- Design × Engineering — collaboration technique serrée, spec dev-ready
- Design tokens et theming — systèmes light/dark, multi-product

**Projets portfolio :**
- **Doctolib — Oxygen DS & Global UX** (2022–présent) : design system santé, 45+ composants, 35+ designers supportés quotidiennement
- **Orange Pro** (2020–2022) : refonte B2B platform, subscription flow, cross-team collaboration
- **Frello** (2020–2021) : EdTech, consolidation brand + accessibilité, DS foundations
- **OUIGO** (2020–2021) : cross-brand design system, adaptation marché espagnol

---

## Style de communication

**Direct. Expert-to-expert. Pas de fluff.**

### ❌ À éviter
- Formules d'encouragement ("Bonne idée !", "C'est intéressant...", "Super travail !")
- Reformulations évidentes avant de répondre
- Explications de concepts que je maîtrise
- Amortisseurs avant les mauvaises nouvelles

### ✅ À faire
- Réponse directe d'abord, contexte ensuite si nécessaire
- Problème identifié → solution proposée → actions concrètes
- Si quelque chose ne marche pas : le dire clairement, sans édulcorer
- Assumer la compétence — ne pas hand-holder

**Rapport d'état :** Verdict → Données → Actions. Jamais l'inverse.

---

## Architecture du projet

### Structure des fichiers

```
portfolio-main/
├── index.html          ← source HTML, bilingue FR/EN (data-fr / data-en)
├── styles.css          ← SOURCE DE VÉRITÉ pour tous les tokens design
├── script.js           ← interactivité (theme toggle, lang switch, form)
├── images/             ← assets visuels (voir docs/visual-specs.md)
├── docs/
│   └── visual-specs.md ← specs techniques des visuels projet
├── export/             ← JSON DTCG pour import Penpot (NE PAS éditer manuellement)
│   ├── 00-primitives.json
│   ├── 01-light.json
│   ├── 02-dark.json
│   ├── 03-work.json
│   └── README.md
└── skills/             ← skills Claude Code
    ├── token-audit/SKILL.md
    ├── token-fix/SKILL.md
    └── visual-audit/SKILL.md
```

### Règle fondamentale

**`styles.css` est la source de vérité.** Toute modification de design se fait dans le CSS.
Les fichiers `export/*.json` reflètent le CSS — ne jamais les éditer en premier.

---

## Système de design (état actuel)

### Palette & Thèmes

| Thème | Background | Accent | Texte |
|-------|-----------|--------|-------|
| Light | `#F2EDE4` (calcaire) | `#3A7A5A` (chêne vert) | `#1C1E26` |
| Dark  | `#0C0E1A` (nuit indigo) | `#C46828` (soleil couchant) | `#DDD3C4` |

### Hiérarchie des tokens CSS

```
--primitive-*   ← palette brute (ne jamais utiliser directement sur composants)
--color-*       ← sémantiques light / overrides dark via html[data-theme="dark"]
--work-*        ← sous-système Work section uniquement
```

### Pattern Work section — Imbrication inversée

L1 dark → L2 light → L3 glass :
- **L1** : `.work` fond `#0C0E1A` (`--work-l1-bg`)
- **L2** : `.project` cartes `#F2EDE4` (`--work-l2-bg`) qui émergent du fond sombre
- **L3** : `.project-visuals` glass clair (`backdrop-filter: blur + saturate`)

### Typographie

- Display : **Plus Jakarta Sans** — titres, labels, eyebrows, UI
- Body : **Work Sans** — corps de texte, descriptions

### Sections HTML

| Section | ID | Classe | Rôle |
|---------|----|----|------|
| Navigation | `nav` | `.nav` | Fixed top — logo + links + theme toggle + lang switch |
| Hero | `hero` | `.hero` | Intro MBT + photo + CTAs |
| About | `about` | `.about` | Narrative carrière + expertise |
| Work | `work` | `.work` | 4 projets (L1 dark section + L2 light cards) |
| Process | `process` | `.process` | Méthode en 4 étapes |
| Contact | `contact` | `.contact` | Form + liens sociaux |

### Internationalisation

Tous les textes en `data-fr` + `data-en`. Langue active gérée via `#langSwitch` + JS.
Theme toggle via `#themeToggle` → `html[data-theme="dark"]`.

---

## Skills disponibles

| Skill | Trigger | Action |
|-------|---------|--------|
| `token-audit` | `/token-audit` | Vérifie cohérence CSS ↔ JSON tokens, rapport des écarts |
| `token-fix` | `/token-fix` | Corrige les JSON pour aligner sur CSS (CSS = source de vérité) |
| `visual-audit` | `/visual-audit` | Vérifie assets images/ vs specs (formats, tailles, naming) |

---

## Conventions de code

- **Commits** : Conventional Commits — `feat:`, `fix:`, `style:`, `docs:`, `chore:`
- **Nommage CSS** : BEM-light (`.project-header`, `.outcome-card`) — pas de profondeur excessive
- **Images** : WebP préféré, PNG accepté · max 200KB · naming `[projet]-[section]-[description]`
- **Tokens** : préfixe `--work-` pour work section, `--color-` pour sémantiques globaux, `--primitive-` pour palette brute
- **HTML** : `data-fr` / `data-en` sur tous les textes visibles · `aria-label` sur tous les boutons interactifs
- **Accessibilité** : WCAG AA minimum sur tous les contrastes texte/fond
