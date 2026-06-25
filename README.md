# Incalculable

Application web Next.js pour PC et mobile, avec une interface tres epuree, un prompt central et un Parchemin modifiable cote serveur.

## Demarrage local

```bash
npm install
npm run dev
```

L'application est disponible sur `http://localhost:3000`.

## Configuration API / modele

La configuration se fait dans `.env.local`.

Le plus simple:

1. Copier `.env.example` en `.env.local`
2. Remplir la cle API
3. Redemarrer `npm run dev`

```env
LLM_PROVIDER=big-pickle
LLM_MODEL=big-pickle
LLM_API_KEY=ta_cle_api
LLM_BASE_URL=https://opencode.ai/zen/v1
```

L'application appelle ensuite:

```text
POST {LLM_BASE_URL}/chat/completions
```

avec le modele indique dans `LLM_MODEL`.

Si `LLM_API_KEY` est vide, l'application renvoie une erreur claire. Il n'y a plus de reponse simulee: les prompts passent directement par Big Pickle.

### Variables dediees Big Pickle

Tu peux aussi utiliser ces variables, si tu preferes garder le nom du fournisseur visible:

```env
LLM_PROVIDER=big-pickle
OPENCODE_API_KEY=ta_cle_api
OPENCODE_BASE_URL=https://opencode.ai/zen/v1
BIG_PICKLE_MODEL=big-pickle
```

Les variables generiques `LLM_MODEL`, `LLM_API_KEY` et `LLM_BASE_URL` restent prioritaires si elles sont definies.

## Dossier Parchemin

Le dossier important est:

```text
parchemin/
```

Il contient maintenant les sources protegees du Parchemin:

- `01-Contexte d'intention ( Manifesto ).md`
- `02- Colonne vertéblrale (coeur-invariant).md`
- `03-Protocole de fonctionnement ( runtime).yaml`
- `04- Tests.yaml`
- `README.md` : aide rapide sur le dossier

Ces 4 fichiers sont lus dans cet ordre et assembles cote serveur avant l'appel au modele.

Regle de protection: ces fichiers ne doivent pas etre modifies, renommes ou reformates sans autorisation explicite.

Ne jamais mettre de cle API dans ce dossier.

## Structure importante

- `parchemin/01...` a `parchemin/04...` : Parchemin actif charge cote serveur
- `config/public/1-manifeste.md` : document public expose en lecture seule
- `config/public/2-protocole.md` : document public expose en lecture seule
- `src/lib/llmConfig.ts` : configuration du fournisseur IA
- `src/lib/modelGateway.ts` : appel API compatible `/chat/completions`
- `src/lib/parcheminRegistry.ts` : chargement / sauvegarde du Parchemin actif
- `src/lib/promptBuilder.ts` : assemblage du prompt systeme
- `src/app/api/chat/route.ts` : endpoint de conversation
- `src/app/admin/parchemin/page.tsx` : interface admin minimale

## Tests

```bash
npm run test:unit
npm run test:e2e
npm run build
```

## Deploiement Vercel

Sur Vercel, ajouter les memes variables d'environnement que dans `.env.local`:

```env
LLM_PROVIDER=big-pickle
LLM_MODEL=big-pickle
LLM_API_KEY=ta_cle_api
LLM_BASE_URL=https://opencode.ai/zen/v1
```

Puis redeployer.

## Notes d'architecture

- Le Parchemin n'est pas code en dur dans `promptBuilder.ts`.
- Le modele cible est Big Pickle.
- L'API attend le format `/chat/completions` expose par OpenCode Zen.
- Les documents publics restent separes des instructions serveur.
