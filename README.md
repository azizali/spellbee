# SpellBeeMe 🐝

A modern, fast, and SEO-friendly website for sharing daily **NY Times Spelling Bee puzzle answers**. Built with **Astro** and **Tailwind CSS**.

## 🌟 Features

✅ **Daily Solutions** - Share Spelling Bee answers with markdown files  
✅ **Modern Dark Mode** - Light/Dark theme toggle  
✅ **Lightning Fast** - Static site generation with zero JS overhead  
✅ **SEO Optimized** - Automatic sitemap, RSS feed, Open Graph meta tags  
✅ **Responsive Design** - Mobile-first Tailwind CSS  
✅ **Easy Maintenance** - Add new solutions as simple `.md` files  
✅ **Content Collections** - Astro's powerful content management  

## 📁 Project Structure

```
spellbeeme/
├── src/
│   ├── content/
│   │   ├── solutions/          # Daily solution markdown files
│   │   │   ├── 2026-01-17.md
│   │   │   └── 2026-01-16.md
│   │   └── config.ts           # Content schema
│   ├── components/
│   │   ├── Navigation.astro    # Header with theme toggle
│   │   └── Footer.astro        # Footer with links
│   ├── layouts/
│   │   └── Layout.astro        # Main page layout
│   ├── pages/
│   │   ├── index.astro         # Home page (latest solution)
│   │   ├── archive.astro       # All solutions by date
│   │   ├── solutions/
│   │   │   └── [date].astro    # Dynamic solution pages
│   │   └── rss.xml.ts          # RSS feed
│   └── styles/
│       └── globals.css         # Tailwind CSS import
├── public/
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
cd spellbeeme
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:4322](http://localhost:4322) in your browser. The site will hot-reload as you make changes.

### Build

```bash
pnpm build
```

Creates a production build in `dist/` folder - ready to deploy!

## 📝 Adding Daily Solutions

Create a new markdown file in `src/content/solutions/` with the date as the filename:

**File: `src/content/solutions/2026-01-18.md`**

```markdown
---
title: "January 18, 2026"
date: 2026-01-18
pangrams:
  - "SQUEEZABLE"
  - "ANOTHER_PANGRAM"
---

## Today's Spelling Bee Solution

**Required Letter:** Z

**Center Letters:** E, A, B, L, Y, S, Q, U

### Found Pangrams (Using all 9 letters):
- **SQUEEZABLE** - able to be squeezed
- **ANOTHER_PANGRAM** - definition here

### Other Answers:
- ABLE
- BALE
- BASE
- EASY
(list more words)

---

*Puzzle #1234 | NY Times Spelling Bee*
```

**Front Matter Explanation:**
- `title` - Display date (any format)
- `date` - ISO date (YYYY-MM-DD) for sorting
- `pangrams` - Array of pangram solutions

Then simply push to your git repo, and the site will auto-deploy!

## 🌐 Deployment

### Vercel (Recommended - Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your repo
4. Framework: **Astro**
5. Deploy!

**Auto-deploy:** Every push to main triggers a rebuild ~30 seconds

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) 
3. Click "New site from Git"
4. Select your repo
5. Build command: `pnpm build`
6. Publish: `dist`
7. Deploy!

### GitHub Pages

```bash
# In astro.config.mjs, update site URL:
export default defineConfig({
  site: 'https://yourusername.github.io/spellbeeme',
});
```

Then push and GitHub Pages will auto-deploy.

## 📊 SEO Features

✅ **Automatic Sitemap** - `sitemap-0.xml` generated  
✅ **RSS Feed** - Subscribe at `/rss.xml`  
✅ **Open Graph** - Social media preview cards  
✅ **Canonical URLs** - Prevent duplicate content  
✅ **Meta Descriptions** - Auto-generated per page  
✅ **Mobile Friendly** - Responsive design  

## 🎨 Customization

### Update Site Name & Domain

Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

### Change Colors

Edit `tailwind.config.mjs` to customize theme colors.

### Modify Navigation

Edit `src/components/Navigation.astro` to add/remove links.

## 📦 Tech Stack

- **Astro** 5.16+ - Static site generator
- **Tailwind CSS** 4.1+ - Utility-first CSS
- **TypeScript** - Type-safe code
- **Markdown** - Content format

## 📄 License

MIT - Feel free to use and modify!

## 🤝 Support

Have questions? Check out:
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Happy puzzle solvingdev* 🐝✨
