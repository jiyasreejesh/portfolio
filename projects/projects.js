import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

console.log("PROJECTS:", projects); // <-- add this

const container = document.querySelector('.projects');

renderProjects(projects, container, 'h2');