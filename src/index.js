import React from 'react';
import ReactDOM from 'react-dom/client'; // Replaced deprecated ReactDOM method
import './index.scss';
import App from "./App.tsx"
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
