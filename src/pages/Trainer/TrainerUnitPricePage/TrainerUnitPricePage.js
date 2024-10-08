import React, { useState, useEffect } from 'react';
import { Table } from 'antd';  
import { fetchTrainers } from '../../../api/Unit_Price_API';
import './TrainerUnitPricePage.css';

function TrainerUnitPrice() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading


  useEffect(() => {
    setLoading(true); // loading khi lấy dữ liệu
    fetchTrainers()
      .then((data) => {
        // set hàm timeout để tạo độ trễ khi load
        setTimeout(() => {
          setTrainers(data); 
          setLoading(false); 
        }, 300); 
      })
      .catch((error) => {
        console.error('Lỗi trong useEffect:', error);
        setLoading(false); 
      });

  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: 'Mã đơn vị',
      dataIndex: 'Unitcode',
      key: 'Unitcode',
    },
    {
      title: 'Ngày sửa đổi gần nhất',
      dataIndex: 'Lastmodifieddate',
      key: 'Lastmodifieddate',
    },
    {
      title: 'Người sửa đổi gần nhất',
      dataIndex: 'Lastmodifiedby',
      key: 'Lastmodifiedby',
    },
    {
      title: 'Giá',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'Note',
      key: 'Note',
    },
  ];

  return (
    <div className="trainer-unit">
      {loading ? (
        <div className="loading-container">
          <p>Loading Data...</p> 
        </div>
      ) : (
        <Table
          dataSource={trainers}
          columns={columns}
          rowKey="No" // Sử dụng trường nào để làm key cho mỗi hàng
        />
      )}
    </div>
  );
}

export default TrainerUnitPrice;
