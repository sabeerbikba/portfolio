# Portfolio

A modern, responsive portfolio website showcasing projects, skills, and experience. Built with both Next.js and Nuxt.js for comparison and learning purposes.

## 🌐 Live Demo

[View Live Site](https://sabeerbikba.vercel.app/)

## 📸 Screenshot

![Portfolio Screenshot](https://github.com/user-attachments/assets/443d36ea-4ee6-4c33-b197-0182a31f52c3)

## ✨ Features

- **Responsive Design**: Optimized for all devices
- **Project Showcase**: Interactive display of personal projects with GitHub integration
- **Contact Form**: Functional contact form for inquiries
- **Smooth Animations**: Powered by Framer Motion (Next.js) and Motion (Nuxt.js)
- **Dark Mode**: Automatic theme switching
- **SEO Optimized**: Built-in SEO features for better search visibility
- **Performance Focused**: Fast loading with optimized assets

## 🛠️ Tech Stack

### Next.js Version (`next/` folder)
- **Framework**: Next.js 14
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons, Octicons
- **Data Visualization**: Visx
- **Markdown**: Marked
- **Package Manager**: pnpm

### Nuxt.js Version (`nuxt/` folder)
- **Framework**: Nuxt 4
- **Frontend**: Vue 3 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion
- **Icons**: Iconify
- **SEO**: Nuxt SEO modules
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sabeerbikba/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   For Next.js version:
   ```bash
   cd next
   pnpm install
   ```

   For Nuxt.js version:
   ```bash
   cd ../nuxt
   pnpm install
   ```

3. **Run development server**

   For Next.js:
   ```bash
   cd next
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

   For Nuxt.js:
   ```bash
   cd nuxt
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production**

   Next.js:
   ```bash
   pnpm build
   pnpm start
   ```

   Nuxt.js:
   ```bash
   pnpm build
   pnpm preview
   ```

## 📁 Project Structure

```
portfolio/
├── next/                 # Next.js version
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # Reusable components
│   │   ├── data/         # Static data and configurations
│   │   └── lib/          # Utility functions
│   ├── public/           # Static assets
│   └── package.json
├── nuxt/                 # Nuxt.js version
│   ├── app/              # Nuxt app structure
│   ├── components/       # Vue components
│   ├── pages/            # Page routes
│   ├── server/           # Server-side API
│   └── package.json
└── README.md
```

## 🚀 Deployment

The portfolio is deployed on [Vercel](https://vercel.com) with automatic deployments from the main branch.

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Choose the framework (Next.js or Nuxt.js)
3. Deploy!

---

⭐ If you like this project, please give it a star!
