import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

// load all projects
const projects = await fetchJSON('./lib/projects.json');

// take first 3
const latestProjects = projects.slice(0, 3);

// render them
const container = document.querySelector('.projects');
renderProjects(latestProjects, container, 'h2');

// GitHub API
const githubData = await fetchGitHubData('jiyasreejesh');

const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
  profileStats.innerHTML = `
    <dl>
      <dt>Repos</dt><dd>${githubData.public_repos}</dd>
      <dt>Followers</dt><dd>${githubData.followers}</dd>
      <dt>Following</dt><dd>${githubData.following}</dd>
    </dl>
  `;
}