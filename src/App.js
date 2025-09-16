import React, { useState } from 'react';
import './App.css';
import TabNavigation from './components/TabNavigation';
import Home from './pages/Home';
import OfficialGameData from './pages/OfficialGameData';
import Policies from './pages/Policies';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'official-game-data':
        return <OfficialGameData />;
      case 'policies':
        return <Policies />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Democracy 4 - Mod Maker</h1>
      </header>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="App-main">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;
