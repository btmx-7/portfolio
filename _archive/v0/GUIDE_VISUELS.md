# Guide des Visuels pour Portfolio

Ce guide détaille les types de visuels recommandés pour chaque projet et comment les préparer.

## 📐 Spécifications Techniques

### Format des images
- **Format recommandé**: WebP avec fallback JPG
- **Ratio d'aspect**: 16:10 (optimal pour les placeholders actuels)
- **Résolution**: 
  - Desktop: 1200px de largeur minimum
  - Mobile: 800px de largeur minimum
- **Poids**: Max 200KB par image (compresser avec TinyPNG ou Squoosh)
- **Naming**: projet-type-numero.webp (ex: `doctolib-components-01.webp`)

---

## 🎨 Types de Visuels par Projet

### **Projet 1: Doctolib — Oxygen Design System**

#### Tab 1: Composants
**Objectif**: Montrer la richesse et la cohérence du système

**Suggestions visuels**:
1. **Grid de composants**
   - Screenshot de la librairie Figma avec 6-8 composants clés
   - Vue en grille montrant: Buttons, Inputs, Cards, Modals, Navigation
   - Afficher les variants (states: default, hover, active, disabled)
   
2. **Composant en détail**
   - Zoom sur un composant complexe (ex: DatePicker)
   - Montrer l'anatomie: spacing, colors, typography tokens
   - Annotations avec flèches montrant les tokens utilisés

3. **Composants en contexte**
   - Screenshot d'une vraie interface utilisant 4-5 composants
   - Montrer comment ils s'assemblent dans un parcours réel
   - Exemple: formulaire de prise de RDV avec inputs + buttons + calendar

**Comment créer**:
```
Option A: Screenshots Figma
- Ouvrir votre librairie Oxygen
- Capturer une page avec composants bien organisés
- Ajouter annotations si besoin (Figma ou après avec Excalidraw)

Option B: Storybook
- Capturer plusieurs stories en grid
- Utiliser l'outil "Canvas" de Storybook pour screenshots propres
```

#### Tab 2: Architecture
**Objectif**: Démontrer votre pensée systémique

**Suggestions visuels**:
1. **Schéma d'architecture**
   - Diagramme tokens → composants → patterns → pages
   - Visualiser les layers du design system
   - Style: Flowchart ou diagramme architectural
   
2. **Token hierarchy**
   - Arbre décisionnel des tokens
   - Ex: Core tokens → Semantic tokens → Component tokens
   - Visualiser l'héritage et les références

**Comment créer**:
```
Outils recommandés:
- Figma avec plugin "Autoflow" pour flowcharts
- Whimsical pour diagrammes
- Miro pour architecture complexe
- Excalidraw pour style sketch/wireframe

Template suggéré:
┌─────────────┐
│ Core Tokens │ (colors, spacing, typography)
└──────┬──────┘
       │
┌──────▼────────┐
│Semantic Tokens│ (primary, secondary, error)
└──────┬────────┘
       │
┌──────▼────────┐
│  Components   │ (Button, Input, Card)
└──────┬────────┘
       │
┌──────▼────────┐
│   Patterns    │ (Forms, Navigation)
└───────────────┘
```

#### Tab 3: Impact
**Objectif**: Montrer la transformation avant/après

**Suggestions visuels**:
1. **Avant: Interface inconsistante**
   - Screenshot d'une vieille interface Doctolib (avant Oxygen)
   - Montrer l'incohérence: boutons différents, spacing variable, colors disparates
   - Annotations soulignant les problèmes

2. **Après: Avec Oxygen DS**
   - Même écran refait avec Oxygen
   - Montrer la cohérence, l'alignement, les couleurs harmonieuses
   - Annotations positives: "Spacing cohérent", "WCAG AA compliant"

**Comment créer**:
```
Si pas d'accès aux anciennes versions:
- Créer un mockup "avant" avec des inconsistances volontaires
- Documenter en équipe ou chercher dans les archives Git
- Utiliser Wayback Machine pour anciennes captures

Pour les annotations:
- Figma: Ajouter des sticky notes ou text boxes
- Photoshop/Sketch: Layer d'annotations
- Snagit: Outil d'annotation puissant
```

---

### **Projet 2: Orange Pro — B2B Platform**

#### Tab 1: Parcours
**Objectif**: Montrer votre travail sur les user flows

**Suggestions visuels**:
1. **User flow d'abonnement complet**
   - Diagramme du parcours step-by-step
   - Inclure decision points, error states
   - Style: Flowchart avec screenshots miniatures à chaque étape

**Comment créer**:
```
Outils:
- Figma avec plugin "FigJam" ou "Autoflow"
- Overflow (spécialisé user flows)
- Whimsical
- Miro avec template User Flow

Structure recommandée:
[Entry] → [Search] → [Compare] → [Select] → [Configure] → [Payment] → [Confirmation]
   ↓         ↓          ↓           ↓           ↓            ↓           ↓
[screens] [screens] [screens]  [screens]   [screens]    [screens]   [screens]
```

#### Tab 2: Écrans
**Objectif**: Showcaser les interfaces finales

**Suggestions visuels**:
1. **Sélection de forfaits**
   - Interface comparative (tableau ou cards)
   - Montrer le design system en action

2. **Tunnel de paiement**
   - Étapes du checkout
   - Montrer la progression, validation inline

**Comment créer**:
```
Screenshots haute résolution:
- Mockups dans Figma avec données réelles
- Capturer avec "Export" > 2x ou 3x pour qualité
- Utiliser Cleanshot X (Mac) ou Greenshot (PC) pour annotations
```

---

### **Projet 3: Frello — EdTech Platform**

#### Tab 1: Avant/Après
**Objectif**: Démontrer l'amélioration UX et accessibilité

**Suggestions visuels**:
1. **Interface originale**
   - Montrer problèmes de contraste, hiérarchie
   - Annoter les points d'amélioration

2. **Interface refontée**
   - Même écran avec accessibilité améliorée
   - Montrer score de contraste (WCAG AA/AAA)
   - Annotations positives

**Comment créer**:
```
Test accessibilité:
- Plugin Figma "Stark" pour contraste
- Wave (webaim.org) pour tests live
- Chrome DevTools Lighthouse

Captures d'écran:
- Mode avant/après en split screen
- Ajouter badges: "WCAG AA ✓" "Contrast 7:1"
```

#### Tab 2: Design Tokens
**Objectif**: Montrer les fondations du système

**Suggestions visuels**:
1. **Palette de couleurs**
   - Couleurs primaires, secondaires, neutres
   - Montrer les tokens et leurs usages
   - Inclure ratios de contraste

2. **Typographie**
   - Échelle typographique
   - Line heights, weights
   - Exemples d'usage

3. **Espacements**
   - Scale: 4px, 8px, 16px, 24px, 32px...
   - Montrer grid 8pt system

**Comment créer**:
```
Template tokens:
┌─────────────────────────┐
│ COLORS                  │
│ Primary:   #2E5BFF      │
│ Secondary: #8C54FF      │
│ Success:   #00C48C      │
│ Error:     #FF647C      │
│                         │
│ TYPOGRAPHY              │
│ Heading:   2rem / Bold  │
│ Body:      1rem / Regular│
│ Caption:   0.875rem     │
└─────────────────────────┘

Outils:
- Figma: Page dédiée "Foundations"
- Design Tokens plugin
- Export en image haute résolution
```

---

### **Projet 4: OUIGO — Design System**

#### Tab 1: Atomic Design
**Objectif**: Illustrer la méthodologie Atomic Design

**Suggestions visuels**:
1. **Atoms (Atomes)**
   - Boutons, icônes, inputs basiques
   - Grid de 6-8 atoms

2. **Molecules (Molécules)**
   - Search bar (input + button)
   - Card (image + title + CTA)
   - Form field (label + input + error)

3. **Organisms (Organismes)**
   - Header navigation complet
   - Train selection module
   - Checkout summary

**Comment créer**:
```
Organisation visuelle:

┌───────────────────────────────┐
│ ATOMS                         │
│ [Button] [Icon] [Input]       │
└───────────────────────────────┘
         ↓
┌───────────────────────────────┐
│ MOLECULES                     │
│ [Search Bar] [Card]           │
└───────────────────────────────┘
         ↓
┌───────────────────────────────┐
│ ORGANISMS                     │
│ [Header] [Product Selector]   │
└───────────────────────────────┘

Dans Figma:
- Créer une page "Atomic Design Overview"
- Organiser en 3 frames verticaux
- Ajouter flèches montrant la composition
```

#### Tab 2: Booking Flow
**Objectif**: Montrer l'adaptation au marché espagnol

**Suggestions visuels**:
1. **Journey map comparatif**
   - France vs Espagne
   - Highlighting des différences UX
   - Adaptations culturelles/linguistiques

**Comment créer**:
```
Format suggéré:

France:  [Step 1] → [Step 2] → [Step 3] → [Step 4]
              ↕            ↕           ↕          ↕
España:  [Step 1] → [Step 2] → [Step 3] → [Step 4]
         (adapted) (new CTA)  (payment)  (email)

Outils:
- Figma avec plugin "User Flows"
- Miro avec template Journey Map
- Annotations pour expliquer adaptations
```

---

## 🛠️ Workflow de Préparation des Visuels

### Étape 1: Collecter
- [ ] Accéder à vos fichiers Figma/Sketch originaux
- [ ] Rassembler screenshots d'anciennes versions
- [ ] Collecter documentation existante
- [ ] Demander accès aux repos/Storybook si besoin

### Étape 2: Sélectionner
- [ ] Choisir les écrans les plus représentatifs
- [ ] Privilégier la clarté sur la quantité
- [ ] Assurer diversité (mobile + desktop)

### Étape 3: Préparer
- [ ] Créer mockups propres dans Figma
- [ ] Masquer données sensibles (RGPD)
- [ ] Ajouter annotations si pertinent
- [ ] Exporter en haute résolution

### Étape 4: Optimiser
- [ ] Convertir en WebP avec Squoosh.app
- [ ] Créer fallback JPG
- [ ] Compresser à ~100-200KB max
- [ ] Nommer de façon cohérente

### Étape 5: Intégrer
```html
<!-- Remplacer le placeholder par : -->
<div class="visual-item">
    <picture>
        <source srcset="images/doctolib-components-01.webp" type="image/webp">
        <img src="images/doctolib-components-01.jpg" 
             alt="Oxygen Design System - Vue d'ensemble des composants"
             loading="lazy">
    </picture>
    <div class="visual-caption">
        Vue d'ensemble des composants du Design System Oxygen
    </div>
</div>
```

---

## 📊 Exemples de Visuels Performants

### ✅ Bon exemple: Composant détaillé
```
┌─────────────────────────────────────┐
│  Button Component                   │
│                                     │
│  [Default] [Hover] [Active]         │
│  [Disabled] [Loading]               │
│                                     │
│  Spacing: 16px horizontal           │
│  Height: 40px                       │
│  Border-radius: 8px                 │
│  Typography: Semibold 14px          │
└─────────────────────────────────────┘
```

### ✅ Bon exemple: Avant/Après
```
AVANT                    APRÈS
┌──────────┐    →    ┌──────────┐
│ Bouton 1 │         │ [Button] │
│ Button2  │         │ [Button] │
│ BOUTON3  │         │ [Button] │
└──────────┘         └──────────┘
Incohérent          Cohérent ✓
```

### ❌ Mauvais exemple: Trop d'infos
- Image surchargée avec 20 composants invisibles
- Texte illisible
- Pas de focus clair

### ❌ Mauvais exemple: Trop vide
- Screenshot d'une page blanche
- Pas de contexte
- N'illustre rien de concret

---

## 🎯 Checklist Finale

Avant de publier, vérifier que chaque visuel:
- [ ] Est en haute résolution (min 1200px largeur)
- [ ] A un poids optimisé (<200KB)
- [ ] Est au format WebP + JPG fallback
- [ ] A un alt text descriptif
- [ ] Illustre clairement un point précis
- [ ] Ne contient pas de données sensibles
- [ ] Est cohérent avec votre identité visuelle
- [ ] Fonctionne en responsive (lisible sur mobile)

---

## 💡 Astuces Pro

1. **Consistency is key**: Utilisez le même style d'annotations/callouts à travers tous les projets

2. **Show, don't tell**: Un bon visuel se suffit à lui-même, les annotations sont un bonus

3. **Context matters**: Montrez toujours les composants/screens en situation réelle

4. **Quality > Quantity**: 3 visuels excellents valent mieux que 10 moyens

5. **Accessibilité**: Assurez-vous que vos visuels sont compréhensibles même par des daltoniens (éviter rouge/vert seuls)

6. **Mobile-first**: Testez que tous vos visuels sont lisibles sur mobile

7. **Storytelling**: Ordonnez vos visuels pour raconter une histoire cohérente

---

## 📚 Ressources Utiles

### Outils de capture
- **Cleanshot X** (Mac) - Screenshots professionnels avec annotations
- **Snagit** (Win/Mac) - Capture + édition puissante
- **Figma** - Export natif haute qualité
- **Chrome DevTools** - Device mode pour responsive

### Optimisation d'images
- **Squoosh.app** - Compression WebP/JPG en ligne
- **TinyPNG** - Compression PNG/JPG intelligente
- **ImageOptim** (Mac) - Batch compression

### Création de diagrammes
- **Excalidraw** - Sketchy, hand-drawn style
- **Whimsical** - Flowcharts & wireframes propres
- **Miro** - Collaboration & journey maps
- **FigJam** - Dans Figma, idéal pour flows

### Annotations & callouts
- **Figma plugins**: 
  - Annotate
  - Redlines
  - Stark (accessibilité)
- **Snagit** - Outils d'annotation intégrés
- **Skitch** - Simple et efficace

---

## 🔄 Mise à jour des Visuels

Pour remplacer un placeholder par une vraie image dans le HTML:

```html
<!-- AVANT (placeholder) -->
<div class="visual-placeholder">
    <span class="placeholder-text">Button Component</span>
    <span class="placeholder-hint">Screenshot de composants</span>
</div>

<!-- APRÈS (image réelle) -->
<picture>
    <source srcset="images/doctolib-components.webp" type="image/webp">
    <img src="images/doctolib-components.jpg" 
         alt="Oxygen Design System - Composants buttons avec tous leurs états"
         loading="lazy">
</picture>
```

Les styles CSS sont déjà prêts pour supporter les vraies images !

---

Besoin d'aide pour créer un type de visuel spécifique ? N'hésitez pas à demander des exemples concrets ! 🎨
