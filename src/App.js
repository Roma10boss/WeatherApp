import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import NotFound from './NotFound';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
