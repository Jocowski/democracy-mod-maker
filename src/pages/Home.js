import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Democracy 4 - Mod Maker</h2>
      <p className="welcome-text">
        Welcome to the Democracy 4 Mod Maker. This unofficial application helps you explore and understand the game's data structure for creating custom mods.
      </p>
      
      <div className="disclaimer-section">
        <h3 className="disclaimer-title">Important Notice</h3>
        <p className="disclaimer-text">
          This is an <strong>unofficial application</strong> and is not affiliated with, endorsed by, or connected to Positech Games or Democracy 4. 
          All game data displayed here belongs to Positech Games.
        </p>
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
        <h3 className="features-title">Features</h3>
        <ul className="features-list">
          <li>📊 Browse all official policies with detailed information</li>
          <li>🎯 Explore dilemma choices and their effects</li>
          <li>🔍 Search and filter game data</li>
          <li>📱 Responsive design for all devices</li>
          <li>🎨 Clean, modern interface</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
