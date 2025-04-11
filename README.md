# 🧠 Custom GitHub Stats with MongoDB

This project generates a custom SVG card with personalized GitHub statistics using data stored in MongoDB. It's a modern alternative to [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats), built for developers who want to showcase both **public and private** contributions in their GitHub profile README.

## 💡 Why?

The official GitHub stats API only shows public activity. If you commit often to private repositories, your profile may look inactive — even when you're pushing code daily.

This project solves that by:
- Using **your own MongoDB data**
- Generating a fully **customizable SVG** card
- Updating in real-time via Vercel (or any Node.js host)

## 📊 Example Output

![GitHub Stats](https://your-vercel-deploy-url.vercel.app/api/github-stats?username=fillipecool)

> Neon-themed, animated SVG with your actual commit stats, PRs, issues, and a contribution "grade".

## 🔍 How to Use

Add this to your GitHub README.md:

```markdown
![GitHub Stats](https://your-vercel-deploy-url.vercel.app/api/github-stats?username=YOUR_USERNAME)
```

Replace `YOUR_USERNAME` with the username that matches a record in your MongoDB database.

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB (with MongoDB Atlas)
- SVG Generator
- Vercel for deployment (optional)

## 🔧 Setup & Deploy

### 1. Clone the repo

```bash
git clone https://github.com/fillipecool/mongodb-charts.git
cd mongodb-charts
```

### 2. Add your environment variable

Create a `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```

Your MongoDB database should have a structure like:

```json
{
  "username": "nome",
  "contributions": {
    "commits": 0,
    "pull_requests": 0,
    "issues": 0,
    "stars": 0,
    "repos": 0
  }
}
```

### 3. Start the server locally

```bash
npm install
npm start
```

### 4. Deploy to Vercel (recommended)

- Connect your GitHub repo to [Vercel](https://vercel.com/)
- Add `MONGODB_URI` to the Environment Variables
- Done! Use the link in your README

## 📌 Add it to your README.md

```markdown
![GitHub Stats](https://your-vercel-project.vercel.app/api/github-stats?username=YOUR_USERNAME)
```

---

## ✨ Credits

Made by [@fillipecool](https://github.com/fillipecool) to break free from API limitations and show the real grind behind the scenes.