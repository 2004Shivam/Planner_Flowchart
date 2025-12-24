---
description: How to deploy the Career Roadmap application to Vercel
---

# Deploying to Vercel

Follow these steps to deploy your React flowchart application to Vercel.

## Option 1: Vercel GitHub Integration (Recommended for Beginners)

This is the easiest way to keep your site updated automatically whenever you make changes.

1.  **Push your code to GitHub**:
    -   Create a new repository on GitHub.
    -   Run these commands in your terminal:
        ```bash
        git init
        git add .
        git commit -m "initial commit"
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git branch -M main
        git push -u origin main
        ```
2.  **Connect to Vercel**:
    -   Go to [vercel.com](https://vercel.com) and sign in with GitHub.
    -   Click **"Add New"** > **"Project"**.
    -   Import your GitHub repository.
3.  **Configure Build Settings**:
    -   Framework Preset: **Vite** (Vercel should detect this automatically).
    -   Build Command: `npm run build`.
    -   Output Directory: `dist`.
4.  **Deploy**: Click **"Deploy"**. Your site will be live in a few minutes!

## Option 2: Vercel CLI (For CLI Lovers)

If you want to deploy directly from your terminal without using GitHub:

1.  **Run Vercel CLI via npx**:
    ```bash
    npx vercel
    ```
2.  **Follow the prompts**:
    -   Log in if asked.
    -   Set up and deploy? **Yes**.
    -   Which scope? **(Select yours)**.
    -   Link to existing project? **No**.
    -   What's your project's name? **(Keep default or name it)**.
    -   In which directory is your code located? `./`.
    -   Want to modify settings? **No** (Vercel detects Vite automatically).
3.  **Production Deployment**:
    -   Once the preview deployment is done, run:
        ```bash
        npx vercel --prod
        ```

## Build Checklist
- Ensure `npm run build` works locally before deploying.
- Check that all files in `src/app/data/planData.ts` are saved.
