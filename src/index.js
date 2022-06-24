import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { fetchSession } from './js/utils';

window.onload = function() {
  fetchSession()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })
  .catch((err) => {
      console.error(err)
  });
}

reportWebVitals();
