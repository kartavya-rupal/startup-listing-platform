# 🚀 InnoVault – Full Stack Startup Listing Platform

**InnoVault** is a full-stack startup listing platform built with the modern web stack, offering features like user authentication, personalized dashboards, and startup management. Developed using **Next.js (App Router)**, **TypeScript**, and **Sanity CMS**, the platform ensures scalable architecture, clean UI/UX, and real-time interactivity.

---

## 📁 Project Structure Overview

- app/ – Main application routes and layout logic (Next.js App Router)
- components/ – Reusable UI elements (buttons, forms, toasts, etc.)
- hooks/ – Custom React hooks for managing state and logic
- lib/ – Utility functions, API handlers, and helper logic
- sanity/ – Sanity CMS schemas, config, and extracted types
- auth.ts – NextAuth.js configuration for secure authentication
- next-auth.d.ts – Type declaration overrides for NextAuth session typing
- sanity.config.ts – Core Sanity configuration
- sanity.cli.ts – CLI configuration for Sanity
- sanity-typegen.json – Type generation config for CMS schemas
- tailwind.config.ts – Tailwind CSS configuration
- postcss.config.mjs – PostCSS configuration
- eslint.config.mjs – ESLint config for linting and code quality
- tsconfig.json – TypeScript configuration for type checking and support
- package.json – Project dependencies and scripts
- package-lock.json – Dependency lock file
- .gitignore – Ignored files/folders in version control
- README.md – Project documentation

---

## ✨ Key Features

- ✅ **Startup creation and listing management** via Sanity CMS  
- 🔄 **Live content updates** and reactivity using Next.js API routes  
- 🔐 **Secure user authentication** using NextAuth.js  
- 🎨 **Elegant and responsive UI** using Tailwind CSS + ShadCN UI  
- 📝 **Markdown-based content editing** with live preview  
- 🧠 **Type-safe development** with TypeScript and Zod validation  

---

## 🛠 Technologies Used

### 🖥️ Frontend  
- **React.js**  
- **Next.js 15 (App Router)**  
- **TypeScript**

### 🔧 Backend  
- **Next.js API Routes**  
- **Sanity CMS**

### 🎨 Styling  
- **Tailwind CSS**  
- **Styled-components**  
- **ShadCN UI**

### 🔐 Authentication  
- **NextAuth.js**

### 💡 UX & UI Tools  
- **Radix UI**  
- **Lucide Icons**  
- **nprogress**  
- **toploader**

### 🧰 Utilities  
- **Markdown-it** – Render markdown to HTML  
- **clsx** – Conditional classNames  
- **slugify** – Generate slugs from strings

### ✅ Validation  
- **Zod** – Runtime schema validation and form schema safety  

---
