import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Home } from './components/Home'
import { Notes } from './components/Notes'
import { NoteDetail } from './components/NoteDetail'
import { BuiltWith } from './components/BuiltWith'
import { Contact } from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<NoteDetail />} />
          <Route path="/built-with" element={<BuiltWith />} />
          <Route path="/contact" element={<Contact />} />
          {/* Redirect old note routes to home */}
          <Route path="/note/:id" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
