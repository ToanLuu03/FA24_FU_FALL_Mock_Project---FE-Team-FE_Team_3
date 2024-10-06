import React, { useState, useEffect } from 'react';
import { Table } from 'antd'; 
import { fetchTrainers } from '../../../api/Unit_Price_API'; 
import './TrainerUnitPricePage.css';

function TrainerUnitPrice() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers()
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        console.error('Error in useEffect:', error);
      });
  }, []);

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: 'No.',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: 'Unit Code',
      dataIndex: 'Unitcode',
      key: 'Unitcode',
    },
    {
      title: 'Last Modified Date',
      dataIndex: 'Lastmodifieddate',
      key: 'Lastmodifieddate',
    },
    {
      title: 'Last Modified By',
      dataIndex: 'Lastmodifiedby',
      key: 'Lastmodifiedby',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Note',
      dataIndex: 'Note',
      key: 'Note',
    },
  ];

  return (
    <div className="trainer-unit">
      <Table
        dataSource={trainers}
        columns={columns}
        rowKey="No" // Sử dụng trường nào để làm key cho mỗi hàng
      />
    </div>
  );
}

export default TrainerUnitPrice;
