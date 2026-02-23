# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Image Usage in React

You can display images in three ways:

1. **Import from `src/assets`**
   - Import the image at the top of your component. Vite will bundle and hash the file for you.
   - Example:
     ```jsx
     import logo from "../assets/logo.svg";
     <img src={logo} alt="Logo" />;
     ```
2. **Public folder**
   - Place the image in the `/public` folder and reference it by path (e.g. `/logo.svg`).
   - This is served as-is, no processing or hashing.
   - Note: For GitHub Pages, see the deployment section below.
3. **External URL**
   - Use a full URL to load an image from the internet.

## Deployment to GitHub Pages (SPA)

If you deploy to GitHub Pages (or any subpath), your Vite config should set the `base` property dynamically:

```js
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/react-router-spa/",
  plugins: [react()]
}));
```

In your `src/main.jsx`, set the `basename` prop on `BrowserRouter`:

```jsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <App />
</BrowserRouter>
```

### SPA 404 Fallback

GitHub Pages does not support client-side routing out of the box. To enable SPA routing (so deep links and refreshes work), add a `public/404.html` file that matches your `index.html` and includes a meta refresh to redirect to your app root. This template already includes a suitable `404.html`.

**If you change your repo name, update the base path in `vite.config.js` and redeploy.**

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
