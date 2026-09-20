# The Soledad Times — Digital News & Magazine Portal

A modern, responsive online newspaper and digital magazine web application inspired by the classic **Soledad Times Magazine** editorial design. Built for high performance, accessibility, and reading comfort across desktop, tablet, and mobile devices.

---

## 📰 Overview

**The Soledad Times** is a full-featured digital publishing platform designed for modern journalism. It delivers a newspaper-grade editorial layout with high visual fidelity, structured category archives, breaking news broadcasting, dynamic dark mode, and an interactive reading experience.

---

## ✨ Features

### 🏛️ Editorial Layouts & News Sections
- **Lead Hero Grid**: Multi-story top section featuring prime investigative reports, featured articles, and lead headlines.
- **4-Column Sub-Hero Stories**: Highlighted secondary coverage with category badges and reading time estimates.
- **World & Politics Desk**: Dual-column layout balancing political developments, diplomatic briefings, and university coverage.
- **Business & Financial Markets**: Dedicated finance and economics section with market commentary and analysis.
- **6-Column Strip News**: Fast-scan bottom grid showcasing stories across culture, technology, and sports.

### ⚡ Reader Experience & Interactivity
- **Live Breaking News Marquee**: Prominent real-time ticker broadcasting urgent headlines across the top of the publication.
- **Dark / Light Mode**: Instant theme switching with persistent user preference saved across sessions.
- **Full Article Reader Modal**: Distraction-free article reader complete with author bylines, publication timestamps, estimated read times, related stories, and social sharing.
- **Interactive Comment Threads**: Built-in discussion section allowing readers to contribute commentary and upvote insights.
- **Instant Search**: Fast full-text search filtering across titles, excerpts, and category tags.
- **Saved Articles / Reading List**: One-click bookmarking system to save articles for offline or future reading.
- **Engagement Telemetry**: Real-time reader engagement metrics including page views, scroll depth, and top categories.

### 📱 Responsive Design
- Mobile-first responsive layout optimized for all screen sizes from smartphones to ultra-wide desktop monitors.
- Off-canvas slide-out navigation drawer with quick section links and trending stories.
- Accessible typography pairings, high-contrast readability, and smooth transitions.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)

---

## 📁 Project Structure

```text
├── public/                 # Static assets (images, icons, fonts)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx      # Masthead, navigation bar, utility controls
│   │   ├── Footer.tsx      # Multi-column footer and policies
│   │   ├── HeroGrid.tsx    # Lead multi-story cover grid
│   │   ├── SubHeroGrid.tsx # 4-column secondary feature cards
│   │   ├── ArticleModal.tsx# Distraction-free reading view
│   │   ├── SearchModal.tsx # Full-text search overlay
│   │   └── ...
│   ├── data/
│   │   └── articles.ts     # Curated editorial articles, images, and categories
│   ├── types.ts            # TypeScript interfaces and data definitions
│   ├── App.tsx             # Root application component
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (packaged with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View in your browser**:
   Open [http://localhost:3000](http://localhost:3000) to view the live portal.

### Production Build

To compile the application for production deployment:
```bash
npm run build
```
The compiled, production-ready static assets will be output to the `dist/` directory.

---

## 🖼️ Customizing Stories & Images

All editorial content, headlines, categories, and cover images are centralized in `src/data/articles.ts`.

To update or replace any article image:
1. Open `src/data/articles.ts`.
2. Locate the article entry and update the `imageUrl` property with your new image URL or local path:
   ```typescript
   {
     id: 'my-story-id',
     title: 'Your Headline Here',
     imageUrl: '[https://example.com/your-image.jpg](https://i.ibb.co.com/VYprs8yg/Screenshot-2026-09-20-124307.png)', // or local path: '/images/photo.jpg'
     // ...
   }
   ```
3. To use local photos, place your image files in the `public/` folder (e.g. `public/images/photo.jpg`) and set `imageUrl: '/images/photo.jpg'`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
