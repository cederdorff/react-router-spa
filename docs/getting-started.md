# Getting Started Guide

This guide walks you through creating your own project from this template and deploying it to GitHub Pages.

## 1. Use the Template

1. Open the template repository: https://github.com/cederdorff/react-router-spa
2. Click **Use this template** -> **Create a new repository**.
3. Enter a repository name (for example, `customer-experience`).
4. Set visibility to **Public** (recommended for GitHub Pages and for RACE access).
5. Click **Create repository**.

## 2. Enable GitHub Pages

1. In your new repository, go to **Settings**.
2. In the left menu, click **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Enable **Enforce HTTPS**.

![GitHub Pages settings with GitHub Actions source](./images/pages-settings.png)

## 3. Clone the Repository

1. Go to the repository front page (**Code** tab).
2. Click **Code** -> **Open with GitHub Desktop**.
3. In GitHub Desktop, choose where to save the project.
4. After cloning, click **Open in Visual Studio Code**.

![Repository Code menu with Open with GitHub Desktop](./images/code-open-github-desktop.png)

## 4. Run the Project Locally

In the project folder, in VS Code, run:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal and verify the app works in your browser.

## 5. Configure the Base Path

1. Open `package.json`.
2. Find the `base` field.
3. Set it to your repository name, with a leading and trailing slash:

```json
"base": "/my-repo-name/"
```

Example: if your repository is `react-web-app`, use:

```json
"base": "/react-web-app/"
```

4. Optional: update `"name"` to match your project name (without slashes).

![package.json with name and base highlighted](./images/package-json-base.png)

## 6. Commit and Push

1. In GitHub Desktop, write a commit message.
2. Click **Commit to main**.
3. Click **Sync Changes** (push to GitHub).

![Commit and Sync Changes in GitHub Desktop](./images/github-desktop-sync.png)

## 7. Verify Deployment

1. In GitHub, open the **Actions** tab.
   ![GitHub Actions workflow running](./images/actions-running.png)
2. Wait for the deploy workflow to complete successfully.
3. Open the finished workflow run.
   ![GitHub Actions workflow completed](./images/actions-completed.png)
4. Click the deployed URL and test the site in your browser.
   ![Deployment URL in workflow summary](./images/deployment-url.png)  
   ![The Deployed solution in browser](./images/deployed-solution.png)

Deployment complete.

## 8. Test Deployment with a Small Change

This step confirms your GitHub Pages deployment updates after a new push.

### 8.1 Make a Small Change

Open `src/pages/HomePage.jsx` and update a visible text string. For example:

```jsx
<p>Welcome to the home page.</p>
```

to:

```jsx
<p>Welcome to my first React app on GitHub Pages.</p>
```

### 8.2 Commit and Push the Change

Preferred (VS Code Source Control):

1. Open Source Control (`Ctrl+Shift+G` on Windows/Linux, `Cmd+Shift+G` on macOS).
2. Confirm the file change.
3. Add commit message: `"Update homepage text"`.
4. Click **Commit**.
5. Click **Sync Changes**.

Reference (GitHub Desktop):

1. Open GitHub Desktop.
2. Confirm the change in `src/pages/HomePage.jsx`.
3. Add commit message: `"Update homepage text"`.
4. Click **Commit to main**.
5. Click **Push origin** (or **Sync Changes**).

### 8.3 Follow the Deployment

1. Open your repository on GitHub.
2. Go to the **Actions** tab.
3. Wait for the deployment workflow to run and finish with a green check.
4. Open your live site URL and refresh the page.
5. Confirm your text change is visible online.

Tip: deployment usually takes 1-3 minutes after push.
