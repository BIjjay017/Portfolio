# Tailwind CSS (Vite + React)

This project uses Tailwind CSS via PostCSS. Quick notes to keep everything consistent:

- Tailwind config: `tailwind.config.js` includes the `content` globs for `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`.
- PostCSS: `postcss.config.js` uses `tailwindcss` and `autoprefixer` plugins.
- Import the compiled Tailwind CSS once at the app entrypoint: `src/main.jsx` — `import './styles/main.css'` (do not import it again in `App.jsx`).
- Dev server: `npm run dev` — restart the dev server whenever you change `tailwind.config.js` to pick up config updates.
- Build: `npm run build` and preview locally with `npm run preview`.

Tips:
- Use utility-first classes in React components (`className`) and keep styles small; extend in `tailwind.config.js` when needed.
- If you need custom colors, add them in `theme.extend.colors` and reference them as `text-primary-blue`, `bg-primary-green/10`, etc.
- To ensure consistent design, prefer using the `primary` scale you see in `tailwind.config.js` rather than ad-hoc hex values.