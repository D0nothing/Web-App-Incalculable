# Incalculable

Application web Next.js pensée pour une expérience PC et mobile, avec un Parchemin éditable côté serveur et une exposition publique en lecture seule.

## Objectif

Le projet sépare trois choses:

- l’expérience publique, qui présente la position d’Incalculable et expose les documents fondateurs;
- le Parchemin actif, chargé côté serveur avant chaque réponse IA;
- la page admin, réservée à l’édition du Parchemin.

## Démarrage local

```bash
npm install
npm run dev
```

L’app est disponible sur `http://localhost:3000`.

## Configuration IA

Copie `.env.example` vers `.env.local` puis ajuste les variables:

```env
LLM_PROVIDER=openai
LLM_MODEL=gpt-4.1-mini
LLM_API_KEY=
LLM_BASE_URL=https://api.openai.com/v1
```

Si `LLM_API_KEY` est vide, l’application garde une réponse simulée.

## Structure importante

- `config/parchemin.md` : Parchemin actif chargé côté serveur
- `config/public/1-manifeste.md` : document public exposé en lecture seule
- `config/public/2-protocole.md` : document public exposé en lecture seule
- `src/lib/publicDocs.ts` : lecture et découpage des documents publics
- `src/lib/parcheminRegistry.ts` : chargement / sauvegarde du Parchemin actif
- `src/lib/promptBuilder.ts` : assemblage du prompt système
- `src/app/api/chat/route.ts` : endpoint de conversation
- `src/app/api/parchemin/public/route.ts` : endpoint des documents publics
- `src/app/admin/parchemin/page.tsx` : interface admin minimale

## Parcours public

La page d’accueil propose:

- des boutons en haut pour naviguer entre les sections;
- une lecture complète du manifeste et du protocole;
- un lecteur avec ancres pour parcourir les longues sections;
- un chat en bas de page;
- l’import de fichiers `.txt` et `.md`.

## Tests

```bash
npm run test:unit
npm run test:e2e
npm run build
```

Les tests unitaires couvrent:

- le parseur de documents;
- la classification de politique;
- le chargement des documents publics.

Le test E2E vérifie:

- le rendu de la page d’accueil;
- les lecteurs de documents publics;
- la navigation par ancres.

## Déploiement Vercel

Le dépôt est prêt pour Vercel dès que le repo GitHub est connecté au projet Vercel.

Bon réflexe avant un déploiement:

```bash
npm run build
npm run test:unit
npm run test:e2e
```

## Notes d’architecture

- Le Parchemin n’est pas codé en dur dans `promptBuilder.ts`.
- Le contenu public est exposé sans possibilité de modification depuis l’interface publique.
- La page admin reste séparée de l’expérience utilisateur principale.
- Le menu latéral et les ancres servent à naviguer dans les documents longs sans quitter la page.
