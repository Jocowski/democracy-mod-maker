import React from 'react';
import './TabNavigation.css';

function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="tab-navigation">
      <div className="tab-container">
        <button 
          className={`tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange('home')}
        >
          Home
        </button>
        <button 
          className={`tab ${activeTab === 'official-game-data' ? 'active' : ''}`}
          onClick={() => onTabChange('official-game-data')}
        >
          Official Game Data
        </button>
        <button 
          className={`tab ${activeTab === 'create-mod' ? 'active' : ''}`}
          onClick={() => onTabChange('create-mod')}
        >
          Create Mod
        </button>
      </div>
    </nav>
  );
}

export default TabNavigation;
