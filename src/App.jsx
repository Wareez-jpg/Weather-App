import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CityDetail from './pages/CityDetail'
import Reviews from './pages/Reviews'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/city/:cityName" element={<CityDetail />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  )
}

export default App