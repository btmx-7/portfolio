**Purpose:** Index des skills Claude Code disponibles pour le portfolio MBT
**Last Updated:** 2026-03-01
**Status:** Active

---

# Skills Claude Code — Portfolio MBT

Skills disponibles dans ce projet. Invoquer via le trigger indiqué.

## token-audit

**Trigger :** `/token-audit`

Vérifie la cohérence entre les variables CSS (`styles.css`) et les tokens JSON (`export/*.json`).

Rapport structuré :
- ✅ Cohérents — valeur CSS = valeur JSON résolue
- ❌ Désalignés — valeur CSS ≠ valeur JSON
- ⚠️ Manquants — CSS var sans token JSON correspondant
- ⚠️ Orphelins — token JSON sans CSS var correspondante

→ [SKILL.md](token-audit/SKILL.md)

---

## token-fix

**Trigger :** `/token-fix`

Corrige les fichiers JSON (`export/`) pour les aligner sur `styles.css`.
**CSS = source de vérité. Ne modifie jamais `styles.css`.**

Mode complet : `/token-fix --full` (audit → fix → vérification)

→ [SKILL.md](token-fix/SKILL.md)

---

## visual-audit

**Trigger :** `/visual-audit`

Vérifie les assets visuels du dossier `images/` contre les specs de `docs/visual-specs.md`.

Rapport structuré :
- Inventaire des fichiers présents vs attendus
- Conformité naming convention (`[projet]-[type]-[numero].webp`)
- Couverture par projet × onglet visuel
- Présence des alt texts dans `index.html`

→ [SKILL.md](visual-audit/SKILL.md)
