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

## Deployment to GitHub Pages

If you deploy to GitHub Pages (or any subpath), set the `base` property in `vite.config.js`:

```js
export default defineConfig({
  base: "/react-router-spa/",
  plugins: [react()]
});
```

This ensures all asset and router paths work correctly when deployed to a subdirectory.

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
