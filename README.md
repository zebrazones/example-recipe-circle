# Welcome to your Lovable project

> **Sample repository.** This is an intentionally *minor-flaws* demo app for a
> ZebraZones security audit report with a **"Good to go"** verdict. It is here to
> show what a clean AI-built app looks like. Do not deploy it as-is.

## Project info

**URL**: https://lovable.dev/projects/qhbnrecipecircle0000

Recipe Circle is a small community app for sharing and discovering home recipes,
built with Lovable on top of Supabase.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/qhbnrecipecircle0000) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Data & security

The Supabase publishable (anon) key in `src/integrations/supabase/client.ts` is
meant to be public; every table is protected by Row Level Security policies in
`supabase/migrations/`, so a recipe can only be edited by the member who created
it and favorites are private to each user.
