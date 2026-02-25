---
marp: true
theme: default
paginate: true
title: Git og GitHub Basics
---

# Git og GitHub Basics

Projektfokus: React Router SPA, VS Code Source Control og GitHub Desktop

---

# Agenda

1. Grundbegreber
2. Git basics i praksis
3. Branching, Pull Request, review og merge
4. Hvad mangler ofte i undervisningen?

---

# Hvad er Git?

- Et distribueret versionsstyringssystem
- Gemmer historik over ændringer i filer
- Gør det muligt at arbejde parallelt og sikkert rulle tilbage

---

# Hvad er GitHub?

- En platform til Git repositories i skyen
- Bruges til samarbejde, Pull Requests og code review
- Kan automatisere build/deploy via GitHub Actions

---

# Hvad er et GitHub Repository?

- Projektmappe + Git historik
- Indeholder commits, branches, tags, issues og PRs
- Har typisk en stabil `main` branch

---

# Hvad er GitHub Desktop?

- Grafisk Git-klient
- God til clone, commit, push og pull uden terminal
- Jeres typiske flow:
  - GitHub: `Code -> Open with GitHub Desktop`
  - Derefter: `Open in VS Code`

---

# Hvad er Source Control i VS Code?

- VS Codes indbyggede Git-interface
- Se ændringer, stage, commit og sync
- Gør det let at koble kodearbejde og versionsstyring

---

# Hvad er GitHub Pages?

- Hosting af statiske websites direkte fra GitHub
- I dette projekt deployes via GitHub Actions
- Derfor: `main` skal holdes stabil

---

# Git Basics: `config` og `init`

- `git config`: sæt navn og email
- `git init`: opret nyt lokalt repository
- I dette forløb arbejder vi ofte i eksisterende repo og bruger `clone`

```bash
git config --global user.name "Dit Navn"
git config --global user.email "dig@email.dk"
git init
```

---

# Git Basics: `clone` i jeres setup

1. Opret repo fra template på GitHub
2. `Code -> Open with GitHub Desktop`
3. Clone lokalt
4. Åbn i VS Code
5. `npm install` og `npm run dev`

---

# Staging Area

- Staging area er "klar til næste commit"
- Giver kontrol over præcis hvilke ændringer der commit'es
- I VS Code: klik `+` for at stage filer

---

# `git add` og `git commit`

- `git add .` eller `git add <fil>` til staging
- `git commit -m "besked"` gemmer snapshot i historikken
- Commit-besked bør være kort, konkret og handlingsorienteret

```bash
git add src/pages/ServicesPage.jsx
git commit -m "Add services page and route"
```

---

# Reset / Discard (forsigtigt)

- Discard i VS Code fjerner lokale ikke-committede ændringer
- `git restore <fil>` fortryder ændringer i en fil
- Brug kun når du er sikker

```bash
git restore src/pages/HomePage.jsx
```

---

# Stash (valgfri, men nyttig)

- Gemmer midlertidigt ikke-færdigt arbejde
- God når du hurtigt skal skifte branch

```bash
git stash
git checkout main
git stash pop
```

---

# Push, Pull og Fetch

- `push`: sender lokale commits til GitHub
- `pull`: henter + integrerer ændringer
- `fetch`: henter ændringer uden at merge (mere sikkert overblik)

---

# Branching

- Arbejd i feature-branches, ikke direkte i `main`
- Branch-navne kan følge mønster:
  - `feature/add-footer`
  - `feature/add-services-page`
- Branches gør parallel udvikling mulig

---

# Pull Request (PR)

- PR er en forespørgsel om at merge branch til `main`
- Indeholder beskrivelse, commits og filændringer
- Er stedet hvor teamet giver feedback

---

# Review

- Review tjekker kvalitet før merge
- Fokus:
  - Kører løsningen?
  - Er koden læsbar?
  - Er der risiko for regressions?
  - Mangler der tests?

---

# Merge

- Når PR er godkendt, merge til `main`
- Slet branch efter merge for oprydning
- GitHub Actions deployer derefter til GitHub Pages

---

# Samlet workflow

1. Clone repository
2. Opret branch
3. Lav ændringer
4. Stage og commit
5. Push branch
6. Opret PR
7. Review og ret eventuelle kommentarer
8. Merge til `main`
9. Verificer deployment på GitHub Pages

---

# Det du evt. mangler (anbefalet)

- `git status` som fast vane
- Merge conflicts: hvordan løses de i VS Code
- `.gitignore`: hvad må ikke versionsstyres
- Beskyttelse af `main` (branch protection rules)
- En enkel commit-konvention i teamet

---

# Demo-opgave til klassen

1. Opret branch: `feature/add-footer`
2. Lav én ændring i komponent
3. Commit og push
4. Opret PR
5. Få review fra sidemand
6. Merge og verificer deployment

