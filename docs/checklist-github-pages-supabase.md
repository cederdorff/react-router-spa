# Tjekliste: GitHub Pages, React Router og Supabase

Brug denne tjekliste, hvis projektet ikke er lavet ud fra starter-templaten, eller hvis noget ikke virker efter deployment.

## A. React Router på GitHub Pages

### Projektet

- Projektet er et Vite React projekt.
- `npm install` er kørt.
- `npm run dev` virker lokalt.
- `npm run build` kan bygge projektet uden fejl.
- React Router er installeret:

```bash
npm install react-router
```

### Router setup

- Appen bruger `BrowserRouter` i `src/main.jsx`.
- `BrowserRouter` bruger `basename={import.meta.env.BASE_URL}`.

Eksempel:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

- Routes ligger i fx `src/App.jsx`.
- Interne links bruger `Link` eller `NavLink` fra `react-router`, ikke almindelige `<a href="">`.

### Base path

GitHub Pages deployer ofte projektet på en URL som:

```text
https://brugernavn.github.io/repository-navn/
```

Derfor skal Vite kende repository-navnet.

- `package.json` har en `base` værdi, der matcher repository-navnet:

```json
"base": "/repository-navn/"
```

- `vite.config.js` bruger denne `base` ved build:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === "serve" ? "/" : pkg.base,
  };
});
```

### Filer og assets

- `index.html` loader React med absolut sti:

```html
<script type="module" src="/src/main.jsx"></script>
```

- Filer fra `public/` bruger `import.meta.env.BASE_URL`, hvis de bruges i React:

```jsx
const imageUrl = `${import.meta.env.BASE_URL}logo.webp`;
```

### GitHub Pages setup

- GitHub repository er pushet til GitHub.
- GitHub Pages er sat til **GitHub Actions** under **Settings** -> **Pages**.
- Projektet har en workflow-fil i `.github/workflows/deploy.yml`.
- Workflowet kører `npm ci`.
- Workflowet kører `npm run build`.
- Workflowet uploader `dist`.
- Workflowet kopierer `dist/index.html` til `dist/404.html`.

`404.html` er vigtigt for React Router. Det gør, at refresh på fx `/about` eller `/posts` stadig åbner React-appen.

Eksempel på step:

```yaml
- name: Copy index.html to 404.html for SPA routing
  run: cp ./dist/index.html ./dist/404.html
```

### Test efter deployment

- GitHub Actions workflow er grønt.
- Forsiden virker på GitHub Pages.
- En underside virker, fx `/about`.
- Refresh på en underside virker.
- Direkte åbning af en underside virker.

## B. Supabase i React

### Supabase setup

- Supabase projektet findes.
- Der findes en tabel, der hedder `posts`.
- Tabellen har kolonnerne:

| Kolonne      | Type        |
| ------------ | ----------- |
| `id`         | int8/bigint |
| `created_at` | timestamptz |
| `caption`    | text        |
| `image`      | text        |

- Tabellen har mindst 2-3 test-rækker.
- `image` indeholder fulde billed-URL'er.
- Tabellen må læses offentligt via Supabase RLS/policies.

### Lokale env-filer

- Projektet har en `.env.example`.
- `.env.example` viser hvilke variabler projektet kræver:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co/rest/v1/posts
VITE_SUPABASE_APIKEY=sb_publishable_your_key_here
```

- Projektet har en lokal `.env` med rigtige værdier.
- `.env` er ikke committtet til GitHub.
- `.gitignore` ignorerer `.env`.
- Vite dev-serveren er genstartet efter ændringer i `.env`.

### React fetch

- React-koden læser env-variabler med `import.meta.env`.
- Fetch-kaldet sender Supabase API key i headers.
- Data gemmes i state.
- Siden mapper over data og viser posts.

Eksempel:

```jsx
const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

const response = await fetch(URL, { headers });
const data = await response.json();
setPosts(data);
```

### Supabase på GitHub Pages

`.env` findes kun lokalt. GitHub Pages buildet skal derfor også have Supabase værdierne.

- GitHub repository har disse repository variables under **Settings** -> **Secrets and variables** -> **Actions** -> **Variables**:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_APIKEY
```

- `deploy.yml` sender variablerne videre til `npm run build`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_SUPABASE_URL: ${{ vars.VITE_SUPABASE_URL }}
    VITE_SUPABASE_APIKEY: ${{ vars.VITE_SUPABASE_APIKEY }}
```

### Test Supabase

- `/posts` virker lokalt.
- `/posts` virker på GitHub Pages.
- Browserens DevTools -> Network viser et kald til Supabase.
- Supabase-kaldet får status `200`.

## Hurtig fejlfinding

Hvis GitHub Pages viser 404 på undersider:

- Tjek `basename={import.meta.env.BASE_URL}`.
- Tjek `base` i `package.json`.
- Tjek `base` i `vite.config.js`.
- Tjek at `dist/index.html` kopieres til `dist/404.html`.

Hvis CSS eller billeder mangler:

- Tjek `base`.
- Tjek stier til filer i `public/`.
- Brug `import.meta.env.BASE_URL` til public assets i React.

Hvis `/posts` virker lokalt, men ikke på GitHub Pages:

- Tjek GitHub repository variables.
- Tjek at variablerne sendes med i `deploy.yml`.
- Kør deployment igen.

Hvis `/posts` er tom:

- Tjek at Supabase-tabellen hedder `posts`.
- Tjek at kolonnerne hedder `caption` og `image`.
- Tjek at tabellen har data.
- Tjek RLS/policies i Supabase.
