import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Spin, Alert } from 'antd';
import ResizableTable from './ResizableTable';
import './SlidersTable.css';

const { Title } = Typography;

function SlidersTable() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    
    result.push(current.trim());
    return result;
  };

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/data/simulation/sliders.csv');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      const slidersData = [];
      
      lines.forEach((line, index) => {
        if (line.trim() && line.startsWith('#,')) {
          const columns = parseCSVLine(line);
          
          if (columns.length >= 4) {
            const name = columns[1];
            const type = columns[2];
            const value1 = columns[3];
            const value2 = columns[4] || '';
            
            if (name && type) {
              let steps = '';
              let minMax = '';
              
              if (type === 'DISCRETE') {
                const stepsValue = parseInt(value1);
                steps = stepsValue === 0 ? 'FREE SLIDER' : stepsValue.toString();
              } else if (type === 'PERCENTAGE') {
                const min = parseInt(value1);
                const max = parseInt(value2);
                minMax = `${min}% - ${max}%`;
              }
              
              slidersData.push({
                name,
                type,
                steps,
                minMax,
                key: `${name}-${index}`
              });
            }
          }
        }
      });
      
      setSliders(slidersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching sliders:', err);
      setError('Failed to load sliders data. Please check if the file exists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      ellipsis: true,
      render: (type) => (
        <span className={`slider-type ${type.toLowerCase()}`}>
          {type}
        </span>
      ),
    },
    {
      title: 'Steps',
      dataIndex: 'steps',
      key: 'steps',
      width: 120,
      ellipsis: true,
      render: (steps, record) => {
        if (record.type === 'DISCRETE') {
          return (
            <span className={`slider-steps ${steps === 'FREE SLIDER' ? 'free' : 'discrete'}`}>
              {steps}
            </span>
          );
        }
        return '-';
      },
    },
    {
      title: 'Min - Max %',
      dataIndex: 'minMax',
      key: 'minMax',
      width: 150,
      ellipsis: true,
      render: (minMax, record) => {
        if (record.type === 'PERCENTAGE') {
          return (
            <span className="slider-percentage">
              {minMax}
            </span>
          );
        }
        return '-';
      },
    },
  ];

  if (loading) {
    return (
      <div className="sliders-container">
        <Card>
          <div className="sliders-header">
            <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
              Sliders
            </Title>
          </div>
          <div className="sliders-loading">
            <Spin size="large" />
            <p>Loading sliders data...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sliders-container">
        <Card>
          <div className="sliders-header">
            <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
              Sliders
            </Title>
          </div>
          <Alert
            message="Error Loading Sliders"
            description={error}
            type="error"
            showIcon
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="sliders-container">
      <Card>
        <div className="sliders-header">
          <Title level={2} style={{ color: '#1565c0', margin: 0 }}>
            Sliders
          </Title>
          <p className="sliders-description">
            Game sliders that control various policy settings and their ranges.
          </p>
        </div>
        
        <ResizableTable
          columns={columns}
          dataSource={sliders}
          rowKey="key"
          scroll={{ x: 600, y: '70vh' }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} sliders`,
          }}
          size="small"
          bordered
          className="sliders-table"
        />
      </Card>
    </div>
  );
}

export default SlidersTable;
