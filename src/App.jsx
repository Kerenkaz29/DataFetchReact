import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
    </Routes>
  )
}

export default App
