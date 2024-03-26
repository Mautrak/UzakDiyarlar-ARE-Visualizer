// src/App.js

import React from 'react';
import './App.css';
import AreaVisualizer from './components/AreaVisualizer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Merc Area File Visualizer</h1>
      </header>
      <main>
        <AreaVisualizer />
      </main>
    </div>
  );
}

export default App;