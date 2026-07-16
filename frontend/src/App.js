import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AssessmentPage from './components/ComponentName';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', padding: '16px' }}>
        <header style={{ marginBottom: '16px' }}>
          <h1>Utkrusht Assessment Catalog</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<AssessmentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
