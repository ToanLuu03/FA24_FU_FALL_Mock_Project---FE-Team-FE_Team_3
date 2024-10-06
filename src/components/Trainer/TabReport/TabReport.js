import React, { useState } from 'react'; 
import { DatePicker, Select, Input } from 'antd';
import './TabReport.css'; 

const { RangePicker } = DatePicker;
const { Option } = Select;

const TabReport = () => {
  const [selectedModule, setSelectedModule] = useState('React');
  const [dates, setDates] = useState([null, null]);

  const data = [
    { key: '1', date: '23/08/2024', topic: 'Introduction of the course', deliveryType: 'Assignment/Lab', trainingFormat: 'Offline', duration: '2', note: 'Good' },
    { key: '2', date: '23/08/2024', topic: 'Introduction of React', deliveryType: 'Assignment/Lab', trainingFormat: 'Offline', duration: '2', note: 'Good' },
    { key: '3', date: '23/08/2024', topic: 'React Overview', deliveryType: 'Test/Quiz', trainingFormat: 'Homework', duration: '', note: '' },
    { key: '4', date: '23/08/2024', topic: 'Hook Overview', deliveryType: 'Test/Quiz', trainingFormat: 'Homework', duration: '', note: '' },
    { key: '5', date: '24/08/2024', topic: 'Basic Hook', deliveryType: 'Test/Quiz', trainingFormat: 'Homework', duration: '3', note: 'Good' },
    { key: '6', date: '24/08/2024', topic: 'Advanced Hook', deliveryType: 'Test/Quiz', trainingFormat: 'Homework', duration: '', note: '' },
    { key: '7', date: '25/08/2024', topic: 'Advanced Hook', deliveryType: 'Test/Quiz', trainingFormat: 'Homework', duration: '3', note: 'Excellent' },
    { key: '8', date: '25/08/2024', topic: 'Advanced Hook', deliveryType: 'Test/Quiz', trainingFormat: 'Homework', duration: '', note: '' },
  ];

  // Hàm xử lý thay đổi module
  const handleModuleChange = (value) => {
    setSelectedModule(value);
  };

  // Hàm xử lý chọn ngày
  const handleDateChange = (dates) => {
    setDates(dates || [null, null]);
  };
  
  // Hàm hiển thị giá trị mà không cần kiểm tra trùng lặp
const renderCell = (text) => {
  return text;
};
  return (
    <div className="tab-report-container">
      <div className="tab-report-filters">
        <div>
          <label>Class:</label>
          <div className='class-input'>
            <Select defaultValue="HCM_24_FR_REACT01">
              <Option value="HCM_24_FR_REACT01">HCM_24_FR_REACT01</Option>
            </Select>
          </div>
        </div>

        <div>
          <label>Module:</label>
          <div className='module-input'>
            <Select defaultValue="React" onChange={handleModuleChange}>
              <Option value="React">React</Option>
              <Option value="Java">Java</Option>
            </Select>
          </div>
        </div>

        <div className='report-date'>
          <label>Report Date:</label>
          <RangePicker onChange={handleDateChange} />
        </div>

        <div className='search'>
          <label>Search:</label>
          <Input.Search placeholder="Enter class code, class name" />
        </div>
      </div>

      <div className="tab-report-header">
        <div className="tab-report-info">
          <p><span className="bold-text">Module:</span> {selectedModule}</p>
        </div>
        <div className="start-date">
          <p><span className="bold-text">Start Date:</span> {dates[0] ? dates[0].format('DD/MM/YYYY') : 'N/A'}</p>
        </div>
        <div className="end-date">
          <p><span className="bold-text">End Date:</span> {dates[1] ? dates[1].format('DD/MM/YYYY') : 'N/A'}</p>
        </div>
      </div>
      
      <table className="tab-report-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Topic</th>
            <th>Delivery type</th>
            <th>Training Format</th>
            <th>Duration (h)</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.key}>
              <td>{renderCell(row.date, rowIndex, 'date')}</td>
              <td>{row.topic}</td>
              <td>{renderCell(row.deliveryType, rowIndex, 'deliveryType')}</td>
              <td>{renderCell(row.trainingFormat, rowIndex, 'trainingFormat')}</td>
              <td>{renderCell(row.duration, rowIndex, 'duration')}</td>
              <td>{renderCell(row.note, rowIndex, 'note')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="tab-report-total-duration">
        Duration Total: 8 h
      </div>
    </div>
  );
};

export default TabReport;
