# Bijay Portfolio

Visit the portfolio using the link: [bijayshreepali.com.np](https://www.bijayshreepali.com.np/)

## Component Integration Notes

### Current Stack Status

- Tailwind CSS: already configured and active.
- shadcn-style structure: already present with `src/components/ui` and `src/lib/utils.js` (`cn`).
- TypeScript: not initialized for the full app yet (project is currently JSX-first).
- Required dependencies for the integrated component:
	- `framer-motion` (already installed)
	- `lucide-react` (already installed)

### Default Paths In This Repo

- Component primitives path: `src/components/ui`
- Shared app components path: `src/components`
- Styles path: `src/styles/main.css`
- Utility path for `cn`: `src/lib/utils.js`

### Why Keep Reusable UI In `src/components/ui`

Keeping reusable primitives in `src/components/ui` makes imports predictable, keeps design tokens centralized, and matches shadcn conventions used by most examples and generators. This avoids fragmented component placement and reduces future migration friction.

## If You Need shadcn CLI Setup

If this repo did not already have the structure, the setup would be:

```bash
npx shadcn@latest init
```

When prompted in Vite projects, use:

- Style: your preference (default is fine)
- Components path: `src/components`
- Utils path: `src/lib/utils`
- Base color: your preference
- CSS file: `src/styles/main.css`

## If You Need TypeScript Enablement (Optional)

This project currently runs in JSX and can stay that way. To enable TypeScript incrementally:

```bash
npm install -D typescript @types/react @types/react-dom
```

Create `tsconfig.json`:

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"moduleResolution": "Bundler",
		"jsx": "react-jsx",
		"strict": true,
		"skipLibCheck": true,
		"baseUrl": ".",
		"paths": {
			"@/*": ["src/*"]
		}
	},
	"include": ["src"]
}
```

Recommended migration order:

1. Convert shared utils/data first.
2. Convert new components (`.tsx`) next.
3. Convert app entry points last.

## Integration Checklist Used

1. Analyzed component structure and dependencies.
2. Reviewed props and usage expectations.
3. Verified required hooks/providers (`framer-motion`) and alias support.
4. Added component files under `src/components/ui`.
5. Wired responsive usage in app composition.
6. Updated image assets with stable Unsplash URLs.
