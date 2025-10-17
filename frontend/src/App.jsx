import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SchedulePage from "./page/SchedulePage.jsx";
import NewsPage from "./page/NewsPage.jsx";
import HomeWorkPage from "./page/HomeWorkPage.jsx";
import SettingsPage from "./page/SettingsPage.jsx";



function App() {

  return (
            <Router>
                    <Routes>
                        <Route path="/" element={<NewsPage />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                        <Route path="/homework" element={<HomeWorkPage />} />
                        <Route path="/profile" element={<SettingsPage />} />
                    </Routes>
            </Router>


  )
}

export default App
