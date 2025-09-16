import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Input, Tag, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './DilemmasTable.css';

const { Title } = Typography;

function DilemmasTable() {
  const [dilemmas, setDilemmas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  useEffect(() => {
    fetchDilemmas();
  }, []);

  useEffect(() => {
    setFilteredData(dilemmas);
    setPagination(prev => ({
      ...prev,
      total: dilemmas.length,
    }));
  }, [dilemmas]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(dilemmas);
      setPagination(prev => ({
        ...prev,
        total: dilemmas.length,
        current: 1,
      }));
    } else {
      const filtered = dilemmas.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.influences.some(influence => 
          influence.toLowerCase().includes(value.toLowerCase())
        ) ||
        item.options.some(option => 
          option.effects.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setPagination(prev => ({
        ...prev,
        total: filtered.length,
        current: 1,
      }));
    }
  };

  const handleTableChange = (paginationConfig) => {
    setPagination({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
      total: paginationConfig.total,
    });
  };

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
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => (
        <span className="dilemma-name">
          {name}
        </span>
      ),
    },
    {
      title: 'Influences',
      dataIndex: 'influences',
      key: 'influences',
      width: 200,
      ellipsis: true,
      render: (influences) => (
        <div className="dilemma-influences" title={formatInfluences(influences)}>
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
          <div className="dilemma-option" title={formatOptionEffects(option1.effects)}>
            {formatOptionEffects(option1.effects)}
          </div>
        ) : <div className="dilemma-empty">-</div>;
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
          <div className="dilemma-option" title={formatOptionEffects(option2.effects)}>
            {formatOptionEffects(option2.effects)}
          </div>
        ) : <div className="dilemma-empty">-</div>;
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
          <div className="dilemma-option" title={formatOptionEffects(option3.effects)}>
            {formatOptionEffects(option3.effects)}
          </div>
        ) : <div className="dilemma-empty">-</div>;
      },
    },
  ];

  return (
    <div className="dilemmas-table-container">
      <div className="dilemmas-table-header">
        <div className="dilemmas-header-content">
          <Title level={3} style={{ color: '#1565c0', margin: 0 }}>
            Dilemmas
          </Title>
          <div className="dilemmas-search-container">
            <Input
              placeholder="Search dilemmas..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="dilemmas-search-input"
              allowClear
            />
          </div>
        </div>
      </div>

      <Card className="dilemmas-table-card">
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} dilemmas`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 1000, y: '70vh' }}
          size="small"
          className="dilemmas-table"
        />
      </Card>
    </div>
  );
}

export default DilemmasTable;
