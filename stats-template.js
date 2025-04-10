const { calculateRank } = require("./calculateRank");

module.exports = function createSVG(data) {
  const { commits, pull_requests, issues, stars, repos, reviews, followers } = data.contributions;

  const rankResult = calculateRank({
    all_commits: false,
    commits,
    prs: pull_requests,
    issues,
    reviews,
    repos,
    stars,
    followers,
  });

  const note = rankResult.level;
  const percentage = 100 - rankResult.percentile;
  const dashOffset = 314 - (314 * percentage) / 100;

  return `
    <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .bg {
          fill: #141321;
          stroke: #1f1f1f;
          stroke-width: 2;
        }
        .title {
          fill: #ff79c6;
          font: bold 20px "Segoe UI", Ubuntu, sans-serif;
        }
        .label {
          fill: #00ffff;
          font: 14px "Segoe UI", Ubuntu, sans-serif;
          font-weight: bold;
        }
        .value {
          fill: #00ffff;
          font-weight: bold;
        }
        .circle-bg {
          stroke: #30363d;
          stroke-width: 10;
          fill: none;
        }
        .circle {
          stroke: #ff45c7;
          stroke-width: 10;
          fill: none;
          stroke-dasharray: 314;
          stroke-dashoffset: 314;
          transform: rotate(-90deg);
          transform-origin: 470px 100px;
          animation: fillCircle 2s ease-out forwards;
        }
        @keyframes fillCircle {
          to {
            stroke-dashoffset: ${dashOffset};
          }
        }
      .note {
          fill: #00ffff;
          font-size: 32px;
          font-weight: bold;
          text-anchor: middle;
        }
          
      </style>
      <rect class="bg" width="100%" height="100%" rx="12"/>
      <text x="30" y="40" class="title">${data.username}'s GitHub Stats</text>

      <text x="30" y="75" class="label">⭐ Total Stars Earned: <tspan class="value">${stars}</tspan></text>
      <text x="30" y="100" class="label">⏱️ Total Commits (2025): <tspan class="value">${commits}</tspan></text>
      <text x="30" y="125" class="label">🔀 Total PRs: <tspan class="value">${pull_requests}</tspan></text>
      <text x="30" y="150" class="label">🐞 Total Issues: <tspan class="value">${issues}</tspan></text>
      <text x="30" y="175" class="label">📦 Repos: <tspan class="value">${repos}</tspan></text>

      <circle class="circle-bg" cx="470" cy="100" r="50"/>
      <circle class="circle" cx="470" cy="100" r="50"/>
      <text x="470" y="110" class="note">${note}</text>
    </svg>
  `;
};
