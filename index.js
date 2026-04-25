import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

// load projects
const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);

// render projects
const container = document.querySelector('.projects');
renderProjects(latestProjects, container, 'h2');

// GitHub stats
const profileStats = document.querySelector('#profile-stats');

const githubData = await fetchGitHubData('jiyasreejesh');

profileStats.innerHTML = `
  <h2>My GitHub Stats</h2>
  <dl>
    <dt>Public Repos</dt>
    <dd>${githubData.public_repos}</dd>

    <dt>Followers</dt>
    <dd>${githubData.followers}</dd>

    <dt>Following</dt>
    <dd>${githubData.following}</dd>
  </dl>
`;