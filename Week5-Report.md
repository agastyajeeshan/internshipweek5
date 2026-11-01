# Week 5 Technical Report: Developing a Single Page Application (SPA) Simulation

## 1. Project overview
The goal of this task was to simulate a small Single Page Application using HTML, CSS, and JavaScript. The Northstar Studio website was selected as the sample project. Its Home, Services, Work, About, and Contact views are rendered dynamically inside one main HTML container.

## 2. Project architecture
- `index.html` provides the shared page shell, navigation, main content container, and footer.
- `css/style.css` contains shared design tokens, responsive layouts, component styles, focus indicators, and reduced-motion support.
- `js/app.js` contains the route definitions, rendering function, navigation handling, browser-history integration, and page-specific event listeners.

## 3. Dynamic content and routing
Each page is represented by a JavaScript template function stored in a route map. When a user selects an internal navigation link, the application prevents the browser's normal page navigation, updates the address using `history.pushState()`, and renders the requested view inside the main container. The `popstate` event listens for browser Back and Forward actions and restores the correct view. Unknown paths display a 404-style page.

## 4. User experience and accessibility
The interface uses a consistent visual design across all routes. A small entrance animation provides a smooth transition between views. The layout adapts to mobile screens, the menu button exposes its expanded state through ARIA attributes, and the page includes a skip link and visible keyboard focus indicators. Reduced-motion preferences are respected.

## 5. Challenges and solutions
A key challenge was changing content without losing browser navigation behavior. This was addressed by combining delegated click handling with the History API. Another challenge was ensuring newly rendered content receives its own event listeners; a page-event setup function is called after each render. A fallback view handles unknown routes. Directly refreshing a nested route may require server-side SPA fallback configuration, so the README explains how to run and test the project.

## 6. Testing
Test the navigation links and confirm the URL changes without a full reload. Use Back and Forward to verify `popstate` behavior. Test an unknown path, resize the browser to mobile width, navigate using only the keyboard, and submit the contact form with valid and invalid values. The contact form is a front-end demonstration and does not transmit data to a server.

## 7. Learning outcomes and conclusion
This task provided practical experience with DOM manipulation, event delegation, client-side routing, `history.pushState()`, `popstate`, and state updates. The project demonstrates how a lightweight SPA can provide smooth navigation while maintaining clear URL paths and a consistent interface.
