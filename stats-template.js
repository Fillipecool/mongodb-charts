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
    <svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <style>
        .bg {
          fill: #141321;
          stroke: #e4e2e2;
          stroke-width: 1;
          stroke-opacity: 1;
        }
        .header {
          font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
          fill: #fe428e;
          animation: fadeInAnimation 0.8s ease-in-out forwards;
        }
        @supports(-moz-appearance: auto) {
          /* Selector detects Firefox */
          .header { font-size: 15.5px; }
        }
        .stat {
          font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; 
          fill: #a9fef7;
        }
        @supports(-moz-appearance: auto) {
          /* Selector detects Firefox */
          .stat { font-size: 12px; }
        }
        .stagger {
          opacity: 0;
          animation: fadeInAnimation 0.3s ease-in-out forwards;
        }
        .bold { font-weight: 700 }
        .circle-bg {
          stroke: #fe428e;
          fill: none;
          stroke-width: 6;
          opacity: 0.2;
        }
        .circle {
          stroke: #fe428e;
          stroke-dasharray: 314;
          fill: none;
          stroke-width: 6;
          stroke-linecap: round;
          opacity: 0.8;
          transform: rotate(-90deg);
          transform-origin: 470px 100px;
          animation: fillCircle 1s ease-out forwards;
        }
        .rank-text {
          font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; 
          fill: #a9fef7;
          text-anchor: middle;
          dominant-baseline: central;
          animation: scaleInAnimation 0.3s ease-in-out forwards;
        }
        @keyframes fillCircle {
          from {
            stroke-dashoffset: 314;
          }
          to {
            stroke-dashoffset: ${dashOffset};
          }
        }
        @keyframes scaleInAnimation {
          from {
            transform: translate(-5px, 5px) scale(0);
          }
          to {
            transform: translate(-5px, 5px) scale(1);
          }
        }
        @keyframes fadeInAnimation {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      </style>
      <rect class="bg" x="0.5" y="0.5" width="99%" height="99%" rx="4.5"/>
      <text x="30" y="40" class="header">${data.username}'s GitHub Stats</text>

      <g class="stagger" style="animation-delay: 150ms">
        <text x="30" y="75" class="stat">⭐ Total Stars Earned: <tspan class="bold">${stars}</tspan></text>
      </g>
      <g class="stagger" style="animation-delay: 300ms">
        <text x="30" y="100" class="stat">⏱️ Total Commits (2025): <tspan class="bold">${commits}</tspan></text>
      </g>
      <g class="stagger" style="animation-delay: 450ms">
        <text x="30" y="125" class="stat">🔀 Total PRs: <tspan class="bold">${pull_requests}</tspan></text>
      </g>
      <g class="stagger" style="animation-delay: 600ms">
        <text x="30" y="150" class="stat">🐞 Total Issues: <tspan class="bold">${issues}</tspan></text>
      </g>
      <g class="stagger" style="animation-delay: 750ms">
        <text x="30" y="175" class="stat">📦 Repos: <tspan class="bold">${repos}</tspan></text>
      </g>

      <circle class="circle-bg" cx="470" cy="100" r="50"/>
      <circle class="circle" cx="470" cy="100" r="50"/>
      <text x="470" y="100" class="rank-text">${note}</text>
    </svg>
  `;
};
