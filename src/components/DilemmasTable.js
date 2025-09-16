import React, { useState, useEffect } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';
import ResizableTable from './ResizableTable';
import './DilemmasTable.css';

const { Title, Text } = Typography;

function DilemmasTable() {
  const [dilemmas, setDilemmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDilemmas();
  }, []);

  // Function to parse dilemma text file
  const parseDilemmaFile = (content, filename) => {
    const lines = content.split('\n');
    const dilemma = {
      id: filename.replace('.txt', ''),
      name: '',
      influences: [],
      options: []
    };

    let currentSection = '';
    let currentOption = null;

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        currentSection = trimmed.slice(1, -1);
        if (currentSection.startsWith('option')) {
          currentOption = {
            id: currentSection,
            effects: []
          };
          dilemma.options.push(currentOption);
        }
      } else if (trimmed.includes('=')) {
        const [key, value] = trimmed.split('=', 2);
        const cleanKey = key.trim();
        const cleanValue = value.trim();

        switch (currentSection) {
          case 'dilemma':
            if (cleanKey === 'name') {
              dilemma.name = cleanValue;
            }
            break;
          case 'influences':
            if (cleanKey.match(/^\d+$/)) {
              dilemma.influences.push(cleanValue);
            }
            break;
          default:
            if (currentSection.startsWith('option') && cleanKey === 'OnImplement') {
              currentOption.effects = cleanValue;
            }
            break;
        }
      }
    }

    return dilemma;
  };

  // Function to format influences
  const formatInfluences = (influences) => {
    if (!influences || influences.length === 0) return '';
    
    return influences.map((influence, index) => {
      const parts = influence.split(',');
      if (parts.length >= 3) {
        const name = parts[0].trim();
        const value1 = parts[1].trim();
        const value2 = parts[2].trim();
        return `${index + 1} = ${name} [${value1},${value2}]`;
      }
      return `${index + 1} = ${influence}`;
    }).join('\n');
  };

  // Function to format option effects
  const formatOptionEffects = (effects) => {
    if (!effects || effects.trim() === '') return '';
    
    // Split by semicolon and process each CreateGrudge
    const grudgeEffects = effects.split(';').filter(effect => effect.trim() !== '');
    
    return grudgeEffects.map(effect => {
      const trimmed = effect.trim();
      if (trimmed.startsWith('CreateGrudge(') && trimmed.endsWith(')')) {
        const content = trimmed.slice(13, -1); // Remove 'CreateGrudge(' and ')'
        const parts = content.split(',');
        if (parts.length >= 3) {
          const name = parts[0].trim();
          const value1 = parts[1].trim();
          const value2 = parts[2].trim();
          return `${name}: [${value1},${value2}]`;
        }
      }
      return trimmed;
    }).join('\n');
  };

  const fetchDilemmas = async () => {
    try {
      // Get list of dilemma files by parsing directory listing
      const response = await fetch('/data/simulation/dilemmas/');
      if (!response.ok) {
        throw new Error('Failed to fetch dilemmas directory');
      }
      
      const htmlContent = await response.text();
      
      // Parse HTML directory listing to extract .txt files
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const links = doc.querySelectorAll('a[href$=".txt"]');
      
      const dilemmaFiles = Array.from(links).map(link => {
        const href = link.getAttribute('href');
        // Extract just the filename from the href
        return href.split('/').pop();
      });
      
      if (dilemmaFiles.length === 0) {
        // Fallback to hardcoded list if directory parsing fails
        const fallbackFiles = [
          'Adoption.txt',
          'AgeBasedDrivingTests.txt',
          'Airport.txt',
          'AirportExpansion.txt'
        ];
        dilemmaFiles.push(...fallbackFiles);
      }
      
      const dilemmasData = [];
      
      for (const filename of dilemmaFiles) {
        try {
          const fileResponse = await fetch(`/data/simulation/dilemmas/${filename}`);
          if (fileResponse.ok) {
            const content = await fileResponse.text();
            const dilemma = parseDilemmaFile(content, filename);
            dilemmasData.push(dilemma);
          }
        } catch (fileError) {
          console.warn(`Failed to load ${filename}:`, fileError);
        }
      }
      
      setDilemmas(dilemmasData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dilemmas-container">
        <Card>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Spin size="large" />
            <div style={{ marginTop: '1rem', color: '#1565c0' }}>Loading dilemmas...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dilemmas-container">
        <Alert
          message="Error Loading Dilemmas"
          description={error}
          type="error"
          showIcon
          style={{ margin: '1rem 0' }}
        />
      </div>
    );
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: 'Influences',
      dataIndex: 'influences',
      key: 'influences',
      width: 200,
      ellipsis: true,
      render: (influences) => (
        <div className="dilemma-text">
          {formatInfluences(influences)}
        </div>
      ),
    },
    {
      title: 'Option 1',
      dataIndex: 'options',
      key: 'option1',
      width: 200,
      ellipsis: true,
      render: (options) => {
        const option1 = options.find(opt => opt.id === 'option0');
        return option1 ? (
          <div className="dilemma-text">
            {formatOptionEffects(option1.effects)}
          </div>
        ) : <div></div>;
      },
    },
    {
      title: 'Option 2',
      dataIndex: 'options',
      key: 'option2',
      width: 200,
      ellipsis: true,
      render: (options) => {
        const option2 = options.find(opt => opt.id === 'option1');
        return option2 ? (
          <div className="dilemma-text">
            {formatOptionEffects(option2.effects)}
          </div>
        ) : <div></div>;
      },
    },
    {
      title: 'Option 3',
      dataIndex: 'options',
      key: 'option3',
      width: 200,
      ellipsis: true,
      render: (options) => {
        const option3 = options.find(opt => opt.id === 'option2');
        return option3 ? (
          <div className="dilemma-text">
            {formatOptionEffects(option3.effects)}
          </div>
        ) : <div></div>;
      },
    },
  ];

  return (
    <div className="dilemmas-container">
      <Card>
        <div className="dilemmas-header">
          <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
            Dilemmas
          </Title>
          <Text style={{ color: '#1976d2', fontSize: '1.1rem' }}>
            Total dilemmas: {dilemmas.length}
          </Text>
        </div>
        
        <ResizableTable
          columns={columns}
          dataSource={dilemmas}
          rowKey="id"
          scroll={{ x: 1000, y: '70vh' }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} dilemmas`,
          }}
          size="small"
          bordered
          className="dilemmas-antd-table"
        />
      </Card>
    </div>
  );
}

export default DilemmasTable;
