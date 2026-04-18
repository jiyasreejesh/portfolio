console.log("IT'S ALIVE!");

// helper function
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// ==========================
// STEP 2: AUTO CURRENT PAGE
// ==========================
let navLinks = $$("nav a");

let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

currentLink?.classList.add("current");

// ==========================
// STEP 4: DARK MODE
// ==========================

// add dropdown
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

let select = document.querySelector("select");

// load saved preference
if ("colorScheme" in localStorage) {
  document.documentElement.style.setProperty(
    "color-scheme",
    localStorage.colorScheme
  );
  select.value = localStorage.colorScheme;
}

// listen for changes
select.addEventListener("input", (event) => {
  let value = event.target.value;

  document.documentElement.style.setProperty("color-scheme", value);

  localStorage.colorScheme = value;
});