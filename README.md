# WMATA Frontend

A React + TypeScript frontend for displaying WMATA rail status and accessibility outage information.

This project is the browser-facing UI for the WMATA status app. It fetches Metro line status and accessibility data from a local backend API, then presents the information in a simple dashboard with line cards, incident summaries, accessibility outage counts, and filters for planned/unplanned outages.

## Features

- Metro status dashboard
- Per-line status cards
- Service incident and alert counts
- Expand/collapse controls for longer incident details
- Accessibility outage summary
- Elevator and escalator outage counts
- Planned vs unplanned outage filters
- Playwright end-to-end smoke tests
- Vite development server with local API proxy

## Tech Stack

- React
- TypeScript
- Vite
- Playwright
- ESLint

## Project Structure

```text
wmata-fe/
├── src/
│   ├── components/
│   │   ├── AccessibilityPanel.tsx
│   │   └── MetroLineCard.tsx
│   ├── hooks/
│   │   └── useAccessibility.ts
│   ├── types/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── tests-e2e/
│   └── smoke.spec.ts
├── playwright.config.ts
├── vite.config.ts
├── package.json
└── index.html
```

## Requirements

- Node.js
- npm
- The matching WMATA backend running locally on port `4000`

The Vite dev server proxies frontend API calls to:

```text
http://127.0.0.1:4000
```

Specifically:

```text
/api
/health
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the backend API in a separate terminal first.

Then start the frontend dev server:

```bash
npm run dev
```

By default, Vite will provide a local development URL in the terminal.

## Available Scripts

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview a production build:

```bash
npm run preview
```

Run Playwright end-to-end tests:

```bash
npm run test:e2e
```

Run Playwright in UI mode:

```bash
npm run test:e2e:ui
```

## API Expectations

The frontend expects the backend to expose these endpoints:

```text
GET /api/status/metro
GET /api/status/accessibility
```

### Metro Status Response

The Metro status response should include:

- `meta.lastUpdated`
- `meta.stale`
- `data.lines`
- line code, name, color, and status
- service incidents
- informational alerts

### Accessibility Status Response

The accessibility response should include:

- elevator outage count
- escalator outage count
- planned outage count
- unplanned outage count
- total outage count
- outage item details

## Testing

Playwright tests live in:

```text
tests-e2e/
```

The current smoke tests verify that:

- the main WMATA Status page loads
- the Accessibility panel appears
- at least one Metro line card renders
- accessibility filters update the visible list
- service incident sections and More/Less toggles behave correctly when incidents are available

The Playwright config starts the Vite app on port `5178` before running tests.

## Notes

This project is intentionally focused on the frontend display layer. WMATA API fetching, normalization, and backend response shaping should live in the companion backend service.

## Future Improvements

- Replace remaining inline styles with dedicated CSS
- Remove temporary debug UI from Metro line cards
- Add loading states for accessibility data
- Add empty-state messaging when there are no service incidents or outages
- Improve mobile layout polish
- Add deployment notes once hosting is finalized

## License

Open Source
