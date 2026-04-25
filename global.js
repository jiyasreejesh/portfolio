console.log("IT'S ALIVE!");

// helper function
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // STEP 2: AUTO CURRENT PAGE
  // ==========================
  let navLinks = $$("nav a");

  let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );

  currentLink?.classList.add("current");

  // ==========================
  // DARK MODE
  // ==========================

  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
  );

  let select = document.querySelector(".color-scheme select");

  if ("colorScheme" in localStorage) {
    document.documentElement.style.setProperty(
      "color-scheme",
      localStorage.colorScheme
    );
    select.value = localStorage.colorScheme;
  }

  select?.addEventListener("input", (event) => {
    let value = event.target.value;

    document.documentElement.style.setProperty("color-scheme", value);
    localStorage.colorScheme = value;
  });

});
// ==========================
// LAB 4: FETCH JSON
// ==========================
export async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

// ==========================
// LAB 4: RENDER PROJECTS
// ==========================
export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
    console.error("No container element found");
    return;
  }

  containerElement.innerHTML = '';

  for (let project of projects) {
    const article = document.createElement('article');

    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
    `;

    containerElement.appendChild(article);
  }
}

// ==========================
// LAB 4: GITHUB API
// ==========================
export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}