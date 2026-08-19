import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CityDetail from './pages/CityDetail'
import Reviews from './pages/Reviews'
import './App.css'

function App() {
  return (
    <>
      <nav className="main-nav">
        <Link to="/">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/city/:cityName" element={<CityDetail />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      <footer className="app-footer">
        <Link to="/reviews">Reviews</Link>
      </footer>
    </>
  )
}

export default App