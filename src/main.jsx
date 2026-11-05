import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Don't recompute every trigger when mobile URL bars show/hide; absorb long-frame hiccups smoothly
ScrollTrigger.config({ ignoreMobileResize: true });
gsap.ticker.lagSmoothing(500, 33);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
