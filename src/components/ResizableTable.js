import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

// Resizable column component
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <th
      {...restProps}
      style={{
        ...restProps.style,
        position: 'relative',
      }}
    >
      {restProps.children}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '5px',
          background: 'rgba(0, 0, 0, 0.1)',
          cursor: 'col-resize',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = width;

          const handleMouseMove = (e) => {
            const newWidth = startWidth + e.clientX - startX;
            if (newWidth > 50 && onResize) { // Minimum width and check if onResize exists
              onResize(newWidth);
            }
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
    </th>
  );
};

function ResizableTable({ 
  columns: initialColumns, 
  dataSource, 
  rowKey, 
  scroll, 
  pagination, 
  size = "small", 
  bordered = true, 
  className = "",
  ...otherProps 
}) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const handleResize = (index) => (newWidth) => {
    setColumns((prevColumns) => {
      const nextColumns = [...prevColumns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: newWidth,
      };
      return nextColumns;
    });
  };

  // Create resizable columns
  const resizableColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: () => ({
      width: col.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      columns={resizableColumns}
      dataSource={dataSource}
      rowKey={rowKey}
      scroll={scroll}
      pagination={pagination}
      size={size}
      bordered={bordered}
      className={className}
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      {...otherProps}
    />
  );
}

export default ResizableTable;
