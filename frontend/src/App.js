import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GPs from './GPs';

function App() {
  return (
    <Router>
      <div>
      </div>
      <Routes>
        <Route path="/gps" element={<GPs />} />
      </Routes>
    </Router>
  );
}

export default App;