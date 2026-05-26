# Supabase setup til Posts

Denne guide viser, hvordan I forbinder projektets `/posts` side til en Supabase `posts` tabel via Supabase REST API.

Projektet bruger ikke `@supabase/supabase-js`. Det bruger almindelig `fetch` i `src/pages/PostsPage.jsx`.

Målet er, at `/posts` kan vise data fra Supabase. I behøver ikke skrive SQL for at følge guiden.

## 1. Opret Supabase projekt

1. Gå til https://supabase.com og opret/log ind.
2. Opret et nyt projekt.
3. Vent til projektet er klar.

## 2. Opret `posts` tabel

Hvis tabellen allerede er oprettet eller importeret af underviseren, kan I gå videre til næste afsnit.

Hvis I selv opretter tabellen manuelt i Supabase:

1. Gå til **Table Editor**.
2. Klik **Create a new table**.
3. Kald tabellen `posts`.
4. Sørg for, at tabellen har disse kolonner:

| Kolonne      | Type        | Bruges til                         |
| ------------ | ----------- | ---------------------------------- |
| `id`         | int8/bigint | Unikt id til React `key`           |
| `created_at` | timestamptz | Tidspunkt for posten               |
| `caption`    | text        | Teksten der vises under billedet   |
| `image`      | text        | URL til billedet                   |

Det vigtigste for React-koden er, at kolonnerne hedder præcis `id`, `created_at`, `caption` og `image`.

## 3. Tilføj eller importer data

Hvis underviseren har udleveret data, kan I importere dem i Supabase eller indtaste rækkerne manuelt i **Table Editor**.

Hver række skal fx have:

```text
caption: Delicious food at the restaurant
image: https://images.unsplash.com/photo-1548940740-204726a19be3?auto=format&fit=crop&w=500&q=80
```

`image` skal være en fuld URL til et billede.

## 4. Tjek Row Level Security

Hvis `/posts` skal kunne hente data uden login, skal tabellen tillade offentlig læsning.

1. Gå til tabellen `posts` i Supabase.
2. Find **RLS** / **Policies**.
3. Sørg for, at Row Level Security er slået til.
4. Opret en policy, der tillader `SELECT` / read access for public/anon users.

RLS står for Row Level Security. Tabellen må gerne læses offentligt i denne starter, men kun fordi I eksplicit giver lov til offentlig læsning.

Hvis underviseren allerede har sat tabellen og policies op, skal I ikke ændre noget her. I skal bare vide, at dette er grunden til, at React-appen må læse data fra Supabase.

Hvis I er i tvivl, så test først `/posts`. Hvis siden viser posts, er adgangen sat rigtigt op.

## 5. Find URL og publishable key

1. Find Data API URL i Supabase Dashboard under **Integrations** -> **Data API**.
2. Find publishable key under **Settings** -> **API Keys**.
3. REST endpointet til tabellen skal ende på `/rest/v1/posts`.

Eksempel:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co/rest/v1/posts
VITE_SUPABASE_APIKEY=sb_publishable_your_key_here
```

Brug en publishable key i frontend. Brug aldrig secret key eller service role key i React-kode, `.env` filer til Vite eller GitHub Pages builds.

## 6. Opsæt lokal `.env`

Projektet har en fil, der hedder `.env.example`. Den er en skabelon.

I skal lave en kopi af den og kalde kopien `.env`.

Manuel måde:

1. Find `.env.example` i VS Code.
2. Kopiér filen.
3. Omdøb kopien til `.env`.
4. Udfyld værdierne i `.env`.

Terminal-måde:

```bash
cp .env.example .env
```

Kommandoen betyder: kopiér `.env.example` og lav en ny fil, der hedder `.env`. Det er det samme som at kopiere filen manuelt i VS Code.

Udfyld `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co/rest/v1/posts
VITE_SUPABASE_APIKEY=sb_publishable_your_key_here
```

Genstart Vite, hver gang `.env` ændres:

```bash
npm run dev
```

Åbn derefter:

```text
http://localhost:5173/posts
```

## 7. Opsæt GitHub Pages miljøvariabler

`.env` bliver ikke pushet til GitHub. Derfor skal GitHub Actions også have variablerne, ellers virker `/posts` kun lokalt.

1. Gå til repository på GitHub.
2. Gå til **Settings** -> **Secrets and variables** -> **Actions**.
3. Vælg fanen **Variables**.
4. Opret disse repository variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_APIKEY
```

Workflowet i `.github/workflows/deploy.yml` sender variablerne videre til `npm run build`.

## Hvis underviseren vil vise SQL

Denne kode gør det samme som de manuelle trin ovenfor. Spring afsnittet over, hvis I ikke arbejder med SQL endnu.

```sql
create table public.posts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  caption text not null,
  image text not null
);

alter table public.posts enable row level security;

create policy "Allow public read access to posts"
on public.posts
for select
to anon
using (true);
```

Eksempeldata:

```sql
insert into public.posts (caption, image)
values
  (
    'Delicious food at the restaurant',
    'https://images.unsplash.com/photo-1548940740-204726a19be3?auto=format&fit=crop&w=500&q=80'
  ),
  (
    'Exploring the city center',
    'https://images.unsplash.com/photo-1612624629424-ddde915d3dc5?auto=format&fit=crop&w=500&q=80'
  ),
  (
    'A cozy morning with coffee',
    'https://images.unsplash.com/photo-1545319261-f3760f9dd64d?auto=format&fit=crop&w=500&q=80'
  );
```

## Fejlfinding

Hvis `/posts` er tom:

1. Tjek at tabellen hedder `posts`.
2. Tjek at tabellen har rækker med `caption` og `image`.
3. Tjek at `.env` findes lokalt og starter med `VITE_`.
4. Genstart Vite dev-serveren.
5. Tjek at Supabase RLS policy tillader `select` for `anon`.

Hvis GitHub Pages virker, men `/posts` ikke viser data:

1. Tjek repository variables i GitHub Actions.
2. Kør et nyt workflow ved at pushe en lille ændring.
3. Åbn browserens DevTools -> Network og se om kaldet til Supabase får `200`.
