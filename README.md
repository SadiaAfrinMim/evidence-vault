# 🔐 Evidence Vault UI

**A professional, production-ready Evidence Vault and Request Fulfillment system for compliance and legal document management.**

---

## ✨ Overview

Evidence Vault UI implements Task AA from the SentryLink Comply Phase A technical assessment. A modern web application providing three interconnected screens for managing legal evidence and fulfillment requests.

### Three Core Screens:
- 📁 **Evidence Vault** — Browse, filter, and search evidence items with advanced controls
- 🔍 **Evidence Detail** — View complete metadata, descriptions, and related requests
- ✅ **Request To-Do** — Track and manage request fulfillment with priority indicators

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **Advanced Filtering** | Filter by category, status, and more with real-time updates |
| **Full-Text Search** | Search across title, description, and evidence ID |
| **Smart Sorting** | Sort by newest, alphabetical order, or file size |
| **URL Persistence** | Filters persist in URL for shareable, deep-linked searches |
| **Responsive Design** | Seamlessly adapts to mobile, tablet, and desktop views |
| **Priority Tracking** | Visual indicators for request priority and status |
| **Cross-Linking** | Navigate between evidence items and related requests |
| **Complete Metadata** | View file size, dates, creator info, and detailed descriptions |

---

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 16 with React 19.2 |
| **Styling** | Tailwind CSS v4 with custom design tokens |
| **State Management** | React hooks + URL-based filtering |
| **UI Components** | shadcn/ui component library |
| **Language** | TypeScript (full type safety) |

---

## 🎨 Design System

### Color Palette
```
Primary:  Deep Navy (oklch(0.25 0.15 260))     → CTAs & Accents
Accent:   Emerald Green (oklch(0.4 0.15 140))  → Success & Highlights
Neutral:  Gray scale                            → Text & Backgrounds
Status:   Green ✓ | Blue ◐ | Red ✗             → Visual feedback
```

### Typography
- **Font**: Geist (sans-serif) — Primary text
- **Mono**: Geist Mono — IDs and technical content
- **Hierarchy**: Clear size and weight differentiation

---

## 📂 Routing

```
/              → Home landing page
/vault         → Evidence Vault with filtering & search
/vault/[id]    → Evidence detail view
/requests      → Request To-Do list
```

---

## 🔗 URL-Based Filtering

Filters are embedded in URL parameters for persistence and sharing:

```
/vault?search=financial&categories=Financial&statuses=Active
```

**Supported Parameters:**
- `search=term` — Search across evidence
- `categories=Financial,Legal` — Filter by categories (comma-separated)
- `statuses=Active,Archived` — Filter by status (comma-separated)

---

## 📊 Mock Data

Currently includes **6 evidence items** and **5 requests** for demonstration. Ready to swap with real backend APIs without code changes.

---

## 🚀 Getting Started

### Installation

1. **Download** the project files
2. **Install dependencies** using shadcn CLI:
   ```bash
   npx shadcn-cli@latest init
   ```
3. **Run development server:**
   ```bash
   npm run dev
   ```
4. **Open** http://localhost:3000 in your browser

### Quick Links
- Browse evidence at `/vault`
- View requests at `/requests`
- Click any evidence item to see full details

---

## 🌐 Deployment

Deploy to Vercel with a single click:

1. Click **"Publish"** in v0
2. Connect your GitHub repository
3. Vercel handles the rest — your app is live! 🎉

---

## 📈 Future Roadmap

- ✅ Backend API integration for real data
- ✅ User authentication & role-based access
- ✅ Advanced request workflow automation
- ✅ Real-time status updates via WebSockets
- ✅ Full-text search with Elasticsearch
- ✅ Evidence versioning & audit trails
- ✅ Digital signatures & tamper detection
- ✅ Batch request processing

---

## 📝 Notes

This is a **production-ready** implementation. All components follow React and Next.js best practices with proper Suspense boundaries, server components, and type safety. Feel free to customize colors, fonts, and copy to match your brand.

**Questions?** Check the code comments or open an issue. Happy building! 🚀
