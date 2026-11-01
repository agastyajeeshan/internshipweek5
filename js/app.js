const app = document.querySelector("#app");
const nav = document.querySelector("#primary-nav");
const menuButton = document.querySelector(".menu-toggle");
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const pages = {
  "/": () => `
    <section class="page hero-grid">
      <div>
        <p class="eyebrow">Independent digital studio · Est. 2024</p>
        <h1>Make good ideas <em>impossible</em> to ignore.</h1>
        <p class="lead">We build clear, characterful digital experiences for people moving the world forward.</p>
        <a class="button" href="/work" data-link>Explore our work ↗</a>
      </div>
      <div class="art" role="img" aria-label="Abstract artwork with orange and lilac geometric shapes"><span class="art-ring"></span></div>
    </section>`,
  "/services": () => `
    <section class="page">
      <p class="eyebrow">What we do</p><h1>Good thinking.<br><em>Better making.</em></h1>
      <p class="lead">A focused set of creative services that helps ambitious ideas become useful digital experiences.</p>
      <div class="cards">
        <article class="card"><small>01</small><h2>Digital strategy</h2><p>Research, direction and practical plans that turn ambitious goals into clear next steps.</p></article>
        <article class="card"><small>02</small><h2>Web experiences</h2><p>Fast, accessible websites designed to feel intuitive and work beautifully on every screen.</p></article>
        <article class="card"><small>03</small><h2>Brand identity</h2><p>Distinctive visual systems that give meaningful ideas a consistent voice and presence.</p></article>
      </div>
    </section>`,
  "/work": () => `
    <section class="page">
      <p class="eyebrow">A few recent projects</p><h1>Selected <em>work.</em></h1>
      <p class="lead">Thoughtful details, purposeful design and measurable impact.</p>
      <div class="project-grid">
        <article class="project"><h2>Form & Field</h2><p>Brand identity · Digital experience</p></article>
        <article class="project"><h2>Goodground</h2><p>Strategy · Web design</p></article>
      </div>
    </section>`,
  "/about": () => `
    <section class="page">
      <p class="eyebrow">A little about us</p><h1>Small team.<br><em>Open minds.</em></h1>
      <p class="lead">Northstar is an independent creative studio partnering with ambitious teams to make digital things more useful, more human and more memorable.</p>
      <div class="cards">
        <article class="card"><small>OUR APPROACH</small><h2>Curiosity first</h2><p>We ask better questions before jumping into solutions.</p></article>
        <article class="card"><small>OUR BELIEF</small><h2>Make it useful</h2><p>Good design makes complex things feel simple.</p></article>
        <article class="card"><small>OUR PROMISE</small><h2>Make it matter</h2><p>We focus on thoughtful work with a clear purpose.</p></article>
      </div>
    </section>`,
  "/contact": () => `
    <section class="page">
      <p class="eyebrow">Have a good one in mind?</p><h1>Let’s make it <em>happen.</em></h1>
      <p class="lead">Tell us a little about your idea. This demo form validates input locally and does not send messages to a server.</p>
      <form class="contact-form" id="contact-form">
        <label for="name">Your name<input id="name" name="name" autocomplete="name" required></label>
        <label for="email">Email address<input id="email" name="email" type="email" autocomplete="email" required></label>
        <label for="message">Project details<textarea id="message" name="message" required></textarea></label>
        <button class="button" type="submit">Send message ↗</button>
        <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>`
};

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function render(path, { focus = true } = {}) {
  const route = normalizePath(path);
  const page = pages[route] || (() => `
    <section class="page not-found">
      <p class="eyebrow">404 · Page not found</p><h1>Lost your <em>way?</em></h1>
      <p class="lead">That page doesn’t exist. Head back to the homepage and find your north star.</p>
      <a class="button" href="/" data-link>Back home ↗</a>
    </section>`);
  app.setAttribute("aria-busy", "true");
  app.innerHTML = page();
  app.setAttribute("aria-busy", "false");

  document.querySelectorAll("[data-link]").forEach(link => {
    const href = normalizePath(new URL(link.href, location.origin).pathname);
    if (href === route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  if (focus) {
    app.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  attachPageEvents();
}

function navigate(path) {
  const route = normalizePath(path);
  if (route === normalizePath(location.pathname)) return;
  history.pushState({ route }, "", route);
  render(route);
}

function attachPageEvents() {
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const status = document.querySelector("#form-status");
      if (!form.reportValidity()) return;
      status.textContent = "Thanks! Your details passed the demo validation.";
      form.reset();
    });
  }
}

document.addEventListener("click", event => {
  const link = event.target.closest("a[data-link]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  event.preventDefault();
  navigate(url.pathname);
});

window.addEventListener("popstate", () => render(location.pathname));

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !open);
});

render(location.pathname, { focus: false });
