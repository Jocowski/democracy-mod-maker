import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import PoliciesTable from '../components/PoliciesTable';
import DilemmasTable from '../components/DilemmasTable';
import SlidersTable from '../components/SlidersTable';
import './OfficialGameData.css';

const { Title } = Typography;

function OfficialGameData() {
  const [activeSubTab, setActiveSubTab] = useState('policies');

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'policies':
        return <PoliciesTable />;
      case 'dilemmas':
        return <DilemmasTable />;
      case 'sliders':
        return <SlidersTable />;
      default:
        return <PoliciesTable />;
    }
  };

  return (
    <div className="official-game-data-container">
      <Card>
        <div className="official-game-data-header">
          <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
            Official Game Data
          </Title>
        </div>
        
        <div className="sub-tab-navigation">
          <div className="sub-tab-container">
            <button 
              className={`sub-tab ${activeSubTab === 'policies' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('policies')}
            >
              Policies
            </button>
            <button 
              className={`sub-tab ${activeSubTab === 'dilemmas' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('dilemmas')}
            >
              Dilemmas
            </button>
            <button 
              className={`sub-tab ${activeSubTab === 'sliders' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('sliders')}
            >
              Sliders
            </button>
          </div>
        </div>
        
        <div className="sub-tab-content">
          {renderSubTabContent()}
        </div>
      </Card>
    </div>
  );
}

export default OfficialGameData;
