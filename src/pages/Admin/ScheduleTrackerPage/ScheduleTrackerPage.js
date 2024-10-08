import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import './ScheduleTrackerPage.css';
import { classOptions, moduleOptions, options, trainerOptions } from '../../../data/Schedule';
import { fetchScheduleData } from '../../../api/ScheduleTracker_api';
import { SelectBox, SelectOption } from '../../../components/Admin/Selectbox/SelectBox';
import Date from '../../../components/Admin/SelectDate/Date';
import { SearchOutlined } from '@ant-design/icons';

function ScheduleTracker() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [trainingOptions, setTrainingOptions] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [filteredScheduleData, setFilteredScheduleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm searchTerm state

  const handleSelectMethod = (value) => {
    setSelectedMethod(value);
    resetSelections();
  };

  const resetSelections = () => {
    setSelectedClass(null);
    setSelectedModule(null);
    setSelectedTrainer(null);
    setShowTable(false);
  };

  const handleSelectClass = (value) => {
    setSelectedClass(value);
    setSelectedModule(null);
    setShowTable(false);
  };

  const handleSelectModule = (value) => {
    setSelectedModule(value);
    setShowTable(true);
  };

  const handleSelectTrainer = (value) => {
    setSelectedTrainer(value);
    setSelectedClass(null);
    setSelectedModule(null);
    setShowTable(false);
  };

  const filterScheduleData = (filterKey, selectedValues) => {
    if (selectedValues.length === 0) {
      setFilteredScheduleData(scheduleData); // Hiển thị toàn bộ dữ liệu nếu không có lựa chọn
    } else {
      const filteredData = scheduleData.filter(item =>
        selectedValues.includes(item[filterKey])
      );
      setFilteredScheduleData(filteredData);
    }
    setShowTable(true);
  };




  const handleSelectDelivery = (values) => {
    setSelectedDelivery(values);
    filterScheduleData('contentDeliveryType', values);
    resetFilters('delivery');
  };

  const handleSelectTraining = (values) => {
    setSelectedTraining(values);
    filterScheduleData('contentTrainingFormat', values);
    resetFilters('training');
  };

  const handleSelectStatus = (values) => {
    setSelectedStatus(values);
    filterScheduleData('contentName', values);
    resetFilters('status');
  };


  // set null options
  const resetFilters = (activeFilter) => {
    if (activeFilter !== 'delivery') setSelectedDelivery(null);
    if (activeFilter !== 'training') setSelectedTraining(null);
    if (activeFilter !== 'status') setSelectedStatus(null);
  };


  useEffect(() => {
    const getScheduleData = async () => {
      const result = await fetchScheduleData();
      setScheduleData(result);
      const deliveryTypes = [...new Set(result.map(item => item.contentDeliveryType))];
      const deliveryOptions = deliveryTypes.map(type => ({ label: type, value: type }));
      const StatusTypes = [...new Set(result.map(item => item.contentName))];
      const statusOptions = StatusTypes.map(type => ({ label: type, value: type }));
      const TrainingTypes = [...new Set(result.map(item => item.contentTrainingFormat))];
      const trainingOptions = TrainingTypes.map(type => ({ label: type, value: type }));
      setTrainingOptions(trainingOptions);
      setStatusOptions(statusOptions);
      setDeliveryOptions(deliveryOptions);
      setFilteredScheduleData(result); // Initial data load
    };
    getScheduleData();
  }, []);

  return (
    <div>
      <div className='tracker-by'>
        <span className='text'>Track by:</span> <br />
        <Select onChange={handleSelectMethod} options={options} style={{ width: '90%' }} />
      </div>

      {/* For Tracking by Class Name */}
      {selectedMethod === 'Class Name' && (
        <div className="classname">
          <div className='class-module'>
            <span className='text'>Class</span> <br />
            <SelectBox onChange={handleSelectClass} options={classOptions} />
          </div>
          {selectedClass && (
            <div className='class-module'>
              <span className='text'>Module</span> <br />
              <SelectBox onChange={handleSelectModule} options={moduleOptions} style={{ width: 500 }} />
            </div>
          )}
        </div>
      )}

      {/* For Tracking by Trainer */}
      <div className='d-flex w-100 module-1'>
        {selectedMethod === 'Trainer' && (
          <div className="trainername-1">
            <span className='text'>Trainer</span> <br />
            <SelectBox onChange={handleSelectTrainer} options={trainerOptions} />
          </div>
        )}

        {/* For Tracking by Class Name */}
        <div className='w-100'>
          {selectedTrainer && (
            <div className="d-flex module-2 ">
              <div className="trainername-2">
                <span className='text'>Class</span> <br />
                <SelectBox onChange={handleSelectClass} options={classOptions} />
              </div>
              {selectedClass && (
                <div className='trainername-3'>
                  <span className='text'>Module</span> <br />
                  <SelectBox onChange={handleSelectModule} options={moduleOptions} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {selectedModule && (
        <div className="d-flex " style={{ width: '', gap: 5 }}>
          <div className='options'>
            <span className='text'>Delivery Type</span> <br />
            <SelectOption
              options={deliveryOptions}
              value={selectedDelivery}
              onChange={handleSelectDelivery}
              placeholder="Please select delivery..."
              showSearch
              filterDelivery={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
            />
          </div>

          <div className='options'>
            <span className='text'>Training Format</span> <br />
            <SelectOption
              options={trainingOptions}
              value={selectedTraining}
              onChange={handleSelectTraining}
              placeholder="Please select delivery..."
              showSearch
              filterTraining={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
            />
          </div>

          <div className='options'>
            <span className='text'>Status</span> <br />
            <SelectOption
              options={statusOptions}
              value={selectedStatus}
              onChange={handleSelectStatus}
              placeholder="Please select delivery..."
              showSearch
              filterStatus={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
            />
          </div>

          {/* Select Date */}
          <div className='select'>
            <span className='text'>Schedule (Start)</span>
            <Date />
          </div>
          <div className='select'>
            <span className='text'>Schedule (End)</span>
            <Date />
          </div>
          <div className='select'>
            <span className='text'>Actual (Start)</span>
            <Date />
          </div>
          <div className='select'>
            <span className='text'>Actual (End)</span>
            <Date />
          </div>

          {/* Search */}
          <div>
            <span className='text'>Search</span>
            <br />
            <div className='d-flex search1'>
              <Input
                placeholder='Search...'
                className='search'
                style={{ marginLeft: 0 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='icon'>
                <a href='#1'><SearchOutlined className='search-icon' /></a>
              </div>
            </div>
          </div>




        </div>
      )}

      {showTable && (
        <div>
          <h2>Trainer Schedule Table</h2>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Schedule</th>
                <th>Topic</th>
                <th>TrainerId</th>
                <th>Delivery Type</th>
                <th>Training Format</th>
                <th>Status</th>
                <th>Scheduled Date</th>
                <th>Actual Date</th>
                <th>Duration</th>
                <th>Note</th>
                <th>Reason for mismatch - if any</th>
              </tr>
            </thead>
            <tbody>
              {filteredScheduleData.length > 0 ? (
                filteredScheduleData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Schedule}</td>
                    <td>{item.moduleName}</td>
                    <td>{item.TrainerId}</td>
                    <td>{item.contentDeliveryType}</td>
                    <td>{item.contentTrainingFormat}</td>
                    <td>{item.contentName}</td>
                    <td>{item.contentPlannedDate}</td>
                    <td>{item.reportActualDate}</td>
                    <td>{item.reportDuration}</td>
                    <td>{item.reportNote}</td>
                    <td>{item.reportReason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No data available</td>
                </tr>
              )}
            </tbody>
          </table>


        </div>
      )}
    </div>
  );
}

export default ScheduleTracker;
