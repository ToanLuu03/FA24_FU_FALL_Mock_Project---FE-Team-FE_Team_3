import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Modal } from 'antd';
import './ScheduleTrackerPage.css';
import { classOptions, moduleOptions, options, trainerOptions } from '../../../data/Schedule';
import { fetchDataTrainer } from '../../../api/ScheduleTracker_api';
import { SelectBox, SelectOption } from '../../../components/Admin/Selectbox/SelectBox';
import Date from '../../../components/Admin/SelectDate/Date';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useOutletContext } from 'react-router-dom';

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
  const [showFilter, setShowFilter] = useState(false); // Thêm showFilter state

  const { selectMenuItem } = useOutletContext();
  useEffect(() => {
    selectMenuItem('4');
  }, [selectMenuItem]);

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
      try {
        const result = await fetchDataTrainer();
        setScheduleData(result);
        console.log('result', result)
        if (Array.isArray(result)) {
          const deliveryTypes = [...new Set(result.map(item => item.contentDeliveryType).filter(Boolean))];
          const deliveryOptions = deliveryTypes.map(type => ({ label: type, value: type }));
          const statusTypes = [...new Set(result.map(item => item.contentName).filter(Boolean))];
          const statusOptions = statusTypes.map(type => ({ label: type, value: type }));
          const trainingTypes = [...new Set(result.map(item => item.contentTrainingFormat).filter(Boolean))];
          const trainingOptions = trainingTypes.map(type => ({ label: type, value: type }));

          // Update state
          setTrainingOptions(trainingOptions);
          setStatusOptions(statusOptions);
          setDeliveryOptions(deliveryOptions);
          setFilteredScheduleData(result); // Initial data load
        } else {
          console.error('Result is not an array:', result);
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };
    getScheduleData();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

        <div className=' search1 d-flex'>
          <div className='d-flex '>
            <Input
              placeholder='Search...'
              className='search'
              style={{ marginLeft: 0, width: '772px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='icon'>
              <a href='#1'><SearchOutlined className='search-icon' /></a>
            </div>
          </div>

          {/* Thay đổi showFilter khi nhấn vào biểu tượng Filter */}
          <div className='col-2'>
            <Button type="primary"
              onClick={showModal}
              className='button'
              style={{ padding: 0, borderRadius: 0, boxShadow: 0, }}
            >
              <FilterOutlined
                className='icon-filter'
                onClick={() => setShowFilter(!showFilter)}
                style={{ display: 'flex', justifyContent: 'center' }}
              />
            </Button>
          </div>
        </div>
      )}

      <Modal title="Basic Modal" open={isModalOpen} footer={null} closable={false} onCancel={handleCancel}>
        <div className='tracker-by'>
          <div className='options'>
            <span className='text'>Status</span> <br />
            <SelectOption
              options={statusOptions}
              value={selectedStatus}
              onChange={handleSelectStatus}
              placeholder="Please select status..."
              showSearch
              filterStatus={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
            />
          </div>

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
              placeholder="Please select training format..."
              showSearch
              filterTraining={(input, option) =>
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

        </div>

      </Modal>

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
                    <td>{item.className}</td>
                    <td>{item.moduleName}</td>
                    <td>{item.trainerId}</td>
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
