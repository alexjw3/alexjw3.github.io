import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import Home from './components/Home';
import Void from './components/Void';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/void" element={<Void />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
