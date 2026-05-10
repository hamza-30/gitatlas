# GitAtlas

**See the developer behind the code.**

GitAtlas is a GitHub profile analyzer that transforms any public GitHub profile into a clean, visual dashboard. Search any username to instantly explore their repositories, language breakdown, contribution activity, and key stats — or compare two developers side by side.

---

## Live Demo

[gitatlas-web.vercel.app](https://gitatlas-web.vercel.app) <!-- replace with your actual URL -->

---

## Features

### Analyzer
- **Profile Overview** — avatar, bio, location, company, followers, member since
- **Stats Cards** — total stars, forks, repositories, and languages at a glance
- **Language Breakdown** — donut chart with GitHub's official language colors and percentage breakdown
- **Top Repositories** — full repo list with search, filter by language, and sort by stars, forks, or recently updated
- **Contribution Activity** — day-by-day bar chart of recent public push, PR, and issue activity with most active day, most active month, and total contributions

### Compare
- Enter two GitHub usernames and compare them side by side
- **Profile Metrics table** — stars, forks, repos, languages, and followers with winner indicators
- **Language Breakdown** — both users' language charts rendered together
- **Top Repositories** — top 4 repos by stars for each user

### General
- Recent searches saved to localStorage
- Loading states with spinner
- Error states for invalid usernames and failed fetches
- Empty states for users with no repos or no public activity
- Fully responsive — mobile, tablet, and desktop

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Tailwind CSS | Styling and responsive layout |
| React Router | Client-side routing |
| Recharts | Bar chart and donut chart visualizations |
| GitHub REST API v3 | All profile, repository, and event data |
| Framer Motion | Typing animation on home page |
| React Icons | Icon library |
| Context API | Global state for recent searches |

---

## Key Implementation Details

**Parallel API Fetching**
All API calls use `Promise.all` to fetch profile, repository, and event data simultaneously rather than sequentially, reducing load time.

**Language Processing**
Language data is derived from the repository list since GitHub's API does not provide an aggregate language endpoint. Repos with null language values are filtered out before percentage calculations to ensure accuracy.

**Contribution Activity**
Built on GitHub's public events API which returns up to 100 events. The chart filters `PushEvent`, `PullRequestEvent`, and `IssuesEvent` types and groups them by day for a granular activity view. A disclaimer notes that data reflects public events only and may vary due to GitHub API limits.

**Reusable Utility Functions**
`calculateStats` and `calculateLanguageUsageData` are extracted to `githubUtils.js` and shared between the Analyzer and Compare pages to avoid duplicating logic.

---

## Screenshots

### Home
<img width="1920" height="970" alt="screencapture-gitatlas-web-vercel-app-2026-05-10-19_55_47" src="https://github.com/user-attachments/assets/b9d26a99-27a9-4e8c-a91a-ec713ab75fcf" />

### Analyzer
<img width="1920" height="1657" alt="screencapture-gitatlas-web-vercel-app-analyzer-ry-2026-05-10-19_56_08" src="https://github.com/user-attachments/assets/9a80786e-e36b-4804-ab9c-d71149f11506" />

### Compare
<img width="1920" height="2546" alt="screencapture-gitatlas-web-vercel-app-compare-2026-05-10-19_56_32" src="https://github.com/user-attachments/assets/4667f404-490d-412c-9af7-b6736d91b757" />

---

## Limitations

- GitHub's events API returns a maximum of 100 public events with no guaranteed time range — contribution data may not reflect full activity history
- Only public repository and event data is accessible without user authentication
- Language detection is based on each repository's primary language as reported by GitHub

---

## License

MIT
