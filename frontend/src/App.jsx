import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PomodoroTimer from './components/PomodoroTimer'
import HomePage    from './pages/HomePage'
import TopicPage   from './pages/TopicPage'
import SectionPage from './pages/SectionPage'
import SearchPage  from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"                           element={<HomePage />} />
            <Route path="/topic/:slug"                element={<TopicPage />} />
            <Route path="/topic/:slug/:sectionSlug"   element={<SectionPage />} />
            <Route path="/search"                     element={<SearchPage />} />
            <Route path="*"                           element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <PomodoroTimer />
      </div>
    </ThemeProvider>
  )
}
