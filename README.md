# Week 5 — Single Page Application (SPA) Simulation

A small Northstar Studio SPA built with plain HTML, CSS, and JavaScript. It changes views without full page reloads and uses the History API to keep the URL in sync.

## Run the project
Open `index.html` in a browser. For the most reliable History API routing and direct URL testing, run a local static server from this folder, for example:
- `python3 -m http.server 8000`
- Visit `http://localhost:8000`

Note: simple static servers may return 404 for direct nested routes such as `/services` unless configured with an SPA fallback. Navigate from the homepage or configure the server fallback for direct deep links.

## Structure
- `index.html` — main application shell and navigation
- `css/style.css` — responsive styling, transitions, focus states
- `js/app.js` — route rendering, browser history, menu state, and form validation
- `Week5-Report.md` — technical report

## Features
- Client-side routing for Home, Services, Work, About, and Contact
- `history.pushState()` and `popstate` support for back/forward navigation
- Dynamic DOM rendering without reloading the document
- Active navigation state and 404 fallback
- Responsive navigation menu and reduced-motion support
- Local contact-form validation (no backend submission)
