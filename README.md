# Interview Guide Scraper

A full-stack application that scrapes technical interview questions from in28minutes.com, 
generates topic-wise PDF study guides, and serves them through a modern React frontend.

## Features

✨ **Backend (Java/Maven)**
- Web scraping with JSoup to extract interview Q&As
- PDF generation with topic-wise guides  
- JSON export for structured data
- Logging with SLF4J and Logback

✨ **Frontend (React)**
- 🌙 Dark/Light mode toggle
- 🔍 Full-text search across all topics
- 📄 PDF download per topic
- 💻 Syntax-highlighted code blocks with copy button
- 📱 Fully responsive mobile design
- ⬅️ ➡️ Section navigation
- ⬇️ Expand/Collapse Q&A accordions

## Tech Stack

**Backend**: Java 17 • Maven • JSoup • OpenPDF • Jackson • SLF4J/Logback

**Frontend**: React 18 • Vite • Tailwind CSS • React Router v6 • Mermaid • Syntax Highlighter

## Quick Start

1. **Generate data** (runs scraper):
   ```bash
   mvn package
   java -jar target/webscraper-1.0.0.jar
   
2. **Runs Frontend** :
   ```bash
   cd frontend
   npm install
   npm run dev
   
4. Open http://localhost:5173
