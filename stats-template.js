module.exports = function createSVG(data) {
    const { commits, pull_requests, issues, stars, repos } = data.contributions;
    const score = commits * 1 + pull_requests * 2 + stars * 3;
    const note = score > 400 ? "S" : score > 300 ? "A" : score > 200 ? "B" : "C";
    const percentage = Math.min(100, score / 4);
    const dashOffset = 314 - (314 * percentage) / 100;
  
    return `
    <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .bg {
          fill: #0d1117;
          stroke: #ffffff;
          stroke-width: 2;
        }
        .title { fill: #ff45c7; font: bold 20px sans-serif; }
        .label { fill: #c9d1d9; font: 14px sans-serif; }
        .value { fill: #00ffff; font-weight: bold; }
        .circle-bg { stroke: #30363d; stroke-width: 10; fill: none; }
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
        .note { fill: #00ffff; font-size: 32px; font-weight: bold; text-anchor: middle; }
      </style>
  
      <rect class="bg" width="100%" height="100%" rx="12"/>
      <text x="30" y="40" class="title">Fillipe Oliveira's GitHub Stats</text>
  
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
  