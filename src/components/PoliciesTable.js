import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Input, Space, Tag, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './PoliciesTable.css';

const { Title } = Typography;

function PoliciesTable() {
  const [policies, setPolicies] = useState([]);
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
    fetchPolicies();
  }, []);

  useEffect(() => {
    setFilteredData(policies);
    setPagination(prev => ({
      ...prev,
      total: policies.length,
    }));
  }, [policies]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(policies);
      setPagination(prev => ({
        ...prev,
        total: policies.length,
        current: 1,
      }));
    } else {
      const filtered = policies.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.department.toLowerCase().includes(value.toLowerCase()) ||
        item.flags.toLowerCase().includes(value.toLowerCase()) ||
        item.slider.toLowerCase().includes(value.toLowerCase())
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

  const getDepartmentColor = (department) => {
    switch (department) {
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
      case 'TAX':
        return 'magenta';
      default:
        return 'default';
    }
  };

  const getFlagsColor = (flags) => {
    switch (flags) {
      case 'UNCANCELLABLE':
        return 'red';
      case 'MULTIPLYINCOME':
        return 'blue';
      case 'NATIONALISATION':
        return 'orange';
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
        <span className="policy-name">
          {name}
        </span>
      ),
    },
    {
      title: 'Slider',
      dataIndex: 'slider',
      key: 'slider',
      width: 120,
      ellipsis: true,
      render: (slider) => (
        <span className="policy-slider">
          {slider}
        </span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 140,
      ellipsis: true,
      filters: [
        { text: 'ECONOMY', value: 'ECONOMY' },
        { text: 'WELFARE', value: 'WELFARE' },
        { text: 'LAWANDORDER', value: 'LAWANDORDER' },
        { text: 'FOREIGNPOLICY', value: 'FOREIGNPOLICY' },
        { text: 'TRANSPORT', value: 'TRANSPORT' },
        { text: 'PUBLICSERVICES', value: 'PUBLICSERVICES' },
        { text: 'TAX', value: 'TAX' },
      ],
      onFilter: (value, record) => record.department === value,
      render: (department) => (
        <Tag color={getDepartmentColor(department)} className="policy-department">
          {department}
        </Tag>
      ),
    },
    {
      title: 'Flags',
      dataIndex: 'flags',
      key: 'flags',
      width: 120,
      ellipsis: true,
      filters: [
        { text: 'UNCANCELLABLE', value: 'UNCANCELLABLE' },
        { text: 'MULTIPLYINCOME', value: 'MULTIPLYINCOME' },
        { text: 'NATIONALISATION', value: 'NATIONALISATION' },
        { text: 'None', value: '' },
      ],
      onFilter: (value, record) => record.flags === value,
      render: (flags) => (
        <Tag color={getFlagsColor(flags)} className="policy-flags">
          {flags || 'None'}
        </Tag>
      ),
    },
    {
      title: 'Opposites',
      dataIndex: 'opposites',
      key: 'opposites',
      width: 120,
      ellipsis: true,
      render: (opposites) => (
        <span className="policy-opposites" title={opposites}>
          {opposites || '-'}
        </span>
      ),
    },
    {
      title: 'Introduce',
      dataIndex: 'introduce',
      key: 'introduce',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.introduce) - parseFloat(b.introduce),
      render: (introduce) => (
        <span className="policy-value">
          {introduce}
        </span>
      ),
    },
    {
      title: 'Cancel',
      dataIndex: 'cancel',
      key: 'cancel',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.cancel) - parseFloat(b.cancel),
      render: (cancel) => (
        <span className="policy-value">
          {cancel}
        </span>
      ),
    },
    {
      title: 'Raise',
      dataIndex: 'raise',
      key: 'raise',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.raise) - parseFloat(b.raise),
      render: (raise) => (
        <span className="policy-value">
          {raise}
        </span>
      ),
    },
    {
      title: 'Lower',
      dataIndex: 'lower',
      key: 'lower',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.lower) - parseFloat(b.lower),
      render: (lower) => (
        <span className="policy-value">
          {lower}
        </span>
      ),
    },
    {
      title: 'Prereqs',
      dataIndex: 'prereqs',
      key: 'prereqs',
      width: 120,
      ellipsis: true,
      render: (prereqs) => (
        <span className="policy-prereqs" title={prereqs}>
          {prereqs || '-'}
        </span>
      ),
    },
    {
      title: 'Min Cost',
      dataIndex: 'mincost',
      key: 'mincost',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.mincost) - parseFloat(b.mincost),
      render: (mincost) => (
        <span className="policy-cost">
          {mincost}
        </span>
      ),
    },
    {
      title: 'Max Cost',
      dataIndex: 'maxcost',
      key: 'maxcost',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.maxcost) - parseFloat(b.maxcost),
      render: (maxcost) => (
        <span className="policy-cost">
          {maxcost}
        </span>
      ),
    },
    {
      title: 'Implementation',
      dataIndex: 'implementation',
      key: 'implementation',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.implementation) - parseFloat(b.implementation),
      render: (implementation) => (
        <span className="policy-implementation">
          {implementation}
        </span>
      ),
    },
    {
      title: 'Min Income',
      dataIndex: 'minincome',
      key: 'minincome',
      width: 110,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.minincome) - parseFloat(b.minincome),
      render: (minincome) => (
        <span className="policy-income">
          {minincome}
        </span>
      ),
    },
    {
      title: 'Max Income',
      dataIndex: 'maxincome',
      key: 'maxincome',
      width: 110,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.maxincome) - parseFloat(b.maxincome),
      render: (maxincome) => (
        <span className="policy-income">
          {maxincome}
        </span>
      ),
    },
    {
      title: 'Cost Function',
      dataIndex: 'costfunction',
      key: 'costfunction',
      width: 150,
      ellipsis: true,
      render: (costfunction) => (
        <span className="policy-function" title={costfunction}>
          {costfunction}
        </span>
      ),
    },
    {
      title: 'Income Function',
      dataIndex: 'incomefunction',
      key: 'incomefunction',
      width: 150,
      ellipsis: true,
      render: (incomefunction) => (
        <span className="policy-function" title={incomefunction}>
          {incomefunction}
        </span>
      ),
    },
    {
      title: 'Cost Multiplier',
      dataIndex: 'costMultiplier',
      key: 'costMultiplier',
      width: 130,
      ellipsis: true,
      render: (costMultiplier) => (
        <span className="policy-multiplier" title={costMultiplier}>
          {costMultiplier || '-'}
        </span>
      ),
    },
    {
      title: 'Income Multiplier',
      dataIndex: 'incomemultiplier',
      key: 'incomemultiplier',
      width: 140,
      ellipsis: true,
      render: (incomemultiplier) => (
        <span className="policy-multiplier" title={incomemultiplier}>
          {incomemultiplier || '-'}
        </span>
      ),
    },
    {
      title: 'Nationalisation GDP %',
      dataIndex: 'nationalisationGDPPercentage',
      key: 'nationalisationGDPPercentage',
      width: 180,
      ellipsis: true,
      sorter: (a, b) => parseFloat(a.nationalisationGDPPercentage) - parseFloat(b.nationalisationGDPPercentage),
      render: (nationalisationGDPPercentage) => (
        <span className="policy-gdp">
          {nationalisationGDPPercentage || '-'}
        </span>
      ),
    },
    {
      title: 'Effects',
      dataIndex: 'effects',
      key: 'effects',
      ellipsis: true,
      render: (effects) => (
        <span className="policy-effects" title={effects}>
          {effects}
        </span>
      ),
    },
  ];



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
    <div className="policies-table-container">
      <div className="policies-table-header">
        <div className="policies-header-content">
          <Title level={3} style={{ color: '#1565c0', margin: 0 }}>
            Policies
          </Title>
          <div className="policies-search-container">
            <Input
              placeholder="Search policies..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="policies-search-input"
              allowClear
            />
          </div>
        </div>
      </div>

      <Card className="policies-table-card">
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
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} policies`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 2000, y: '70vh' }}
          size="small"
          className="policies-table"
        />
      </Card>
    </div>
  );
}

export default PoliciesTable;
