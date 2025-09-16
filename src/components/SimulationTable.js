import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Input, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getDataUrl } from '../utils/pathUtils';
import './SimulationTable.css';

const { Title } = Typography;

function SimulationTable() {
  const [simulationData, setSimulationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadSimulationData();
  }, []);

  const loadSimulationData = async () => {
    try {
      const response = await fetch(getDataUrl('/data/simulation/simulation.csv'));
      const csvText = await response.text();
      const lines = csvText.split('\n');
      
      // Skip header line and parse data
      const data = lines.slice(1).map((line, index) => {
        const columns = line.split(',');
        return {
          key: index,
          name: columns[1] || '',
          zone: columns[2] || '',
          def: columns[3] || '',
          min: columns[4] || '',
          max: columns[5] || '',
          emotion: columns[6] || '',
          icon: columns[7] || '',
          effects: columns.slice(8).filter(col => col && col.trim() !== '').join(', ')
        };
      }).filter(item => item.name && item.name.trim() !== '');

      setSimulationData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error loading simulation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(simulationData);
    } else {
      const filtered = simulationData.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.zone.toLowerCase().includes(value.toLowerCase()) ||
        item.emotion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'HIGHGOOD':
        return 'green';
      case 'HIGHBAD':
        return 'red';
      case 'UNKNOWN':
        return 'default';
      default:
        return 'blue';
    }
  };

  const getZoneColor = (zone) => {
    switch (zone) {
      case 'ECONOMY':
        return 'blue';
      case 'WELFARE':
        return 'green';
      case 'LAWANDORDER':
        return 'red';
      case 'FOREIGNPOLICY':
        return 'orange';
      case 'TRANSPORT':
        return 'purple';
      case 'PUBLICSERVICES':
        return 'cyan';
      case 'HIDDEN':
        return 'default';
      case 'NOCLICK':
        return 'gray';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => (
        <span className="simulation-name">
          {name}
        </span>
      ),
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
      width: 120,
      ellipsis: true,
      filters: [
        { text: 'ECONOMY', value: 'ECONOMY' },
        { text: 'WELFARE', value: 'WELFARE' },
        { text: 'LAWANDORDER', value: 'LAWANDORDER' },
        { text: 'FOREIGNPOLICY', value: 'FOREIGNPOLICY' },
        { text: 'TRANSPORT', value: 'TRANSPORT' },
        { text: 'PUBLICSERVICES', value: 'PUBLICSERVICES' },
        { text: 'HIDDEN', value: 'HIDDEN' },
        { text: 'NOCLICK', value: 'NOCLICK' },
      ],
      onFilter: (value, record) => record.zone === value,
      render: (zone) => (
        <Tag color={getZoneColor(zone)} className="simulation-zone">
          {zone}
        </Tag>
      ),
    },
    {
      title: 'Default',
      dataIndex: 'def',
      key: 'def',
      width: 80,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.def) - parseFloat(b.def),
      render: (def) => (
        <span className="simulation-def">
          {def}
        </span>
      ),
    },
    {
      title: 'Min',
      dataIndex: 'min',
      key: 'min',
      width: 80,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.min) - parseFloat(b.min),
      render: (min) => (
        <span className="simulation-min">
          {min}
        </span>
      ),
    },
    {
      title: 'Max',
      dataIndex: 'max',
      key: 'max',
      width: 80,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.max) - parseFloat(b.max),
      render: (max) => (
        <span className="simulation-max">
          {max}
        </span>
      ),
    },
    {
      title: 'Emotion',
      dataIndex: 'emotion',
      key: 'emotion',
      width: 100,
      ellipsis: true,
      filters: [
        { text: 'HIGHGOOD', value: 'HIGHGOOD' },
        { text: 'HIGHBAD', value: 'HIGHBAD' },
        { text: 'UNKNOWN', value: 'UNKNOWN' },
      ],
      onFilter: (value, record) => record.emotion === value,
      render: (emotion) => (
        <Tag color={getEmotionColor(emotion)} className="simulation-emotion">
          {emotion}
        </Tag>
      ),
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: 120,
      ellipsis: true,
      render: (icon) => (
        <span className="simulation-icon">
          {icon}
        </span>
      ),
    },
    {
      title: 'Effects',
      dataIndex: 'effects',
      key: 'effects',
      ellipsis: true,
      render: (effects) => (
        <span className="simulation-effects" title={effects}>
          {effects}
        </span>
      ),
    },
  ];

  return (
    <div className="simulation-table-container">
      <div className="simulation-table-header">
        <div className="simulation-header-content">
          <Title level={3} style={{ color: '#1565c0', margin: 0 }}>
            Simulation Variables
          </Title>
          <div className="simulation-search-container">
            <Input
              placeholder="Search simulation variables..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="simulation-search-input"
              allowClear
            />
          </div>
        </div>
      </div>

      <Card className="simulation-table-card">
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} variables`,
          }}
          scroll={{ x: 1000 }}
          size="small"
          className="simulation-table"
        />
      </Card>
    </div>
  );
}

export default SimulationTable;
