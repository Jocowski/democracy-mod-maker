import React, { useState } from 'react';
import { Tabs, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import JSZip from 'jszip';
import Policies from './Policies';
import './CreateMod.css';

const { TabPane } = Tabs;

function CreateMod() {
  const [activeSubTab, setActiveSubTab] = useState('policies');
  const [policies, setPolicies] = useState([]);

  const handleSubTabChange = (key) => {
    setActiveSubTab(key);
  };

  const handleExportMod = async () => {
    if (policies.length === 0) {
      message.warning('No policies to export!');
      return;
    }

    try {
      // Create CSV content
      const csvHeader = ',name,slider,flags,opposites,introduce,cancel,raise,lower,department,prereqs,mincost,maxcost,costfunction,cost multiplier,implementation,minincome,maxincome,incomefunction,incomemultiplier,nationalisation GDP percentage,,,,,,,,,,,,,,,,,,';
      
      const csvRows = policies.map(policy => {
        return [
          '#',
          policy.name || '',
          '', // slider (empty for now)
          policy.flags || 'none',
          policy.opposites || '',
          policy.introduce || 0,
          policy.cancel || 0,
          policy.raise || 0,
          policy.lower || 0,
          policy.department || '',
          '', // prereqs (empty for now)
          policy.minCost || 0,
          policy.maxCost || 0,
          policy.costFunction || '0+(1.0*x)',
          '', // cost multiplier (empty for now)
          policy.implementation || 0,
          policy.minIncome || 0,
          policy.maxIncome || 0,
          policy.incomeFunction || '0+(1.0*x)',
          '', // income multiplier (empty for now)
          '', // nationalisation GDP percentage (empty for now)
          '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' // Empty columns to match template
        ].join(',');
      });

      const csvContent = [csvHeader, ...csvRows].join('\n');

      // Create ZIP file
      const zip = new JSZip();
      const dataFolder = zip.folder('data');
      const simulationFolder = dataFolder.folder('simulation');
      simulationFolder.file('policies.csv', csvContent);

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Create download link
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'democracy_mod_export.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success(`Successfully exported mod with ${policies.length} policies!`);
    } catch (error) {
      console.error('Export error:', error);
      message.error('Failed to export mod. Please try again.');
    }
  };

  return (
    <div className="create-mod-container">
      <div className="create-mod-header">
        <div className="header-content">
          <div className="header-text">
            <h2 className="create-mod-title">Create Mod</h2>
            <p className="create-mod-description">
              Create and manage your custom Democracy 4 mod content
            </p>
          </div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportMod}
            className="export-mod-button"
            size="large"
            disabled={policies.length === 0}
          >
            Export Mod
          </Button>
        </div>
      </div>

      <div className="create-mod-content">
        <Tabs 
          activeKey={activeSubTab} 
          onChange={handleSubTabChange}
          className="create-mod-tabs"
          type="card"
        >
          <TabPane tab="Policies" key="policies">
            <Policies policies={policies} setPolicies={setPolicies} />
          </TabPane>
          <TabPane tab="Dilemmas" key="dilemmas">
            <div className="coming-soon">
              <h3>Dilemmas Management</h3>
              <p>Coming soon! This will allow you to create and manage custom dilemmas for your mod.</p>
            </div>
          </TabPane>
          <TabPane tab="Sliders" key="sliders">
            <div className="coming-soon">
              <h3>Sliders Management</h3>
              <p>Coming soon! This will allow you to create and manage custom sliders for your mod.</p>
            </div>
          </TabPane>
          <TabPane tab="Mod Settings" key="settings">
            <div className="coming-soon">
              <h3>Mod Settings</h3>
              <p>Coming soon! This will allow you to configure general mod settings and metadata.</p>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default CreateMod;
