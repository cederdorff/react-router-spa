# Samarbejdsguide (tilpasset denne React Router SPA)

Denne guide er en tilpasset version af samarbejdsforløbet, så den matcher dette repository:

- Navigation-komponent: `src/components/Navbar.jsx`
- Global styling: `src/styles.css` (ikke `src/index.css`)
- Routes i: `src/App.jsx`
- Sider i: `src/pages/`

Git-delen i guiden er skrevet til VS Code's indbyggede Source Control (anbefalet for studerende).

## Del 1: Inviter collaborators

### Step 1.1: Inviter kollega(er)

Repository-ejer inviterer gruppedeltagere:

1. Gå til repository på GitHub.
2. Klik på **Settings**.
3. Klik på **Collaborators** i venstre menu.
4. Klik **Add people**.
5. Indtast GitHub-brugernavn eller e-mail på dine gruppemedlemmer.
6. Klik **Add [navn] to this repository**.

### Step 1.2: Alle collaborators cloner repository

Alle i gruppen:

1. Accepter invitationen.
2. Clone projektet med **Code** -> **Open with GitHub Desktop**.
3. Åbn projektet i VS Code.
4. Kør:

```bash
npm install
npm run dev
```

5. Åbn lokal URL i browser og test at løsningen kører.

### Step 1.3: Fordel opgaver i gruppen

Arbejd på forskellige features samtidig:

| Person   | Branch navn                 | Feature           | Beskrivelse                  |
| -------- | --------------------------- | ----------------- | ---------------------------- |
| Person A | `feature/add-footer`        | Footer komponent  | Tilføj footer med copyright  |
| Person B | `feature/improve-homepage`  | Forbedre HomePage | Tilføj hero-sektion og cards |
| Person C | `feature/add-services-page` | Services-side     | Ny side med services         |
| Person D | `feature/style-about-page`  | Style About-side  | Forbedre About layout        |

Hvis I kun er 3 personer, kan I selv vælge hvilke tre features I vil arbejde på, og lade den sidste være til senere eller som en bonus-opgave.

## Del 2: Samarbejde med branches og Pull Requests

### Step 2.1: Opret din branch

VS Code (anbefalet):

1. Klik på branch-navnet nederst til venstre i VS Code (typisk `main`).
2. Vælg `main` og klik `Sync Changes`, så du har seneste version.
3. Klik på branch-navnet igen.
4. Vælg **Create new branch...**.
5. Indtast dit branch-navn fra tabellen, fx `feature/add-footer`.
6. Tryk Enter.

Terminal (hvis du brugte terminalen med Git-kommandoer, vil det se sådan ud):

```bash
git checkout main
git pull origin main
git checkout -b feature/add-footer
```

### Step 2.2: Implementer din feature

#### Person A: Footer komponent

Opret `src/components/Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer>
      <p>&copy; 2026 - Lavet af [DIT NAVN]</p>
    </footer>
  );
}
```

Opdater `src/App.jsx` (tilføj `<Footer />` under Routes):

```jsx
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
```

Tilføj styling i `src/styles.css` (eller hvad du nu har lyst til):

```css
footer {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
}
```

#### Person B: Forbedre HomePage

Opdater `src/pages/HomePage.jsx` med en hero-sektion og feature cards.

Tilføj styling i `src/styles.css`:

```css
.hero {
  text-align: center;
  padding: 2rem 0;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 1rem;
}
```

#### Person C: Services-side

Opret `src/pages/ServicesPage.jsx` med et simpelt grid af services.

Tilføj route i `src/App.jsx`:

```jsx
import ServicesPage from "./pages/ServicesPage";

<Route path="/services" element={<ServicesPage />} />;
```

Tilføj link i `src/components/Navbar.jsx`:

```jsx
<NavLink to="/services">Services</NavLink>
```

Tilføj styling i `src/styles.css`:

```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.service-card {
  padding: 1.25rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

#### Person D: Style About-side

Opdater `src/pages/AboutPage.jsx` med mere indhold.

Tilføj styling i `src/styles.css`:

```css
.about-container {
  max-width: 900px;
  margin: 0 auto;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat {
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  background: #4a50c7;
  color: #fff;
}
```

### Step 2.3: Test lokalt

```bash
npm run dev
npm run lint
npm run build
```

### Step 2.4: Commit din ændring

VS Code Source Control:

1. Klik på **Source Control** i venstre side (eller `Ctrl+Shift+G` / `Cmd+Shift+G`).
2. Gennemgå filerne under **Changes**.
3. Skriv commit-besked i feltet **Message**.
4. Klik **Commit**.

Forslag til beskeder:

- `feat: add footer component`
- `feat: improve homepage hero section`
- `feat: add services page and route`
- `feat: restyle about page`

### Step 2.5: Push branch

VS Code Source Control:

1. Klik **Publish Branch** (første gang), eller **Sync Changes**.
2. Bekræft at branchen pushes til `origin`.

Terminal (valgfrit):

```bash
git push -u origin <din-branch>
```

### Step 2.6: Opret Pull Request

I PR-beskrivelsen:

1. Hvad er ændret?
2. Hvorfor er det ændret?
3. Hvordan er det testet?
4. Link til issue (fx `Closes #12`)

### Step 2.7: Review hinandens PRs

Hver person reviewer mindst en andens PR under **Files changed** og giver enten:

- approval, eller
- konkret feedback med forbedringsforslag.

### Step 2.8: Merge PRs en ad gangen

Merge kun en PR ad gangen for at minimere konflikter.

### Step 2.9: Opdater din branch med `main`

Hvis din PR ikke er merged endnu, brug VS Code:

1. Skift til `main` via branch-navnet nederst til venstre.
2. Klik **Sync Changes**.
3. Skift tilbage til din feature-branch.
4. Åbn Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).
5. Vælg **Git: Merge Branch...**.
6. Vælg `main`.
7. Hvis der opstår konflikter: løs dem i editoren, commit, og klik **Sync Changes**.

Terminal (valgfrit):

```bash
git checkout main
git pull origin main
git checkout <din-branch>
git merge main
git push
```

### Step 2.10: Opdater lokal `main` efter alle merges

VS Code Source Control:

1. Skift til branch `main`.
2. Klik **Sync Changes** for at hente alle merged features.
3. Test appen:

```bash
npm run dev
```

## Del 3: Best Practices

### Gode commit-beskeder

Godt:

- `feat: add contact form validation`
- `fix: resolve navbar active state bug`
- `docs: add collaboration walkthrough`

Undgå:

- `changes`
- `fix`
- `update`

### Branch naming

- `feature/...` ny funktionalitet
- `fix/...` fejlrettelser
- `chore/...` maintenance
- `refactor/...` intern omstrukturering

### Pull Request best practices

1. En feature per PR.
2. Hold PRs små.
3. Test altid for PR.
4. Besvar review-kommentarer.

## Del 4: Troubleshooting

### Problem: GitHub Pages viser 404

Tjek:

1. `package.json` har korrekt `base`, fx `/react-router-spa/`
2. `src/main.jsx` bruger `basename={import.meta.env.BASE_URL}`
3. GitHub Pages er sat til **GitHub Actions**
4. Deployment workflow er grønt i **Actions**

### Problem: Routing virker ikke på GitHub Pages

Tjek at routes lever i `src/App.jsx` og at deployment bygger med korrekt `base`.

### Problem: CSS eller billeder mangler

1. Tjek stier i komponenter.
2. Kør:

```bash
npm run build
```

3. Push igen og vent på ny deploy.

### Problem: `npm install` fejler

1. Tjek Node-version:

```bash
node -v
```

2. Brug Node 18+.
3. Slet `node_modules` og kør `npm install` igen.

## Del 5: Næste skridt

Når I har fulgt guiden, har I:

- inviteret collaborators
- arbejdet med branches
- oprettet og reviewed PRs
- merged sikkert til `main`
- verificeret deployment på GitHub Pages
