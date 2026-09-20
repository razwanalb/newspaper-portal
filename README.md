# The Soledad Times — Digital Magazine & Newsroom CMS

A responsive, high-speed newspaper and digital magazine web application inspired by the **Soledad Times Magazine** WordPress theme layout. Built with React 18, TypeScript, Vite, and Tailwind CSS, featuring a complete **Role-Based Access Control (RBAC) Editorial Newsroom CMS**.

---

## 🌟 Key Features

### 📰 Public Newspaper Frontend
- **Multi-Grid Layouts**: Hero multi-story grid, 4-column sub-hero cards, World & Politics dual-column sections, Business reports, and 6-column Strip News ticker.
- **Breaking News Ticker**: Live marquee broadcasting breaking headlines at the top of the page.
- **Theme Switcher**: Instant Dark Mode / Light Mode with persistent user preference.
- **Interactive Modals**: Full article reading view with related stories, comment threads, live search, bookmarked stories, and reader engagement analytics.
- **Clean Visitor Experience**: Normal readers never see any administrative links, login buttons, or backend panels.

### 🔐 Editorial & Admin CMS (`/login`)
Staff members access the system via the dedicated `/login` portal.

- **👑 Super Administrator (`victoria@soledadtimes.com` / `admin123`)**:
  - **Newsroom Governance**: Create, edit, publish, draft, or delete any story with Hero and Trending placement flags.
  - **Staff Management**: Register newsroom accounts, assign roles (Super Admin vs. News Moderator), and toggle active/suspended statuses.
  - **Site Settings**: Toggle breaking news ticker, customize ticker broadcast text, toggle advertising banners, and set comment policies.
  - **Comment Moderation**: Audit and delete user comments across all stories.

- **✍️ News Moderator (`marcus@soledadtimes.com` / `moderator123`)**:
  - **Story Composition Desk**: Compose new articles with title, subtitle, category, tags, and multi-paragraph content.
  - **Publishing Control**: Publish, save as draft, or submit for review.
  - **Scoped Protection**: Restricted from altering staff roles or global system configurations.

- **WordPress-Style Top Admin Bar**: When a staff member is logged in, a top management ribbon appears for quick navigation between the public site and the CMS.

---

## 🖼️ How to Manually Change Home Page Images

You can change any image on the home page using either of the following three methods:

### Method 1: Using the Admin CMS (Recommended — No Code Needed)
1. Go to `http://localhost:3000/login` in your browser.
2. Sign in with the **Super Admin** or **Moderator** credentials:
   - Email: `victoria@soledadtimes.com`
   - Password: `admin123`
3. Click on the **Newsroom** tab in the sidebar.
4. Find the story you want to change and click **Edit**.
5. Paste your new image URL into the **Cover Image URL** field (or select one of the built-in 1-click topic presets).
6. Click **Save & Publish**. The image updates on the home page immediately!

---

### Method 2: Editing the Code (`src/data/articles.ts`)
All default stories and images are defined in `src/data/articles.ts`.

1. Open `src/data/articles.ts` in your code editor (e.g. VS Code).
2. Locate the article you wish to edit (for example, the lead graduation story):
   ```typescript
   {
     id: 'cal-state-graduation',
     title: 'Despite pandemic, Cal State graduation rates climbed...',
     imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
     // ...
   }
   ```
3. Replace the URL in `imageUrl` with your desired image link.
4. Save the file. Your browser will automatically refresh with the new image!

---

### Method 3: Using Your Own Local Image Files
To use images stored directly on your computer:

1. Create an `images` folder inside your `public` directory:
   ```text
   public/
     images/
       my-lead-photo.jpg
       politics-banner.png
   ```
2. Copy your image files into `public/images/`.
3. In `src/data/articles.ts` (or in the Admin Panel editor), set the `imageUrl` to the relative path starting with a forward slash:
   ```typescript
   imageUrl: '/images/my-lead-photo.jpg'
   ```
4. Save the file. Vite serves anything inside `public` directly from the root path.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (installed automatically with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - **Public News Portal**: [http://localhost:3000](http://localhost:3000)
   - **Staff & Editorial Login**: [http://localhost:3000/login](http://localhost:3000/login)

---

## 🔑 Default Staff Credentials

| Role | Name | Email | Password | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | Victoria Vance | `victoria@soledadtimes.com` | `admin123` | Full system control, users, settings, publishing |
| **News Moderator** | Marcus Cole | `marcus@soledadtimes.com` | `moderator123` | Upload, edit, and publish stories |

---

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion
- **State & Storage**: React Hooks + LocalStorage Persistence

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
