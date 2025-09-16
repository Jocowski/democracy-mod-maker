import React, { useState, useEffect } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';
import ResizableTable from './ResizableTable';
import './PoliciesTable.css';

const { Title, Text } = Typography;


function PoliciesTable() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchPolicies();
    initializeColumns();
  }, []);

  const initializeColumns = () => {
    const initialColumns = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        fixed: 'left',
        render: (_, __, index) => index + 1,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        fixed: 'left',
        ellipsis: true,
      },
      {
        title: 'Slider',
        dataIndex: 'slider',
        key: 'slider',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Flags',
        dataIndex: 'flags',
        key: 'flags',
        width: 120,
        ellipsis: true,
      },
      {
        title: 'Opposites',
        dataIndex: 'opposites',
        key: 'opposites',
        width: 120,
        ellipsis: true,
      },
      {
        title: 'Introduce',
        dataIndex: 'introduce',
        key: 'introduce',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Cancel',
        dataIndex: 'cancel',
        key: 'cancel',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Raise',
        dataIndex: 'raise',
        key: 'raise',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Lower',
        dataIndex: 'lower',
        key: 'lower',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        width: 120,
        ellipsis: true,
      },
      {
        title: 'Prereqs',
        dataIndex: 'prereqs',
        key: 'prereqs',
        width: 120,
        ellipsis: true,
      },
      {
        title: 'Min Cost',
        dataIndex: 'mincost',
        key: 'mincost',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Max Cost',
        dataIndex: 'maxcost',
        key: 'maxcost',
        width: 100,
        ellipsis: true,
      },
      {
        title: 'Cost Function',
        dataIndex: 'costfunction',
        key: 'costfunction',
        width: 150,
        ellipsis: true,
      },
      {
        title: 'Cost Multiplier',
        dataIndex: 'costMultiplier',
        key: 'costMultiplier',
        width: 130,
        ellipsis: true,
        render: (text) => (
          text ? (
          <div className="multiplier-text">
            {formatMultiplierText(text)}
          </div>
          ) : (
            <div></div>
          )
        ),
      },
      {
        title: 'Implementation',
        dataIndex: 'implementation',
        key: 'implementation',
        width: 120,
        ellipsis: true,
      },
      {
        title: 'Min Income',
        dataIndex: 'minincome',
        key: 'minincome',
        width: 110,
        ellipsis: true,
      },
      {
        title: 'Max Income',
        dataIndex: 'maxincome',
        key: 'maxincome',
        width: 110,
        ellipsis: true,
      },
      {
        title: 'Income Function',
        dataIndex: 'incomefunction',
        key: 'incomefunction',
        width: 150,
        ellipsis: true,
      },
      {
        title: 'Income Multiplier',
        dataIndex: 'incomemultiplier',
        key: 'incomemultiplier',
        width: 140,
        ellipsis: true,
        render: (text) => (
          text ? (
          <div className="multiplier-text">
            {formatMultiplierText(text)}
          </div>
          ) : (
            <div></div>
          )
        ),
      },
      {
        title: 'Nationalisation GDP %',
        dataIndex: 'nationalisationGDPPercentage',
        key: 'nationalisationGDPPercentage',
        width: 180,
        ellipsis: true,
      },
      {
        title: 'Effects',
        dataIndex: 'effects',
        key: 'effects',
        width: 200,
        ellipsis: true,
        render: (text) => (
          text ? (
            <div className="effects-text">
              {formatEffectsText(text)}
            </div>
          ) : (
            <div></div>
          )
        ),
      },
    ];

    setColumns(initialColumns);
  };


  // Function to format multiplier text
  const formatMultiplierText = (text) => {
    if (!text || text.trim() === '') return '';
    
    // Split by semicolon and format each part
    return text.split(';').map(item => {
      const trimmed = item.trim();
      if (trimmed.includes(',')) {
        const [key, value] = trimmed.split(',', 2);
        return `${key.trim()}: ${value.trim()}`;
      }
      return trimmed;
    }).join('\n');
  };

  // Function to format effects text
  const formatEffectsText = (text) => {
    if (!text || text.trim() === '') return '';
    
    // Split by comma and process each quoted effect
    const effects = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        if (current.trim()) {
          effects.push(current.trim());
        }
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last effect
    if (current.trim()) {
      effects.push(current.trim());
    }
    
    // Format each effect
    return effects.map(effect => {
      const trimmed = effect.trim();
      if (trimmed === '') return '';
      
      // Split by comma to get parts
      const parts = trimmed.split(',');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        const delay = parts.length > 2 ? parts[2].trim() : '';
        
        if (delay && delay !== '') {
          return `${key}: ${value} [${delay}]`;
        } else {
          return `${key}: ${value}`;
        }
      }
      return trimmed;
    }).filter(effect => effect !== '').join('\n');
  };

  // Function to parse CSV line properly handling quoted values
  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    result.push(current.trim());
    return result;
  };

  const fetchPolicies = async () => {
    try {
      const response = await fetch('/data/simulation/policies.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch policies data');
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      
      // Skip the header row and process data rows
      const policiesData = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && line.startsWith('#')) {
          const columns = parseCSVLine(line);
          if (columns.length >= 2) {
            // Extract effects data (everything after "#Effects,")
            let effects = '';
            const effectsIndex = line.indexOf('#Effects,');
            if (effectsIndex !== -1) {
              const effectsPart = line.substring(effectsIndex + 9); // Skip "#Effects,"
              effects = effectsPart;
            }

            policiesData.push({
              id: i,
              name: columns[1] || '',
              slider: columns[2] || '',
              flags: columns[3] || '',
              opposites: columns[4] || '',
              introduce: columns[5] || '',
              cancel: columns[6] || '',
              raise: columns[7] || '',
              lower: columns[8] || '',
              department: columns[9] || '',
              prereqs: columns[10] || '',
              mincost: columns[11] || '',
              maxcost: columns[12] || '',
              costfunction: columns[13] || '',
              costMultiplier: columns[14] || '',
              implementation: columns[15] || '',
              minincome: columns[16] || '',
              maxincome: columns[17] || '',
              incomefunction: columns[18] || '',
              incomemultiplier: columns[19] || '',
              nationalisationGDPPercentage: columns[20] || '',
              effects: effects
            });
          }
        }
      }
      
      setPolicies(policiesData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="policies-container">
        <Card>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Spin size="large" />
            <div style={{ marginTop: '1rem', color: '#1565c0' }}>Loading policies...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="policies-container">
        <Alert
          message="Error Loading Policies"
          description={error}
          type="error"
          showIcon
          style={{ margin: '1rem 0' }}
        />
      </div>
    );
  }


  return (
    <div className="policies-container">
      <Card>
        <div className="policies-header">
          <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
            Policies
          </Title>
          <Text style={{ color: '#1976d2', fontSize: '1.1rem' }}>
            Total policies: {policies.length}
          </Text>
        </div>
        
        <ResizableTable
          columns={columns}
          dataSource={policies}
          rowKey="id"
          scroll={{ x: 2000, y: '70vh' }}
          pagination={{
            pageSize: 50,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} policies`,
          }}
          size="small"
          bordered
          className="policies-antd-table"
        />
      </Card>
    </div>
  );
}

export default PoliciesTable;
