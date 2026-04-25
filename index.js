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

if (profileStats && githubData) {
  profileStats.innerHTML = `
    <h2>My GitHub Stats</h2>
    <div class="github-stats">
      <div class="stat">
        <p class="label">FOLLOWERS</p>
        <p class="value">${githubData.followers}</p>
      </div>
      <div class="stat">
        <p class="label">FOLLOWING</p>
        <p class="value">${githubData.following}</p>
      </div>
      <div class="stat">
        <p class="label">PUBLIC REPOS</p>
        <p class="value">${githubData.public_repos}</p>
      </div>
      <div class="stat">
        <p class="label">PUBLIC GISTS</p>
        <p class="value">${githubData.public_gists}</p>
      </div>
    </div>
  `;
}