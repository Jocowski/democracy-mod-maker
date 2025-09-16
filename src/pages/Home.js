import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Democracy 4 - Mod Maker</h2>
      <p className="welcome-text">
        Welcome to the Democracy 4 Mod Maker. This comprehensive unofficial application helps you create, manage, and export custom mods for Democracy 4 with advanced policy management, multilingual support, and professional-grade tools.
      </p>
      
      <div className="disclaimer-section">
        <h3 className="disclaimer-title">Important Notice</h3>
        <p className="disclaimer-text">
          This is an <strong>unofficial application</strong> and is not affiliated with, endorsed by, or connected to Positech Games or Democracy 4. 
          All game data displayed here belongs to Positech Games.
        </p>
      </div>

      <div className="github-section">
        <h3 className="github-title">Open Source Project</h3>
        <p className="github-text">
          This project is open source and available on GitHub:
        </p>
        <a 
          href="https://github.com/Jocowski/democracy-mod-maker" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          🔗 View on GitHub
        </a>
      </div>

      <div className="game-link-section">
        <h3 className="game-link-title">Get Democracy 4</h3>
        <p className="game-link-text">
          Love what you see? Get the full game experience:
        </p>
        <a 
          href="https://store.steampowered.com/app/1410710/Democracy_4/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="steam-link"
        >
          🎮 Democracy 4 on Steam
        </a>
      </div>

      <div className="features-section">
        <h3 className="features-title">Key Features</h3>
        <ul className="features-list">
          <li>📊 <strong>Advanced Policy Management</strong>: Create, edit, and delete custom policies with full configuration</li>
          <li>🎯 <strong>Official Game Data Browser</strong>: Explore all official policies, dilemmas, and simulation data</li>
          <li>🌍 <strong>Multilingual Support</strong>: 12 languages including English, Portuguese, Spanish, French, German, and more</li>
          <li>🔍 <strong>Advanced Search & Filters</strong>: Powerful search and filtering capabilities across all data</li>
          <li>📦 <strong>Mod Export System</strong>: Export your custom mods as ready-to-use ZIP files</li>
          <li>🎨 <strong>Professional UI</strong>: Modern, responsive design with beautiful styling and smooth animations</li>
          <li>📱 <strong>Cross-Platform</strong>: Works seamlessly on desktop, tablet, and mobile devices</li>
          <li>⚡ <strong>Real-time Updates</strong>: Instant preview of changes with live data validation</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
